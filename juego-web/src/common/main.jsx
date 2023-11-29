import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Routing from './Routing.jsx'
import Header from './header/Header'
import Footer from './footer/Footer'
import AuthProvider from '../auth/AuthProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Header />
      <Routing />
      <Footer />
    </AuthProvider>
  </React.StrictMode>,
)
