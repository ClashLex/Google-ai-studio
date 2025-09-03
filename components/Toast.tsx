
import React, { useEffect } from 'react';
import { XCircleIcon } from './icons/XCircleIcon';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className="fixed bottom-5 right-5 bg-red-600 text-white py-3 px-5 rounded-lg shadow-lg flex items-center animate-fade-in">
      <p className="mr-4">{message}</p>
      <button onClick={onClose} className="text-white hover:text-red-200">
        <XCircleIcon className="w-6 h-6" />
      </button>
    </div>
  );
};
