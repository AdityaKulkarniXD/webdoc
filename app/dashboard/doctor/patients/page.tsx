"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, User, FileText, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// Type
interface MedicalReport {
  title?: string
  date?: string
  description?: string
}

interface Patient {
  id: string
  name: string
  email: string
  phone: string
  dob: string
  bloodgroup: string
  medicalReports?: MedicalReport[]
}

export default function DoctorPatients() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem("doctorToken")

      if (!token) {
        setError("Please login to access patient data")
        return
      }

      const response = await fetch("http://localhost:3000/api/v1/doctor/patients", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (data.success) {
        setPatients(data.patients || [])
        setError(null)
      } else {
        setError(data.message || "Failed to fetch patient data")
      }
    } catch (err) {
      setError("Failed to fetch patient data.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <Loader2 className="w-6 h-6 text-green-600 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-center">
        <div>
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchPatients}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Search Patients</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <Search className="w-4 h-4 text-gray-400" />
          <Input
            className="text-sm"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      {filteredPatients.length === 0 ? (
        <p className="text-center text-gray-500">No patients found.</p>
      ) : (
        filteredPatients.map((patient) => (
          <Card key={patient.id} className="mb-4">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-100 rounded-full">
                  <User className="h-5 w-5 text-green-700" />
                </div>
             <div>
  <h3 className="font-semibold text-sm">{patient.name}</h3>
  <p className="text-xs text-gray-600">{patient.email}</p>
  <p className="text-xs text-gray-600">Phone: {patient.phone}</p>
  <p className="text-xs text-gray-600">
    DOB: {new Date(patient.dob).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })}
  </p>

  {Array.isArray(patient.medicalReports) && patient.medicalReports.length > 0 ? (
    <div className="mt-2">
      <p className="text-xs font-semibold text-gray-800 mb-1">Medical Reports:</p>
      {patient.medicalReports.map((report, index) => (
        <div key={index} className="ml-4 mb-2">
          <p className="text-xs text-gray-600">Title: {report.title || "N/A"}</p>
          <p className="text-xs text-gray-600">
            Date: {new Date(report.date || "").toLocaleDateString("en-IN")}
          </p>
          <p className="text-xs text-gray-600">
            Description: {report.description || "No description"}
          </p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-xs text-gray-500 mt-2">No medical reports available.</p>
  )}
</div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}