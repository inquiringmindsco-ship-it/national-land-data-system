'use client';

import { useEffect, useState } from 'react';

export function AccessGate({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null); // null = checking

  useEffect(() => {
    const check = () => {
      const stored = localStorage.getItem('nlds_session_id');
      setUnlocked(!!stored);
    };
    check();
    window.addEventListener('storage', check);
    return () => window.removeEventListener('storage', check);
  }, []);

  if (unlocked === null) return null; // or a spinner
  if (!unlocked) return <>{fallback}</>;
  return <>{children}</>;
}
