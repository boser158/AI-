import React, { useState } from 'react'
import { generateImage } from '../lib/api'
import { useProviders } from '../context/providers'

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [imgUrl, setImgUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { provider } = useProviders()

  const onGenerate = async () => {
    setError(null)
    setImgUrl(null)
    if (!prompt.trim()) {
      setError('Prompt is empty')
      return
    }
    setLoading(true)
    try {
      const result = await generateImage(prompt, provider)
      setImgUrl(result)
    } catch (e: any) {
      console.error(e)
      setError(e?.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <div style={{display:'flex', gap:12, alignItems:'center', marginBottom:8}}>
        <input
          className="input"
          placeholder="Describe the image..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button className="button" onClick={onGenerate} disabled={loading}>
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>
      {error && <div style={{color:'#ffb4b4', marginTop:8}}>{error}</div>}
      <div className="small" style={{marginTop:8}}>Provider: {provider}</div>
      <div className="preview">
        {imgUrl && (
          <div style={{width:'100%'}}>
            <img src={imgUrl} alt="generated" />
            <div style={{display:'flex', gap:8, marginTop:8}}>
              <a className="button" href={imgUrl} download="generated.png">Download</a>
              <button className="button" onClick={() => { navigator.clipboard.writeText(imgUrl) }}>Copy URL</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageGenerator
