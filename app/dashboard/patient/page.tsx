"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Heart,
  FileText,
  Video,
  Activity,
  Users,
  TrendingUp,
} from "lucide-react"

interface Appointment {
  doctorName: string
  date: string
  time: string
  status: string
  specialization: string
}

export default function PatientDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("patientToken")
        const res = await fetch("http://localhost:3000/api/v1/patient/appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await res.json()
        if (data.success) {
          setAppointments(data.appointments || [])
        } else {
          console.warn("❌ Failed to load appointments", data.message)
        }
      } catch (err) {
        console.error("🚨 Error fetching appointments", err)
      }
    }

    fetchAppointments()
  }, [])

  const upcoming = appointments.filter(
    (appt) => new Date(`${appt.date}T${appt.time}`) > new Date()
  )

  const nextAppt = upcoming
    .sort(
      (a, b) =>
        new Date(`${a.date}T${a.time}`).getTime() -
        new Date(`${b.date}T${b.time}`).getTime()
    )[0]

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Patient Dashboard</h1>
        <p className="text-gray-600">Welcome back, Jane! Here's your health overview.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcoming.length}</div>
            <p className="text-xs text-muted-foreground">
              {nextAppt
                ? `Next: ${new Date(nextAppt.date).toLocaleDateString()} ${nextAppt.time}`
                : "No upcoming"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Score</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">85</div>
            <p className="text-xs text-muted-foreground">Good health status</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medical Records</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Documents available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Video Consultations</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">This year</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Activity
              <Button size="sm" variant="outline">
                <Activity className="h-4 w-4 mr-2" />
                View All
              </Button>
            </CardTitle>
            <CardDescription>Your latest medical activities and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.length > 0 ? (
                appointments.slice(0, 4).map((appt, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg border-l-4 ${
                      appt.status === "completed"
                        ? "bg-teal-50 border-teal-500"
                        : appt.status === "cancelled"
                        ? "bg-red-50 border-red-500"
                        : "bg-orange-50 border-orange-500"
                    }`}
                  >
                    <div>
                      <p className="font-medium text-sm">
                        Appointment with {appt.doctorName}
                      </p>
                      <p className="text-xs text-gray-600">
                        {new Date(appt.date).toLocaleDateString()} - {appt.time}
                      </p>
                      <p className="text-xs text-gray-500">{appt.specialization}</p>
                    </div>
                    <Badge
                      className={`${
                        appt.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : appt.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No recent appointments found.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Health Tracking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Health Metrics
            </CardTitle>
            <CardDescription>Your vital signs and health indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <Heart className="h-6 w-6 text-red-500 mx-auto mb-2" />
                <div className="text-xl font-bold text-red-600">72</div>
                <div className="text-xs text-gray-600">Heart Rate (bpm)</div>
              </div>

              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Activity className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                <div className="text-xl font-bold text-blue-600">120/80</div>
                <div className="text-xs text-gray-600">Blood Pressure</div>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="h-6 w-6 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-xs">
                  98
                </div>
                <div className="text-xl font-bold text-green-600">98.6°F</div>
                <div className="text-xs text-gray-600">Temperature</div>
              </div>

              <div className="text-center p-4 bg-indigo-50 rounded-lg">
                <div className="h-6 w-6 bg-indigo-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-xs">
                  O2
                </div>
                <div className="text-xl font-bold text-indigo-600">98%</div>
                <div className="text-xs text-gray-600">Oxygen Level</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 bg-teal-600 hover:bg-teal-700 flex flex-col items-center justify-center">
                <Users className="h-6 w-6 mb-2" />
                <span className="text-sm">Find Doctors</span>
              </Button>

              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center border-teal-200 hover:bg-teal-50"
              >
                <Calendar className="h-6 w-6 mb-2 text-teal-600" />
                <span className="text-sm text-teal-600">Book Appointment</span>
              </Button>

              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center border-teal-200 hover:bg-teal-50"
              >
                <FileText className="h-6 w-6 mb-2 text-teal-600" />
                <span className="text-sm text-teal-600">View Records</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}