export interface Message {
  id: string;
  type: 'user' | 'ai' | 'system';
  text: string;
  timestamp: Date;
}

export interface SystemStatus {
  neuralCore: 'online' | 'processing' | 'error';
  voiceModule: 'online' | 'processing' | 'error';
  holographicDisplay: 'online' | 'processing' | 'error';
  quantumProcessing: 'online' | 'processing' | 'error';
}

export interface SystemMetrics {
  systemEfficiency: number;
  memoryUsage: number;
  processingPower: number;
}

export interface StatusIndicator {
  name: string;
  status: 'online' | 'processing' | 'error';
  icon: string;
  description: string;
}

export type ActivationState = 'inactive' | 'activating' | 'active' | 'deactivating'; 