import WorkspaceLayout from '../../../components/workspace/WorkspaceLayout';
import { 
  FileText, Upload, Search, Download, Trash2, 
  X, Plus, File, AlertCircle, CheckCircle2, Clock
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface LegalDoc {
  id: number;
  title: string;
  description: string;
  file_name: string;
  file_size: number;
  uploaded_by: string;
  created_at: string;
  tags: string;
  status: 'active' | 'archived' | 'draft';
}

const API_BASE_URL = 'http://localhost:3001/api';

export default function LegalDocumentsPage() {
  const [documents, setDocuments] = useState<LegalDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<LegalDoc | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    tags: '',
    file: null as File | null
  });

  // Fetch documents
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/documents`);
      if (response.ok) {
        const data = await response.json();
        setDocuments(data);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadForm({ ...uploadForm, file: e.target.files[0] });
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadForm.file) {
      setUploadError('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', uploadForm.file);
    formData.append('title', uploadForm.title);
    formData.append('description', uploadForm.description);
    formData.append('document_type', 'Legal Document');
    formData.append('tags', uploadForm.tags);
    formData.append('uploaded_by', 'Admin');

    try {
      setUploadProgress(50);
      const response = await fetch(`${API_BASE_URL}/documents`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setUploadSuccess('Document uploaded successfully!');
        setUploadProgress(100);
        setTimeout(() => {
          setShowUploadModal(false);
          setUploadForm({ title: '', description: '', tags: '', file: null });
          setUploadProgress(0);
          setUploadSuccess('');
          fetchDocuments();
        }, 1500);
      } else {
        const error = await response.json();
        setUploadError(error.error || 'Upload failed');
        setUploadProgress(0);
      }
    } catch (error) {
      setUploadError('Network error. Please try again.');
      setUploadProgress(0);
    }
  };

  const handleDownload = async (doc: LegalDoc) => {
    try {
      const response = await fetch(`${API_BASE_URL}/documents/${doc.id}/download?user=Admin`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = window.document.createElement('a');
        a.href = url;
        a.download = doc.file_name;
        window.document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        window.document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedDocument) return;

    try {
      const response = await fetch(`${API_BASE_URL}/documents/${selectedDocument.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setShowDeleteModal(false);
        setSelectedDocument(null);
        fetchDocuments();
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'archived': return 'bg-gray-100 text-gray-700';
      case 'draft': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return 'text-red-500';
    if (['doc', 'docx'].includes(ext || '')) return 'text-blue-500';
    if (['jpg', 'jpeg', 'png'].includes(ext || '')) return 'text-purple-500';
    return 'text-gray-500';
  };

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (doc.tags && doc.tags.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  return (
    <WorkspaceLayout 
      title="Legal Documents" 
      subtitle="Store and manage all legal documents securely."
    >
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-muted p-5 border border-border hover:border-primary transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-display font-medium">{documents.length}</p>
          </div>
          <p className="text-sm text-muted-foreground">Total Documents</p>
        </div>
        <div className="bg-muted p-5 border border-border hover:border-primary transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-display font-medium">
              {documents.filter(d => d.status === 'active').length}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">Active</p>
        </div>
        <div className="bg-muted p-5 border border-border hover:border-primary transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-2xl font-display font-medium">
              {documents.filter(d => d.status === 'draft').length}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">Drafts</p>
        </div>
        <div className="bg-muted p-5 border border-border hover:border-primary transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <File className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-display font-medium">
              {documents.filter(d => d.status === 'archived').length}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">Archived</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-64 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm font-semibold hover:bg-primary transition-all"
        >
          <Upload className="w-4 h-4" />
          Upload Document
        </button>
      </div>

      {/* Documents Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading documents...</p>
        </div>
      ) : filteredDocuments.length === 0 ? (
        <div className="text-center py-12 bg-muted border border-border">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium mb-2">No documents found</p>
          <p className="text-sm text-muted-foreground mb-4">
            {searchQuery
              ? 'Try adjusting your search'
              : 'Upload your first legal document to get started'}
          </p>
          {!searchQuery && (
            <button 
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all"
            >
              <Plus className="w-4 h-4" />
              Upload Document
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="bg-white border border-border hover:border-primary transition-all p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-muted rounded-lg flex items-center justify-center ${getFileIcon(doc.file_name)}`}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm mt-0.5 line-clamp-1" title={doc.title}>{doc.title}</h3>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(doc.status)}`}>
                  {doc.status}
                </span>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[2.5rem]">
                {doc.description || 'No description'}
              </p>

              <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                <span>{formatFileSize(doc.file_size)}</span>
                <span>•</span>
                <span>{formatDate(doc.created_at)}</span>
              </div>

              {doc.tags && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {doc.tags.split(',').map((tag, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-muted text-muted-foreground">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-xs text-muted-foreground">
                  By {doc.uploaded_by}
                </span>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => handleDownload(doc)}
                    className="p-2 hover:bg-muted transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedDocument(doc);
                      setShowDeleteModal(true);
                    }}
                    className="p-2 hover:bg-muted transition-colors text-red-500"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => !uploadProgress && setShowUploadModal(false)} />
          <div className="relative bg-white w-full max-w-md border border-border shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-medium">Upload Document</h2>
              </div>
              {!uploadProgress && (
                <button onClick={() => setShowUploadModal(false)} className="p-1 hover:bg-muted rounded">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <form onSubmit={handleUpload} className="p-4 space-y-4">
              {uploadError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {uploadError}
                </div>
              )}
              
              {uploadSuccess && (
                <div className="p-3 bg-green-50 border border-green-200 text-green-600 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  {uploadSuccess}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Document Title *</label>
                <input
                  type="text"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                  placeholder="Enter document title"
                  required
                  disabled={uploadProgress > 0}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary h-20 resize-none"
                  placeholder="Enter document description"
                  disabled={uploadProgress > 0}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  value={uploadForm.tags}
                  onChange={(e) => setUploadForm({ ...uploadForm, tags: e.target.value })}
                  className="w-full px-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                  placeholder="contract, 2024, client"
                  disabled={uploadProgress > 0}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">File *</label>
                <div 
                  onClick={() => !uploadProgress && fileInputRef.current?.click()}
                  className={`border-2 border-dashed border-border p-6 text-center cursor-pointer hover:border-primary transition-colors ${uploadProgress > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">
                    {uploadForm.file ? uploadForm.file.name : 'Click to select file'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF, DOC, DOCX, TXT, JPG, PNG (Max 10MB)
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileSelect}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                    disabled={uploadProgress > 0}
                  />
                </div>
              </div>

              {uploadProgress > 0 && (
                <div className="space-y-2">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300" 
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-center text-muted-foreground">Uploading...</p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-2.5 border border-border text-sm font-medium hover:bg-muted transition-colors"
                  disabled={uploadProgress > 0}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!uploadForm.file || !uploadForm.title || uploadProgress > 0}
                  className="flex-1 py-2.5 bg-foreground text-background text-sm font-medium hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploadProgress > 0 ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowDeleteModal(false)} />
          <div className="relative bg-white w-full max-w-sm border border-border shadow-lg">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium">Delete Document?</h3>
                  <p className="text-sm text-muted-foreground">
                    This action cannot be undone.
                  </p>
                </div>
              </div>
              
              <p className="text-sm mb-6">
                Are you sure you want to delete <strong>"{selectedDocument.title}"</strong>? 
                The file will be permanently removed from the server.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-2.5 border border-border text-sm font-medium hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-2.5 bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </WorkspaceLayout>
  );
}
