import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface VoiceInputProps {
  onTranscriptUpdate: (transcript: string) => void;
  placeholder?: string;
}

const VoiceInput = ({ onTranscriptUpdate, placeholder = "Tap the microphone to start voice input" }: VoiceInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check if Speech Recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      
      const recognition = recognitionRef.current;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        toast.success('Voice input started. Speak now...');
      };

      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
          } else {
            interimTranscript += result[0].transcript;
          }
        }

        const currentTranscript = finalTranscript || interimTranscript;
        setTranscript(currentTranscript);
        onTranscriptUpdate(currentTranscript);
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        
        switch (event.error) {
          case 'network':
            toast.error('Network error. Please check your connection.');
            break;
          case 'not-allowed':
            toast.error('Microphone access denied. Please allow microphone access in your browser settings.');
            break;
          case 'no-speech':
            toast.error('No speech detected. Please try speaking again.');
            break;
          case 'audio-capture':
            toast.error('No microphone found. Please check your microphone connection.');
            break;
          case 'service-not-allowed':
            toast.error('Speech recognition service not allowed. Please check your browser settings.');
            break;
          default:
            // Only log to console for debugging, don't show error toast for unknown errors
            console.warn('Speech recognition error:', event.error);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTranscriptUpdate]);

  const startListening = async () => {
    if (!isSupported) {
      toast.error('Voice input is not supported in your browser.');
      return;
    }

    setIsRequestingPermission(true);

    try {
      // Request microphone permission first
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stop the stream immediately since we just needed permission
      stream.getTracks().forEach(track => track.stop());
      
      setIsRequestingPermission(false);
      
      if (recognitionRef.current && !isListening) {
        setTranscript('');
        recognitionRef.current.start();
      }
    } catch (error) {
      setIsRequestingPermission(false);
      const err = error as DOMException;
      
      if (err.name === 'NotAllowedError') {
        toast.error('Microphone access denied. Please allow microphone access in your browser settings.');
      } else if (err.name === 'NotFoundError') {
        toast.error('No microphone found. Please check your microphone connection.');
      } else if (err.name === 'NotSupportedError') {
        toast.error('Voice input is not supported in your browser.');
      } else {
        console.warn('Microphone access error:', err);
        toast.error('Unable to access microphone. Please check your browser settings.');
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      toast.success('Voice input stopped.');
    }
  };

  const clearTranscript = () => {
    setTranscript('');
    onTranscriptUpdate('');
    toast.success('Voice input cleared.');
  };

  if (!isSupported) {
    return (
      <div className="flex items-center justify-center p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground">Voice input not supported in this browser</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Button
          type="button"
          variant={isListening ? "destructive" : "outline"}
          size="sm"
          onClick={isListening ? stopListening : startListening}
          disabled={isRequestingPermission}
          className="flex items-center space-x-2"
        >
          {isRequestingPermission ? (
            <>
              <Mic className="h-4 w-4 animate-pulse" />
              <span>Requesting Access...</span>
            </>
          ) : isListening ? (
            <>
              <MicOff className="h-4 w-4" />
              <span>Stop</span>
            </>
          ) : (
            <>
              <Mic className="h-4 w-4" />
              <span>Voice Input</span>
            </>
          )}
        </Button>

        {transcript && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearTranscript}
            className="text-xs"
          >
            Clear
          </Button>
        )}

        {isListening && (
          <div className="flex items-center space-x-1 text-primary">
            <Volume2 className="h-4 w-4 animate-pulse" />
            <span className="text-xs">Listening...</span>
          </div>
        )}
      </div>

      {transcript && (
        <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
          <p className="text-xs text-muted-foreground mb-1">Voice input:</p>
          <p className="text-sm">{transcript}</p>
        </div>
      )}

      {!transcript && !isListening && (
        <p className="text-xs text-muted-foreground">{placeholder}</p>
      )}
    </div>
  );
};

// Extend the Window interface to include Speech Recognition
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

export default VoiceInput;