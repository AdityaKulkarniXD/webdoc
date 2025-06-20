import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Activity, Search, User, Phone, Mail } from "lucide-react"
import { HospitalBreadcrumb } from "@/components/hospital-breadcrumb"

const patients = [
  {
    id: 1,
    name: "John Smith",
    age: 45,
    email: "john.smith@email.com",
    phone: "+1 (555) 111-2222",
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    status: "Active Treatment",
    lastVisit: "2024-12-18",
    nextAppointment: "2024-12-25",
  },
  {
    id: 2,
    name: "Maria Garcia",
    age: 32,
    email: "maria.garcia@email.com",
    phone: "+1 (555) 222-3333",
    doctor: "Dr. Emily Davis",
    specialty: "Pediatrics",
    status: "Follow-up",
    lastVisit: "2024-12-15",
    nextAppointment: "2024-12-30",
  },
  {
    id: 3,
    name: "Robert Johnson",
    age: 58,
    email: "robert.johnson@email.com",
    phone: "+1 (555) 333-4444",
    doctor: "Dr. Michael Chen",
    specialty: "Neurology",
    status: "Active Treatment",
    lastVisit: "2024-12-20",
    nextAppointment: "2024-12-27",
  },
  {
    id: 4,
    name: "Emma Wilson",
    age: 28,
    email: "emma.wilson@email.com",
    phone: "+1 (555) 444-5555",
    doctor: "Dr. Lisa Anderson",
    specialty: "Dermatology",
    status: "Completed",
    lastVisit: "2024-12-10",
    nextAppointment: null,
  },
  {
    id: 5,
    name: "David Brown",
    age: 41,
    email: "david.brown@email.com",
    phone: "+1 (555) 555-6666",
    doctor: "Dr. Robert Wilson",
    specialty: "Orthopedics",
    status: "Active Treatment",
    lastVisit: "2024-12-19",
    nextAppointment: "2024-12-26",
  },
]

export default function PatientsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="px-4 lg:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3 lg:ml-0 ml-12">
            <Activity className="h-5 w-5 text-purple-600" />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Patient Management</h1>
              <p className="text-xs text-gray-600">View all patients and their treating doctors</p>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <HospitalBreadcrumb />

      <div className="p-4 lg:p-6">
        {/* Search and Filter */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-sm">Search & Filter Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-2 top-2.5 h-3 w-3 text-gray-400" />
                <Input placeholder="Search patients by name or email..." className="pl-8 text-xs" />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-48 text-xs">
                  <SelectValue placeholder="Filter by doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Doctors</SelectItem>
                  <SelectItem value="sarah">Dr. Sarah Johnson</SelectItem>
                  <SelectItem value="michael">Dr. Michael Chen</SelectItem>
                  <SelectItem value="emily">Dr. Emily Davis</SelectItem>
                  <SelectItem value="robert">Dr. Robert Wilson</SelectItem>
                  <SelectItem value="lisa">Dr. Lisa Anderson</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-40 text-xs">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active Treatment</SelectItem>
                  <SelectItem value="followup">Follow-up</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Patients List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {patients.map((patient) => (
            <Card key={patient.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <User className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">{patient.name}</CardTitle>
                      <CardDescription className="text-xs">Age: {patient.age}</CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant={
                      patient.status === "Active Treatment"
                        ? "default"
                        : patient.status === "Follow-up"
                          ? "secondary"
                          : "outline"
                    }
                    className="text-xs"
                  >
                    {patient.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center text-xs text-gray-600">
                    <Mail className="h-3 w-3 mr-2" />
                    {patient.email}
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <Phone className="h-3 w-3 mr-2" />
                    {patient.phone}
                  </div>
                </div>

                <div className="border-t pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-700">Treating Doctor:</span>
                    <span className="text-xs text-blue-600 font-medium">{patient.doctor}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-700">Specialty:</span>
                    <span className="text-xs text-gray-600">{patient.specialty}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-700">Last Visit:</span>
                    <span className="text-xs text-gray-600">{new Date(patient.lastVisit).toLocaleDateString()}</span>
                  </div>
                  {patient.nextAppointment && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-700">Next Appointment:</span>
                      <span className="text-xs text-green-600 font-medium">
                        {new Date(patient.nextAppointment).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1 text-xs">
                    View Records
                  </Button>
                  <Button size="sm" className="flex-1 text-xs">
                    Schedule Appointment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-purple-600">1,247</div>
              <div className="text-xs text-gray-600">Total Patients</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-blue-600">892</div>
              <div className="text-xs text-gray-600">Active Treatment</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-green-600">245</div>
              <div className="text-xs text-gray-600">Follow-up</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-gray-600">110</div>
              <div className="text-xs text-gray-600">Completed</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
