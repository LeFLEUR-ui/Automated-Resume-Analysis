import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import ProtectedRoute from './ProtectedRoutes';
import Register from './pages/publicPages/Register';
import Login from './pages/publicPages/Login';
import LandingPage from './pages/publicPages/LandingPage';
import AboutPage from './pages/publicPages/AboutPage';
import CareersPage from './pages/publicPages/CareersPage';

import HRDashboard from './pages/hr/HRDashboard';
import ScreeningPortal from './pages/hr/ScreeningPortal';
import JobManagement from './pages/hr/JobManagement';

import ApplyPage from './pages/candidate/ApplyPage';
import CandidateDashboard from './pages/candidate/CandidateDashboard';
import ApplicationTracking from './pages/candidate/ApplicationTracking';
import FindJob from './pages/candidate/FindJob';

import AdminDashboard from './pages/admin/AdminDashboard';
import AuditLogPage from './pages/admin/AuditLog';
import UsersPage from './pages/admin/Users';

const App = () => {
  return (
    <HelmetProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/careerspage" element={<CareersPage />} />
        <Route path="/aboutpage" element={<AboutPage />} />

        <Route element={<ProtectedRoute allowedRole="ADMIN" />}>
          <Route path="/admin">
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="auditlog" element={<AuditLogPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRole="HR" />}> 
          <Route path="/hr">
            <Route path="dashboard" element={<HRDashboard />} />
            <Route path="screeningportal" element={<ScreeningPortal />} />
            <Route path="jobmanagement" element={<JobManagement />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRole="CANDIDATE" />}> 
          <Route path="/candidate">
            <Route path="dashboard" element={<CandidateDashboard />} />
            <Route path="findjobs" element={<FindJob />} />
            <Route path="applicationtracking" element={<ApplicationTracking />} />
            <Route path="applypage" element={<ApplyPage />} />
          </Route>
        </Route>
      </Routes>
    </HelmetProvider>
  )
}

export default App;