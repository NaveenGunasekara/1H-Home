import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// --- MAIN PUBLIC LAYOUT WRAPPERS & VIEWS ---
import { PublicLayout } from './components/PublicLayout';
import { HomeView } from './views/HomeView';
import { ProjectsView } from './views/ProjectsView';
import { ProcessView } from './views/ProcessView';
import { ContactView } from './views/ContactView';
import { CreateAccountView } from './views/CreateAccountView'; 

// --- LIVE MANAGEMENT SUITE LAYOUT & UTILITY COMPONENTS (STRICT NAMED IMPORTS) ---
import { AdminLogin } from './components/AdminLogin';
import { AdminLayout } from './components/AdminLayout';
import { DashboardOverview } from './components/DashboardOverview';
import { InventoryPanel } from './components/InventoryPanel';
import { ReportsPage } from './components/ReportsPage';
import { UserManagementPanel } from './components/UserManagementPanel';

// --- PROTECTED ROUTE AUTHENTICATION FILTER MIDDLEWARE ---
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Website Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomeView />} />
          <Route path="projects" element={<ProjectsView />} />
          <Route path="process" element={<ProcessView />} />
          <Route path="contact" element={<ContactView />} />
          <Route path="createaccount" element={<CreateAccountView />} /> 
        </Route>

        {/* Secure Administrative Subsystem Console Workspace */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardOverview />} />
          <Route path="inventory" element={<InventoryPanel />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="roles" element={<UserManagementPanel />} /> 
        </Route>

        {/* Fallback Catch-all Route Redirection Node */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;