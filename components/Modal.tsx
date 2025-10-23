import React, { useEffect, useRef } from 'react';
import XIcon from './icons/XIcon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="bg-light-bg dark:bg-dark-card w-full max-w-4xl max-h-[90vh] rounded-lg shadow-xl flex flex-col transform transition-all duration-300 scale-95"
        onClick={(e) => e.stopPropagation()}
        style={isOpen ? { transform: 'scale(1)' } : {}}
      >
        <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-light-bg dark:bg-dark-card rounded-t-lg z-10">
          <h2 id="modal-title" className="text-xl font-bold font-geist text-light-text dark:text-dark-text">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-light-text-secondary dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-bg"
            aria-label="Close modal"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </header>
        <div className="overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
