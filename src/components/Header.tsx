import React from 'react'
import { useProviders } from '../context/providers'

const Header = () => {
  const { provider, setProvider } = useProviders()

  return (
    <header className="header">
      <div style={{display:'flex', gap:12, alignItems:'center'}}>
        <h1 style={{margin:0, fontSize:20}}>AI‑Generator</h1>
        <div className="small">Frontend improved</div>
      </div>
      <div style={{display:'flex', gap:8, alignItems:'center'}}>
        <label className="small" htmlFor="provider">Provider</label>
        <select
          id="provider"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          style={{padding:'6px', borderRadius:8, background:'transparent', color:'var(--text)', border:'1px solid rgba(255,255,255,0.06)'}}
        >
          <option value="openai">OpenAI</option>
          <option value="huggingface">HuggingFace</option>
          <option value="stability">Stability</option>
        </select>
      </div>
    </header>
  )
}

export default Header
