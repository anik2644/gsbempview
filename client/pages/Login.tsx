import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { AlertCircle, LogIn } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("employee");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const demoUsers = [
    {
      email: "admin@eduadmin.gov",
      role: "super_admin" as UserRole,
      name: "Super Admin",
    },
    {
      email: "hr@eduadmin.gov",
      role: "hr_officer" as UserRole,
      name: "HR Officer",
    },
    {
      email: "training@eduadmin.gov",
      role: "training_coordinator" as UserRole,
      name: "Training Coordinator",
    },
    {
      email: "research@eduadmin.gov",
      role: "research_coordinator" as UserRole,
      name: "Research Coordinator",
    },
    {
      email: "approver@eduadmin.gov",
      role: "approver_level_1" as UserRole,
      name: "Approver Level 1",
    },
    {
      email: "employee@eduadmin.gov",
      role: "employee" as UserRole,
      name: "Employee",
    },
    {
      email: "auditor@eduadmin.gov",
      role: "auditor" as UserRole,
      name: "Auditor",
    },
  ];

  const handleDemoLogin = (demoEmail: string, demoRole: UserRole) => {
    setEmail(demoEmail);
    setPassword("demo");
    setRole(demoRole);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!email || !password) {
        setError("Please enter email and password");
        setLoading(false);
        return;
      }

      await login(email, password, role);
      navigate("/");
    } catch (err) {
      setError("Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <h1 className="text-3xl font-bold text-primary">EduAdmin</h1>
          </div>
          <p className="text-gray-600">
            Employee Training & Research Management System
          </p>
        </div>

        {/* Login Card */}
        <Card className="p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h2>
          <p className="text-gray-600 text-sm mb-6">
            Sign in to your account to continue
          </p>

          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
              <AlertCircle className="text-error mt-0.5" size={20} />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={loading}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>

            <div>
              <Label htmlFor="role">Role</Label>
              <Select
                value={role}
                onValueChange={(value) => setRole(value as UserRole)}
                disabled={loading}
              >
                <SelectTrigger id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                  <SelectItem value="hr_officer">HR/Admin Officer</SelectItem>
                  <SelectItem value="training_coordinator">
                    Training Coordinator
                  </SelectItem>
                  <SelectItem value="education_coordinator">
                    Education Coordinator
                  </SelectItem>
                  <SelectItem value="research_coordinator">
                    Research Coordinator
                  </SelectItem>
                  <SelectItem value="approver_level_1">
                    Approver Level 1
                  </SelectItem>
                  <SelectItem value="approver_level_2">
                    Approver Level 2
                  </SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="auditor">Auditor/Read-Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={loading}
            >
              <LogIn size={18} className="mr-2" />
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Card>

        {/* Demo Users */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Demo Accounts</h3>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {demoUsers.map((user) => (
              <button
                key={user.email}
                onClick={() => handleDemoLogin(user.email, user.role)}
                disabled={loading}
                className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200 disabled:opacity-50"
              >
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-600">{user.email}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-600 mt-6">
          For demo purposes only. This is a prototype system.
        </p>
      </div>
    </div>
  );
}
