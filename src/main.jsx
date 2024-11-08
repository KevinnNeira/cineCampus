import React from 'react'
import ReactDom from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './styles/css/Home.css'
import './styles/css/LogIn.css'
import './styles/css/SignUp.css'
import './styles/css/HomeApp.css'
import './styles/css/Cinema.css'
import './styles/css/SeatChoose.css'
import './styles/css/OrderSummary.css'

ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
  </React.StrictMode>
)
