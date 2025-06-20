"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Search, Download, Eye, Calendar, Filter, UserCheck } from "lucide-react"

// Mock data for reports for this patient (Jane Smith - ID: P001)
const patientReports = [
  {
    id: "RPT001",
    patientId: "P001",
    doctorId: "D001",
    doctorName: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    title: "Cardiology Assessment Report",
    description: "Comprehensive cardiac evaluation following chest pain episodes",
    fileUrl: "https://example.com/reports/rpt001.pdf",
    createdDate: "2024-12-20",
    status: "Completed",
    type: "Medical Assessment",
    priority: "High",
  },
  {
    id: "RPT006",
    patientId: "P001",
    doctorId: "D001",
    doctorName: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    title: "Treatment Response Evaluation",
    description: "Assessment of patient response to prescribed cardiac medications",
    fileUrl: "",
    createdDate: "2024-12-15",
    status: "In Progress",
    type: "Follow-up",
    priority: "Medium",
  },
  {
    id: "RPT007",
    patientId: "P001",
    doctorId: "D002",
    doctorName: "Dr. Michael Chen",
    specialty: "Neurology",
    title: "Neurological Consultation Report",
    description: "Initial neurological assessment for headache complaints",
    fileUrl: "https://example.com/reports/rpt007.pdf",
    createdDate: "2024-12-10",
    status: "Completed",
    type: "Consultation",
    priority: "Medium",
  },
  {
    id: "RPT008",
    patientId: "P001",
    doctorId: "D003",
    doctorName: "Dr. Emily Davis",
    specialty: "General Medicine",
    title: "Annual Health Screening",
    description: "Comprehensive annual health check-up and preventive care assessment",
    fileUrl: "https://example.com/reports/rpt008.pdf",
    createdDate: "2024-12-05",
    status: "Completed",
    type: "Screening",
    priority: "Low",
  },
  {
    id: "RPT009",
    patientId: "P001",
    doctorId: "D004",
    doctorName: "Dr. James Wilson",
    specialty: "Orthopedics",
    title: "Knee Pain Assessment",
    description: "Evaluation of knee pain and mobility issues",
    fileUrl: "https://example.com/reports/rpt009.pdf",
    createdDate: "2024-11-28",
    status: "Completed",
    type: "Assessment",
    priority: "Medium",
  },
  {
    id: "RPT010",
    patientId: "P001",
    doctorId: "D001",
    doctorName: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    title: "Blood Pressure Monitoring Report",
    description: "Weekly blood pressure readings and medication effectiveness review",
    fileUrl: "",
    createdDate: "2024-11-25",
    status: "Draft",
    type: "Monitoring",
    priority: "Low",
  },
]

export default function PatientReports() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [doctorFilter, setDoctorFilter] = useState("all")

  // Filter reports based on search and filters
  const filteredReports = patientReports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.specialty.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || report.status.toLowerCase() === statusFilter
    const matchesType = typeFilter === "all" || report.type.toLowerCase() === typeFilter.toLowerCase()
    const matchesDoctor = doctorFilter === "all" || report.doctorId === doctorFilter

    return matchesSearch && matchesStatus && matchesType && matchesDoctor
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in progress":
        return "bg-yellow-100 text-yellow-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-orange-100 text-orange-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Get unique doctors for filter
  const uniqueDoctors = Array.from(new Set(patientReports.map((r) => r.doctorId)))
    .map((id) => patientReports.find((r) => r.doctorId === id))
    .filter(Boolean)

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-teal-600 p-2 rounded-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">My Medical Reports</h1>
              <p className="text-xs text-gray-600">View all reports created by your healthcare providers</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-teal-100 text-teal-800">
            Jane Smith (ID: P001)
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Total Reports</CardTitle>
            <FileText className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{patientReports.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Completed</CardTitle>
            <div className="h-3 w-3 bg-green-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-600">
              {patientReports.filter((r) => r.status === "Completed").length}
            </div>
            <p className="text-xs text-muted-foreground">Available to view</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">In Progress</CardTitle>
            <div className="h-3 w-3 bg-yellow-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-yellow-600">
              {patientReports.filter((r) => r.status === "In Progress" || r.status === "Draft").length}
            </div>
            <p className="text-xs text-muted-foreground">Being prepared</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">This Month</CardTitle>
            <Calendar className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">New reports</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-sm flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search reports, doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="medical assessment">Medical Assessment</SelectItem>
                <SelectItem value="follow-up">Follow-up</SelectItem>
                <SelectItem value="consultation">Consultation</SelectItem>
                <SelectItem value="screening">Screening</SelectItem>
                <SelectItem value="assessment">Assessment</SelectItem>
                <SelectItem value="monitoring">Monitoring</SelectItem>
              </SelectContent>
            </Select>

            <Select value={doctorFilter} onValueChange={setDoctorFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by doctor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Doctors</SelectItem>
                {uniqueDoctors.map((doctor) => (
                  <SelectItem key={doctor?.doctorId} value={doctor?.doctorId || ""}>
                    {doctor?.doctorName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center justify-between">
            My Medical Reports
            <Badge variant="secondary" className="text-xs">
              {filteredReports.length} reports
            </Badge>
          </CardTitle>
          <CardDescription className="text-xs">Reports created by your healthcare providers</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredReports.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-sm font-medium text-gray-900 mb-2">No reports found</h3>
              <p className="text-xs text-gray-600">
                {searchTerm || statusFilter !== "all" || typeFilter !== "all" || doctorFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "You don't have any medical reports yet"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <div key={report.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-medium text-sm text-gray-900">{report.title}</h3>
                        <Badge className={`text-xs ${getStatusColor(report.status)}`}>{report.status}</Badge>
                        <Badge variant="outline" className={`text-xs ${getPriorityColor(report.priority)}`}>
                          {report.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{report.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <UserCheck className="h-3 w-3 mr-1" />
                          {report.doctorName} - {report.specialty}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(report.createdDate).toLocaleDateString()}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {report.type}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="text-xs text-gray-500">Report ID: {report.id}</div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" className="text-xs h-7">
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                      {report.fileUrl && report.status === "Completed" && (
                        <Button size="sm" variant="outline" className="text-xs h-7">
                          <Download className="h-3 w-3 mr-1" />
                          Download PDF
                        </Button>
                      )}
                      {report.status === "In Progress" && (
                        <Badge variant="outline" className="text-xs text-yellow-600">
                          Being prepared by doctor
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
