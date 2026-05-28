import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// --- MAIN WRAPPERS & PUBLIC VIEWS ---
import { PublicLayout } from './components/PublicLayout';
import { HomeView } from './views/HomeView';
import { ProjectsView } from './views/ProjectsView';
import { ProcessView } from './views/ProcessView';
import { ContactView } from './views/ContactView';
import { CreateAccountView } from './views/CreateAccountView'; // <-- Imported New Sign Up View Module

// --- LIVE SECURE COMPONENT PORTS ---
import { AdminLogin } from './components/AdminLogin';
import { AdminLayout } from './components/AdminLayout';
import { DashboardOverview } from './components/DashboardOverview';
import { InventoryPanel } from './components/InventoryPanel';
import { ReportsPage } from './components/ReportsPage';

// --- SECURE ROUTE AUTHENTICATION ACCELERATOR ---
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Core Public Layout Wrapper */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomeView />} />
          <Route path="projects" element={<ProjectsView />} />
          <Route path="process" element={<ProcessView />} />
          <Route path="contact" element={<ContactView />} />
          <Route path="createaccount" element={<CreateAccountView />} /> {/* <-- Connected Sign Up Endpoint */}
        </Route>

        {/* Secure Management Suite */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<DashboardOverview />} />
          <Route path="inventory" element={<InventoryPanel />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>

        {/* Fallback Restorer */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;