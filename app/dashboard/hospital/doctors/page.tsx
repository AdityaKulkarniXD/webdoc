"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Users, Search, Phone, Mail, Calendar, UserPlus, Trash2 } from "lucide-react"
import Link from "next/link"
import { HospitalBreadcrumb } from "@/components/hospital-breadcrumb"

const initialDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    email: "sarah.johnson@hospital.com",
    phone: "+1 (555) 123-4567",
    password: "password123", // In real app, this would be hashed
    patients: 45,
    status: "Active",
    joinDate: "2020-03-15",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    email: "michael.chen@hospital.com",
    phone: "+1 (555) 234-5678",
    password: "password123",
    patients: 38,
    status: "Active",
    joinDate: "2019-08-22",
  },
  {
    id: 3,
    name: "Dr. Emily Davis",
    specialty: "Pediatrics",
    email: "emily.davis@hospital.com",
    phone: "+1 (555) 345-6789",
    password: "password123",
    patients: 52,
    status: "On Leave",
    joinDate: "2021-01-10",
  },
  {
    id: 4,
    name: "Dr. Robert Wilson",
    specialty: "Orthopedics",
    email: "robert.wilson@hospital.com",
    phone: "+1 (555) 456-7890",
    password: "password123",
    patients: 41,
    status: "Active",
    joinDate: "2018-11-05",
  },
  {
    id: 5,
    name: "Dr. Lisa Anderson",
    specialty: "Dermatology",
    email: "lisa.anderson@hospital.com",
    phone: "+1 (555) 567-8901",
    password: "password123",
    patients: 33,
    status: "Active",
    joinDate: "2022-06-18",
  },
]

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState(initialDoctors)
  const [deleteDialog, setDeleteDialog] = useState({ open: false, doctor: null })
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteClick = (doctor) => {
    setDeleteDialog({ open: true, doctor })
  }

  const handleDeleteConfirm = async () => {
    setIsDeleting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Remove doctor from list
    setDoctors(doctors.filter((d) => d.id !== deleteDialog.doctor.id))

    setIsDeleting(false)
    setDeleteDialog({ open: false, doctor: null })

    // Show success message
    alert(`${deleteDialog.doctor.name} has been successfully deleted.`)
  }

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, doctor: null })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="px-4 lg:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3 lg:ml-0 ml-12">
            <Users className="h-5 w-5 text-blue-600" />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Doctors Management</h1>
              <p className="text-xs text-gray-600">Manage all medical staff</p>
            </div>
          </div>
          <Link href="/dashboard/hospital/add-doctor">
            <Button size="sm" className="text-xs">
              <UserPlus className="h-3 w-3 mr-1" />
              Add Doctor
            </Button>
          </Link>
        </div>
      </header>

      {/* Breadcrumb */}
      <HospitalBreadcrumb />

      <div className="p-4 lg:p-6">
        {/* Search and Filter */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-sm">Search & Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-2 top-2.5 h-3 w-3 text-gray-400" />
                <Input placeholder="Search doctors by name or specialty..." className="pl-8 text-xs" />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-48 text-xs">
                  <SelectValue placeholder="Filter by specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="neurology">Neurology</SelectItem>
                  <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="orthopedics">Orthopedics</SelectItem>
                  <SelectItem value="dermatology">Dermatology</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-32 text-xs">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Doctors List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">{doctor.name}</CardTitle>
                  <Badge variant={doctor.status === "Active" ? "secondary" : "outline"} className="text-xs">
                    {doctor.status}
                  </Badge>
                </div>
                <CardDescription className="text-xs">{doctor.specialty}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center text-xs text-gray-600">
                    <Mail className="h-3 w-3 mr-2" />
                    {doctor.email}
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <Phone className="h-3 w-3 mr-2" />
                    {doctor.phone}
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <Calendar className="h-3 w-3 mr-2" />
                    Joined: {new Date(doctor.joinDate).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{doctor.patients}</div>
                    <div className="text-xs text-gray-600">Patients</div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div className="flex space-x-1">
                      <Link href={`/dashboard/hospital/view-doctor/${doctor.id}`}>
                        <Button size="sm" variant="outline" className="text-xs px-2">
                          View
                        </Button>
                      </Link>
                      <Link href={`/dashboard/hospital/edit-doctor/${doctor.id}`}>
                        <Button size="sm" className="text-xs px-2">
                          Edit
                        </Button>
                      </Link>
                    </div>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="text-xs w-full"
                      onClick={() => handleDeleteClick(doctor)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-blue-600">{doctors.length}</div>
              <div className="text-xs text-gray-600">Total Doctors</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-green-600">
                {doctors.filter((d) => d.status === "Active").length}
              </div>
              <div className="text-xs text-gray-600">Active</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-orange-600">
                {doctors.filter((d) => d.status === "On Leave").length}
              </div>
              <div className="text-xs text-gray-600">On Leave</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-purple-600">8</div>
              <div className="text-xs text-gray-600">Specialties</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onOpenChange={handleDeleteCancel}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Doctor</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{deleteDialog.doctor?.name}</strong>? This action cannot be undone
              and will remove all associated data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleDeleteCancel} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete Doctor"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
