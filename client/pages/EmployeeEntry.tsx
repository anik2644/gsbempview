import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, Upload, Check, AlertCircle } from "lucide-react";

export default function EmployeeEntry() {
  const { user } = useAuth();
  const [currentSection, setCurrentSection] = useState("basic");
  const [formData, setFormData] = useState({
    // Basic Identification
    employeeId: "",
    fullName: "",
    fathersName: "",
    mothersName: "",
    dob: "",
    gender: "",
    photo: null as File | null,

    // Address Details
    presentAddress: "",
    permanentAddress: "",
    district: "",
    division: "",

    // Professional Placement
    currentPosition: "",
    designation: "",
    ministry: "",
    departmentDivision: "",
    officeName: "",
    joiningDate: "",
    serviceType: "",

    // Contact & Identity
    officePhone: "",
    personalMobile: "",
    emergencyContact: "",
    email: "",
    nidNumber: "",
    passportNumber: "",

    // Training & Research History
    trainingType: "",
    year: "",
    providerInstitute: "",
    duration: "",
    completed: "",
    certification: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const sections = [
    { id: "basic", label: "Basic Identification", icon: "👤" },
    { id: "address", label: "Address Details", icon: "🏠" },
    { id: "professional", label: "Professional Placement", icon: "💼" },
    { id: "contact", label: "Contact & Identity", icon: "📞" },
    { id: "training", label: "Training & Research History", icon: "📚" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file,
      }));
    }
  };

  const validateSection = () => {
    const newErrors: Record<string, string> = {};

    switch (currentSection) {
      case "basic":
        if (!formData.employeeId)
          newErrors.employeeId = "Employee ID is required";
        if (!formData.fullName) newErrors.fullName = "Full Name is required";
        if (!formData.dob) newErrors.dob = "Date of Birth is required";
        if (!formData.gender) newErrors.gender = "Gender is required";
        break;
      case "address":
        if (!formData.presentAddress)
          newErrors.presentAddress = "Present Address is required";
        if (!formData.permanentAddress)
          newErrors.permanentAddress = "Permanent Address is required";
        if (!formData.district) newErrors.district = "District is required";
        if (!formData.division) newErrors.division = "Division is required";
        break;
      case "professional":
        if (!formData.currentPosition)
          newErrors.currentPosition = "Current Position is required";
        if (!formData.designation)
          newErrors.designation = "Designation is required";
        if (!formData.ministry) newErrors.ministry = "Ministry is required";
        if (!formData.joiningDate)
          newErrors.joiningDate = "Joining Date is required";
        break;
      case "contact":
        if (!formData.personalMobile)
          newErrors.personalMobile = "Personal Mobile is required";
        if (!formData.emergencyContact)
          newErrors.emergencyContact = "Emergency Contact is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.nidNumber) newErrors.nidNumber = "NID Number is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateSection()) {
      const currentIdx = sections.findIndex((s) => s.id === currentSection);
      if (currentIdx < sections.length - 1) {
        setCurrentSection(sections[currentIdx + 1].id);
      }
    }
  };

  const handlePrevious = () => {
    const currentIdx = sections.findIndex((s) => s.id === currentSection);
    if (currentIdx > 0) {
      setCurrentSection(sections[currentIdx - 1].id);
    }
  };

  const handleSubmit = () => {
    if (validateSection()) {
      console.log("Form submitted:", formData);
      alert("Employee record submitted successfully!");
    }
  };

  const currentSectionIndex = sections.findIndex(
    (s) => s.id === currentSection,
  );
  const progress = ((currentSectionIndex + 1) / sections.length) * 100;

  return (
    <MainLayout userRole="hr_officer">
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Employee Registration
          </h1>
          <p className="text-gray-600">
            Register a new employee or update existing records
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="p-6 mb-8">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progress: {currentSectionIndex + 1} of {sections.length}
              </span>
              <span className="text-sm font-medium text-primary">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Section Navigation */}
          <div className="flex flex-wrap gap-2">
            {sections.map((section, idx) => (
              <button
                key={section.id}
                onClick={() => setCurrentSection(section.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentSection === section.id
                    ? "bg-primary text-white"
                    : idx < currentSectionIndex
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="mr-2">{section.icon}</span>
                <span className="hidden sm:inline">{section.label}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Form Section */}
        <Card className="p-8 mb-8">
          {/* Basic Identification */}
          {currentSection === "basic" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Basic Identification
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="employeeId">
                    Employee ID <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="employeeId"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    placeholder="e.g., EMP001"
                    className={errors.employeeId ? "border-red-500" : ""}
                  />
                  {errors.employeeId && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.employeeId}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="fullName">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className={errors.fullName ? "border-red-500" : ""}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="fathersName">Father's Name</Label>
                  <Input
                    id="fathersName"
                    name="fathersName"
                    value={formData.fathersName}
                    onChange={handleInputChange}
                    placeholder="Enter father's name"
                  />
                </div>
                <div>
                  <Label htmlFor="mothersName">Mother's Name</Label>
                  <Input
                    id="mothersName"
                    name="mothersName"
                    value={formData.mothersName}
                    onChange={handleInputChange}
                    placeholder="Enter mother's name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="dob">
                    Date of Birth <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className={errors.dob ? "border-red-500" : ""}
                  />
                  {errors.dob && (
                    <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="gender">
                    Gender <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => {
                      setFormData((prev) => ({ ...prev, gender: value }));
                      if (errors.gender) {
                        setErrors((prev) => ({ ...prev, gender: "" }));
                      }
                    }}
                  >
                    <SelectTrigger
                      className={errors.gender ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <Label>Photo Upload</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="cursor-pointer block"
                  >
                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-sm text-gray-600">
                      Drag and drop or click to upload
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      JPG or PNG, max 2MB
                    </p>
                  </label>
                  {formData.photo && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {formData.photo.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Address Details */}
          {currentSection === "address" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Address Details
              </h2>
              <div className="mb-6">
                <Label htmlFor="presentAddress">
                  Present Address <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="presentAddress"
                  name="presentAddress"
                  value={formData.presentAddress}
                  onChange={handleInputChange}
                  placeholder="Enter present address"
                  rows={3}
                  className={errors.presentAddress ? "border-red-500" : ""}
                />
                {errors.presentAddress && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.presentAddress}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <Label htmlFor="permanentAddress">
                  Permanent Address <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="permanentAddress"
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleInputChange}
                  placeholder="Enter permanent address"
                  rows={3}
                  className={errors.permanentAddress ? "border-red-500" : ""}
                />
                {errors.permanentAddress && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.permanentAddress}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="district">
                    District <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.district}
                    onValueChange={(value) => {
                      setFormData((prev) => ({ ...prev, district: value }));
                      if (errors.district) {
                        setErrors((prev) => ({ ...prev, district: "" }));
                      }
                    }}
                  >
                    <SelectTrigger
                      className={errors.district ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dhaka">Dhaka</SelectItem>
                      <SelectItem value="chittagong">Chittagong</SelectItem>
                      <SelectItem value="sylhet">Sylhet</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.district && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.district}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="division">
                    Division <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.division}
                    onValueChange={(value) => {
                      setFormData((prev) => ({ ...prev, division: value }));
                      if (errors.division) {
                        setErrors((prev) => ({ ...prev, division: "" }));
                      }
                    }}
                  >
                    <SelectTrigger
                      className={errors.division ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select division" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general-admin">
                        General Administration
                      </SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="ict">ICT</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.division && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.division}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Professional Placement */}
          {currentSection === "professional" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Professional Placement
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="currentPosition">
                    Current Position <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="currentPosition"
                    name="currentPosition"
                    value={formData.currentPosition}
                    onChange={handleInputChange}
                    placeholder="e.g., Senior Officer"
                    className={errors.currentPosition ? "border-red-500" : ""}
                  />
                  {errors.currentPosition && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.currentPosition}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="designation">
                    Designation <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.designation}
                    onValueChange={(value) => {
                      setFormData((prev) => ({ ...prev, designation: value }));
                      if (errors.designation) {
                        setErrors((prev) => ({ ...prev, designation: "" }));
                      }
                    }}
                  >
                    <SelectTrigger
                      className={errors.designation ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select designation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="officer">Officer</SelectItem>
                      <SelectItem value="senior-officer">
                        Senior Officer
                      </SelectItem>
                      <SelectItem value="deputy-secretary">
                        Deputy Secretary
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.designation && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.designation}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="ministry">
                    Ministry <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.ministry}
                    onValueChange={(value) => {
                      setFormData((prev) => ({ ...prev, ministry: value }));
                      if (errors.ministry) {
                        setErrors((prev) => ({ ...prev, ministry: "" }));
                      }
                    }}
                  >
                    <SelectTrigger
                      className={errors.ministry ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select ministry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="finance">
                        Ministry of Finance
                      </SelectItem>
                      <SelectItem value="education">
                        Ministry of Education
                      </SelectItem>
                      <SelectItem value="health">Ministry of Health</SelectItem>
                      <SelectItem value="ict">Ministry of ICT</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.ministry && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.ministry}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="departmentDivision">
                    Division/Department
                  </Label>
                  <Input
                    id="departmentDivision"
                    name="departmentDivision"
                    value={formData.departmentDivision}
                    onChange={handleInputChange}
                    placeholder="Enter department/division"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="officeName">Office Name</Label>
                  <Input
                    id="officeName"
                    name="officeName"
                    value={formData.officeName}
                    onChange={handleInputChange}
                    placeholder="Enter office name"
                  />
                </div>
                <div>
                  <Label htmlFor="joiningDate">
                    Joining Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="joiningDate"
                    name="joiningDate"
                    type="date"
                    value={formData.joiningDate}
                    onChange={handleInputChange}
                    className={errors.joiningDate ? "border-red-500" : ""}
                  />
                  {errors.joiningDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.joiningDate}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="serviceType">Service Type</Label>
                <Select
                  value={formData.serviceType}
                  onValueChange={(value) => {
                    setFormData((prev) => ({ ...prev, serviceType: value }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="permanent">Permanent</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="deputation">Deputation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Contact & Identity */}
          {currentSection === "contact" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Contact & Identity
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="officePhone">Office Phone</Label>
                  <Input
                    id="officePhone"
                    name="officePhone"
                    type="tel"
                    value={formData.officePhone}
                    onChange={handleInputChange}
                    placeholder="+880 2 1234 5678"
                  />
                </div>
                <div>
                  <Label htmlFor="personalMobile">
                    Personal Mobile <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="personalMobile"
                    name="personalMobile"
                    type="tel"
                    value={formData.personalMobile}
                    onChange={handleInputChange}
                    placeholder="+880 1XXX XXXXXX"
                    className={errors.personalMobile ? "border-red-500" : ""}
                  />
                  {errors.personalMobile && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.personalMobile}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <Label htmlFor="emergencyContact">
                  Emergency Contact <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="emergencyContact"
                  name="emergencyContact"
                  type="tel"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  placeholder="+880 1XXX XXXXXX"
                  className={errors.emergencyContact ? "border-red-500" : ""}
                />
                {errors.emergencyContact && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.emergencyContact}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john.doe@example.com"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="nidNumber">
                    NID Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="nidNumber"
                    name="nidNumber"
                    value={formData.nidNumber}
                    onChange={handleInputChange}
                    placeholder="10 or 17 digits"
                    className={errors.nidNumber ? "border-red-500" : ""}
                  />
                  {errors.nidNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.nidNumber}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="passportNumber">Passport Number</Label>
                  <Input
                    id="passportNumber"
                    name="passportNumber"
                    value={formData.passportNumber}
                    onChange={handleInputChange}
                    placeholder="Optional"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Training & Research History */}
          {currentSection === "training" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Training & Research History
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="trainingType">Training Type</Label>
                  <Select
                    value={formData.trainingType}
                    onValueChange={(value) => {
                      setFormData((prev) => ({ ...prev, trainingType: value }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="domestic">Domestic</SelectItem>
                      <SelectItem value="foreign">Foreign</SelectItem>
                      <SelectItem value="research">Research</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    name="year"
                    type="number"
                    value={formData.year}
                    onChange={handleInputChange}
                    placeholder="e.g., 2023"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="providerInstitute">Provider/Institute</Label>
                  <Input
                    id="providerInstitute"
                    name="providerInstitute"
                    value={formData.providerInstitute}
                    onChange={handleInputChange}
                    placeholder="Enter provider name"
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="e.g., 3 months"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="completed">Completed</Label>
                  <Select
                    value={formData.completed}
                    onValueChange={(value) => {
                      setFormData((prev) => ({ ...prev, completed: value }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="certification">Certification</Label>
                  <Select
                    value={formData.certification}
                    onValueChange={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        certification: value,
                      }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-between">
          <div className="flex gap-3">
            {currentSectionIndex > 0 && (
              <Button variant="outline" onClick={handlePrevious}>
                ← Previous Section
              </Button>
            )}
          </div>

          <div className="flex gap-3">
            <Button variant="outline">Save as Draft</Button>

            {currentSectionIndex < sections.length - 1 ? (
              <Button
                onClick={handleNext}
                className="bg-primary hover:bg-primary/90"
              >
                Next Section →
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-primary hover:bg-primary/90"
              >
                <Check size={18} className="mr-2" />
                Submit Record
              </Button>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
