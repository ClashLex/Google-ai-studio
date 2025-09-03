
import React from 'react';
import type { EditedImageResult } from '../types';
import { Loader } from './Loader';
import { ImageIcon } from './icons/ImageIcon';

interface ImageDisplayProps {
  originalImage: string | null;
  editedResult: EditedImageResult | null;
  isLoading: boolean;
}

const ImageContainer: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="w-1/2 flex flex-col items-center p-2">
        <h3 className="text-lg font-semibold text-gray-400 mb-2">{title}</h3>
        <div className="w-full aspect-square bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden">
            {children}
        </div>
    </div>
);


export const ImageDisplay: React.FC<ImageDisplayProps> = ({ originalImage, editedResult, isLoading }) => {
  return (
    <div className="flex flex-col h-full">
        <div className="flex-grow flex items-stretch justify-center gap-4">
            <ImageContainer title="Original">
                {originalImage ? (
                    <img src={originalImage} alt="Original" className="w-full h-full object-contain" />
                ) : (
                    <div className="text-gray-500 flex flex-col items-center">
                        <ImageIcon className="w-16 h-16" />
                        <p>Upload an image to start</p>
                    </div>
                )}
            </ImageContainer>
            
            <ImageContainer title="Edited">
                {isLoading ? (
                   <Loader />
                ) : editedResult?.imageUrl ? (
                    <img src={editedResult.imageUrl} alt="Edited" className="w-full h-full object-contain animate-fade-in" />
                ) : (
                    <div className="text-gray-500 flex flex-col items-center text-center p-4">
                       <ImageIcon className="w-16 h-16" />
                       <p>Your edited image will appear here</p>
                    </div>
                )}
            </ImageContainer>
        </div>
         {editedResult?.text && (
            <div className="mt-4 p-4 bg-gray-900 rounded-lg">
                <p className="text-sm text-gray-300 italic">
                    <span className="font-semibold text-indigo-400">AI says:</span> "{editedResult.text}"
                </p>
            </div>
        )}
    </div>
  );
};

// Add fade-in animation keyframes to your index.html or a global style setup
// For simplicity with Tailwind CDN, we'll use a style tag in index.html,
// but in a real build setup, this would go in a CSS file.
// We'll add this to the index.html file:
/*
<style>
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }
</style>
*/
// Let's add this to index.html to be complete
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }
`;
document.head.appendChild(style);
