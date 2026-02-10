import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import EmployeeEntry from "./pages/EmployeeEntry";
import { Placeholder } from "./pages/Placeholder";
import NotFound from "./pages/NotFound";
import {
  Users,
  BookOpen,
  BarChart3,
  Settings,
  FileText,
  Calendar,
  SearchIcon,
  ClipboardList,
} from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main Dashboard */}
          <Route path="/" element={<Dashboard userRole="super_admin" />} />

          {/* Employee Management */}
          <Route path="/employee-entry" element={<EmployeeEntry />} />
          <Route
            path="/employee-list"
            element={
              <Placeholder
                title="Employee List"
                description="View, search, and manage all employees with advanced filtering and bulk actions."
                icon={<Users size={48} />}
                userRole="hr_officer"
              />
            }
          />
          <Route
            path="/employee-search"
            element={
              <Placeholder
                title="Employee Search"
                description="Search for employees by name, ID, department, or other criteria."
                icon={<SearchIcon size={48} />}
              />
            }
          />

          {/* Training & Research */}
          <Route
            path="/training-status"
            element={
              <Placeholder
                title="Training Status"
                description="Track training completion status and progress for all employees."
                icon={<BarChart3 size={48} />}
              />
            }
          />
          <Route
            path="/upcoming-training"
            element={
              <Placeholder
                title="Upcoming Training"
                description="View and register for upcoming training programs."
                icon={<Calendar size={48} />}
              />
            }
          />
          <Route
            path="/research-history"
            element={
              <Placeholder
                title="Research History"
                description="Track research initiatives and participation history."
                icon={<BookOpen size={48} />}
              />
            }
          />
          <Route
            path="/my-applications"
            element={
              <Placeholder
                title="My Applications"
                description="View and manage your training and research applications."
                icon={<FileText size={48} />}
              />
            }
          />

          {/* Administration */}
          <Route
            path="/user-management"
            element={
              <Placeholder
                title="User Management"
                description="Manage system users, roles, and permissions."
                icon={<Users size={48} />}
                userRole="super_admin"
              />
            }
          />
          <Route
            path="/system-configuration"
            element={
              <Placeholder
                title="System Configuration"
                description="Configure system settings, master data, and workflow rules."
                icon={<Settings size={48} />}
                userRole="super_admin"
              />
            }
          />
          <Route
            path="/master-data"
            element={
              <Placeholder
                title="Master Data"
                description="Manage ministries, departments, designations, and categories."
                icon={<ClipboardList size={48} />}
                userRole="super_admin"
              />
            }
          />
          <Route
            path="/approval-queue"
            element={
              <Placeholder
                title="Approval Queue"
                description="Review and manage pending approvals for training and research applications."
                icon={<ClipboardList size={48} />}
              />
            }
          />

          {/* System */}
          <Route
            path="/reports"
            element={
              <Placeholder
                title="Reports & Analytics"
                description="Generate insights and reports on training completion, research output, and more."
                icon={<BarChart3 size={48} />}
              />
            }
          />
          <Route
            path="/audit-logs"
            element={
              <Placeholder
                title="Audit Logs"
                description="View system audit logs and compliance records."
                icon={<FileText size={48} />}
              />
            }
          />
          <Route
            path="/help"
            element={
              <Placeholder
                title="Help & User Manual"
                description="Access documentation and help resources."
                icon={<BookOpen size={48} />}
              />
            }
          />

          {/* 404 Catch All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
