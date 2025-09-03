
import React from 'react';
import { WandIcon } from './icons/WandIcon';

interface PromptControlsProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  disabled: boolean;
}

export const PromptControls: React.FC<PromptControlsProps> = ({
  prompt,
  onPromptChange,
  onSubmit,
  isLoading,
  disabled
}) => {
  return (
    <div className="flex flex-col gap-4">
      <textarea
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder="e.g., 'Add a party hat to the cat' or 'Change the background to a sunny beach'"
        className="w-full h-32 p-3 bg-gray-700 border border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
        disabled={disabled || isLoading}
      />
      <button
        onClick={onSubmit}
        disabled={isLoading || disabled || !prompt.trim()}
        className="w-full flex items-center justify-center px-4 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <WandIcon className="w-5 h-5 mr-2" />
            Generate
          </>
        )}
      </button>
    </div>
  );
};
