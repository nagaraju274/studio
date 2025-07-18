"use client";

import { createContext, useState, ReactNode, useContext, useMemo } from 'react';
import type { AnalysisRecord } from '@/types';

interface AnalysisContextType {
  history: AnalysisRecord[];
  addAnalysis: (record: Omit<AnalysisRecord, 'id' | 'timestamp'>) => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<AnalysisRecord[]>([]);

  const addAnalysis = (record: Omit<AnalysisRecord, 'id' | 'timestamp'>) => {
    const newRecord: AnalysisRecord = {
      ...record,
      id: new Date().toISOString() + Math.random(),
      timestamp: new Date(),
    };
    setHistory(prev => [newRecord, ...prev]);
  };

  const contextValue = useMemo(() => ({ history, addAnalysis }), [history]);

  return (
    <AnalysisContext.Provider value={contextValue}>
      {children}
    </AnalysisContext.Provider>
  );
}

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
};
