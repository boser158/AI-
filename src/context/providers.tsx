import React, { createContext, useContext, useState } from 'react'

type ProvidersContext = {
  provider: string
  setProvider: (p: string) => void
}

const ctx = createContext<ProvidersContext | null>(null)

export const ProvidersProvider = ({ children }: { children: React.ReactNode }) => {
  const [provider, setProvider] = useState('openai')
  return <ctx.Provider value={{ provider, setProvider }}>{children}</ctx.Provider>
}

export const useProviders = () => {
  const c = useContext(ctx)
  if (!c) throw new Error('useProviders must be used within ProvidersProvider')
  return c
}
