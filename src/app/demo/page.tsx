'use client';

import StatusIndicator from '@/components/StatusIndicator';

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            JARVIS + TARS Component Demo
          </h1>
          <p className="text-gray-400">
            Demonstrating the modular components and design system
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatusIndicator
            name="NEURAL CORE"
            status="online"
            icon={
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            }
            description="CPU Processing"
          />

          <StatusIndicator
            name="VOICE MODULE"
            status="processing"
            icon={
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
              </svg>
            }
            description="Speech Recognition"
          />

          <StatusIndicator
            name="HOLOGRAPHIC DISPLAY"
            status="online"
            icon={
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            }
            description="Visual Interface"
          />

          <StatusIndicator
            name="QUANTUM PROCESSING"
            status="error"
            icon={
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            }
            description="Advanced Computing"
          />
        </div>

        <div className="mt-8 glass corner-accent rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">
            Component Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-emerald-400 mb-2">
                Status Types
              </h3>
              <ul className="text-gray-300 space-y-1">
                <li>• <span className="text-emerald-400">Online</span> - System operational</li>
                <li>• <span className="text-cyan-400">Processing</span> - Active computation</li>
                <li>• <span className="text-red-400">Error</span> - System malfunction</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-emerald-400 mb-2">
                Visual Elements
              </h3>
              <ul className="text-gray-300 space-y-1">
                <li>• Glass morphism panels</li>
                <li>• Pulsing status indicators</li>
                <li>• Color-coded status states</li>
                <li>• Corner accent borders</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            ← Back to Main Interface
          </a>
        </div>
      </div>
    </div>
  );
} 