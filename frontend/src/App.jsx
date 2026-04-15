import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/main_page/Login'
import LandingPage from './pages/main_page/LandingPage';
import Register from './pages/main_page/Register';
import HRDashboard from './pages/hr/HRDashboard';
import ScreeningPortal from './pages/hr/ScreeningPortal';
import JobManagement from './pages/hr/JobManagement';
import ApplyPage from './pages/candidate/ApplyPage';
import CandidateDashboard from './pages/candidate/CandidateDashboard';

function App() {
  return (
    <Routes>
      {/* Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* For HR's */}
      <Route path="/hr/dashboard" element={<HRDashboard />} />
      <Route path="/hr/screeningportal" element={<ScreeningPortal />} />
      <Route path="/hr/jobmanagement" element={<JobManagement />} />

      {/* For Candidates's */}
      <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
      <Route path="/candidate/applypage" element={<ApplyPage />} />
    </Routes>
  )
}

export default App