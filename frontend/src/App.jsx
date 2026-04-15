import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      {/* Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App