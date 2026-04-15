import { Routes, Route } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoutes';
import Register from './pages/main_page/Register';
import Login from './pages/main_page/Login';
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
      <Route element={<ProtectedRoute allowedRole="ADMIN" />}>
        <Route path="/admin">
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
      </Route>

      {/* For HR's */}
      <Route element={<ProtectedRoute allowedRole="HR" />}> 
        <Route path="/hr">
          <Route path="dashboard" element={<HRDashboard />} />
          <Route path="screeningportal" element={<ScreeningPortal />} />
          <Route path="jobmanagement" element={<JobManagement />} />
        </Route>
      </Route>

      {/* For Candidates's */}
      <Route element={<ProtectedRoute allowedRole="CANDIDATE" />}> 
        <Route path="/candidate">
          <Route path="dashboard" element={<CandidateDashboard />} />
          <Route path="applypage" element={<ApplyPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App;