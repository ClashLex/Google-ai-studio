
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-gray-400">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-500"></div>
        <p className="mt-4 text-lg">AI is thinking...</p>
        <p className="text-sm text-gray-500">This may take a moment.</p>
    </div>
  );
};
