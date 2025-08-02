'use client';

import { useState, useEffect, useRef } from 'react';
import { Message, SystemStatus, SystemMetrics, ActivationState } from '@/types';

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      text: 'JARVIS + TARS HOLOGRAPHIC INTERFACE INITIALIZED',
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'system',
      text: 'NEURAL NETWORK: ONLINE',
      timestamp: new Date()
    },
    {
      id: '3',
      type: 'system',
      text: 'QUANTUM PROCESSING: ENABLED',
      timestamp: new Date()
    },
    {
      id: '4',
      type: 'system',
      text: 'VOICE RECOGNITION MODULE: STANDBY',
      timestamp: new Date()
    },
    {
      id: '5',
      type: 'system',
      text: 'READY FOR VOICE INPUT',
      timestamp: new Date()
    }
  ]);
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    neuralCore: 'online',
    voiceModule: 'online',
    holographicDisplay: 'online',
    quantumProcessing: 'online'
  });
  const [metrics, setMetrics] = useState<SystemMetrics>({
    systemEfficiency: 99.7,
    memoryUsage: 67.3,
    processingPower: 84.1
  });
  const [activationState, setActivationState] = useState<ActivationState>('inactive');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate system messages
  useEffect(() => {
    const systemMessages = [
      'Neural pathways optimized for maximum efficiency',
      'Quantum entanglement protocols stable',
      'Holographic matrix recalibrated',
      'System performance at 99.7% efficiency',
      'Background processes completed',
      'Security protocols updated',
      'Memory allocation optimized',
      'Processing queues cleared',
      'Network latency minimized',
      'AI response time: 0.003ms'
    ];

    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance every 5 seconds
        const randomMessage = systemMessages[Math.floor(Math.random() * systemMessages.length)];
        const newMessage: Message = {
          id: Date.now().toString(),
          type: 'system',
          text: randomMessage,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, newMessage]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Simulate AI responses when activated
  useEffect(() => {
    if (activationState === 'active') {
      const aiMessages = [
        'Processing voice input...',
        'Analyzing speech patterns...',
        'Generating response matrix...',
        'Quantum calculations complete',
        'Response ready for output'
      ];

      let messageIndex = 0;
      const interval = setInterval(() => {
        if (messageIndex < aiMessages.length) {
          const newMessage: Message = {
            id: Date.now().toString(),
            type: 'ai',
            text: aiMessages[messageIndex],
            timestamp: new Date()
          };
          setMessages(prev => [...prev, newMessage]);
          messageIndex++;
        } else {
          clearInterval(interval);
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [activationState]);

  const handleActivation = () => {
    if (activationState === 'inactive') {
      setActivationState('activating');
      setTimeout(() => {
        setActivationState('active');
        // Add user message
        const userMessage: Message = {
          id: Date.now().toString(),
          type: 'user',
          text: 'Activate voice recognition',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
      }, 1000);
    } else if (activationState === 'active') {
      setActivationState('deactivating');
      setTimeout(() => {
        setActivationState('inactive');
        // Add system message
        const systemMessage: Message = {
          id: Date.now().toString(),
          type: 'system',
          text: 'Voice recognition deactivated',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, systemMessage]);
      }, 1000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      {/* Header */}
      <header className="mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl lg:text-4xl font-bold gradient-text">
                JARVIS + TARS
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-emerald-400 text-sm font-medium">ONLINE</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-2xl font-mono text-cyan-400">
                  {formatTime(currentTime)}
                </div>
                <div className="text-sm text-gray-400">
                  {formatDate(currentTime)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Left Panel - Status Feed */}
          <div className="lg:col-span-2">
            <div className="glass corner-accent rounded-lg p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-cyan-400">LIVE STATUS FEED</h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-400">LIVE</span>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`message-enter p-3 rounded-lg border ${
                      message.type === 'user'
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : message.type === 'ai'
                        ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                        : 'bg-gray-500/10 border-gray-500/30 text-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-xs font-medium uppercase tracking-wider">
                        {message.type === 'user' ? 'USER' : message.type === 'ai' ? 'AI' : 'SYSTEM'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>

          {/* Right Panel - Control Center */}
          <div className="lg:col-span-1">
            <div className="glass corner-accent rounded-lg p-6 h-full flex flex-col">
              <h2 className="text-xl font-semibold text-cyan-400 mb-6">CONTROL CENTER</h2>
              
              {/* Activation Button */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  {/* Outer Ring */}
                  <div className={`absolute inset-0 rounded-full border-2 border-dashed border-cyan-500 ${
                    activationState === 'active' ? 'animate-spin-slow' : ''
                  }`}></div>
                  
                  {/* Inner Ring */}
                  <div className={`absolute inset-2 rounded-full border-2 border-solid border-cyan-400 ${
                    activationState === 'active' ? 'animate-reverse-spin' : ''
                  }`}></div>
                  
                  {/* Main Button */}
                  <button
                    onClick={handleActivation}
                    disabled={activationState === 'activating' || activationState === 'deactivating'}
                    className={`relative w-40 h-40 rounded-full flex flex-col items-center justify-center text-white font-bold text-lg transition-all duration-300 button-hover ${
                      activationState === 'active'
                        ? 'bg-emerald-600 shadow-lg shadow-emerald-500/50'
                        : 'bg-cyan-600 shadow-lg shadow-cyan-500/50'
                    }`}
                  >
                    <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    {activationState === 'inactive' && 'ACTIVATE'}
                    {activationState === 'activating' && 'INITIALIZING...'}
                    {activationState === 'active' && 'ACTIVE'}
                    {activationState === 'deactivating' && 'SHUTTING DOWN...'}
                  </button>
                </div>
              </div>

              {/* Status Matrix */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="glass rounded-lg p-3 text-center">
                  <div className="w-8 h-8 mx-auto mb-2 text-cyan-400">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-xs text-gray-400 mb-1">NEURAL CORE</div>
                  <div className="flex items-center justify-center gap-1">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs status-online">ONLINE</span>
                  </div>
                </div>

                <div className="glass rounded-lg p-3 text-center">
                  <div className="w-8 h-8 mx-auto mb-2 text-cyan-400">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-xs text-gray-400 mb-1">VOICE MODULE</div>
                  <div className="flex items-center justify-center gap-1">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs status-online">ONLINE</span>
                  </div>
                </div>

                <div className="glass rounded-lg p-3 text-center">
                  <div className="w-8 h-8 mx-auto mb-2 text-cyan-400">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-xs text-gray-400 mb-1">HOLOGRAPHIC DISPLAY</div>
                  <div className="flex items-center justify-center gap-1">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs status-online">ONLINE</span>
                  </div>
                </div>

                <div className="glass rounded-lg p-3 text-center">
                  <div className="w-8 h-8 mx-auto mb-2 text-cyan-400">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-xs text-gray-400 mb-1">QUANTUM PROCESSING</div>
                  <div className="flex items-center justify-center gap-1">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs status-online">ONLINE</span>
                  </div>
                </div>
              </div>

              {/* Advanced Metrics */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">SYSTEM EFFICIENCY</span>
                    <span className="text-emerald-400">{metrics.systemEfficiency}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="progress-bar h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${metrics.systemEfficiency}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">MEMORY USAGE</span>
                    <span className="text-cyan-400">{metrics.memoryUsage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="progress-bar h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${metrics.memoryUsage}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">PROCESSING POWER</span>
                    <span className="text-blue-400">{metrics.processingPower}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="progress-bar h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${metrics.processingPower}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-lg p-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-6">
                <span>JARVIS + TARS v2.1.0</span>
                <span>Quantum Core v1.4.2</span>
                <span>Neural Network v3.7.1</span>
              </div>
              <div className="flex items-center gap-4">
                <span>Build: 2024.01.15</span>
                <span>Status: OPERATIONAL</span>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 