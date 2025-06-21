"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Search, Download, Eye, Calendar, Filter, UserCheck } from "lucide-react"

interface Report {
  id: string
  patientId: string
  doctorId: string
  doctorName: string
  specialty: string
  title: string
  description: string
  fileUrl: string
  createdDate: string
  status: string
  type: string
  priority: string
}

export default function PatientReports() {
  const [reports, setReports] = useState<Report[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [doctorFilter, setDoctorFilter] = useState("all")

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("patientToken") || window.patientToken
        const res = await fetch("http://localhost:3000/api/v1/patient/reports", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        if (res.ok && data.reports) {
          setReports(data.reports)
        } else {
          console.error("Error loading reports:", data.message)
        }
      } catch (err) {
        console.error("Network error fetching reports:", err)
      }
    }
    fetchReports()
  }, [])

  const filteredReports = reports.filter((report) => {
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
      case "completed": return "bg-green-100 text-green-800"
      case "in progress": return "bg-yellow-100 text-yellow-800"
      case "draft": return "bg-gray-100 text-gray-800"
      default: return "bg-blue-100 text-blue-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high": return "bg-red-100 text-red-800"
      case "medium": return "bg-orange-100 text-orange-800"
      case "low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const uniqueDoctors = Array.from(new Set(reports.map((r) => r.doctorId)))
    .map((id) => reports.find((r) => r.doctorId === id))
    .filter(Boolean) as Report[]

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-teal-600 p-2 rounded-lg">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">My Medical Reports</h1>
            <p className="text-xs text-gray-600">View all reports created by your healthcare providers</p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-teal-100 text-teal-800">Patient ID</Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex justify-between pb-2">
            <CardTitle className="text-xs font-medium">Total Reports</CardTitle>
            <FileText className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{reports.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between pb-2">
            <CardTitle className="text-xs font-medium">Completed</CardTitle>
            <div className="h-3 w-3 bg-green-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-600">
              {reports.filter((r) => r.status.toLowerCase() === "completed").length}
            </div>
            <p className="text-xs text-muted-foreground">Available to view</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between pb-2">
            <CardTitle className="text-xs font-medium">In Progress</CardTitle>
            <div className="h-3 w-3 bg-yellow-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-yellow-600">
              {reports.filter((r) => ["in progress", "draft"].includes(r.status.toLowerCase())).length}
            </div>
            <p className="text-xs text-muted-foreground">Being prepared</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between pb-2">
            <CardTitle className="text-xs font-medium">This Month</CardTitle>
            <Calendar className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              {reports.filter((r) => new Date(r.createdDate) >= new Date(new Date().getFullYear(), new Date().getMonth(), 1)).length}
            </div>
            <p className="text-xs text-muted-foreground">New reports</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-sm flex items-center"><Filter className="h-4 w-4 mr-2"/> Filter Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4"/>
              <Input placeholder="Search reports..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10"/>
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger><SelectValue placeholder="Status"/></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger><SelectValue placeholder="Type"/></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {Array.from(new Set(reports.map((r) => r.type))).map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>

            <Select value={doctorFilter} onValueChange={setDoctorFilter}>
              <SelectTrigger><SelectValue placeholder="Doctor"/></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Doctors</SelectItem>
                {uniqueDoctors.map((d) => (
                  <SelectItem key={d.doctorId} value={d.doctorId}>{d.doctorName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Report Items */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex justify-between items-center">
            My Medical Reports 
            <Badge variant="secondary" className="text-xs">{filteredReports.length} reports</Badge>
          </CardTitle>
          <CardDescription className="text-xs">Created by healthcare providers</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredReports.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4"/>
              <p>{reports.length === 0 ? "No reports available." : "No matching reports found."}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReports.map((r) => (
                <div key={r.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-sm">{r.title}</h3>
                        <Badge className={`text-xs ${getStatusColor(r.status)}`}>{r.status}</Badge>
                        <Badge className={`text-xs ${getPriorityColor(r.priority)}`}>{r.priority}</Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{r.description}</p>
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <span className="flex items-center">
                          <UserCheck className="h-3 w-3 mr-1"/>{r.doctorName} - {r.specialty}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1"/>{new Date(r.createdDate).toLocaleDateString()}
                        </span>
                        <Badge variant="outline" className="text-xs">{r.type}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" className="text-xs h-7">
                        <Eye className="h-3 w-3 mr-1"/> View
                      </Button>
                      {r.fileUrl && r.status.toLowerCase() === "completed" && (
                        <Button size="sm" variant="outline" className="text-xs h-7">
                          <Download className="h-3 w-3 mr-1"/> Download
                        </Button>
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