"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Users,
  Calendar,
  Video,
  Menu,
  X,
  UserIcon as UserMd,
  LogOut,
  Phone,
  ChevronDown,
  FileText,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard/doctor", icon: LayoutDashboard },
  { name: "All Appointments", href: "/dashboard/doctor/appointments", icon: Calendar },
  { name: "Patient Management", href: "/dashboard/doctor/patients", icon: Users },
  { name: "View Reports", href: "/dashboard/doctor/reports", icon: FileText },
]

const currentAppointments = [
  {
    id: 1,
    patient: "John Smith",
    time: "9:00 AM",
    type: "Video Call",
    status: "Starting Soon",
    urgent: true,
  },
  {
    id: 2,
    patient: "Maria Garcia",
    time: "10:30 AM",
    type: "In-Person",
    status: "Upcoming",
    urgent: false,
  },
  {
    id: 3,
    patient: "Robert Johnson",
    time: "2:00 PM",
    type: "Video Call",
    status: "Scheduled",
    urgent: false,
  },
  {
    id: 4,
    patient: "Emma Wilson",
    time: "3:30 PM",
    type: "Phone Call",
    status: "Scheduled",
    urgent: false,
  },
]

export function DoctorSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showAppointments, setShowAppointments] = useState(false)
  const pathname = usePathname()

  // Add safety check
  if (!pathname) {
    return null
  }

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="bg-green-600 p-2 rounded-lg">
              <UserMd className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">Doctor Portal</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    pathname === item.href
                      ? "bg-green-100 text-green-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Current Appointments - Collapsible */}
        <div className="mt-6 px-4">
          <Button
            variant="ghost"
            className="w-full justify-between text-sm font-medium text-gray-900 mb-3 p-0 h-auto"
            onClick={() => setShowAppointments(!showAppointments)}
          >
            Today's Appointments
            <ChevronDown className={cn("h-4 w-4 transition-transform", showAppointments && "rotate-180")} />
          </Button>
          {showAppointments && (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {currentAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className={cn(
                    "p-3 rounded-lg border text-xs",
                    appointment.urgent ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200",
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-900">{appointment.patient}</p>
                    {appointment.urgent && (
                      <Badge className="bg-green-600 text-white text-xs">{appointment.status}</Badge>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{appointment.time}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">{appointment.type}</span>
                    {appointment.type === "Video Call" && appointment.urgent && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs h-6">
                        <Video className="h-3 w-3 mr-1" />
                        Join
                      </Button>
                    )}
                    {appointment.type === "Phone Call" && (
                      <Button size="sm" variant="outline" className="text-xs h-6">
                        <Phone className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <Link href="/">
            <Button variant="outline" className="w-full text-sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </Link>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-80 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-white border-r shadow-sm">
          <div className="flex items-center px-4 py-4 border-b">
            <div className="bg-green-600 p-2 rounded-lg">
              <UserMd className="h-5 w-5 text-white" />
            </div>
            <span className="ml-2 text-lg font-semibold text-gray-900">Doctor Portal</span>
          </div>

          {/* Navigation */}
          <nav className="mt-4 px-4">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      pathname === item.href
                        ? "bg-green-100 text-green-700"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                    )}
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Current Appointments - Collapsible */}
          <div className="mt-6 px-4 flex-1">
            <Button
              variant="ghost"
              className="w-full justify-between text-sm font-medium text-gray-900 mb-3 p-0 h-auto"
              onClick={() => setShowAppointments(!showAppointments)}
            >
              Today's Appointments
              <ChevronDown className={cn("h-4 w-4 transition-transform", showAppointments && "rotate-180")} />
            </Button>
            {showAppointments && (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {currentAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className={cn(
                      "p-3 rounded-lg border text-xs",
                      appointment.urgent ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200",
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-900">{appointment.patient}</p>
                      {appointment.urgent && (
                        <Badge className="bg-green-600 text-white text-xs">{appointment.status}</Badge>
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{appointment.time}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">{appointment.type}</span>
                      {appointment.type === "Video Call" && appointment.urgent && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs h-6">
                          <Video className="h-3 w-3 mr-1" />
                          Join
                        </Button>
                      )}
                      {appointment.type === "Phone Call" && (
                        <Button size="sm" variant="outline" className="text-xs h-6">
                          <Phone className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t">
            <Link href="/">
              <Button variant="outline" className="w-full text-sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden">
        <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-40" onClick={() => setSidebarOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </>
  )
}
