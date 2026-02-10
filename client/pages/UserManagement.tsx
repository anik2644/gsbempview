import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from "@/contexts/AuthContext";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Lock,
  Unlock,
  CheckCircle,
} from "lucide-react";

interface SystemUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department: string;
  status: "Active" | "Inactive" | "Locked";
  lastLogin: string;
  createdAt: string;
}

const DUMMY_USERS: SystemUser[] = [
  {
    id: "user_1",
    email: "admin@eduadmin.gov",
    name: "Super Admin",
    role: "super_admin",
    department: "System Administration",
    status: "Active",
    lastLogin: "2024-03-10 10:30 AM",
    createdAt: "2023-01-15",
  },
  {
    id: "user_2",
    email: "hr@eduadmin.gov",
    name: "HR Officer",
    role: "hr_officer",
    department: "Human Resources",
    status: "Active",
    lastLogin: "2024-03-09 09:15 AM",
    createdAt: "2023-02-20",
  },
  {
    id: "user_3",
    email: "training@eduadmin.gov",
    name: "Training Coordinator",
    role: "training_coordinator",
    department: "Training",
    status: "Active",
    lastLogin: "2024-03-08 02:45 PM",
    createdAt: "2023-03-10",
  },
  {
    id: "user_4",
    email: "research@eduadmin.gov",
    name: "Research Coordinator",
    role: "research_coordinator",
    department: "Research",
    status: "Active",
    lastLogin: "2024-03-07 11:20 AM",
    createdAt: "2023-04-05",
  },
  {
    id: "user_5",
    email: "approver@eduadmin.gov",
    name: "Approver Level 1",
    role: "approver_level_1",
    department: "Approval Committee",
    status: "Active",
    lastLogin: "2024-03-06 03:50 PM",
    createdAt: "2023-05-12",
  },
  {
    id: "user_6",
    email: "john.doe@eduadmin.gov",
    name: "John Doe",
    role: "employee",
    department: "Finance Division",
    status: "Inactive",
    lastLogin: "2024-02-15 08:00 AM",
    createdAt: "2023-06-01",
  },
];

const ROLES: { value: UserRole; label: string }[] = [
  { value: "super_admin", label: "Super Admin" },
  { value: "hr_officer", label: "HR/Admin Officer" },
  { value: "training_coordinator", label: "Training Coordinator" },
  { value: "education_coordinator", label: "Education Coordinator" },
  { value: "research_coordinator", label: "Research Coordinator" },
  { value: "approver_level_1", label: "Approver Level 1" },
  { value: "approver_level_2", label: "Approver Level 2" },
  { value: "employee", label: "Employee" },
  { value: "auditor", label: "Auditor/Read-Only" },
];

export default function UserManagement() {
  const [users, setUsers] = useState<SystemUser[]>(DUMMY_USERS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    role: "employee" as UserRole,
    department: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole | "all">("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = selectedRole === "all" || user.role === selectedRole;

    return matchesSearch && matchesRole;
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();

    const newUser: SystemUser = {
      id: `user_${Date.now()}`,
      email: formData.email,
      name: formData.name,
      role: formData.role,
      department: formData.department,
      status: "Active",
      lastLogin: "Never",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setUsers([...users, newUser]);
    setFormData({ email: "", name: "", role: "employee", department: "" });
    setShowAddModal(false);

    // Show success message
    alert(`User ${formData.name} has been created successfully!`);
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId));
      alert("User deleted successfully!");
    }
  };

  const handleLockUser = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "Locked" ? "Active" : "Locked" }
          : user,
      ),
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      case "Locked":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleLabel = (role: UserRole) => {
    return ROLES.find((r) => r.value === role)?.label || role;
  };

  return (
    <MainLayout>
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              User Management
            </h1>
            <p className="text-gray-600">
              Manage system users and assign roles
            </p>
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-primary hover:bg-primary/90 mt-4 md:mt-0"
          >
            <Plus size={18} className="mr-2" />
            Add New User
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 block mb-2">
                Search Users
              </Label>
              <Input
                type="text"
                placeholder="Search by email or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 block mb-2">
                Filter by Role
              </Label>
              <Select
                value={selectedRole}
                onValueChange={(value) =>
                  setSelectedRole(value as UserRole | "all")
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {ROLES.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">{filteredUsers.length}</span>{" "}
                users found
              </p>
            </div>
          </div>
        </Card>

        {/* Users Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Department
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Last Login
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-600">{user.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Badge className="bg-blue-100 text-blue-800">
                        {getRoleLabel(user.role)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.department}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.lastLogin}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Eye size={18} className="text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit size={18} className="text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleLockUser(user.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {user.status === "Locked" ? (
                            <Unlock size={18} className="text-orange-600" />
                          ) : (
                            <Lock size={18} className="text-gray-600" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} className="text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Add New User
            </h2>

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div>
                <Label htmlFor="role">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData({ ...formData, role: value as UserRole })
                  }
                >
                  <SelectTrigger id="role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  placeholder="Enter department"
                  required
                />
              </div>

              <div className="flex gap-3 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  <CheckCircle size={18} className="mr-2" />
                  Create User
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </MainLayout>
  );
}
