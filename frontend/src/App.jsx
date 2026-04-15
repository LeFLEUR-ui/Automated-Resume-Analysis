import { Routes, Route } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoutes';
import Register from './pages/main_page/Register';
import Login from './pages/main_page/Login'
import LandingPage from './pages/main_page/LandingPage';
import AboutPage from './pages/main_page/AboutPage';
import CareersPage from './pages/main_page/CareersPage';

import HRDashboard from './pages/hr/HRDashboard';
import ScreeningPortal from './pages/hr/ScreeningPortal';
import JobManagement from './pages/hr/JobManagement';

import ApplyPage from './pages/candidate/ApplyPage';
import CandidateDashboard from './pages/candidate/CandidateDashboard';

import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <Routes>
      {/* Mariwasa Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/careerspage" element={<CareersPage />} />
      <Route path="/aboutpage" element={<AboutPage />} />

      {/* For Admin's */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      {/* For HR's */}
      <Route element={<ProtectedRoute allowedRole="HR" />}> 
        <Route path="/hr/dashboard" element={<HRDashboard />} />
        <Route path="/hr/screeningportal" element={<ScreeningPortal />} />
        <Route path="/hr/jobmanagement" element={<JobManagement />} />
      </Route>


      {/* For Candidates's */}
      <Route element={<ProtectedRoute allowedRole="CANDIDATE" />}> 
        <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
        <Route path="/candidate/applypage" element={<ApplyPage />} />
      </Route>
    </Routes>
  )
}

export default App;