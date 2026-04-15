import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import HRDashboard from './pages/hr/HRDashboard';
import ScreeningPortal from './pages/hr/ScreeningPortal';
import JobManagement from './pages/hr/JobManagement';

function App() {
  return (
    <Routes>
      {/* Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/hr/dashboard" element={<HRDashboard />} />
      <Route path="/hr/screeningportal" element={<ScreeningPortal />} />
      <Route path="/hr/jobmanagement" element={<JobManagement />} />
    </Routes>
  )
}

export default App