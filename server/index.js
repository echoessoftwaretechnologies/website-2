import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'legal_docs_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'image/jpeg',
    'image/png'
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DOC, DOCX, TXT, JPG, PNG allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Test database connection
app.get('/api/health', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    res.json({ status: 'OK', message: 'Database connected' });
  } catch (error) {
    res.status(500).json({ status: 'Error', message: error.message });
  }
});

// Get all documents
app.get('/api/documents', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, title, description, document_type, file_name, file_size, uploaded_by, created_at, tags, status FROM legal_documents ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get document types
app.get('/api/document-types', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM document_types ORDER BY type_name');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single document
app.get('/api/documents/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM legal_documents WHERE id = ?',
      [req.params.id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }
    
    // Log access
    await pool.execute(
      'INSERT INTO document_access_log (document_id, accessed_by, access_type) VALUES (?, ?, ?)',
      [req.params.id, req.query.user || 'anonymous', 'view']
    );
    
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Download document
app.get('/api/documents/:id/download', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM legal_documents WHERE id = ?',
      [req.params.id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }
    
    const document = rows[0];
    const filePath = path.join(__dirname, document.file_path);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found on server' });
    }
    
    // Log download
    await pool.execute(
      'INSERT INTO document_access_log (document_id, accessed_by, access_type) VALUES (?, ?, ?)',
      [req.params.id, req.query.user || 'anonymous', 'download']
    );
    
    res.download(filePath, document.file_name);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload new document
app.post('/api/documents', upload.single('file'), async (req, res) => {
  try {
    const { title, description, document_type, tags, uploaded_by } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const filePath = path.join('uploads', req.file.filename);
    
    const [result] = await pool.execute(
      `INSERT INTO legal_documents 
       (title, description, document_type, file_name, file_path, file_size, file_mime_type, uploaded_by, tags) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, document_type, req.file.originalname, filePath, req.file.size, req.file.mimetype, uploaded_by || 'Admin', tags]
    );
    
    res.status(201).json({
      id: result.insertId,
      message: 'Document uploaded successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update document
app.put('/api/documents/:id', async (req, res) => {
  try {
    const { title, description, document_type, tags, status } = req.body;
    
    const [result] = await pool.execute(
      `UPDATE legal_documents 
       SET title = ?, description = ?, document_type = ?, tags = ?, status = ? 
       WHERE id = ?`,
      [title, description, document_type, tags, status, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }
    
    res.json({ message: 'Document updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete document
app.delete('/api/documents/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT file_path FROM legal_documents WHERE id = ?',
      [req.params.id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }
    
    // Delete file from disk
    const filePath = path.join(__dirname, rows[0].file_path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    // Delete from database
    await pool.execute('DELETE FROM legal_documents WHERE id = ?', [req.params.id]);
    
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search documents
app.get('/api/documents/search', async (req, res) => {
  try {
    const { q, type, status } = req.query;
    let query = 'SELECT * FROM legal_documents WHERE 1=1';
    const params = [];
    
    if (q) {
      query += ' AND (title LIKE ? OR description LIKE ? OR tags LIKE ?)';
      params.push(`%${q}%`, `%${q}%`, `%${q}%`);
    }
    
    if (type) {
      query += ' AND document_type = ?';
      params.push(type);
    }
    
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY created_at DESC';
    
    const [rows] = await pool.execute(query, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size too large. Max 10MB.' });
    }
  }
  res.status(500).json({ error: error.message });
});

app.listen(PORT, () => {
  console.log(`Legal Documents API server running on port ${PORT}`);
  console.log(`Uploads directory: ${uploadsDir}`);
});
