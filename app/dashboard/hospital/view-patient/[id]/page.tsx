"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Droplets, Users } from "lucide-react"
import Link from "next/link"
import { HospitalBreadcrumb } from "@/components/hospital-breadcrumb"
import { useParams } from "next/navigation"

// Mock data - in real app, this would come from API
const patientsData = {
  "1": {
    id: 1,
    name: "John Smith",
    age: 45,
    email: "john.smith@email.com",
    phone: "+1 (555) 111-2222",
    bloodGroup: "A+",
    dob: "1978-03-15",
    gender: "Male",
    address: "123 Main St, New York, NY 10001",
    status: "Active Treatment",
    registrationDate: "2023-06-15",
  },
  "2": {
    id: 2,
    name: "Maria Garcia",
    age: 32,
    email: "maria.garcia@email.com",
    phone: "+1 (555) 222-3333",
    bloodGroup: "O+",
    dob: "1991-07-22",
    gender: "Female",
    address: "456 Oak Ave, Los Angeles, CA 90210",
    status: "Follow-up",
    registrationDate: "2024-01-20",
  },
  "3": {
    id: 3,
    name: "Robert Johnson",
    age: 58,
    email: "robert.johnson@email.com",
    phone: "+1 (555) 333-4444",
    bloodGroup: "B+",
    dob: "1965-11-08",
    gender: "Male",
    address: "789 Pine St, Chicago, IL 60601",
    status: "Active Treatment",
    registrationDate: "2023-03-10",
  },
  "4": {
    id: 4,
    name: "Emma Wilson",
    age: 28,
    email: "emma.wilson@email.com",
    phone: "+1 (555) 444-5555",
    bloodGroup: "AB+",
    dob: "1995-04-12",
    gender: "Female",
    address: "321 Elm St, Miami, FL 33101",
    status: "Completed",
    registrationDate: "2024-08-05",
  },
  "5": {
    id: 5,
    name: "David Brown",
    age: 41,
    email: "david.brown@email.com",
    phone: "+1 (555) 555-6666",
    bloodGroup: "O-",
    dob: "1982-09-30",
    gender: "Male",
    address: "654 Maple Ave, Seattle, WA 98101",
    status: "Active Treatment",
    registrationDate: "2024-02-28",
  },
}

export default function ViewPatientPage() {
  const params = useParams()
  const patientId = params.id as string
  const [patient, setPatient] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading patient data
    const loadPatientData = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))

      const patientData = patientsData[patientId as keyof typeof patientsData]
      setPatient(patientData || null)
      setLoading(false)
    }

    loadPatientData()
  }, [patientId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Patient Not Found</h2>
          <p className="text-gray-600 mb-4">The requested patient could not be found.</p>
          <Link href="/dashboard/hospital/patients">
            <Button>Back to Patients</Button>
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
            <Link href="/dashboard/hospital/patients">
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <User className="h-5 w-5 text-purple-600" />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Patient Profile</h1>
              <p className="text-xs text-gray-600">View patient information and medical records</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Link href={`/dashboard/hospital/edit-patient/${patient.id}`}>
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
          {/* Patient Header Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <User className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{patient.name}</CardTitle>
                    <CardDescription className="text-sm">Age: {patient.age} years old</CardDescription>
                  </div>
                </div>
                <Badge
                  variant={
                    patient.status === "Active Treatment"
                      ? "default"
                      : patient.status === "Follow-up"
                        ? "secondary"
                        : "outline"
                  }
                  className="text-sm"
                >
                  {patient.status}
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Patient Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <User className="h-5 w-5 mr-2 text-purple-600" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <p className="text-sm text-gray-900">{patient.name}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Age</label>
                  <p className="text-sm text-gray-900">{patient.age} years old</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{patient.email}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{patient.phone}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Blood Group</label>
                  <div className="flex items-center space-x-2">
                    <Droplets className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{patient.bloodGroup}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{new Date(patient.dob).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Gender</label>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{patient.gender}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <Badge
                    variant={
                      patient.status === "Active Treatment"
                        ? "default"
                        : patient.status === "Follow-up"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {patient.status}
                  </Badge>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Address</label>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{patient.address}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Registration Date</label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">
                      {new Date(patient.registrationDate).toLocaleDateString()}
                    </span>
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
