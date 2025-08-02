import { useEffect, useState, useRef, useCallback } from 'react';
import { mishear } from '../logic/mishearing';

export default function CaptionBox({ isListening, setIsListening }) {
  const [userText, setUserText] = useState('');
  const [aiText, setAiText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [lastAudio, setLastAudio] = useState('');
  const [lastText, setLastText] = useState('');
  const [conversation, setConversation] = useState([
    { type: 'system', text: 'OLDVIS INTERFACE INITIALIZED', timestamp: new Date() },
    { type: 'system', text: 'NEURAL NETWORK ONLINE', timestamp: new Date() },
    { type: 'system', text: 'VOICE RECOGNITION STANDBY', timestamp: new Date() },
    { type: 'system', text: 'READY FOR INPUT', timestamp: new Date() }
  ]);
  const recognitionRef = useRef(null);
  const conversationEndRef = useRef(null);

  const handleTranscript = useCallback((transcript) => {
    const audioOptions = [
      '/audio/audio1.mp3',
      '/audio/audio2.mp3',
      '/audio/audio3.mp3',
      '/audio/audio4.mp3',
      '/audio/audio5.mp3',
      '/audio/audio6.mp3',
      '/audio/audio7.mp3',
      '/audio/audio8.mp3',
      '/audio/audio9.mp3',
    ];

    setUserText(transcript);

    // Add user message to conversation
    setConversation(prev => [...prev, { type: 'user', text: transcript, timestamp: new Date() }]);

    const shouldPlayAudio = Math.random() < 0.5;

    if (shouldPlayAudio) {
      let newAudio;
      do {
        newAudio = audioOptions[Math.floor(Math.random() * audioOptions.length)];
      } while (newAudio === lastAudio && audioOptions.length > 1);
      setLastAudio(newAudio);
      setAiText('');
      setAudioUrl(newAudio);
      
      // Add audio response to conversation
      setConversation(prev => [...prev, { type: 'audio', audio: newAudio, timestamp: new Date() }]);
    } else {
      let newResponse;
      do {
        newResponse = mishear(transcript);
      } while (newResponse.text === lastText);
      setLastText(newResponse.text);
      
      // If the response has both text and audio, randomly choose one
      if (newResponse.text && newResponse.audio) {
        const chooseAudio = Math.random() < 0.3; // 30% chance to choose audio over text
        if (chooseAudio) {
          setAiText('');
          setAudioUrl(newResponse.audio);
          setConversation(prev => [...prev, { type: 'audio', audio: newResponse.audio, timestamp: new Date() }]);
        } else {
          setAiText(newResponse.text);
          setAudioUrl('');
          setConversation(prev => [...prev, { type: 'ai', text: newResponse.text, timestamp: new Date() }]);
        }
      } else {
        // If only one is available, use that
        setAiText(newResponse.text || '');
        setAudioUrl(newResponse.audio || '');
        if (newResponse.text) {
          setConversation(prev => [...prev, { type: 'ai', text: newResponse.text, timestamp: new Date() }]);
        } else if (newResponse.audio) {
          setConversation(prev => [...prev, { type: 'audio', audio: newResponse.audio, timestamp: new Date() }]);
        }
      }
    }
  }, [lastAudio, lastText]);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setUserText('❌ Speech recognition not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-IN';

    recognition.onresult = (event) => {
      const transcript = event.results[event.resultIndex][0].transcript.trim();
      handleTranscript(transcript);
    };

    recognition.onerror = (e) => {
      setUserText(`⚠️ Error: ${e.error}`);
      setAiText('');
      setAudioUrl('');
    };

    recognitionRef.current = recognition;

    if (isListening) {
      try {
        recognition.start();
      } catch {
        console.warn('Speech recognition already started');
      }
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
      recognition.abort();
    };
  }, [isListening, handleTranscript]);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Conversation Display */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-4">
          {conversation.map((message, index) => (
            <div key={index} className={`message-enter ${
              message.type === 'user' 
                ? 'text-right' 
                : 'text-left'
            }`}>
              <div className={`inline-block max-w-[80%] ${
                message.type === 'user' 
                  ? 'bg-white text-black' 
                  : message.type === 'ai'
                  ? 'bg-white/10 text-white border border-white/20'
                  : message.type === 'audio'
                  ? 'bg-white/5 text-white border border-white/10'
                  : 'bg-white/5 text-white/60 border border-white/10'
              } rounded-2xl px-4 py-3`}>
                
                {/* Message header */}
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs tracking-widest ${
                    message.type === 'user' 
                      ? 'text-black/60' 
                      : 'text-white/40'
                  }`}>
                    {message.type === 'user' ? 'YOU' : message.type === 'ai' ? 'AI' : message.type === 'audio' ? 'AUDIO' : 'SYSTEM'}
                  </span>
                  <span className={`text-xs ${
                    message.type === 'user' 
                      ? 'text-black/40' 
                      : 'text-white/30'
                  }`}>
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                
                {/* Message content */}
                <div className="text-sm font-light leading-relaxed">
                  {message.type === 'audio' ? (
                    <div className="flex items-center space-x-3">
                      <span className="text-white/80">🎵</span>
                      <audio 
                        controls 
                        className="h-8 bg-white/10 rounded-lg border border-white/20"
                      >
                        <source src={message.audio} type="audio/mpeg" />
                      </audio>
                    </div>
                  ) : (
                    <span>{message.text}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={conversationEndRef} />
        </div>
      </div>

      {/* Minimal Status Bar */}
      <div className="px-6 py-4 border-t border-white/10">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className={`w-1 h-1 rounded-full ${isListening ? 'bg-white animate-pulse' : 'bg-white/30'}`}></div>
              <span className={`tracking-widest ${isListening ? 'text-white/80' : 'text-white/40'}`}>
                {isListening ? 'LISTENING' : 'STANDBY'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <span className="text-white/60 tracking-widest">ONLINE</span>
            </div>
          </div>
          <div className="text-white/30 tracking-widest">
            OLDVIS v2.1.0
          </div>
        </div>
      </div>
    </div>
  );
}
