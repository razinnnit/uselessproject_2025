import { useState, useEffect, useCallback } from 'react';
import { mishear } from '@/lib/logic/mishearing';

interface UseSpeechRecognitionReturn {
  isListening: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
  error: string | null;
}

export function useSpeechRecognition(): UseSpeechRecognitionReturn {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition is not supported in this browser');
      return;
    }

    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'en-US';

    recognitionInstance.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
    };

    recognitionInstance.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        setTranscript(finalTranscript);
      }
    };

    recognitionInstance.onerror = (event) => {
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };

    setRecognition(recognitionInstance);

    return () => {
      if (recognitionInstance) {
        recognitionInstance.stop();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (recognition && !isListening) {
      setTranscript('');
      setError(null);
      recognition.start();
    }
  }, [recognition, isListening]);

  const stopListening = useCallback(() => {
    if (recognition && isListening) {
      recognition.stop();
    }
  }, [recognition, isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    error
  };
}

// Hook for processing speech with mishearing logic
export function useSpeechProcessing() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResponse, setLastResponse] = useState<{ text: string; audio: string | null } | null>(null);

  const processSpeech = useCallback(async (input: string) => {
    if (!input.trim()) return null;

    setIsProcessing(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Use mishearing logic to generate response
    const response = mishear(input);
    setLastResponse(response);
    setIsProcessing(false);
    
    return response;
  }, []);

  return {
    isProcessing,
    lastResponse,
    processSpeech
  };
} 