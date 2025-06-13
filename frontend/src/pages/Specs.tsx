import React from 'react';
import { FileText, Download, Eye, Calendar } from 'lucide-react';

const Specs: React.FC = () => {
  // Mock data for uploaded files
  const specFiles = [
    {
      id: 1,
      name: 'Project Requirements.pdf',
      type: 'PDF Document',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      thumbnail: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'Technical Specifications.docx',
      type: 'Word Document',
      size: '1.8 MB',
      uploadDate: '2024-01-14',
      thumbnail: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      name: 'API Documentation.md',
      type: 'Markdown',
      size: '156 KB',
      uploadDate: '2024-01-13',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop'
    },
    {
      id: 4,
      name: 'Database Schema.sql',
      type: 'SQL File',
      size: '89 KB',
      uploadDate: '2024-01-12',
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&h=200&fit=crop'
    },
    {
      id: 5,
      name: 'Design Mockups.zip',
      type: 'Archive',
      size: '12.5 MB',
      uploadDate: '2024-01-11',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop'
    },
    {
      id: 6,
      name: 'User Stories.xlsx',
      type: 'Excel Spreadsheet',
      size: '445 KB',
      uploadDate: '2024-01-10',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop'
    }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Specs</h1>
        <p className="text-gray-600">View and manage your project specifications and documents</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Files</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{specFiles.length}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Size</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">17.4 MB</p>
            </div>
            <Download className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Last Upload</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">Today</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {specFiles.map((file) => (
          <div
            key={file.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 group"
          >
            {/* Thumbnail */}
            <div className="relative h-48 bg-gray-100 overflow-hidden">
              <img
                src={file.thumbnail}
                alt={file.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                  <button className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors duration-200">
                    <Eye className="w-4 h-4 text-gray-700" />
                  </button>
                  <button className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors duration-200">
                    <Download className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2 truncate">{file.name}</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Type</span>
                  <span className="text-gray-900 font-medium">{file.type}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Size</span>
                  <span className="text-gray-900 font-medium">{file.size}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Uploaded</span>
                  <span className="text-gray-900 font-medium">{new Date(file.uploadDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (shown when no files) */}
      {specFiles.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No specifications found</h3>
          <p className="text-gray-500 mb-4">Upload some files to see them displayed here</p>
        </div>
      )}
    </div>
  );
};

export default Specs;