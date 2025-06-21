"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, Download, AlertCircle, CheckCircle } from "lucide-react"
import { HospitalBreadcrumb } from "@/components/hospital-breadcrumb"
import Joi from "joi"

// Validation schema
const reportSchema = Joi.object({
  patientId: Joi.string().required().messages({
    "string.empty": "Patient ID is required",
    "any.required": "Patient ID is required",
  }),
  title: Joi.string().required().messages({
    "string.empty": "Report title is required",
    "any.required": "Report title is required",
  }),
  description: Joi.string().optional().allow(""),
  fileUrl: Joi.string().uri().optional().allow("").messages({
    "string.uri": "Please enter a valid URL",
  }),
})

// Mock patient data
const patients = [
  { id: "P001", name: "John Smith", age: 45 },
  { id: "P002", name: "Maria Garcia", age: 32 },
  { id: "P003", name: "Robert Johnson", age: 58 },
  { id: "P004", name: "Emma Wilson", age: 28 },
  { id: "P005", name: "David Brown", age: 41 },
]

export default function GenerateReportPage() {
  const [formData, setFormData] = useState({
    patientId: "",
    title: "",
    description: "",
    fileUrl: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const { error } = reportSchema.validate(formData, { abortEarly: false })

    if (error) {
      const newErrors: Record<string, string> = {}
      error.details.forEach((detail) => {
        const field = detail.path[0] as string
        newErrors[field] = detail.message
      })
      setErrors(newErrors)
      return false
    }

    setErrors({})
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Report generated:", formData)
      setSubmitSuccess(true)

      // Reset form after success
      setTimeout(() => {
        setFormData({
          patientId: "",
          title: "",
          description: "",
          fileUrl: "",
        })
        setSubmitSuccess(false)
      }, 3000)
    } catch (error) {
      console.error("Error generating report:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedPatient = patients.find((p) => p.id === formData.patientId)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="px-4 lg:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3 lg:ml-0 ml-12">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Generate Patient Report</h1>
              <p className="text-xs text-gray-600">Create comprehensive patient reports</p>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <HospitalBreadcrumb />

      <div className="p-4 lg:p-6">
        {submitSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Report generated successfully! The report has been saved and can be accessed from the patient records.
            </AlertDescription>
          </Alert>
        )}

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Patient Report Generator</span>
              </CardTitle>
              <CardDescription>
                Generate comprehensive reports for patient records, medical summaries, and documentation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Patient Selection */}
                <div className="space-y-2">
                  <Label htmlFor="patientId">Patient *</Label>
                  <Select value={formData.patientId} onValueChange={(value) => handleInputChange("patientId", value)}>
                    <SelectTrigger className={errors.patientId ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select a patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.id} - {patient.name} (Age: {patient.age})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.patientId && (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.patientId}
                    </p>
                  )}
                  {selectedPatient && (
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm font-medium text-blue-900">Selected Patient:</p>
                      <p className="text-sm text-blue-700">
                        {selectedPatient.name} (ID: {selectedPatient.id}, Age: {selectedPatient.age})
                      </p>
                    </div>
                  )}
                </div>

                {/* Report Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Report Title *</Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="e.g., Monthly Health Summary, Lab Results Report, Treatment Progress"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className={errors.title ? "border-red-500" : ""}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.title}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide additional details about the report content, findings, or recommendations..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                    className={errors.description ? "border-red-500" : ""}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* File URL */}
                <div className="space-y-2">
                  <Label htmlFor="fileUrl">Attachment URL (Optional)</Label>
                  <Input
                    id="fileUrl"
                    type="url"
                    placeholder="https://example.com/document.pdf"
                    value={formData.fileUrl}
                    onChange={(e) => handleInputChange("fileUrl", e.target.value)}
                    className={errors.fileUrl ? "border-red-500" : ""}
                  />
                  {errors.fileUrl && (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.fileUrl}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    Optional: Link to external documents, lab results, or supporting files
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <Button type="submit" disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Report
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    disabled={isSubmitting}
                    onClick={() => {
                      // Simulate download functionality
                      console.log("Downloading report template...")
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Template
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Recent Reports</CardTitle>
              <CardDescription>Recently generated patient reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Monthly Health Summary - John Smith</p>
                    <p className="text-xs text-gray-600">Generated on Dec 20, 2024</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Lab Results Report - Maria Garcia</p>
                    <p className="text-xs text-gray-600">Generated on Dec 19, 2024</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Treatment Progress - Robert Johnson</p>
                    <p className="text-xs text-gray-600">Generated on Dec 18, 2024</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
