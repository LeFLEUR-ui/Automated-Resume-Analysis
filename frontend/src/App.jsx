import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import ProtectedRoute from './ProtectedRoutes';
import ScrollToTop from './components/layout/ScrollToTop';

import Login from './pages/publicPages/authenticationPages/Login';
import Register from './pages/publicPages/authenticationPages/Register';
import ForgotPassword from './pages/publicPages/authenticationPages/ForgotPassword';

import LandingPage from './pages/publicPages/site/LandingPage';
import AboutPage from './pages/publicPages/site/AboutPage';
import CareersPage from './pages/publicPages/site/CareersPage';

import SmartUploadPage from './pages/publicPages/jobApplicationPages/SmartUploadPage';
import ApplicationForm from './pages/publicPages/jobApplicationPages/ApplicationForm';
import ApplyForJobPage from './pages/publicPages/jobApplicationPages/ApplyForJobPage';
import PreviewAndVerifyPage from './pages/publicPages/jobApplicationPages/PreviewAndVerify';
import SubmissionSuccessPage from './pages/publicPages/jobApplicationPages/SubmissionSuccess';
import JobDetailsPage from './pages/publicPages/jobApplicationPages/JobDetailsPage';

import ApplicationTracking from './pages/candidate/ApplicationTracking';
import CandidateDashboard from './pages/candidate/CandidateDashboard';
import FindJob from './pages/candidate/FindJob';

import HRDashboard from './pages/hr/HRDashboard';
import JobManagement from './pages/hr/JobManagement';
import ScreeningPortal from './pages/hr/ScreeningPortal';

import AdminDashboard from './pages/admin/AdminDashboard';
import AuditLogPage from './pages/admin/AuditLog';
import UsersPage from './pages/admin/Users';

import AccountSettings from './pages/shared/AccountSettings';
import ViewProfile from './pages/shared/ViewProfile';

const App = () => {
  return (
    <HelmetProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/careerspage" element={<CareersPage />} />
        <Route path="/aboutpage" element={<AboutPage />} />

        <Route path="/smart-upload" element={<SmartUploadPage />} />
        <Route path="/apply/:jobId" element={<ApplyForJobPage />} />
        <Route path="/job-details/:jobId" element={<JobDetailsPage />} />
        <Route path="/preview-and-verify/:jobId" element={<PreviewAndVerifyPage />} />
        <Route path="/applicationform/:jobId" element={<ApplicationForm />} />
        <Route path="/submissionsuccess/:jobId" element={<SubmissionSuccessPage />} />

        <Route element={<ProtectedRoute allowedRole="ADMIN" />}>
          <Route path="/admin">
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="auditlog" element={<AuditLogPage />} />
            <Route path="settings" element={<AccountSettings />} />
            <Route path="profile" element={<ViewProfile />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRole="HR" />}>
          <Route path="/hr">
            <Route path="dashboard" element={<HRDashboard />} />
            <Route path="screeningportal" element={<ScreeningPortal />} />
            <Route path="jobmanagement" element={<JobManagement />} />
            <Route path="settings" element={<AccountSettings />} />
            <Route path="profile" element={<ViewProfile />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRole="CANDIDATE" />}>
          <Route path="/candidate">
            <Route path="dashboard" element={<CandidateDashboard />} />
            <Route path="findjobs" element={<FindJob />} />
            <Route path="applicationtracking" element={<ApplicationTracking />} />
            <Route path="settings" element={<AccountSettings />} />
            <Route path="profile" element={<ViewProfile />} />
          </Route>
        </Route>
      </Routes>
    </HelmetProvider>
  )
}

export default App;