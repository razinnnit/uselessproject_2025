"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, MicOff, Volume2, AlertCircle } from "lucide-react"
import { useSpeechRecognition, useSpeechProcessing } from "@/hooks/useSpeechRecognition"

interface Message {
  id: number
  type: "user" | "ai" | "system"
  content: string
  timestamp: Date
  audio?: string | null
}

export default function OldvisInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "system",
      content: "OLDVIS AI INTERFACE INITIALIZED",
      timestamp: new Date(Date.now() - 5000),
    },
    {
      id: 2,
      type: "system",
      content: "VOICE RECOGNITION MODULE: ONLINE",
      timestamp: new Date(Date.now() - 4000),
    },
    {
      id: 3,
      type: "system",
      content: "MISHEARING LOGIC: ENABLED",
      timestamp: new Date(Date.now() - 3000),
    },
    {
      id: 4,
      type: "ai",
      content: "Hello! I'm OLDVIS, your AI assistant. I'm ready to completely misunderstand everything you say!",
      timestamp: new Date(Date.now() - 2000),
    },
    {
      id: 5,
      type: "system",
      content: "READY FOR VOICE INPUT - Click SPEAK to start",
      timestamp: new Date(Date.now() - 1000),
    },
  ])

  const [isHovering, setIsHovering] = useState(false)
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Speech recognition hooks
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    error
  } = useSpeechRecognition()

  const {
    isProcessing,
    processSpeech
  } = useSpeechProcessing()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Handle speech recognition results
  useEffect(() => {
    if (transcript && !isProcessing) {
      // Add user message
      const userMessage: Message = {
        id: Date.now(),
        type: "user",
        content: transcript,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, userMessage])

      // Process with mishearing logic
      processSpeech(transcript).then((response) => {
        if (response) {
          const aiMessage: Message = {
            id: Date.now() + 1,
            type: "ai",
            content: response.text,
            timestamp: new Date(),
            audio: response.audio
          }
          setMessages(prev => [...prev, aiMessage])

          // Play audio if available
          if (response.audio) {
            const audio = new Audio(response.audio)
            setCurrentAudio(audio)
            audio.play().catch(err => console.log('Audio play failed:', err))
          }
        }
      })

      resetTranscript()
    }
  }, [transcript, isProcessing, processSpeech, resetTranscript])

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause()
        currentAudio.currentTime = 0
      }
    }
  }, [currentAudio])

  const handleSpeakClick = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8 h-screen">
        <div className="grid lg:grid-cols-2 gap-8 h-full">
          {/* Left Side - Chat Window */}
          <div className="flex flex-col h-full">
            <div className="relative flex-1">
              {/* Glass morphism effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-30" />

              <div className="relative h-full bg-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-2xl overflow-hidden">
                {/* Chat Header */}
                <div className="border-b border-slate-700/50 p-4 bg-slate-800/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full animate-pulse ${isListening ? 'bg-red-400' : 'bg-green-400'}`} />
                      <h2 className="text-lg font-semibold text-slate-200">Live Conversation</h2>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-400">
                      <Volume2 className="w-4 h-4" />
                      <span>{isListening ? 'Listening...' : 'Ready'}</span>
                    </div>
                  </div>
                </div>

                {/* Error Display */}
                {error && (
                  <div className="bg-red-500/20 border border-red-500/30 p-3 m-4 rounded-lg">
                    <div className="flex items-center space-x-2 text-red-400">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{error}</span>
                    </div>
                  </div>
                )}

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(100%-120px)] scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 transition-all duration-300 hover:scale-[1.02] ${
                          message.type === "user"
                            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25"
                            : message.type === "ai"
                            ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-500/25"
                            : "bg-gradient-to-r from-slate-700 to-slate-800 text-slate-100 shadow-lg shadow-slate-500/25"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <span className="text-xs font-medium opacity-70 uppercase tracking-wider">
                            {message.type === "user" ? "You" : message.type === "ai" ? "OLDVIS" : "SYSTEM"}
                          </span>
                          <span className="text-xs opacity-50 ml-3">{formatTime(message.timestamp)}</span>
                        </div>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        {message.audio && (
                          <div className="mt-2 flex items-center space-x-2">
                            <Volume2 className="w-3 h-3 opacity-60" />
                            <span className="text-xs opacity-60">Audio Response Available</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - OLDVIS Title and Speak Button */}
          <div className="flex flex-col items-center justify-center space-y-12">
            {/* OLDVIS Title */}
            <div className="text-center">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-red-500/30 to-orange-500/30 rounded-lg blur-xl opacity-50" />
                <h1 className="relative text-8xl lg:text-9xl font-black bg-gradient-to-r from-red-400 via-red-500 to-orange-500 bg-clip-text text-transparent tracking-wider">
                  OLDVIS
                </h1>
              </div>
              <div className="mt-4 text-slate-400 text-lg font-light tracking-widest">VOICE INTERFACE SYSTEM</div>
              <div className="mt-2 text-slate-500 text-sm">Powered by Mishearing AI</div>
            </div>

            {/* Speak Button */}
            <div className="relative">
              {/* Outer glow rings */}
              <div
                className={`absolute -inset-8 rounded-full transition-all duration-500 ${
                  isListening ? "bg-red-500/20 animate-pulse" : isHovering ? "bg-red-500/10" : "bg-transparent"
                }`}
              />
              <div
                className={`absolute -inset-4 rounded-full border-2 transition-all duration-300 ${
                  isListening ? "border-red-400 animate-spin" : isHovering ? "border-red-500/50" : "border-transparent"
                }`}
              />

              {/* Main Button */}
              <button
                onClick={handleSpeakClick}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                disabled={isProcessing}
                className={`relative w-48 h-48 rounded-full border-4 transition-all duration-300 transform ${
                  isListening
                    ? "bg-gradient-to-br from-red-500 to-red-600 border-red-400 scale-110 shadow-2xl shadow-red-500/50"
                    : isHovering
                      ? "bg-gradient-to-br from-red-600 to-red-700 border-red-500 scale-105 shadow-xl shadow-red-500/30"
                      : "bg-gradient-to-br from-red-700 to-red-800 border-red-600 hover:shadow-lg shadow-red-500/20"
                } active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  {isProcessing ? (
                    <div className="w-12 h-12 mb-3 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  ) : isListening ? (
                    <MicOff className="w-12 h-12 mb-3 text-white animate-pulse" />
                  ) : (
                    <Mic className="w-12 h-12 mb-3 text-white" />
                  )}
                  <span className="text-white text-xl font-bold tracking-wider">
                    {isProcessing ? "PROCESSING..." : isListening ? "LISTENING..." : "SPEAK"}
                  </span>
                </div>

                {/* Inner pulse effect */}
                {isListening && <div className="absolute inset-4 rounded-full bg-red-400/30 animate-ping" />}
              </button>

              {/* Status indicator */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <div
                  className={`flex items-center space-x-2 text-sm ${isListening ? "text-red-400" : isProcessing ? "text-yellow-400" : "text-slate-500"}`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${isListening ? "bg-red-400 animate-pulse" : isProcessing ? "bg-yellow-400 animate-pulse" : "bg-slate-500"}`}
                  />
                  <span className="font-medium">
                    {isProcessing ? "Processing..." : isListening ? "Voice Active" : "Ready to Listen"}
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="text-center text-slate-400 text-sm max-w-md">
              <p className="leading-relaxed">
                Click the <span className="text-red-400 font-medium">SPEAK</span> button to activate voice input. OLDVIS
                will process your commands and respond with humorous misunderstandings.
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Try saying: "play music", "set alarm", "open camera", "check weather"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 