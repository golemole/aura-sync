import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SyncContextType {
  isSynced: boolean;
  isSyncing: boolean;
  triggerSync: () => void;
}

const SyncContext = createContext<SyncContextType | undefined>(undefined);

export const SyncProvider = ({ children }: { children: ReactNode }) => {
  const [isSynced, setIsSynced] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const triggerSync = () => {
    if (isSyncing || isSynced) return;
    setIsSyncing(true);
  };

  useEffect(() => {
    if (isSyncing) {
      const timer = setTimeout(() => {
        setIsSyncing(false);
        setIsSynced(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSyncing]);

  return (
    <SyncContext.Provider value={{ isSynced, isSyncing, triggerSync }}>
      {children}
    </SyncContext.Provider>
  );
};

export const useSync = () => {
  const context = useContext(SyncContext);
  if (!context) {
    throw new Error('useSync must be used within a SyncProvider');
  }
  return context;
};
