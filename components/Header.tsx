
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <div className="flex items-center space-x-3">
             <SparklesIcon className="w-8 h-8 text-indigo-400" />
            <h1 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
              Nano Banana AI Photo Editor
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};
