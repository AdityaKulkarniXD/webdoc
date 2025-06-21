"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, UserCheck, Loader2 } from "lucide-react"
import Link from "next/link"
import { HospitalBreadcrumb } from "@/components/hospital-breadcrumb"
import { useParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data - in real app, this would come from API
const patientsData = {
  "1": {
    id: 1,
    name: "John Smith",
    age: 45,
    email: "john.smith@email.com",
    password: "password123",
    phone: "+1 (555) 111-2222",
    bloodGroup: "A+",
    dob: "1978-03-15",
    gender: "Male",
    address: "123 Main St, New York, NY 10001",
  },
  "2": {
    id: 2,
    name: "Maria Garcia",
    age: 32,
    email: "maria.garcia@email.com",
    password: "password123",
    phone: "+1 (555) 222-3333",
    bloodGroup: "O+",
    dob: "1991-07-22",
    gender: "Female",
    address: "456 Oak Ave, Los Angeles, CA 90210",
  },
  "3": {
    id: 3,
    name: "Robert Johnson",
    age: 58,
    email: "robert.johnson@email.com",
    password: "password123",
    phone: "+1 (555) 333-4444",
    bloodGroup: "B+",
    dob: "1965-11-08",
    gender: "Male",
    address: "789 Pine St, Chicago, IL 60601",
  },
  "4": {
    id: 4,
    name: "Emma Wilson",
    age: 28,
    email: "emma.wilson@email.com",
    password: "password123",
    phone: "+1 (555) 444-5555",
    bloodGroup: "AB+",
    dob: "1995-04-12",
    gender: "Female",
    address: "321 Elm St, Miami, FL 33101",
  },
  "5": {
    id: 5,
    name: "David Brown",
    age: 41,
    email: "david.brown@email.com",
    password: "password123",
    phone: "+1 (555) 555-6666",
    bloodGroup: "O-",
    dob: "1982-09-30",
    gender: "Male",
    address: "654 Maple Ave, Seattle, WA 98101",
  },
}

export default function EditPatientPage() {
  const params = useParams()
  const patientId = params.id as string

  const [isLoading, setIsLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    phone: "",
    bloodGroup: "",
    dob: "",
    gender: "",
    address: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    phone: "",
    bloodGroup: "",
    dob: "",
    gender: "",
    address: "",
  })

  useEffect(() => {
    // Simulate loading patient data
    const loadPatientData = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))

      const patient = patientsData[patientId as keyof typeof patientsData]
      if (patient) {
        setFormData({
          name: patient.name,
          age: patient.age.toString(),
          email: patient.email,
          password: patient.password,
          phone: patient.phone,
          bloodGroup: patient.bloodGroup,
          dob: patient.dob,
          gender: patient.gender,
          address: patient.address,
        })
      }
      setLoading(false)
    }

    loadPatientData()
  }, [patientId])

  const validateForm = () => {
    const newErrors = {
      name: "",
      age: "",
      email: "",
      password: "",
      phone: "",
      bloodGroup: "",
      dob: "",
      gender: "",
      address: "",
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (!formData.age.trim()) {
      newErrors.age = "Age is required"
    } else if (isNaN(Number(formData.age)) || Number(formData.age) < 1 || Number(formData.age) > 120) {
      newErrors.age = "Please enter a valid age (1-120)"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^[+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-$$$$]/g, ""))) {
      newErrors.phone = "Please enter a valid phone number"
    }

    if (!formData.bloodGroup) {
      newErrors.bloodGroup = "Blood group is required"
    }

    if (!formData.dob) {
      newErrors.dob = "Date of Birth is required"
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required"
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required"
    } else if (formData.address.trim().length < 10) {
      newErrors.address = "Address must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.values(newErrors).every((error) => error === "")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Updating patient:", formData)
      alert("Patient updated successfully!")
    } catch (error) {
      alert("Failed to update patient. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b shadow-sm">
        <div className="px-4 lg:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3 lg:ml-0 ml-12">
            <UserCheck className="h-5 w-5 text-blue-600" />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Edit Patient</h1>
              <p className="text-xs text-gray-600">Update patient information</p>
            </div>
          </div>
          <Link href="/dashboard/hospital/patients">
            <Button variant="outline" size="sm" className="text-xs">
              <ArrowLeft className="h-3 w-3 mr-1" />
              Back to Patients
            </Button>
          </Link>
        </div>
      </header>

      <HospitalBreadcrumb />

      <div className="p-4 lg:p-6">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Patient Information</CardTitle>
              <CardDescription>Update the patient's details below</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter patient's full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter patient's age"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    className={errors.age ? "border-red-500" : ""}
                    min="1"
                    max="120"
                  />
                  {errors.age && <p className="text-xs text-red-500">{errors.age}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter patient's email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={errors.password ? "border-red-500" : ""}
                  />
                  {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter patient's phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bloodGroup">Blood Group *</Label>
                  <Select onValueChange={(value) => handleInputChange("bloodGroup", value)}>
                    <SelectTrigger className={errors.bloodGroup ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select blood group" defaultValue={formData.bloodGroup} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.bloodGroup && <p className="text-xs text-red-500">{errors.bloodGroup}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleInputChange("dob", e.target.value)}
                    className={errors.dob ? "border-red-500" : ""}
                  />
                  {errors.dob && <p className="text-xs text-red-500">{errors.dob}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select gender" defaultValue={formData.gender} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && <p className="text-xs text-red-500">{errors.gender}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter patient's complete address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className={errors.address ? "border-red-500" : ""}
                    rows={3}
                  />
                  {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button type="submit" disabled={isLoading} className="flex-1">
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Updating Patient...
                      </>
                    ) : (
                      <>
                        <UserCheck className="h-4 w-4 mr-2" />
                        Update Patient
                      </>
                    )}
                  </Button>
                  <Link href="/dashboard/hospital/patients">
                    <Button type="button" variant="outline" className="px-8">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
