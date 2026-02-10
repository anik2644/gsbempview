import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole =
  | "super_admin"
  | "hr_officer"
  | "training_coordinator"
  | "education_coordinator"
  | "research_coordinator"
  | "approver_level_1"
  | "approver_level_2"
  | "employee"
  | "auditor";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  designation?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("eduadmin_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (e) {
        console.error("Failed to parse stored user");
      }
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newUser: User = {
      id: `user_${Date.now()}`,
      email,
      name: email.split("@")[0],
      role,
      department: "Administration",
      designation: role.replace(/_/g, " "),
    };

    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem("eduadmin_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("eduadmin_user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
