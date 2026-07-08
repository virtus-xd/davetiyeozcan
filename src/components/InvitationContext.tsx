'use client';

import { createContext, useContext } from 'react';
import type { InvitationData } from './types';

const InvitationContext = createContext<InvitationData | null>(null);

export function InvitationProvider({
  data,
  children,
}: {
  data: InvitationData;
  children: React.ReactNode;
}) {
  return (
    <InvitationContext.Provider value={data}>
      {children}
    </InvitationContext.Provider>
  );
}

export function useInvitationData(): InvitationData {
  const ctx = useContext(InvitationContext);
  if (!ctx) throw new Error('useInvitationData must be used within InvitationProvider');
  return ctx;
}
