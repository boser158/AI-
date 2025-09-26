import React from 'react'
import Header from './Header'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{minHeight:'100vh', background:'#071125', color:'#e6eef8', fontFamily:'Inter,system-ui'}}>
      <div className="container">
        <Header />
        <main style={{marginTop: '1rem'}}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
