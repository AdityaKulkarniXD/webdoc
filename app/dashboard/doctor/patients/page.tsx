import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Search, FileText, Video, Phone, Calendar, User } from "lucide-react"
import { DoctorBreadcrumb } from "@/components/doctor-breadcrumb"

const ongoingPatients = [
  {
    id: 1,
    name: "John Smith",
    age: 45,
    condition: "Hypertension",
    startDate: "2024-10-15",
    nextAppointment: "2024-12-25",
    status: "Active Treatment",
    progress: "Improving",
  },
  {
    id: 2,
    name: "Maria Garcia",
    age: 32,
    condition: "Diabetes Type 2",
    startDate: "2024-11-01",
    nextAppointment: "2024-12-30",
    status: "Active Treatment",
    progress: "Stable",
  },
  {
    id: 3,
    name: "Robert Johnson",
    age: 58,
    condition: "Heart Disease",
    startDate: "2024-09-20",
    nextAppointment: "2024-12-27",
    status: "Active Treatment",
    progress: "Monitoring",
  },
]

const treatedPatients = [
  {
    id: 4,
    name: "Emma Wilson",
    age: 28,
    condition: "Anxiety Disorder",
    treatmentPeriod: "2024-06-01 to 2024-11-30",
    lastVisit: "2024-11-30",
    outcome: "Fully Recovered",
  },
  {
    id: 5,
    name: "David Brown",
    age: 41,
    condition: "Back Pain",
    treatmentPeriod: "2024-08-15 to 2024-12-01",
    lastVisit: "2024-12-01",
    outcome: "Significantly Improved",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    age: 35,
    condition: "Migraine",
    treatmentPeriod: "2024-07-10 to 2024-10-15",
    lastVisit: "2024-10-15",
    outcome: "Symptoms Controlled",
  },
]

const futurePatients = [
  {
    id: 7,
    name: "Michael Chen",
    age: 52,
    appointmentDate: "2024-12-28",
    appointmentTime: "10:00 AM",
    type: "Video Call",
    reason: "Initial Consultation",
  },
  {
    id: 8,
    name: "Sarah Davis",
    age: 29,
    appointmentDate: "2024-12-30",
    appointmentTime: "2:00 PM",
    type: "In-Person",
    reason: "Follow-up",
  },
  {
    id: 9,
    name: "James Wilson",
    age: 44,
    appointmentDate: "2025-01-05",
    appointmentTime: "11:30 AM",
    type: "Video Call",
    reason: "Consultation",
  },
]

export default function DoctorPatients() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="px-4 lg:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3 lg:ml-0 ml-12">
            <Users className="h-5 w-5 text-green-600" />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Patient Management</h1>
              <p className="text-xs text-gray-600">Manage all your patient relationships</p>
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
            <CardTitle className="text-sm">Search & Filter Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search by patient name or condition..." className="pl-10 text-xs" />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-48 text-xs">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Patients</SelectItem>
                  <SelectItem value="ongoing">Ongoing Treatment</SelectItem>
                  <SelectItem value="treated">Previously Treated</SelectItem>
                  <SelectItem value="future">Future Appointments</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Patient Tabs */}
        <Tabs defaultValue="ongoing" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="ongoing" className="text-xs">
              Ongoing Treatments ({ongoingPatients.length})
            </TabsTrigger>
            <TabsTrigger value="treated" className="text-xs">
              Treated Before ({treatedPatients.length})
            </TabsTrigger>
            <TabsTrigger value="future" className="text-xs">
              Future Appointments ({futurePatients.length})
            </TabsTrigger>
          </TabsList>

          {/* Ongoing Treatments */}
          <TabsContent value="ongoing" className="space-y-4">
            {ongoingPatients.map((patient) => (
              <Card key={patient.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{patient.name}</h3>
                        <p className="text-gray-600 text-xs">
                          Age: {patient.age} • {patient.condition}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-gray-500">
                            Started: {new Date(patient.startDate).toLocaleDateString()}
                          </span>
                          <span className="text-xs text-gray-500">
                            Next: {new Date(patient.nextAppointment).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <Badge className="mb-2 bg-blue-100 text-blue-800 text-xs">{patient.status}</Badge>
                        <p className="text-xs text-gray-600">Progress: {patient.progress}</p>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <Button size="sm" variant="outline" className="text-xs">
                          <FileText className="h-3 w-3 mr-1" />
                          Records
                        </Button>
                        <Button size="sm" className="text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Previously Treated */}
          <TabsContent value="treated" className="space-y-4">
            {treatedPatients.map((patient) => (
              <Card key={patient.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 p-3 rounded-full">
                        <User className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{patient.name}</h3>
                        <p className="text-gray-600 text-xs">
                          Age: {patient.age} • {patient.condition}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-gray-500">Treatment: {patient.treatmentPeriod}</span>
                          <span className="text-xs text-gray-500">
                            Last Visit: {new Date(patient.lastVisit).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <Badge className="mb-2 bg-green-100 text-green-800 text-xs">Completed</Badge>
                        <p className="text-xs text-gray-600">{patient.outcome}</p>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <Button size="sm" variant="outline" className="text-xs">
                          <FileText className="h-3 w-3 mr-1" />
                          Records
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          <Phone className="h-3 w-3 mr-1" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Future Appointments */}
          <TabsContent value="future" className="space-y-4">
            {futurePatients.map((patient) => (
              <Card key={patient.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-purple-100 p-3 rounded-full">
                        <User className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{patient.name}</h3>
                        <p className="text-gray-600 text-xs">
                          Age: {patient.age} • {patient.reason}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-gray-500">
                            {new Date(patient.appointmentDate).toLocaleDateString()} at {patient.appointmentTime}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="text-xs">
                        {patient.type}
                      </Badge>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="text-xs">
                          <FileText className="h-3 w-3 mr-1" />
                          Prepare
                        </Button>
                        {patient.type === "Video Call" ? (
                          <Button size="sm" className="text-xs">
                            <Video className="h-3 w-3 mr-1" />
                            Video Call
                          </Button>
                        ) : (
                          <Button size="sm" className="text-xs">
                            <Calendar className="h-3 w-3 mr-1" />
                            Reschedule
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-blue-600">{ongoingPatients.length}</div>
              <div className="text-xs text-gray-600">Ongoing Treatments</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-green-600">{treatedPatients.length}</div>
              <div className="text-xs text-gray-600">Successfully Treated</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-purple-600">{futurePatients.length}</div>
              <div className="text-xs text-gray-600">Future Appointments</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-gray-600">247</div>
              <div className="text-xs text-gray-600">Total Patients</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
