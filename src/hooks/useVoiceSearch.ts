import { useEffect, useRef, useState, useCallback } from 'react';

interface UseVoiceSearchReturn {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  error: string | null;
  isSupported: boolean;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: Event) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

export function useVoiceSearch(): UseVoiceSearchReturn {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setIsSupported(true);
      const SpeechRecognitionConstructor = (window as typeof window & { 
        webkitSpeechRecognition: new () => ISpeechRecognition;
        SpeechRecognition: new () => ISpeechRecognition;
      }).webkitSpeechRecognition || (window as typeof window & { 
        webkitSpeechRecognition: new () => ISpeechRecognition;
        SpeechRecognition: new () => ISpeechRecognition;
      }).SpeechRecognition;
      const recognition = new SpeechRecognitionConstructor();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: Event) => {
        const speechEvent = event as SpeechRecognitionEvent;
        let finalTranscript = '';
        let interim = '';

        for (let i = speechEvent.resultIndex; i < speechEvent.results.length; i++) {
          const result = speechEvent.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
          } else {
            interim += result[0].transcript;
          }
        }

        if (finalTranscript) {
          setTranscript((prev) => prev + finalTranscript);
        }
        setInterimTranscript(interim);
      };

      recognition.onerror = (event: Event) => {
        const errorEvent = event as SpeechRecognitionErrorEvent;
        console.error('Speech recognition error:', errorEvent.error);
        setIsListening(false);
        
        if (errorEvent.error === 'not-allowed' || errorEvent.error === 'service-not-allowed') {
          setError('Microphone access denied. Please allow microphone access in your browser settings.');
        } else if (errorEvent.error === 'no-speech') {
          setError('No speech detected. Please try again.');
        } else if (errorEvent.error === 'network') {
          setError('Network error. Please check your connection.');
        } else {
          setError('An error occurred. Please try again.');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        setInterimTranscript('');
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
        }
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      setError('Voice search is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    setError(null);
    setInterimTranscript('');
    
    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setError('Failed to start listening. Please try again.');
      setIsListening(false);
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
      setIsListening(false);
      setInterimTranscript('');
    }
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    setError(null);
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  };
}
