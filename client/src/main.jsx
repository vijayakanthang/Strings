import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContextProvider from './components/Auth/AuthContext.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import './stylesheet/toastify-custom.css'




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    <ToastContainer
  autoClose={1500} 
/>

  </React.StrictMode>,
)



