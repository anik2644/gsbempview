import React, { useState, useMemo } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, Trash2, Edit, Download, Plus, Search } from "lucide-react";

interface Employee {
  id: string;
  employeeId: string;
  name: string;
  designation: string;
  department: string;
  ministry: string;
  trainingStatus: "Completed" | "In Progress" | "Not Started";
  completionPercentage: number;
  joiningDate: string;
  office: string;
}

const DUMMY_EMPLOYEES: Employee[] = [
  {
    id: "1",
    employeeId: "EMP-2024-001",
    name: "Amelia Sarkar",
    designation: "Senior Executive",
    department: "Finance Division",
    ministry: "Ministry of Finance",
    trainingStatus: "Completed",
    completionPercentage: 95,
    joiningDate: "2018-06-15",
    office: "Head Office",
  },
  {
    id: "2",
    employeeId: "EMP-2024-042",
    name: "John Doe",
    designation: "Assistant Director",
    department: "ICT Department",
    ministry: "Ministry of ICT",
    trainingStatus: "In Progress",
    completionPercentage: 60,
    joiningDate: "2019-03-20",
    office: "ICT Center",
  },
  {
    id: "3",
    employeeId: "EMP-2024-003",
    name: "Sarah Johnson",
    designation: "Deputy Secretary",
    department: "Education Division",
    ministry: "Ministry of Education",
    trainingStatus: "Completed",
    completionPercentage: 100,
    joiningDate: "2016-08-10",
    office: "Education Block",
  },
  {
    id: "4",
    employeeId: "EMP-2024-004",
    name: "Robert Chen",
    designation: "Research Officer",
    department: "Research Wing",
    ministry: "Ministry of Science",
    trainingStatus: "In Progress",
    completionPercentage: 45,
    joiningDate: "2020-01-05",
    office: "Science Building",
  },
  {
    id: "5",
    employeeId: "EMP-2024-005",
    name: "Fatima Ahmed",
    designation: "Senior Officer",
    department: "Health Division",
    ministry: "Ministry of Health",
    trainingStatus: "Completed",
    completionPercentage: 88,
    joiningDate: "2017-11-12",
    office: "Health Center",
  },
  {
    id: "6",
    employeeId: "EMP-2024-006",
    name: "Michael Brown",
    designation: "Junior Officer",
    department: "Administration",
    ministry: "Ministry of Finance",
    trainingStatus: "Not Started",
    completionPercentage: 0,
    joiningDate: "2023-01-20",
    office: "Admin Block",
  },
  {
    id: "7",
    employeeId: "EMP-2024-007",
    name: "Lisa Wang",
    designation: "Coordinator",
    department: "Training Cell",
    ministry: "Ministry of HR",
    trainingStatus: "In Progress",
    completionPercentage: 70,
    joiningDate: "2021-05-15",
    office: "Training Center",
  },
  {
    id: "8",
    employeeId: "EMP-2024-008",
    name: "Ahmed Hassan",
    designation: "Senior Analyst",
    department: "Data Analytics",
    ministry: "Ministry of ICT",
    trainingStatus: "Completed",
    completionPercentage: 92,
    joiningDate: "2019-09-01",
    office: "Data Center",
  },
  {
    id: "9",
    employeeId: "EMP-2024-009",
    name: "Emily Thompson",
    designation: "HR Manager",
    department: "Human Resources",
    ministry: "Ministry of HR",
    trainingStatus: "Completed",
    completionPercentage: 85,
    joiningDate: "2018-02-10",
    office: "HR Building",
  },
  {
    id: "10",
    employeeId: "EMP-2024-010",
    name: "David Kumar",
    designation: "Project Manager",
    department: "Projects",
    ministry: "Ministry of Development",
    trainingStatus: "In Progress",
    completionPercentage: 55,
    joiningDate: "2020-07-20",
    office: "Project Office",
  },
];

export default function EmployeeList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMinistry, setSelectedMinistry] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedTrainingStatus, setSelectedTrainingStatus] = useState("all");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter employees
  const filteredEmployees = useMemo(() => {
    return DUMMY_EMPLOYEES.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesMinistry =
        selectedMinistry === "all" || emp.ministry === selectedMinistry;

      const matchesDepartment =
        selectedDepartment === "all" || emp.department === selectedDepartment;

      const matchesTrainingStatus =
        selectedTrainingStatus === "all" ||
        emp.trainingStatus === selectedTrainingStatus;

      return (
        matchesSearch &&
        matchesMinistry &&
        matchesDepartment &&
        matchesTrainingStatus
      );
    });
  }, [
    searchTerm,
    selectedMinistry,
    selectedDepartment,
    selectedTrainingStatus,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Not Started":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const ministries = [...new Set(DUMMY_EMPLOYEES.map((e) => e.ministry))];
  const departments = [...new Set(DUMMY_EMPLOYEES.map((e) => e.department))];

  return (
    <MainLayout>
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Employee List
            </h1>
            <p className="text-gray-600">
              Showing {paginatedEmployees.length} of {filteredEmployees.length}{" "}
              employees
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 mt-4 md:mt-0">
            <Plus size={18} className="mr-2" />
            Add New Employee
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Search by Name or ID
              </label>
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Ministry
              </label>
              <Select
                value={selectedMinistry}
                onValueChange={(value) => {
                  setSelectedMinistry(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ministries</SelectItem>
                  {ministries.map((ministry) => (
                    <SelectItem key={ministry} value={ministry}>
                      {ministry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Department
              </label>
              <Select
                value={selectedDepartment}
                onValueChange={(value) => {
                  setSelectedDepartment(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Training Status
              </label>
              <Select
                value={selectedTrainingStatus}
                onValueChange={(value) => {
                  setSelectedTrainingStatus(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="25">25 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Download size={18} className="mr-2" />
              Export
            </Button>
          </div>
        </Card>

        {/* Employee Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Designation
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Department
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Training Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Progress
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedEmployees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-primary">
                      {emp.employeeId}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {emp.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {emp.designation}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {emp.department}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Badge className={getStatusColor(emp.trainingStatus)}>
                        {emp.trainingStatus}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${emp.completionPercentage}%` }}
                          ></div>
                        </div>
                        <span className="text-gray-600 text-xs">
                          {emp.completionPercentage}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Eye size={18} className="text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit size={18} className="text-blue-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Trash2 size={18} className="text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
            <p className="text-sm text-gray-600">
              Page {currentPage} of {totalPages || 1}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </Button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                if (pageNum > currentPage + 2) return null;
                if (pageNum < currentPage - 2) return null;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    onClick={() => setCurrentPage(pageNum)}
                    className={
                      currentPage === pageNum
                        ? "bg-primary hover:bg-primary/90"
                        : ""
                    }
                  >
                    {pageNum}
                  </Button>
                );
              })}
              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
