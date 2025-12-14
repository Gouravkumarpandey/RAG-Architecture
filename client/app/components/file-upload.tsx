'use client';

import React from 'react';
import { Upload } from 'lucide-react';

const handleFileUploadButtonClick = () => {
  const el = document.createElement('input');
  el.setAttribute('type', 'file');
  el.setAttribute('accept', '.pdf');
    el.click();
};


const FileUploadComponent: React.FC = () => {
  return (
    <div className="bg-slate-900 text-white shadow-2xl flex justify-center items-center p-4 rounded-lg border-2 border-white">
      <div onClick={handleFileUploadButtonClick} className="flex flex-col items-center gap-2">
        <h3 className="text-lg font-semibold">Upload PDF File</h3>
        <Upload className="w-8 h-8" />
      </div>
    </div>
  );
};

export default FileUploadComponent;
