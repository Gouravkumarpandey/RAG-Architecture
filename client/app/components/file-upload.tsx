'use client';

import React from 'react';
import { Upload } from 'lucide-react';

const FileUploadComponent: React.FC = () => {
  const handleFileUploadButtonClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/pdf';

    input.addEventListener('change', async () => {
      if (input.files && input.files.length > 0) {
        const file = input.files[0];

        const formData = new FormData();
        formData.append('pdf', file);

        try {
          const response = await fetch('http://localhost:8000/upload/pdf', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error('Upload failed');
          }

          console.log('File uploaded successfully');
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    });

    input.click();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0d1117]">
      <button
        onClick={handleFileUploadButtonClick}
        className="flex items-center gap-2 px-6 py-3 rounded-md bg-[#238636] text-white font-medium hover:bg-[#2ea043] transition"
      >
        <Upload size={18} />
        Upload PDF
      </button>
    </div>
  );
};

export default FileUploadComponent;
