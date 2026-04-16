import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import ProtectedRoute from './ProtectedRoutes';

import Login from './pages/publicPages/authenticationPages/Login';
import Register from './pages/publicPages/authenticationPages/Register';

import LandingPage from './pages/publicPages/LandingPage';
import AboutPage from './pages/publicPages/AboutPage';
import CareersPage from './pages/publicPages/site/CareersPage';

import ApplicationForm from './pages/publicPages/jobApplicationPages/ApplicationForm';
import ApplyForJobPage from './pages/publicPages/jobApplicationPages/ApplyForJobPage';
import PreviewAndVerifyPage from './pages/publicPages/jobApplicationPages/PreviewAndVerify';
import SubmissionSuccessPage from './pages/publicPages/jobApplicationPages/SubmissionSuccess';

import ApplicationTracking from './pages/candidate/ApplicationTracking';
import CandidateDashboard from './pages/candidate/CandidateDashboard';
import FindJob from './pages/candidate/FindJob';

import HRDashboard from './pages/hr/HRDashboard';
import JobManagement from './pages/hr/JobManagement';
import ScreeningPortal from './pages/hr/ScreeningPortal';

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
        <Route path="/apply/:jobId" element={<ApplyForJobPage />} />
        <Route path="/preview-and-verify" element={<PreviewAndVerifyPage />} />
        <Route path="/applicationform" element={<ApplicationForm />} />
        <Route path="/submissionsuccess" element={<SubmissionSuccessPage />} />

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
          </Route>
        </Route>
      </Routes>
    </HelmetProvider>
  )
}

export default App;