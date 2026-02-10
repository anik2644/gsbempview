import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  Users,
  BookOpen,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Plus,
  Eye,
  Download,
  Calendar,
  Clock,
  Award,
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState("this-month");
  const userRole = user?.role || "employee";
  const isAdminRole = ["super_admin", "hr_officer", "training_coordinator", "education_coordinator", "research_coordinator"].includes(userRole);
  const isEmployee = userRole === "employee";
  const isApprover = userRole.includes("approver");

  // Mock data for charts
  const trainingHours = [
    { name: "Jan", completed: 40, target: 100 },
    { name: "Feb", completed: 60, target: 100 },
    { name: "Mar", completed: 45, target: 100 },
    { name: "Apr", completed: 70, target: 100 },
    { name: "May", completed: 85, target: 100 },
    { name: "Jun", completed: 95, target: 100 },
  ];

  const trainingDistribution = [
    { name: "Domestic", value: 65, color: "#3b82f6" },
    { name: "Foreign", value: 25, color: "#f97316" },
    { name: "Research", value: 10, color: "#10b981" },
  ];

  const departmentStats = [
    { name: "Finance", employees: 45, completed: 32 },
    { name: "ICT", employees: 38, completed: 28 },
    { name: "Education", employees: 52, completed: 40 },
    { name: "Health", employees: 41, completed: 30 },
  ];

  const recentActivities = [
    { type: "training", title: "John Doe enrolled in Leadership Skills", time: "2 hours ago" },
    { type: "approval", title: "Training approval for Amelia Smith", time: "4 hours ago" },
    { type: "research", title: "New research initiative created", time: "1 day ago" },
    { type: "employee", title: "5 new employees registered", time: "1 day ago" },
  ];

  return (
    <MainLayout userRole={userRole}>
      <div className="p-4 md:p-8">
        {/* Welcome Banner */}
        <div className="mb-8 bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, {userRole === "employee" ? "John" : "Administrator"}!
          </h1>
          <p className="text-primary-100 mb-6">
            {isEmployee
              ? "Track your training progress and research participation"
              : "Manage employee training and research initiatives"}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-white text-primary hover:bg-gray-100">
              <Plus size={18} className="mr-2" />
              New Entry
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              <Eye size={18} className="mr-2" />
              View Reports
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Employees</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{isEmployee ? "1" : "2,847"}</h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="text-primary" size={24} />
              </div>
            </div>
            <div className="flex items-center text-green-600 text-sm font-medium">
              <TrendingUp size={16} className="mr-1" />
              12% increase
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm font-medium">Active Training Programs</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{isEmployee ? "3" : "24"}</h3>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <BookOpen className="text-secondary" size={24} />
              </div>
            </div>
            <div className="flex items-center text-green-600 text-sm font-medium">
              <TrendingUp size={16} className="mr-1" />
              5 new this month
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  {isApprover ? "Pending Approvals" : "Pending Applications"}
                </p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{isEmployee ? "1" : isApprover ? "12" : "45"}</h3>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertCircle className="text-error" size={24} />
              </div>
            </div>
            {isApprover && (
              <Badge className="bg-red-100 text-red-700 mt-2">Requires action</Badge>
            )}
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm font-medium">Research Projects</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{isEmployee ? "2" : "18"}</h3>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Award className="text-green-600" size={24} />
              </div>
            </div>
            <div className="flex items-center text-green-600 text-sm font-medium">
              <TrendingUp size={16} className="mr-1" />
              2 ongoing
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Training Hours Chart */}
          <Card className="p-6 lg:col-span-2">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Training Hours Progress</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trainingHours}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#3b82f6" name="Completed Hours" />
                <Bar dataKey="target" fill="#e5e7eb" name="Target Hours" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Training Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Training Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={trainingDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {trainingDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {trainingDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{item.name}</span>
                  <Badge variant="outline">{item.value}%</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department Statistics */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Department Training Status</h3>
            <div className="space-y-4">
              {departmentStats.map((dept) => (
                <div key={dept.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{dept.name}</span>
                    <span className="text-sm text-gray-600">
                      {dept.completed}/{dept.employees}
                    </span>
                  </div>
                  <Progress
                    value={(dept.completed / dept.employees) * 100}
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                  <div
                    className={`p-2 rounded-lg ${
                      activity.type === "training"
                        ? "bg-blue-100"
                        : activity.type === "approval"
                        ? "bg-orange-100"
                        : activity.type === "research"
                        ? "bg-green-100"
                        : "bg-purple-100"
                    }`}
                  >
                    {activity.type === "training" && (
                      <BookOpen className="text-primary" size={18} />
                    )}
                    {activity.type === "approval" && (
                      <CheckCircle className="text-secondary" size={18} />
                    )}
                    {activity.type === "research" && (
                      <Award className="text-green-600" size={18} />
                    )}
                    {activity.type === "employee" && (
                      <Users className="text-purple-600" size={18} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-600 mt-1 flex items-center">
                      <Clock size={12} className="mr-1" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Upcoming Events Calendar */}
        <Card className="p-6 mt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <Calendar className="mr-2 text-primary" size={24} />
            Upcoming Events
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { date: "Mar 15", event: "Leadership Skills Training", location: "Room 101" },
              { date: "Mar 20", event: "Research Proposal Deadline", location: "Online" },
              { date: "Mar 25", event: "Approval Committee Meeting", location: "Conference Hall" },
            ].map((event, idx) => (
              <div key={idx} className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                <Badge className="mb-2">{event.date}</Badge>
                <p className="font-medium text-gray-900">{event.event}</p>
                <p className="text-sm text-gray-600 mt-1">{event.location}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
