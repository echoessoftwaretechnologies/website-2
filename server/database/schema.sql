-- Legal Documents Database Schema
-- Run this SQL to set up the database for storing legal documents

CREATE DATABASE IF NOT EXISTS legal_docs_db;
USE legal_docs_db;

-- Legal Documents Table
CREATE TABLE IF NOT EXISTS legal_documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    document_type VARCHAR(50) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT,
    file_mime_type VARCHAR(100),
    uploaded_by VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    tags VARCHAR(500),
    status ENUM('active', 'archived', 'draft') DEFAULT 'active',
    INDEX idx_document_type (document_type),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- Document Categories/Types Reference
CREATE TABLE IF NOT EXISTS document_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default document types
INSERT INTO document_types (type_name, description) VALUES
('Contract', 'Legal contracts and agreements'),
('Policy', 'Company policies and procedures'),
('Compliance', 'Compliance and regulatory documents'),
('License', 'Software licenses and permits'),
('NDA', 'Non-disclosure agreements'),
('Terms', 'Terms of service and terms of use'),
('Privacy', 'Privacy policies'),
('Employment', 'Employment-related documents'),
('Intellectual Property', 'IP related documents'),
('Other', 'Other legal documents');

-- Document Access Log (for tracking who accessed what)
CREATE TABLE IF NOT EXISTS document_access_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    document_id INT NOT NULL,
    accessed_by VARCHAR(100) NOT NULL,
    access_type ENUM('view', 'download', 'edit', 'delete') NOT NULL,
    accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (document_id) REFERENCES legal_documents(id) ON DELETE CASCADE,
    INDEX idx_document_id (document_id),
    INDEX idx_accessed_at (accessed_at)
);

-- Create a user for the application (replace 'your_password' with a secure password)
-- GRANT ALL PRIVILEGES ON legal_docs_db.* TO 'legal_app'@'localhost' IDENTIFIED BY 'your_password';
-- FLUSH PRIVILEGES;
