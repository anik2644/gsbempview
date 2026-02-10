import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Menu,
  X,
  Home,
  Users,
  UserPlus,
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
  Calendar,
  Search,
  FileText,
  CheckSquare,
  ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItem {
  label: string;
  path?: string;
  icon: React.ReactNode;
  submenu?: SidebarItem[];
}

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const userRole = user?.role || "employee";

  const isAdmin = ["super_admin", "hr_officer", "training_coordinator", "education_coordinator", "research_coordinator"].includes(userRole);

  const mainMenuItems: SidebarItem[] = [
    { label: "Home", path: "/", icon: <Home size={20} /> },
    { label: "Officer/Employee Entry", path: "/employee-entry", icon: <UserPlus size={20} /> },
    { label: "Officer/Employee List", path: "/employee-list", icon: <Users size={20} /> },
    { label: "Employee Search", path: "/employee-search", icon: <Search size={20} /> },
  ];

  const trainingResearchItems: SidebarItem[] = [
    { label: "Training Status", path: "/training-status", icon: <BarChart3 size={20} /> },
    { label: "Upcoming Training", path: "/upcoming-training", icon: <Calendar size={20} /> },
    { label: "Research History", path: "/research-history", icon: <BookOpen size={20} /> },
    ...(userRole === "employee" ? [{ label: "My Applications", path: "/my-applications", icon: <FileText size={20} /> }] : []),
  ];

  const administrationItems: SidebarItem[] = [
    ...(isAdmin ? [
      { label: "User Management", path: "/user-management", icon: <Users size={20} /> },
      { label: "System Configuration", path: "/system-configuration", icon: <Settings size={20} /> },
      { label: "Master Data", path: "/master-data", icon: <ClipboardList size={20} /> },
      { label: "Approval Queue", path: "/approval-queue", icon: <CheckSquare size={20} /> },
    ] : []),
  ];

  const systemItems: SidebarItem[] = [
    { label: "Reports", path: "/reports", icon: <BarChart3 size={20} /> },
    { label: "Audit Logs", path: "/audit-logs", icon: <FileText size={20} /> },
    { label: "Help/User Manual", path: "/help", icon: <BookOpen size={20} /> },
  ];

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  const NavItem: React.FC<{ item: SidebarItem; section: string }> = ({ item, section }) => {
    const active = isActive(item.path);
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const [isExpanded, setIsExpanded] = useState(false);

    if (!item.path) return null;

    return (
      <div key={item.label}>
        <Link
          to={item.path}
          onClick={() => setIsOpen(false)}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
            active
              ? "bg-primary text-white"
              : "text-gray-700 hover:bg-gray-100"
          )}
        >
          {item.icon}
          <span>{item.label}</span>
          {hasSubmenu && (
            <ChevronDown
              size={16}
              className={cn("ml-auto transition-transform", isExpanded && "rotate-180")}
            />
          )}
        </Link>
        {hasSubmenu && isExpanded && (
          <div className="pl-4 space-y-2 mt-2">
            {item.submenu?.map((subitem) => (
              <NavItem key={subitem.label} item={subitem} section={section} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-50 bg-white border-b border-gray-200 flex items-center justify-between p-4">
        <h1 className="text-xl font-bold text-primary">EduAdmin</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:relative inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="hidden md:flex items-center gap-3 p-6 border-b border-gray-200">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">E</span>
          </div>
          <h1 className="text-xl font-bold text-primary">EduAdmin</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Main Menu */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Main Menu
            </h3>
            <div className="space-y-2">
              {mainMenuItems.map((item) => (
                <NavItem key={item.label} item={item} section="main" />
              ))}
            </div>
          </div>

          {/* Training & Research */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Training & Research
            </h3>
            <div className="space-y-2">
              {trainingResearchItems.map((item) => (
                <NavItem key={item.label} item={item} section="training" />
              ))}
            </div>
          </div>

          {/* Administration */}
          {administrationItems.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Administration
              </h3>
              <div className="space-y-2">
                {administrationItems.map((item) => (
                  <NavItem key={item.label} item={item} section="admin" />
                ))}
              </div>
            </div>
          )}

          {/* System */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              System
            </h3>
            <div className="space-y-2">
              {systemItems.map((item) => (
                <NavItem key={item.label} item={item} section="system" />
              ))}
            </div>
          </div>
        </nav>

        {/* User Profile Footer */}
        <div className="border-t border-gray-200 p-4">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
