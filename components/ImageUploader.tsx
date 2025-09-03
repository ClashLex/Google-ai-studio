
import React, { useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';
import { XCircleIcon } from './icons/XCircleIcon';


interface ImageUploaderProps {
  onImageChange: (file: File | null) => void;
  preview: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange, preview }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onImageChange(file);
  };
  
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
    onImageChange(null);
  };

  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      {preview ? (
        <div className="relative group">
          <img src={preview} alt="Preview" className="w-full h-auto rounded-lg object-cover" />
           <div 
             className="absolute top-2 right-2 cursor-pointer opacity-50 group-hover:opacity-100 transition-opacity"
             onClick={handleClear}
            >
            <XCircleIcon className="w-8 h-8 text-white bg-black/50 rounded-full" />
           </div>
        </div>
      ) : (
        <div
          onClick={handleSelectFile}
          className="w-full aspect-square border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 hover:bg-gray-700/50 transition-colors"
        >
          <UploadIcon className="w-12 h-12 text-gray-500 mb-2" />
          <p className="text-gray-400">Click to upload</p>
          <p className="text-xs text-gray-500">PNG, JPG, WEBP</p>
        </div>
      )}
    </div>
  );
};
