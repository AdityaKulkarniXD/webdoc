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
import { FileText, Download, AlertCircle, CheckCircle, UserIcon as UserMd } from "lucide-react"
import { DoctorBreadcrumb } from "@/components/doctor-breadcrumb"
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

// Mock patient data for the doctor
const myPatients = [
  { id: "P001", name: "John Smith", age: 45, condition: "Hypertension" },
  { id: "P002", name: "Maria Garcia", age: 32, condition: "Diabetes Type 2" },
  { id: "P003", name: "Robert Johnson", age: 58, condition: "Heart Disease" },
  { id: "P007", name: "Michael Chen", age: 35, condition: "Anxiety Disorder" },
  { id: "P008", name: "Sarah Davis", age: 42, condition: "Back Pain" },
]

export default function DoctorGenerateReportPage() {
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

      console.log("Doctor report generated:", formData)
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

  const selectedPatient = myPatients.find((p) => p.id === formData.patientId)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="px-4 lg:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3 lg:ml-0 ml-12">
            <div className="bg-green-600 p-2 rounded-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Generate Patient Report</h1>
              <p className="text-xs text-gray-600">Create medical reports for your patients</p>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <DoctorBreadcrumb />

      <div className="p-4 lg:p-6">
        {submitSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Medical report generated successfully! The report has been saved to the patient's medical records.
            </AlertDescription>
          </Alert>
        )}

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserMd className="h-5 w-5" />
                <span>Medical Report Generator</span>
              </CardTitle>
              <CardDescription>
                Generate medical reports, treatment summaries, and patient assessments for your practice.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Patient Selection */}
                <div className="space-y-2">
                  <Label htmlFor="patientId">Select Patient *</Label>
                  <Select value={formData.patientId} onValueChange={(value) => handleInputChange("patientId", value)}>
                    <SelectTrigger className={errors.patientId ? "border-red-500" : ""}>
                      <SelectValue placeholder="Choose from your patients" />
                    </SelectTrigger>
                    <SelectContent>
                      {myPatients.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.id} - {patient.name} ({patient.condition})
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
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm font-medium text-green-900">Selected Patient:</p>
                      <p className="text-sm text-green-700">
                        {selectedPatient.name} (ID: {selectedPatient.id})
                      </p>
                      <p className="text-xs text-green-600">
                        Age: {selectedPatient.age} | Condition: {selectedPatient.condition}
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
                    placeholder="e.g., Treatment Progress Report, Consultation Summary, Medical Assessment"
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

                {/* Medical Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Medical Notes & Observations (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Include clinical observations, treatment recommendations, patient progress, medication adjustments, or follow-up instructions..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={5}
                    className={errors.description ? "border-red-500" : ""}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Supporting Documents */}
                <div className="space-y-2">
                  <Label htmlFor="fileUrl">Supporting Document URL (Optional)</Label>
                  <Input
                    id="fileUrl"
                    type="url"
                    placeholder="https://example.com/lab-results.pdf"
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
                    Link to lab results, imaging studies, or other supporting medical documents
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <Button type="submit" disabled={isSubmitting} className="flex-1 bg-green-600 hover:bg-green-700">
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Medical Report
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    disabled={isSubmitting}
                    onClick={() => {
                      // Simulate download functionality
                      console.log("Downloading medical report template...")
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Template
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Recent Medical Reports */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Recent Medical Reports</CardTitle>
              <CardDescription>Your recently generated patient reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div>
                    <p className="font-medium text-sm">Treatment Progress - John Smith</p>
                    <p className="text-xs text-gray-600">Hypertension Management | Dec 20, 2024</p>
                  </div>
                  <Button size="sm" variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div>
                    <p className="font-medium text-sm">Consultation Summary - Maria Garcia</p>
                    <p className="text-xs text-gray-600">Diabetes Follow-up | Dec 19, 2024</p>
                  </div>
                  <Button size="sm" variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div>
                    <p className="font-medium text-sm">Medical Assessment - Robert Johnson</p>
                    <p className="text-xs text-gray-600">Cardiology Review | Dec 18, 2024</p>
                  </div>
                  <Button size="sm" variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
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
