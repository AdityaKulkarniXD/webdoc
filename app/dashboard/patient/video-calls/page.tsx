"use client"

import { useState } from "react"
import { Video, Calendar, Clock, Phone, Monitor, AlertCircle, CheckCircle, XCircle, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const videoAppointments = {
  upcoming: [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "2024-01-20",
      time: "2:00 PM - 2:30 PM",
      type: "Follow-up Consultation",
      status: "confirmed",
      startingSoon: true,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Neurology",
      date: "2024-01-21",
      time: "10:00 AM - 10:30 AM",
      type: "Initial Consultation",
      status: "confirmed",
      startingSoon: false,
      image: "/placeholder.svg?height=40&width=40",
    },
  ],
  today: [
    {
      id: 3,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "2024-01-20",
      time: "2:00 PM - 2:30 PM",
      type: "Follow-up Consultation",
      status: "starting-soon",
      minutesUntil: 15,
      image: "/placeholder.svg?height=40&width=40",
    },
  ],
  completed: [
    {
      id: 4,
      doctor: "Dr. Emily Rodriguez",
      specialty: "Dermatology",
      date: "2024-01-18",
      time: "3:00 PM - 3:30 PM",
      type: "Skin Consultation",
      status: "completed",
      duration: "28 minutes",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      doctor: "Dr. James Wilson",
      specialty: "Pediatrics",
      date: "2024-01-15",
      time: "11:00 AM - 11:30 AM",
      type: "Child Health Check",
      status: "completed",
      duration: "25 minutes",
      image: "/placeholder.svg?height=40&width=40",
    },
  ],
  cancelled: [
    {
      id: 6,
      doctor: "Dr. Robert Brown",
      specialty: "Orthopedics",
      date: "2024-01-17",
      time: "4:00 PM - 4:30 PM",
      type: "Joint Pain Consultation",
      status: "cancelled",
      reason: "Doctor unavailable",
      image: "/placeholder.svg?height=40&width=40",
    },
  ],
}

export default function VideoCallsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

  const getStatusBadge = (status: string, minutesUntil?: number) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-teal-100 text-teal-800">Confirmed</Badge>
      case "starting-soon":
        return <Badge className="bg-red-100 text-red-800">Starting in {minutesUntil} mins</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-gray-100 text-gray-800">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-teal-600" />
      case "starting-soon":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-gray-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Video Appointments</h1>
        <p className="text-gray-600">Manage your video consultations with healthcare providers</p>
      </div>

      {/* Quick Actions */}
      <div className="mb-6 flex flex-wrap gap-4">
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule New Appointment
        </Button>
        <Button variant="outline">
          <Monitor className="h-4 w-4 mr-2" />
          Test Connection
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upcoming">Upcoming ({videoAppointments.upcoming.length})</TabsTrigger>
          <TabsTrigger value="today">Today ({videoAppointments.today.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({videoAppointments.completed.length})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({videoAppointments.cancelled.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {videoAppointments.upcoming.map((appointment) => (
            <Card key={appointment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={appointment.image || "/placeholder.svg"} alt={appointment.doctor} />
                      <AvatarFallback>
                        {appointment.doctor
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{appointment.doctor}</h3>
                      <p className="text-teal-600">{appointment.specialty}</p>
                      <p className="text-sm text-gray-600">{appointment.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(appointment.status)}
                      {getStatusBadge(appointment.status)}
                    </div>
                    <p className="text-sm font-medium">{appointment.date}</p>
                    <p className="text-sm text-gray-600">{appointment.time}</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                    <Video className="h-4 w-4 mr-2" />
                    Join Call
                  </Button>
                  <Button size="sm" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Reschedule
                  </Button>
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Doctor
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="today" className="space-y-4">
          {videoAppointments.today.map((appointment) => (
            <Card key={appointment.id} className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={appointment.image || "/placeholder.svg"} alt={appointment.doctor} />
                      <AvatarFallback>
                        {appointment.doctor
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{appointment.doctor}</h3>
                      <p className="text-teal-600">{appointment.specialty}</p>
                      <p className="text-sm text-gray-600">{appointment.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(appointment.status)}
                      {getStatusBadge(appointment.status, appointment.minutesUntil)}
                    </div>
                    <p className="text-sm font-medium">{appointment.time}</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">
                    <Video className="h-4 w-4 mr-2" />
                    Join Now
                  </Button>
                  <Button size="sm" variant="outline">
                    <Monitor className="h-4 w-4 mr-2" />
                    Test Connection
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {videoAppointments.completed.map((appointment) => (
            <Card key={appointment.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={appointment.image || "/placeholder.svg"} alt={appointment.doctor} />
                      <AvatarFallback>
                        {appointment.doctor
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{appointment.doctor}</h3>
                      <p className="text-teal-600">{appointment.specialty}</p>
                      <p className="text-sm text-gray-600">{appointment.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(appointment.status)}
                      {getStatusBadge(appointment.status)}
                    </div>
                    <p className="text-sm font-medium">{appointment.date}</p>
                    <p className="text-sm text-gray-600">Duration: {appointment.duration}</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    View Summary
                  </Button>
                  <Button size="sm" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Follow-up
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          {videoAppointments.cancelled.map((appointment) => (
            <Card key={appointment.id} className="opacity-75">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={appointment.image || "/placeholder.svg"} alt={appointment.doctor} />
                      <AvatarFallback>
                        {appointment.doctor
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{appointment.doctor}</h3>
                      <p className="text-teal-600">{appointment.specialty}</p>
                      <p className="text-sm text-gray-600">{appointment.type}</p>
                      <p className="text-sm text-red-600">Reason: {appointment.reason}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(appointment.status)}
                      {getStatusBadge(appointment.status)}
                    </div>
                    <p className="text-sm font-medium">{appointment.date}</p>
                    <p className="text-sm text-gray-600">{appointment.time}</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                    <Calendar className="h-4 w-4 mr-2" />
                    Reschedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
