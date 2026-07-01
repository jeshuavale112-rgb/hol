import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Songs from './pages/Songs'
import Services from './pages/Services'
import Bible from './pages/Bible'
import Settings from './pages/Settings'
import Projection from './pages/Projection'
import './App.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/projection" element={<Projection />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/bible" element={<Bible />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </>
  )
}

export default App
