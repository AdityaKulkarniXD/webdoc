"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, Mail, Phone, Calendar, Stethoscope } from "lucide-react"
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
    specialization: "Cardiology",
    status: "Active",
    joinDate: "2020-03-15",
  },
  "2": {
    id: 2,
    name: "Dr. Michael Chen",
    email: "michael.chen@hospital.com",
    phone: "+1 (555) 234-5678",
    specialization: "Neurology",
    status: "Active",
    joinDate: "2019-08-22",
  },
  "3": {
    id: 3,
    name: "Dr. Emily Davis",
    email: "emily.davis@hospital.com",
    phone: "+1 (555) 345-6789",
    specialization: "Pediatrics",
    status: "On Leave",
    joinDate: "2021-01-10",
  },
  "4": {
    id: 4,
    name: "Dr. Robert Wilson",
    email: "robert.wilson@hospital.com",
    phone: "+1 (555) 456-7890",
    specialization: "Orthopedics",
    status: "Active",
    joinDate: "2018-11-05",
  },
  "5": {
    id: 5,
    name: "Dr. Lisa Anderson",
    email: "lisa.anderson@hospital.com",
    phone: "+1 (555) 567-8901",
    specialization: "Dermatology",
    status: "Active",
    joinDate: "2022-06-18",
  },
}

export default function ViewDoctorPage() {
  const params = useParams()
  const doctorId = params.id as string
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading doctor data
    const loadDoctorData = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))

      const doctorData = doctorsData[doctorId as keyof typeof doctorsData]
      setDoctor(doctorData || null)
      setLoading(false)
    }

    loadDoctorData()
  }, [doctorId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Doctor Not Found</h2>
          <p className="text-gray-600 mb-4">The requested doctor could not be found.</p>
          <Link href="/dashboard/hospital/doctors">
            <Button>Back to Doctors</Button>
          </Link>
        </div>
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
            <User className="h-5 w-5 text-blue-600" />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Doctor Profile</h1>
              <p className="text-xs text-gray-600">View doctor information and details</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Link href={`/dashboard/hospital/edit-doctor/${doctor.id}`}>
              <Button size="sm" className="text-xs">
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <HospitalBreadcrumb />

      <div className="p-4 lg:p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Doctor Header Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{doctor.name}</CardTitle>
                    <CardDescription className="text-sm">{doctor.specialization}</CardDescription>
                  </div>
                </div>
                <Badge variant={doctor.status === "Active" ? "secondary" : "outline"} className="text-sm">
                  {doctor.status}
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Doctor Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Doctor Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <p className="text-sm text-gray-900">{doctor.name}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{doctor.email}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{doctor.phone}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Specialization</label>
                  <div className="flex items-center space-x-2">
                    <Stethoscope className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{doctor.specialization}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <Badge variant={doctor.status === "Active" ? "secondary" : "outline"}>{doctor.status}</Badge>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Join Date</label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{new Date(doctor.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
