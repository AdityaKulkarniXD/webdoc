import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Activity, Calendar, Building2, Bell, Settings } from "lucide-react"
import Link from "next/link"
import { HospitalBreadcrumb } from "@/components/hospital-breadcrumb"

export default function HospitalDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm lg:ml-0">
        <div className="px-4 lg:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3 lg:ml-0 ml-12">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">City General Hospital</h1>
              <p className="text-xs text-gray-600">Hospital Management Dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <HospitalBreadcrumb />

      <div className="p-4 lg:p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium">Total Doctors</CardTitle>
              <Users className="h-3 w-3 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium">Active Patients</CardTitle>
              <Activity className="h-3 w-3 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-3 w-3 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">+5 from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium">Departments</CardTitle>
              <Building2 className="h-3 w-3 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Fully operational</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Doctor Management */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center justify-between">Doctor Management</CardTitle>
              <CardDescription className="text-xs">Manage your medical staff</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Dr. Sarah Johnson</p>
                    <p className="text-xs text-gray-600">Cardiology</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Dr. Michael Chen</p>
                    <p className="text-xs text-gray-600">Neurology</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Dr. Emily Davis</p>
                    <p className="text-xs text-gray-600">Pediatrics</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    On Leave
                  </Badge>
                </div>
              </div>
              <div className="mt-3">
                <Link href="/dashboard/hospital/doctors">
                  <Button variant="outline" className="w-full text-xs">
                    View All Doctors
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Patient Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Patient Overview</CardTitle>
              <CardDescription className="text-xs">Recent patient activity and statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">New Registrations</p>
                    <p className="text-xs text-gray-600">Today</p>
                  </div>
                  <div className="text-lg font-bold text-blue-600">12</div>
                </div>
                <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Completed Consultations</p>
                    <p className="text-xs text-gray-600">Today</p>
                  </div>
                  <div className="text-lg font-bold text-green-600">67</div>
                </div>
                <div className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Pending Appointments</p>
                    <p className="text-xs text-gray-600">This week</p>
                  </div>
                  <div className="text-lg font-bold text-orange-600">156</div>
                </div>
              </div>
              <div className="mt-3">
                <Link href="/dashboard/hospital/patients">
                  <Button variant="outline" className="w-full text-xs">
                    View All Patients
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Link href="/dashboard/hospital/doctors">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <Users className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <h3 className="text-sm font-medium">Manage Doctors</h3>
                  <p className="text-xs text-gray-600">View and manage doctor profiles</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dashboard/hospital/patients">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <Activity className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <h3 className="text-sm font-medium">Patient Records</h3>
                  <p className="text-xs text-gray-600">Access patient information</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
