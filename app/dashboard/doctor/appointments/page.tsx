"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Search, Video, Phone, FileText, Clock, Loader2 } from "lucide-react"
import { DoctorBreadcrumb } from "@/components/doctor-breadcrumb"

interface Appointment {
  appointmentId: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  specialization: string
  date: string
  time: string
  reason: string
  status: string
  bookedAt: string
}

interface ApiResponse {
  success: number
  message: string
  appointments: Appointment[]
}

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const router = useRouter()

  // Fetch appointments on component mount
  useEffect(() => {
    fetchAppointments()
  }, [])

  // Filter appointments when search term or filters change
  useEffect(() => {
    filterAppointments()
  }, [appointments, searchTerm, statusFilter, typeFilter])

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("doctorToken")
      
      if (!token) {
        router.push("/login/doctor")
        return
      }

      const response = await fetch("http://localhost:3000/api/v1/doctor/appointments", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("doctorToken")
          router.push("/login/doctor")
          return
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: ApiResponse = await response.json()
      
      if (data.success) {
        setAppointments(data.appointments)
        setError(null)
      } else {
        setError(data.message || "Failed to fetch appointments")
      }
    } catch (err) {
      setError("Failed to fetch appointments. Please try again.")
      console.error("Error fetching appointments:", err)
    } finally {
      setLoading(false)
    }
  }

  const filterAppointments = () => {
    let filtered = appointments

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(appointment =>
        appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.reason.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(appointment => 
        appointment.status.toLowerCase() === statusFilter.toLowerCase()
      )
    }

    // Type filter (for now we'll classify all as video calls, you can modify this logic)
    if (typeFilter !== "all") {
      // Since your API doesn't have appointment type, we'll assume all are video calls for now
      // You can modify this logic based on your requirements
      if (typeFilter === "video") {
        filtered = filtered // Show all for video calls
      } else {
        filtered = [] // Hide all for other types since we don't have that data
      }
    }

    setFilteredAppointments(filtered)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "booked":
      case "upcoming":
        return "default"
      case "completed":
        return "secondary"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusDisplayText = (status: string) => {
    switch (status.toLowerCase()) {
      case "booked":
        return "Upcoming"
      default:
        return status.charAt(0).toUpperCase() + status.slice(1)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const isUpcoming = (appointment: Appointment) => {
    const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`)
    const now = new Date()
    return appointmentDateTime > now && appointment.status.toLowerCase() === "booked"
  }

  const handleJoinCall = (appointmentId: string) => {
    window.open(`/dashboard/doctor/video-call/${appointmentId}`, "_blank")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
          <Button onClick={fetchAppointments} className="bg-green-600 hover:bg-green-700">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

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
          <Button 
            onClick={fetchAppointments}
            variant="outline"
            size="sm"
            className="text-xs"
          >
            Refresh
          </Button>
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
                <Input 
                  placeholder="Search by patient name or reason..." 
                  className="pl-10 text-xs"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
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
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40 text-xs">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="booked">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        {filteredAppointments.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No appointments found</p>
              <p className="text-sm text-gray-500 mt-2">
                {appointments.length === 0 
                  ? "You don't have any appointments scheduled yet."
                  : "Try adjusting your search or filter criteria."
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <Card key={appointment.appointmentId} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 p-3 rounded-full">
                        <Video className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{appointment.patientName}</h3>
                        <p className="text-gray-600 text-xs">{appointment.reason}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatTime(appointment.time)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDate(appointment.date)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant={getStatusColor(appointment.status)} 
                        className="text-xs"
                      >
                        {getStatusDisplayText(appointment.status)}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Video Call
                      </Badge>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="text-xs">
                          <FileText className="h-3 w-3 mr-1" />
                          Records
                        </Button>
                        {isUpcoming(appointment) && (
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-xs"
                            onClick={() => handleJoinCall(appointment.appointmentId)}
                          >
                            <Video className="h-3 w-3 mr-1" />
                            Join Call
                          </Button>
                        )}
                        {!isUpcoming(appointment) && appointment.status.toLowerCase() === "booked" && (
                          <Button
                            size="sm"
                            className="text-xs"
                            onClick={() => handleJoinCall(appointment.appointmentId)}
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
        )}

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-green-600">
                {appointments.filter(apt => 
                  new Date(apt.date).toDateString() === new Date().toDateString()
                ).length}
              </div>
              <div className="text-xs text-gray-600">Today's Appointments</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-blue-600">
                {appointments.filter(apt => apt.status.toLowerCase() === "booked").length}
              </div>
              <div className="text-xs text-gray-600">Upcoming</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-purple-600">
                {appointments.filter(apt => apt.status.toLowerCase() === "completed").length}
              </div>
              <div className="text-xs text-gray-600">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-orange-600">
                {appointments.length}
              </div>
              <div className="text-xs text-gray-600">Total</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}