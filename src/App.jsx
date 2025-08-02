import { useState } from 'react';
import CaptionBox from './components/CaptionBox';

export default function App() {
  const [isListening, setIsListening] = useState(false);

  const handleSpeakButtonClick = () => {
    setIsListening(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono relative overflow-hidden">
      {/* Nothing Phone Style Background */}
      <div className="absolute inset-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}></div>
        
        {/* Minimal floating dots */}
        <div className="absolute top-1/4 left-1/4 w-0.5 h-0.5 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-0.5 h-0.5 bg-white/10 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-0.5 h-0.5 bg-white/10 rounded-full animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 h-screen">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <h1 className="text-2xl font-light tracking-widest">OLDVIS</h1>
              <div className="text-xs text-white/40 tracking-widest">VOICE INTERFACE</div>
            </div>
            <div className="text-sm text-white/60 font-light">
              {new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
              })}
            </div>
          </div>
        </div>

        {/* Main Content Grid - Reversed Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-120px)]">
          {/* Left Panel - Chat Interface (Now takes 2/3 space) */}
          <div className="lg:col-span-2">
            <div className="h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-white animate-pulse' : 'bg-white/30'}`}></div>
                    <span className="text-sm font-light tracking-wider">CONVERSATION</span>
                  </div>
                  <div className="text-xs text-white/40">
                    {isListening ? 'LISTENING' : 'STANDBY'}
                  </div>
                </div>
              </div>
              
              {/* Chat Content */}
              <div className="h-full">
                <CaptionBox isListening={isListening} setIsListening={setIsListening} />
              </div>
            </div>
          </div>

          {/* Right Panel - Control Interface (Now takes 1/3 space) */}
          <div className="lg:col-span-1">
            <div className="h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col">
              {/* Nothing Phone Style Title */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-light tracking-widest mb-2">AI CORE</h2>
                <div className="w-16 h-px bg-white/20 mx-auto mb-4"></div>
                <p className="text-xs text-white/40 tracking-widest">NEURAL NETWORK</p>
              </div>

              {/* Minimalist Activation Button - Now more prominent */}
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <button 
                    onClick={handleSpeakButtonClick}
                    className={`relative w-52 h-52 rounded-full transition-all duration-300 ease-in-out group ${
                      isListening 
                        ? 'bg-white text-black shadow-lg shadow-white/20' 
                        : 'bg-white/10 text-white border border-white/20 hover:bg-white hover:text-black hover:scale-110'
                    }`}
                  >
                    {/* Animated Ring */}
                    <div className={`absolute inset-0 rounded-full border border-white/20 ${
                      isListening ? 'animate-ping opacity-20' : ''
                    }`}></div>

                    {/* Inner content */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full">
                      <div className={`w-14 h-14 mb-4 ${
                        isListening ? 'bg-black' : 'bg-white'
                      } rounded-full transition-all duration-300`}></div>
                      <span className="text-base font-light tracking-widest">
                        {isListening ? 'STOP' : 'START'}
                      </span>
                    </div>
                  </button>

                  
                  <p className="text-xs text-white/40 mt-6 tracking-widest">
                    {isListening ? 'VOICE RECOGNITION ACTIVE' : 'TAP TO BEGIN'}
                  </p>
                </div>
              </div>

              {/* Minimal Status Indicators */}
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/60 tracking-widest">NEURAL CORE</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <span className="text-xs text-white/80 tracking-widest">ONLINE</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/60 tracking-widest">VOICE MODULE</span>
                    <div className="flex items-center space-x-2">
                      <div className={`w-1 h-1 rounded-full ${isListening ? 'bg-white animate-pulse' : 'bg-white/30'}`}></div>
                      <span className={`text-xs tracking-widest ${isListening ? 'text-white/80' : 'text-white/40'}`}>
                        {isListening ? 'ACTIVE' : 'STANDBY'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/60 tracking-widest">PROCESSING</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <span className="text-xs text-white/80 tracking-widest">READY</span>
                    </div>
                  </div>
                </div>

                {/* Minimal divider */}
                <div className="h-px bg-white/10"></div>

                {/* Simple metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-light">99.9%</div>
                    <div className="text-xs text-white/40 tracking-widest">EFFICIENCY</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-light">∞</div>
                    <div className="text-xs text-white/40 tracking-widest">POSSIBILITIES</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Footer */}
        <div className="mt-8 text-center">
          <div className="text-xs text-white/30 tracking-widest">
            OLDVIS v2.1.0 • QUANTUM PROCESSING ENABLED
          </div>
        </div>
      </div>
    </div>
  );
}
