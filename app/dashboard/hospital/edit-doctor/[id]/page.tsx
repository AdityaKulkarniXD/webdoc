"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserCheck, ArrowLeft, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { HospitalBreadcrumb } from "@/components/hospital-breadcrumb"
import { useParams } from "next/navigation"

// Mock data - in real app, this would come from API
const doctorsData = {
  "1": {
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@hospital.com",
    phone: "+1 (555) 123-4567",
    specialization: "cardiology",
    password: "password123",
  },
  "2": {
    id: 2,
    name: "Dr. Michael Chen",
    email: "michael.chen@hospital.com",
    phone: "+1 (555) 234-5678",
    specialization: "neurology",
    password: "password123",
  },
  "3": {
    id: 3,
    name: "Dr. Emily Davis",
    email: "emily.davis@hospital.com",
    phone: "+1 (555) 345-6789",
    specialization: "pediatrics",
    password: "password123",
  },
  "4": {
    id: 4,
    name: "Dr. Robert Wilson",
    email: "robert.wilson@hospital.com",
    phone: "+1 (555) 456-7890",
    specialization: "orthopedics",
    password: "password123",
  },
  "5": {
    id: 5,
    name: "Dr. Lisa Anderson",
    email: "lisa.anderson@hospital.com",
    phone: "+1 (555) 567-8901",
    specialization: "dermatology",
    password: "password123",
  },
}

interface FormData {
  name: string
  email: string
  password: string
  specialization: string
  phone: string
}

interface FormErrors {
  name?: string
  email?: string
  password?: string
  specialization?: string
  phone?: string
}

export default function EditDoctorPage() {
  const params = useParams()
  const doctorId = params.id as string

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    specialization: "",
    phone: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading doctor data
    const loadDoctorData = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))

      const doctor = doctorsData[doctorId as keyof typeof doctorsData]
      if (doctor) {
        setFormData({
          name: doctor.name,
          email: doctor.email,
          password: doctor.password,
          specialization: doctor.specialization,
          phone: doctor.phone,
        })
      }
      setLoading(false)
    }

    loadDoctorData()
  }, [doctorId])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (!formData.specialization) {
      newErrors.specialization = "Specialization is required"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\+?[\d\s\-$$$$]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Updating doctor:", formData)
      alert("Doctor updated successfully!")
    } catch (error) {
      console.error("Error updating doctor:", error)
      alert("Failed to update doctor. Please try again.")
    } finally {
      setIsSubmitting(false)
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
            <Link href="/dashboard/hospital/doctors">
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <UserCheck className="h-5 w-5 text-blue-600" />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Edit Doctor</h1>
              <p className="text-xs text-gray-600">Update doctor information</p>
            </div>
          </div>
        </div>
      </header>

      <HospitalBreadcrumb />

      <div className="p-4 lg:p-6">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Doctor Information</CardTitle>
              <CardDescription className="text-xs">Update the doctor's information below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Dr. John Doe"
                    className={`text-xs ${errors.name ? "border-red-500" : ""}`}
                  />
                  {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="doctor@hospital.com"
                    className={`text-xs ${errors.email ? "border-red-500" : ""}`}
                  />
                  {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-xs">
                    Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      placeholder="Enter secure password"
                      className={`text-xs pr-10 ${errors.password ? "border-red-500" : ""}`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                  {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialization" className="text-xs">
                    Specialization *
                  </Label>
                  <Select
                    value={formData.specialization}
                    onValueChange={(value) => handleInputChange("specialization", value)}
                  >
                    <SelectTrigger className={`text-xs ${errors.specialization ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="neurology">Neurology</SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="orthopedics">Orthopedics</SelectItem>
                      <SelectItem value="dermatology">Dermatology</SelectItem>
                      <SelectItem value="psychiatry">Psychiatry</SelectItem>
                      <SelectItem value="general">General Medicine</SelectItem>
                      <SelectItem value="surgery">Surgery</SelectItem>
                      <SelectItem value="radiology">Radiology</SelectItem>
                      <SelectItem value="anesthesiology">Anesthesiology</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.specialization && <p className="text-xs text-red-500">{errors.specialization}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs">
                    Phone *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className={`text-xs ${errors.phone ? "border-red-500" : ""}`}
                  />
                  {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button type="submit" className="flex-1 text-xs" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                        Updating Doctor...
                      </>
                    ) : (
                      <>
                        <UserCheck className="h-3 w-3 mr-2" />
                        Update Doctor
                      </>
                    )}
                  </Button>
                  <Link href="/dashboard/hospital/doctors" className="flex-1">
                    <Button type="button" variant="outline" className="w-full text-xs" disabled={isSubmitting}>
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
