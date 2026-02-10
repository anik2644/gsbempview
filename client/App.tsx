import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Dashboard from "./pages/Dashboard";
import EmployeeEntry from "./pages/EmployeeEntry";
import EmployeeList from "./pages/EmployeeList";
import UserManagement from "./pages/UserManagement";
import { Placeholder } from "./pages/Placeholder";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import {
  Users,
  BookOpen,
  BarChart3,
  Settings,
  FileText,
  Calendar,
  ClipboardList,
} from "lucide-react";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppRoutes = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {/* Main Dashboard */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Employee Management */}
      <Route
        path="/employee-entry"
        element={
          <ProtectedRoute>
            <EmployeeEntry />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee-list"
        element={
          <ProtectedRoute>
            <EmployeeList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee-search"
        element={
          <ProtectedRoute>
            <Placeholder
              title="Employee Search"
              description="Search for employees by name, ID, department, or other criteria."
              icon={<Users size={48} />}
            />
          </ProtectedRoute>
        }
      />

      {/* Training & Research */}
      <Route
        path="/training-status"
        element={
          <ProtectedRoute>
            <Placeholder
              title="Training Status"
              description="Track training completion status and progress for all employees."
              icon={<BarChart3 size={48} />}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upcoming-training"
        element={
          <ProtectedRoute>
            <Placeholder
              title="Upcoming Training"
              description="View and register for upcoming training programs."
              icon={<Calendar size={48} />}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/research-history"
        element={
          <ProtectedRoute>
            <Placeholder
              title="Research History"
              description="Track research initiatives and participation history."
              icon={<BookOpen size={48} />}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-applications"
        element={
          <ProtectedRoute>
            <Placeholder
              title="My Applications"
              description="View and manage your training and research applications."
              icon={<FileText size={48} />}
            />
          </ProtectedRoute>
        }
      />

      {/* Administration */}
      <Route
        path="/user-management"
        element={
          <ProtectedRoute>
            <UserManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/system-configuration"
        element={
          <ProtectedRoute>
            <Placeholder
              title="System Configuration"
              description="Configure system settings, master data, and workflow rules."
              icon={<Settings size={48} />}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/master-data"
        element={
          <ProtectedRoute>
            <Placeholder
              title="Master Data"
              description="Manage ministries, departments, designations, and categories."
              icon={<ClipboardList size={48} />}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/approval-queue"
        element={
          <ProtectedRoute>
            <Placeholder
              title="Approval Queue"
              description="Review and manage pending approvals for training and research applications."
              icon={<ClipboardList size={48} />}
            />
          </ProtectedRoute>
        }
      />

      {/* System */}
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Placeholder
              title="Reports & Analytics"
              description="Generate insights and reports on training completion, research output, and more."
              icon={<BarChart3 size={48} />}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/audit-logs"
        element={
          <ProtectedRoute>
            <Placeholder
              title="Audit Logs"
              description="View system audit logs and compliance records."
              icon={<FileText size={48} />}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/help"
        element={
          <ProtectedRoute>
            <Placeholder
              title="Help & User Manual"
              description="Access documentation and help resources."
              icon={<BookOpen size={48} />}
            />
          </ProtectedRoute>
        }
      />

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* 404 Catch All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
