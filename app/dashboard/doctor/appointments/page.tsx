"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Search, Video, Phone, FileText, Clock } from "lucide-react"
import { DoctorBreadcrumb } from "@/components/doctor-breadcrumb"

const appointments = [
  {
    id: 1,
    patient: "John Smith",
    time: "9:00 AM",
    date: "2024-12-22",
    type: "Video Call",
    status: "Upcoming",
    reason: "Cardiology Follow-up",
    duration: "30 min",
  },
  {
    id: 2,
    patient: "Maria Garcia",
    time: "10:30 AM",
    date: "2024-12-22",
    type: "In-Person",
    status: "Upcoming",
    reason: "Regular Checkup",
    duration: "45 min",
  },
  {
    id: 3,
    patient: "Robert Johnson",
    time: "2:00 PM",
    date: "2024-12-22",
    type: "Video Call",
    status: "Scheduled",
    reason: "Consultation",
    duration: "30 min",
  },
  {
    id: 4,
    patient: "Emma Wilson",
    time: "3:30 PM",
    date: "2024-12-22",
    type: "Phone Call",
    status: "Scheduled",
    reason: "Follow-up Discussion",
    duration: "15 min",
  },
  {
    id: 5,
    patient: "David Brown",
    time: "4:00 PM",
    date: "2024-12-22",
    type: "In-Person",
    status: "Scheduled",
    reason: "Physical Examination",
    duration: "60 min",
  },
]

export default function DoctorAppointments() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="px-4 lg:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3 lg:ml-0 ml-12">
            <Calendar className="h-5 w-5 text-green-600" />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">All Appointments</h1>
              <p className="text-xs text-gray-600">Manage your scheduled consultations</p>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <DoctorBreadcrumb />

      <div className="p-4 lg:p-6">
        {/* Search and Filter */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-sm">Search & Filter Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search by patient name..." className="pl-10 text-xs" />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-48 text-xs">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="video">Video Call</SelectItem>
                  <SelectItem value="person">In-Person</SelectItem>
                  <SelectItem value="phone">Phone Call</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-40 text-xs">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      {appointment.type === "Video Call" && <Video className="h-4 w-4 text-green-600" />}
                      {appointment.type === "Phone Call" && <Phone className="h-4 w-4 text-green-600" />}
                      {appointment.type === "In-Person" && <Calendar className="h-4 w-4 text-green-600" />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{appointment.patient}</h3>
                      <p className="text-gray-600 text-xs">{appointment.reason}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {appointment.time} - {appointment.duration}
                        </span>
                        <span className="text-xs text-gray-500">{new Date(appointment.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Badge variant={appointment.status === "Upcoming" ? "default" : "secondary"} className="text-xs">
                      {appointment.status}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {appointment.type}
                    </Badge>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        <FileText className="h-3 w-3 mr-1" />
                        Records
                      </Button>
                      {appointment.type === "Video Call" && appointment.status === "Upcoming" && (
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-xs"
                          onClick={() => window.open(`/dashboard/doctor/video-call/${appointment.id}`, "_blank")}
                        >
                          <Video className="h-3 w-3 mr-1" />
                          Join Call
                        </Button>
                      )}
                      {appointment.type !== "Video Call" && (
                        <Button
                          size="sm"
                          className="text-xs"
                          onClick={() => window.open(`/dashboard/doctor/video-call/${appointment.id}`, "_blank")}
                        >
                          Start Consultation
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-green-600">8</div>
              <div className="text-xs text-gray-600">Today's Appointments</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-blue-600">5</div>
              <div className="text-xs text-gray-600">Video Calls</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-purple-600">2</div>
              <div className="text-xs text-gray-600">In-Person</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-orange-600">1</div>
              <div className="text-xs text-gray-600">Phone Calls</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
