"use client"

import { useState, useEffect } from "react"
import { Search, Download, FileText, Activity, Pill, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RecordItem { /* your existing interfaces */ }
interface Doctor { id: string; name: string }

export default function MedicalHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("all")
  const [doctorFilter, setDoctorFilter] = useState("all")
  const [doctors, setDoctors] = useState<Doctor[]>([])

  const medicalRecords = {
    visits: [],
    labReports: [],
    prescriptions: [],
    imaging: [],
    // Add mock data or fetch from API as needed
  }

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("patientToken") || window.patientToken
        const res = await fetch("http://localhost:3000/api/v1/patient/doctors", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        if (res.ok && Array.isArray(data.doctors)) {
          setDoctors(data.doctors)
        } else {
          console.error("Error fetching doctors:", data.message)
        }
      } catch (err) {
        console.error("Network error fetching doctors:", err)
      }
    }
    fetchDoctors()
  }, [])

  // Function to filter each section by doctor
  const filterByDoctor = <T extends { doctor: string }>(items: T[]) =>
    doctorFilter === "all" ? items : items.filter((i) => i.doctor === doctors.find(d => d.id === doctorFilter)?.name)

  // Apply search + date + doctor filters per section
  const filterRecords = (items: any[]) =>
    filterByDoctor(items)
      .filter(item =>
        item.date.includes(searchTerm) ||
        item.doctor.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(item => {
        if (dateFilter === "last-month") {
          const monthAgo = new Date()
          monthAgo.setMonth(monthAgo.getMonth() - 1)
          return new Date(item.date) >= monthAgo
        }
        if (dateFilter === "last-3-months") {
          const ago = new Date()
          ago.setMonth(ago.getMonth() - 3)
          return new Date(item.date) >= ago
        }
        if (dateFilter === "last-year") {
          const ago = new Date()
          ago.setFullYear(ago.getFullYear() - 1)
          return new Date(item.date) >= ago
        }
        return true
      })

  const visits = filterRecords(medicalRecords.visits)
  const labs = filterRecords(medicalRecords.labReports)
  const prescriptions = filterRecords(medicalRecords.prescriptions)
  const imaging = filterRecords(medicalRecords.imaging)

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Medical History & Reports</h1>
        <p className="text-gray-600">View and manage your complete medical records</p>
      </div>

      {/* Search + Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search medical records..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
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

          <Select value={doctorFilter} onValueChange={setDoctorFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="All Doctors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Doctors</SelectItem>
              {doctors.map((doc) => (
                <SelectItem key={doc.id} value={doc.id}>
                  {doc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" /> Export All
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

        {/* Each tab uses the filtered arrays (visits, labs, etc.) */}
        <TabsContent value="all" className="space-y-4">
          {/* Render samples of each section */}
          {visits.length > 0 && (
            <Card>
              {/* ... render visit items ... */}
            </Card>
          )}
          {labs.length > 0 && (
            <Card>
              {/* ... render lab items ... */}
            </Card>
          )}
          {/* Continue for prescriptions and imaging */}
        </TabsContent>

        {/* Detailed tab renderings */}
        <TabsContent value="visits">
          {visits.map((item, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle>{item.title || "Doctor Visit"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div>Date: {item.date}</div>
                <div>Doctor: {item.doctor}</div>
                {/* Add more fields as needed */}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="labs">
          {labs.map((item, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle>{item.title || "Lab Report"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div>Date: {item.date}</div>
                <div>Doctor: {item.doctor}</div>
                {/* Add more fields as needed */}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="prescriptions">
          {prescriptions.map((item, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle>{item.title || "Prescription"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div>Date: {item.date}</div>
                <div>Doctor: {item.doctor}</div>
                {/* Add more fields as needed */}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="imaging">
          {imaging.map((item, idx) => (
            <Card key={idx}>
              {/* Render imaging item details here, e.g.: */}
              <CardHeader>
                <CardTitle>{item.title || "Imaging Report"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div>Date: {item.date}</div>
                <div>Doctor: {item.doctor}</div>
                {/* Add more fields as needed */}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}