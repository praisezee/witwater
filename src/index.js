import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { DashboardProvider } from './Components/context/Context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <DashboardProvider>
        <Routes>
          <Route path='/*' element={<App />}/>
        </Routes>
      </DashboardProvider>
    </Router>
  </React.StrictMode>,
)
