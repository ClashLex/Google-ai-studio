
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { PromptControls } from './components/PromptControls';
import { ImageDisplay } from './components/ImageDisplay';
import { editImage } from './services/geminiService';
import type { EditedImageResult } from './types';
import { Toast } from './components/Toast';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [editedResult, setEditedResult] = useState<EditedImageResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (file: File | null) => {
    setOriginalImage(file);
    setEditedResult(null);
    if (file) {
      setOriginalImagePreview(URL.createObjectURL(file));
    } else {
      setOriginalImagePreview(null);
    }
  };
  
  const fileToBase64 = (file: File): Promise<{base64: string, mimeType: string}> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve({ base64, mimeType: file.type });
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleGenerate = useCallback(async () => {
    if (!originalImage || !prompt) {
      setError("Please select an image and enter a prompt.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedResult(null);

    try {
      const { base64, mimeType } = await fileToBase64(originalImage);
      const result = await editImage(base64, mimeType, prompt);
      setEditedResult(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3 flex-shrink-0 flex flex-col gap-6">
          <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-indigo-400">1. Upload Image</h2>
            <ImageUploader onImageChange={handleImageChange} preview={originalImagePreview} />
          </div>
          <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl">
             <h2 className="text-xl font-bold mb-4 text-indigo-400">2. Describe Your Edit</h2>
            <PromptControls
              prompt={prompt}
              onPromptChange={setPrompt}
              onSubmit={handleGenerate}
              isLoading={isLoading}
              disabled={!originalImage}
            />
          </div>
        </div>
        <div className="w-full lg:w-2/3 flex-grow bg-gray-800 rounded-2xl p-6 shadow-2xl">
          <ImageDisplay
            originalImage={originalImagePreview}
            editedResult={editedResult}
            isLoading={isLoading}
          />
        </div>
      </main>
      {error && <Toast message={error} onClose={() => setError(null)} />}
    </div>
  );
};

export default App;
