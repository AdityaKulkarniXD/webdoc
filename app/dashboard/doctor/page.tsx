import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Video, Clock, UserIcon as UserMd, Settings, Bell, FileText } from "lucide-react"
import Link from "next/link"
import { DoctorBreadcrumb } from "@/components/doctor-breadcrumb"

const ongoingPatients = [
  {
    id: 1,
    name: "John Smith",
    condition: "Hypertension",
    progress: "Improving",
    nextAppointment: "Dec 25",
  },
  {
    id: 2,
    name: "Maria Garcia",
    condition: "Diabetes Type 2",
    progress: "Stable",
    nextAppointment: "Dec 30",
  },
  {
    id: 3,
    name: "Robert Johnson",
    condition: "Heart Disease",
    progress: "Monitoring",
    nextAppointment: "Dec 27",
  },
]

const treatedPatients = [
  {
    id: 4,
    name: "Emma Wilson",
    condition: "Anxiety Disorder",
    outcome: "Fully Recovered",
    lastVisit: "Nov 30",
  },
  {
    id: 5,
    name: "David Brown",
    condition: "Back Pain",
    outcome: "Significantly Improved",
    lastVisit: "Dec 1",
  },
]

const futurePatients = [
  {
    id: 7,
    name: "Michael Chen",
    appointmentDate: "Dec 28",
    appointmentTime: "10:00 AM",
    type: "Video Call",
    reason: "Initial Consultation",
  },
  {
    id: 8,
    name: "Sarah Davis",
    appointmentDate: "Dec 30",
    appointmentTime: "2:00 PM",
    type: "In-Person",
    reason: "Follow-up",
  },
]

export default function DoctorDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="px-4 lg:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3 lg:ml-0 ml-12">
            <div className="bg-green-600 p-2 rounded-lg">
              <UserMd className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Dr. Sarah Johnson</h1>
              <p className="text-xs text-gray-600">Cardiology Specialist Dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            <Link href="/dashboard/doctor/settings">
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <DoctorBreadcrumb />

      <div className="p-4 lg:p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-3 w-3 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">2 video calls pending</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium">Total Patients</CardTitle>
              <Users className="h-3 w-3 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">247</div>
              <p className="text-xs text-muted-foreground">+12 new this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium">Video Consultations</CardTitle>
              <Video className="h-3 w-3 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium">Avg. Consultation</CardTitle>
              <Clock className="h-3 w-3 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">24m</div>
              <p className="text-xs text-muted-foreground">-2m from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Patient Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Ongoing Treatments */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center justify-between">
                Ongoing Treatments
                <Badge variant="secondary" className="text-xs">
                  {ongoingPatients.length} active
                </Badge>
              </CardTitle>
              <CardDescription className="text-xs">Patients currently under your care</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ongoingPatients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{patient.name}</p>
                      <p className="text-xs text-gray-600">{patient.condition}</p>
                      <p className="text-xs text-green-600">Progress: {patient.progress}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Next: {patient.nextAppointment}</p>
                      <Button size="sm" variant="outline" className="mt-1 text-xs h-6">
                        <FileText className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <Link href="/dashboard/doctor/patients">
                  <Button variant="outline" className="w-full text-xs">
                    View All Ongoing Treatments
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Previously Treated */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center justify-between">
                Previously Treated
                <Badge variant="secondary" className="text-xs">
                  {treatedPatients.length} recent
                </Badge>
              </CardTitle>
              <CardDescription className="text-xs">Recently completed treatments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {treatedPatients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{patient.name}</p>
                      <p className="text-xs text-gray-600">{patient.condition}</p>
                      <p className="text-xs text-green-600">{patient.outcome}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Last: {patient.lastVisit}</p>
                      <Button size="sm" variant="outline" className="mt-1 text-xs h-6">
                        <FileText className="h-3 w-3 mr-1" />
                        Records
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <Link href="/dashboard/doctor/patients">
                  <Button variant="outline" className="w-full text-xs">
                    View All Treated Patients
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Future Appointments */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-sm flex items-center justify-between">
              Future Appointments
              <Badge variant="secondary" className="text-xs">
                {futurePatients.length} scheduled
              </Badge>
            </CardTitle>
            <CardDescription className="text-xs">Upcoming consultations with new and existing patients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {futurePatients.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border">
                  <div>
                    <p className="text-sm font-medium">{patient.name}</p>
                    <p className="text-xs text-gray-600">{patient.reason}</p>
                    <p className="text-xs text-gray-500">
                      {patient.appointmentDate} at {patient.appointmentTime}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-xs mb-2">
                      {patient.type}
                    </Badge>
                    <div className="flex space-x-1">
                      {patient.type === "Video Call" ? (
                        <Button size="sm" className="text-xs h-6">
                          <Video className="h-3 w-3 mr-1" />
                          Prepare
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" className="text-xs h-6">
                          <Calendar className="h-3 w-3 mr-1" />
                          Details
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <Link href="/dashboard/doctor/patients">
                <Button variant="outline" className="w-full text-xs">
                  View All Future Appointments
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Link href="/dashboard/doctor/appointments">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <Calendar className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <h3 className="text-sm font-medium">Manage Appointments</h3>
                  <p className="text-xs text-gray-600">View and schedule appointments</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dashboard/doctor/patients">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <h3 className="text-sm font-medium">Patient Management</h3>
                  <p className="text-xs text-gray-600">Manage all patient relationships</p>
                </CardContent>
              </Card>
            </Link>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <Video className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <h3 className="text-sm font-medium">Start Video Call</h3>
                <p className="text-xs text-gray-600">Begin video consultation</p>
              </CardContent>
            </Card>

            <Link href="/dashboard/doctor/settings">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <Settings className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                  <h3 className="text-sm font-medium">Settings</h3>
                  <p className="text-xs text-gray-600">Account and preferences</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
