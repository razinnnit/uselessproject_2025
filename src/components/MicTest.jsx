import { useEffect } from 'react';

export default function MicTest() {
  useEffect(() => {
    console.log('SpeechRecognition supported:', !!(window.SpeechRecognition || window.webkitSpeechRecognition));

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => console.log('✅ Mic access granted'))
      .catch((err) => console.error('❌ Mic access denied or error:', err));
  }, []);

  return (
    <div className="p-4 bg-gray-700 rounded text-white">
      <p className="text-lg">🎤 Testing microphone permission...</p>
    </div>
  );
}
