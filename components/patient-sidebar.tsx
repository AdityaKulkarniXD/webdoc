"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Users, FileText, Video, Settings, ChevronDown, Calendar, Clock, Heart, User, LogOut, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function PatientSidebar() {
  const pathname = usePathname()
  const [showUpcomingCalls, setShowUpcomingCalls] = useState(false)

  const isActive = (path: string) => pathname === path

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg lg:block">
      <div className="flex h-full flex-col">
        {/* Header - matching hospital portal exactly */}
        <div className="flex h-16 items-center justify-center border-b border-gray-200 bg-teal-600">
          <div className="flex items-center space-x-2">
            <div className="bg-white p-2 rounded-lg">
              <Heart className="h-6 w-6 text-teal-600" />
            </div>
            <div className="text-white">
              <h2 className="text-lg font-bold">Patient Portal</h2>
            </div>
          </div>
        </div>

        {/* User Info - matching hospital portal exactly */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
              <User className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Jane Smith</p>
              <p className="text-xs text-gray-500">Patient ID: P001</p>
            </div>
          </div>
        </div>

        {/* Navigation - matching hospital portal exactly */}
        <nav className="flex-1 space-y-1 p-4">
          <Link href="/dashboard/patient">
            <div
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive("/dashboard/patient")
                  ? "bg-teal-100 text-teal-700"
                  : "text-gray-700 hover:bg-teal-50 hover:text-teal-700"
              }`}
            >
              <Heart className="mr-3 h-5 w-5 flex-shrink-0" />
              Dashboard
            </div>
          </Link>

          <Link href="/dashboard/patient/doctors">
            <div
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive("/dashboard/patient/doctors")
                  ? "bg-teal-100 text-teal-700"
                  : "text-gray-700 hover:bg-teal-50 hover:text-teal-700"
              }`}
            >
              <Users className="mr-3 h-5 w-5 flex-shrink-0" />
              Find Doctors
            </div>
          </Link>

          <Link href="/dashboard/patient/medical-history">
            <div
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive("/dashboard/patient/medical-history")
                  ? "bg-teal-100 text-teal-700"
                  : "text-gray-700 hover:bg-teal-50 hover:text-teal-700"
              }`}
            >
              <FileText className="mr-3 h-5 w-5 flex-shrink-0" />
              Medical History
            </div>
          </Link>

          <Link href="/dashboard/patient/video-calls">
            <div
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive("/dashboard/patient/video-calls")
                  ? "bg-teal-100 text-teal-700"
                  : "text-gray-700 hover:bg-teal-50 hover:text-teal-700"
              }`}
            >
              <Video className="mr-3 h-5 w-5 flex-shrink-0" />
              Video Appointments
            </div>
          </Link>

          <Link href="/dashboard/patient/reports">
            <div
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive("/dashboard/patient/reports")
                  ? "bg-teal-100 text-teal-700"
                  : "text-gray-700 hover:bg-teal-50 hover:text-teal-700"
              }`}
            >
              <FileText className="mr-3 h-5 w-5 flex-shrink-0" />
              View Reports
            </div>
          </Link>

          <Link href="/dashboard/patient/settings">
            <div
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive("/dashboard/patient/settings")
                  ? "bg-teal-100 text-teal-700"
                  : "text-gray-700 hover:bg-teal-50 hover:text-teal-700"
              }`}
            >
              <Settings className="mr-3 h-5 w-5 flex-shrink-0" />
              Settings
            </div>
          </Link>

          {/* Upcoming Video Calls Section - matching hospital portal style */}
          <div className="pt-4">
            <button
              onClick={() => setShowUpcomingCalls(!showUpcomingCalls)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-md transition-colors"
            >
              <span className="flex items-center">
                <Bell className="mr-3 h-5 w-5 flex-shrink-0" />
                Upcoming Calls
              </span>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-teal-100 text-teal-800">
                  2
                </Badge>
                <ChevronDown className={`h-4 w-4 transition-transform ${showUpcomingCalls ? "rotate-180" : ""}`} />
              </div>
            </button>

            {showUpcomingCalls && (
              <div className="mt-2 space-y-2 pl-3">
                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-red-100 text-red-800 text-xs">In 15 mins</Badge>
                    <Video className="h-4 w-4 text-red-600" />
                  </div>
                  <h4 className="font-medium text-sm">Dr. Sarah Johnson</h4>
                  <p className="text-xs text-gray-600">Cardiology Follow-up</p>
                  <p className="text-xs font-medium mt-1">2:00 PM - 2:30 PM</p>
                  <Button size="sm" className="w-full mt-2 bg-teal-600 hover:bg-teal-700 text-xs">
                    <Video className="h-3 w-3 mr-1" />
                    Join Call
                  </Button>
                </div>

                <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      Tomorrow
                    </Badge>
                    <Calendar className="h-4 w-4 text-teal-600" />
                  </div>
                  <h4 className="font-medium text-sm">Dr. Michael Chen</h4>
                  <p className="text-xs text-gray-600">Neurology Consultation</p>
                  <p className="text-xs font-medium mt-1">10:00 AM - 10:30 AM</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full mt-2 text-xs border-teal-200 text-teal-600 hover:bg-teal-50"
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    Reschedule
                  </Button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Logout - matching hospital portal exactly */}
        <div className="p-4 border-t">
          <Link href="/auth/patient">
            <Button variant="outline" className="w-full text-sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
