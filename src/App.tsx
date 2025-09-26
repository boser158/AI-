import React from 'react'
import Layout from './components/Layout'
import ImageGenerator from './components/ImageGenerator'
import { ProvidersProvider } from './context/providers'

const App = () => {
  return (
    <ProvidersProvider>
      <Layout>
        <ImageGenerator />
      </Layout>
    </ProvidersProvider>
  )
}

export default App
