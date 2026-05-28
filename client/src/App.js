import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// ==========================================
// 1. PUBLIC LAYOUT & VIEWS IMPORTS (Named)
// ==========================================
import { PublicLayout } from './components/PublicLayout';
import { HomeView } from './views/HomeView';
import { ProjectsView } from './views/ProjectsView';
import { ProcessView } from './views/ProcessView';
import { ContactView } from './views/ContactView';

// ==========================================
// 2. ADMIN PANEL IMPORTS (Strict Named)
// Matching your exact file export signatures 
// ==========================================
import { AdminLogin } from './components/AdminLogin';
import { AdminLayout } from './components/AdminLayout';
import { DashboardOverview } from './components/DashboardOverview';
import { InventoryPanel } from './components/InventoryPanel';
import { ReportsPage } from './components/ReportsPage';

// ==========================================
// 3. SECURE ROUTE AUTHENTICATION GATEKEEPER
// ==========================================
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

// ==========================================
// 4. MAIN CORE ROUTING ENGINE
// ==========================================
function App() {
  return (
    <Router>
      <Routes>
        
        {/* Public Portfolio Suite Wrapper */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomeView />} />
          <Route path="projects" element={<ProjectsView />} />
          <Route path="process" element={<ProcessView />} />
          <Route path="contact" element={<ContactView />} />
        </Route>

        {/* Secure Admin Infrastructure Management Suite */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardOverview />} />
          <Route path="inventory" element={<InventoryPanel />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>

        {/* Catch-all Global Redirect Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
        
      </Routes>
    </Router>
  );
}

export default App;