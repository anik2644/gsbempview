import React from "react";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
  userRole?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  userRole = "employee",
}) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userRole={userRole} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};
