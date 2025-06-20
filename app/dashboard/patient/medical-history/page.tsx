"use client"

import { useState } from "react"
import { Search, Download, FileText, Activity, Pill, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const medicalRecords = {
  visits: [
    {
      id: 1,
      date: "2024-01-15",
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      diagnosis: "Hypertension Follow-up",
      status: "Completed",
      notes: "Blood pressure well controlled. Continue current medication.",
    },
    {
      id: 2,
      date: "2024-01-08",
      doctor: "Dr. Michael Chen",
      specialty: "Neurology",
      diagnosis: "Migraine Consultation",
      status: "Completed",
      notes: "Prescribed new medication for migraine prevention.",
    },
  ],
  labReports: [
    {
      id: 1,
      date: "2024-01-12",
      testName: "Complete Blood Count",
      status: "Normal",
      doctor: "Dr. Sarah Johnson",
      results: "All values within normal range",
    },
    {
      id: 2,
      date: "2024-01-10",
      testName: "Lipid Panel",
      status: "Borderline",
      doctor: "Dr. Sarah Johnson",
      results: "Cholesterol slightly elevated",
    },
  ],
  prescriptions: [
    {
      id: 1,
      date: "2024-01-15",
      medication: "Lisinopril 10mg",
      doctor: "Dr. Sarah Johnson",
      status: "Active",
      instructions: "Take once daily with food",
    },
    {
      id: 2,
      date: "2024-01-08",
      medication: "Sumatriptan 50mg",
      doctor: "Dr. Michael Chen",
      status: "Active",
      instructions: "Take as needed for migraine",
    },
  ],
  imaging: [
    {
      id: 1,
      date: "2024-01-05",
      type: "Chest X-Ray",
      doctor: "Dr. Sarah Johnson",
      status: "Normal",
      findings: "No acute abnormalities",
    },
  ],
}

export default function MedicalHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("")

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Medical History & Reports</h1>
        <p className="text-gray-600">View and manage your complete medical records</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search medical records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="All Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export All
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Records</TabsTrigger>
          <TabsTrigger value="visits">Doctor Visits</TabsTrigger>
          <TabsTrigger value="labs">Lab Reports</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="imaging">Imaging</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {/* Recent Visits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-teal-600" />
                  Recent Doctor Visits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {medicalRecords.visits.slice(0, 2).map((visit) => (
                  <div key={visit.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{visit.diagnosis}</h4>
                      <p className="text-sm text-gray-600">
                        {visit.doctor} • {visit.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">{visit.status}</Badge>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Lab Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-teal-600" />
                  Recent Lab Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {medicalRecords.labReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{report.testName}</h4>
                      <p className="text-sm text-gray-600">
                        {report.doctor} • {report.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={report.status === "Normal" ? "default" : "secondary"}
                        className={
                          report.status === "Normal" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {report.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="visits" className="space-y-4">
          {medicalRecords.visits.map((visit) => (
            <Card key={visit.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{visit.diagnosis}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{visit.doctor}</span>
                      <span>•</span>
                      <span>{visit.specialty}</span>
                      <span>•</span>
                      <span>{visit.date}</span>
                    </div>
                    <p className="text-gray-700">{visit.notes}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">{visit.status}</Badge>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="labs" className="space-y-4">
          {medicalRecords.labReports.map((report) => (
            <Card key={report.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{report.testName}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{report.doctor}</span>
                      <span>•</span>
                      <span>{report.date}</span>
                    </div>
                    <p className="text-gray-700">{report.results}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={report.status === "Normal" ? "default" : "secondary"}
                      className={
                        report.status === "Normal" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {report.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-4">
          {medicalRecords.prescriptions.map((prescription) => (
            <Card key={prescription.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Pill className="h-5 w-5 text-teal-600" />
                      {prescription.medication}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{prescription.doctor}</span>
                      <span>•</span>
                      <span>{prescription.date}</span>
                    </div>
                    <p className="text-gray-700">{prescription.instructions}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-teal-100 text-teal-800">{prescription.status}</Badge>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="imaging" className="space-y-4">
          {medicalRecords.imaging.map((image) => (
            <Card key={image.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Camera className="h-5 w-5 text-teal-600" />
                      {image.type}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{image.doctor}</span>
                      <span>•</span>
                      <span>{image.date}</span>
                    </div>
                    <p className="text-gray-700">{image.findings}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">{image.status}</Badge>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
