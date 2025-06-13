import React, { useState, useRef } from 'react';
import { Upload, File, X, CheckCircle } from 'lucide-react';

const Uploads: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    id: string;
    name: string;
    size: string;
    type: string;
    uploadDate: string;
  }>>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const newFiles = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      type: file.type || 'Unknown',
      uploadDate: new Date().toLocaleDateString()
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">File Upload</h1>
        <p className="text-gray-600">Upload and manage your documents</p>
      </div>

      {/* Upload Area */}
      <div className="mb-8">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileInput}
            className="hidden"
          />
          
          {uploadedFiles.length === 0 ? (
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 text-gray-400">
                <File className="w-full h-full" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No files uploaded</h3>
                <p className="text-gray-500 mb-4">Click the upload button to get started</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Files
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {uploadedFiles.length} file{uploadedFiles.length > 1 ? 's' : ''} uploaded
                </h3>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload More
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Uploaded Files</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <File className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{file.name}</h3>
                    <p className="text-sm text-gray-500">{file.size} • {file.uploadDate}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(file.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Uploads;