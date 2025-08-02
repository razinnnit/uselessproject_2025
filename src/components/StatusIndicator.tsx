import React from 'react';

interface StatusIndicatorProps {
  name: string;
  status: 'online' | 'processing' | 'error';
  icon: React.ReactNode;
  description?: string;
}

export default function StatusIndicator({ name, status, icon, description }: StatusIndicatorProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return 'text-emerald-500';
      case 'processing':
        return 'text-cyan-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'online':
        return 'ONLINE';
      case 'processing':
        return 'PROCESSING';
      case 'error':
        return 'ERROR';
      default:
        return 'UNKNOWN';
    }
  };

  return (
    <div className="glass rounded-lg p-3 text-center">
      <div className={`w-8 h-8 mx-auto mb-2 ${getStatusColor()}`}>
        {icon}
      </div>
      <div className="text-xs text-gray-400 mb-1">{name}</div>
      {description && (
        <div className="text-xs text-gray-500 mb-1">{description}</div>
      )}
      <div className="flex items-center justify-center gap-1">
        <div className={`w-2 h-2 bg-current rounded-full animate-pulse ${getStatusColor()}`}></div>
        <span className={`text-xs ${getStatusColor()}`}>{getStatusText()}</span>
      </div>
    </div>
  );
} 