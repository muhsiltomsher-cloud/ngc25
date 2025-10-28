'use client';

import React, { useEffect, useRef } from 'react';
import { useVoiceSearch } from '@/hooks/useVoiceSearch';

interface VoiceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (query: string) => void;
}

export default function VoiceSearchModal({ isOpen, onClose, onSubmit }: VoiceSearchModalProps) {
  const {
    isListening,
    transcript,
    interimTranscript,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useVoiceSearch();

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && isSupported) {
      startListening();
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
      stopListening();
    };
  }, [isOpen, isSupported, startListening, stopListening]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        stopListening();
        resetTranscript();
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, stopListening, resetTranscript, onClose]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      if (firstElement) {
        firstElement.focus();
      }
    }
  }, [isOpen]);

  const handleClose = () => {
    stopListening();
    resetTranscript();
    onClose();
  };

  const handleUseQuery = () => {
    const finalQuery = transcript.trim();
    if (finalQuery) {
      onSubmit(finalQuery);
      handleClose();
    }
  };

  const handleClear = () => {
    resetTranscript();
    if (!isListening) {
      startListening();
    }
  };

  if (!isOpen) return null;

  const displayText = transcript + interimTranscript;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="voice-search-title"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 animate-scaleIn"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" />
            
            {isListening && (
              <>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-2 border-amber-400/30 animate-ping" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full border-2 border-orange-500/20 animate-ping animation-delay-300" />
                </div>
              </>
            )}

            <div className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
              isListening 
                ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-orange-500/50 scale-110' 
                : 'bg-gradient-to-br from-gray-300 to-gray-400'
            }`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={isListening ? 'animate-breathe' : ''}
              >
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
            </div>
          </div>

          <div className="text-center space-y-2">
            <h2 id="voice-search-title" className="text-2xl font-semibold text-gray-900">
              {isListening ? 'Speak now' : error ? 'Error' : 'Ready'}
            </h2>
            <p className="text-sm text-gray-600">
              {isListening 
                ? "We're listening..." 
                : error 
                ? error 
                : !isSupported 
                ? 'Voice search is not supported in your browser' 
                : 'Click start to begin'}
            </p>
          </div>

          {displayText && (
            <div className="w-full min-h-[80px] max-h-[120px] overflow-y-auto bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-gray-900 text-lg leading-relaxed">
                {transcript}
                {interimTranscript && (
                  <span className="text-gray-400">{interimTranscript}</span>
                )}
              </p>
            </div>
          )}

          {!displayText && !error && (
            <div className="text-center text-sm text-gray-500 space-y-1">
              <p>Try saying:</p>
              <p className="text-gray-400">&ldquo;Herringbone floor tiles&rdquo;</p>
              <p className="text-gray-400">&ldquo;Acoustic wall panels&rdquo;</p>
            </div>
          )}

          <div className="flex gap-3 w-full pt-4">
            {isListening ? (
              <button
                onClick={stopListening}
                className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium transition-colors shadow-lg shadow-red-500/30"
              >
                Stop Listening
              </button>
            ) : (
              <>
                {transcript && (
                  <>
                    <button
                      onClick={handleClear}
                      className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full font-medium transition-colors"
                    >
                      Clear
                    </button>
                    <button
                      onClick={handleUseQuery}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full font-medium transition-all shadow-lg shadow-orange-500/30"
                    >
                      Search
                    </button>
                  </>
                )}
                {!transcript && !error && isSupported && (
                  <button
                    onClick={startListening}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full font-medium transition-all shadow-lg shadow-orange-500/30"
                  >
                    Start Listening
                  </button>
                )}
                {error && (
                  <button
                    onClick={() => {
                      resetTranscript();
                      startListening();
                    }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full font-medium transition-all shadow-lg shadow-orange-500/30"
                  >
                    Try Again
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(0.98);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 200ms ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 300ms ease-out;
        }

        .animate-breathe {
          animation: breathe 2s ease-in-out infinite;
        }

        .animation-delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </div>
  );
}
