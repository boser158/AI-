/**
 * Unified API wrapper.
 * - This file contains basic implementations / stubs for several providers.
 * - In production you MUST proxy requests through your backend to keep API keys secret.
 *
 * Usage:
 *   import { generateImage } from './lib/api'
 *   const url = await generateImage('a red fox running', 'openai')
 */

const HF_URL = import.meta.env.VITE_HF_URL || 'https://api-inference.huggingface.co/models/placeholder'
const HF_KEY = import.meta.env.VITE_HF_KEY || ''

const OPENAI_URL = import.meta.env.VITE_OPENAI_URL || 'https://api.openai.com/v1/images/generations'
const OPENAI_KEY = import.meta.env.VITE_OPENAI_KEY || ''

const STABILITY_URL = import.meta.env.VITE_STABILITY_URL || 'https://api.stability.ai/v1/generation'
const STABILITY_KEY = import.meta.env.VITE_STABILITY_KEY || ''

export async function generateImage(prompt: string, provider: string): Promise<string> {
  switch (provider) {
    case 'openai':
      return generateWithOpenAI(prompt)
    case 'huggingface':
      return generateWithHF(prompt)
    case 'stability':
      return generateWithStability(prompt)
    default:
      throw new Error('Unknown provider')
  }
}

async function generateWithOpenAI(prompt: string): Promise<string> {
  // Example: this is a minimal implementation.
  // Most OpenAI image endpoints return base64 or URLs depending on model and plan.
  if (!OPENAI_KEY) throw new Error('OPENAI key not set in env')
  const res = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      'Authorization': `Bearer ${OPENAI_KEY}`
    },
    body: JSON.stringify({ prompt, n:1, size:'512x512' })
  })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error('OpenAI error: ' + txt)
  }
  const data = await res.json()
  // This expects data.data[0].url or base64; adapt as needed
  if (data?.data?.[0]?.url) return data.data[0].url
  if (data?.data?.[0]?.b64_json) return 'data:image/png;base64,' + data.data[0].b64_json
  throw new Error('Unexpected OpenAI response shape')
}

async function generateWithHF(prompt: string): Promise<string> {
  if (!HF_KEY) throw new Error('HuggingFace key not set in env')
  const res = await fetch(HF_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HF_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ inputs: prompt })
  })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error('HuggingFace error: ' + txt)
  }
  const contentType = res.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    const data = await res.json()
    // some HF endpoints return base64 in data[0].generated_image
    if (data?.[0]?.generated_image) return 'data:image/png;base64,' + data[0].generated_image
    // or a URL provided by the API
    if (data?.url) return data.url
    throw new Error('Unexpected HF response shape')
  } else {
    // treat as blob image
    const blob = await res.blob()
    return URL.createObjectURL(blob)
  }
}

async function generateWithStability(prompt: string): Promise<string> {
  if (!STABILITY_KEY) throw new Error('Stability key not set in env')
  const res = await fetch(STABILITY_URL, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json',
      'Authorization': `Bearer ${STABILITY_KEY}`
    },
    body: JSON.stringify({
      text_prompts: [{ text: prompt }],
      cfg_scale: 7,
      width: 512,
      height: 512
    })
  })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error('Stability error: ' + txt)
  }
  const data = await res.json()
  // Example shape: data.artifacts[0].base64
  if (data?.artifacts?.[0]?.base64) return 'data:image/png;base64,' + data.artifacts[0].base64
  throw new Error('Unexpected Stability response shape')
}
