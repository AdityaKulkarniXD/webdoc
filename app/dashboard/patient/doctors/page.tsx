"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, Clock, FileText, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

const specializations = [
  "Cardiologist",
  "Neurology",
  "Dermatology",
  "Pediatrics",
  "Orthopedics",
  "Gynecology",
  "Psychiatry",
  "Ophthalmology",
  "ENT",
  "General Medicine",
  "General Physician",
]

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
]

export default function BookAppointmentPage() {
  const [formData, setFormData] = useState({
    specialization: "",
    date: "",
    time: "",
    reason: "",
  })
  const [appointmentDetails, setAppointmentDetails] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const token = localStorage.getItem("patientToken") || window.patientToken;

    console.log("📤 Sending appointment data:", formData);

    const response = await fetch("http://localhost:3000/api/v1/patient/appointment/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    console.log("📥 Response status:", response.status);
    console.log("📥 Response body:", data);

    if (response.ok && data.success) {
      setAppointmentDetails(data.appointment);
      console.log("✅ Appointment booked:", data.appointment);
      setIsSubmitted(true);
    } else {
      console.warn("❌ Booking failed:", data.message || "Unknown error");
      alert(data.message || "Failed to book appointment");
    }
  } catch (err) {
    console.error("🚨 Network or server error:", err);
    alert("Network error. Please try again.");
  } finally {
    setIsSubmitting(false);
  }

  // Reset form after success screen
  setTimeout(() => {
    setIsSubmitted(false);
    setFormData({
      specialization: "",
      date: "",
      time: "",
      reason: "",
    });
  }, 3000);
};

  const isFormValid = formData.specialization && formData.date && formData.time && formData.reason.trim()

  if (isSubmitted) {
    return (
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-800 mb-2">Appointment Booked Successfully!</h2>
              <p className="text-green-700 mb-4">
                Your appointment has been scheduled and you will receive a confirmation email shortly.
              </p>
              <div className="bg-white p-4 rounded-lg border border-green-200 text-left">
                <h3 className="font-semibold text-gray-900 mb-2">Appointment Details:</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium">Appointment ID:</span> {appointmentDetails.appointmentId}</p>
                <p><span className="font-medium">Doctor:</span> {appointmentDetails.doctorName}</p>
                <p><span className="font-medium">Specialization:</span> {appointmentDetails.specialization}</p>
                <p><span className="font-medium">Date:</span> {new Date(appointmentDetails.date).toLocaleDateString()}</p>
                <p><span className="font-medium">Time:</span> {appointmentDetails.time}</p>
                <p><span className="font-medium">Reason:</span> {appointmentDetails.reason}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Book Appointment</h1>
        <p className="text-gray-600">Schedule your consultation with our qualified healthcare professionals</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-teal-600" />
              Appointment Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Specialization */}
              <div className="space-y-2">
                <Label htmlFor="specialization" className="text-sm font-medium text-gray-700">
                  Specialization *
                </Label>
                <Select
                  value={formData.specialization}
                  onValueChange={(value) => handleInputChange("specialization", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    {specializations.map((spec) => (
                      <SelectItem key={spec} value={spec}>
                        {spec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                  Preferred Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full"
                />
              </div>

              {/* Time */}
              <div className="space-y-2">
                <Label htmlFor="time" className="text-sm font-medium text-gray-700">
                  Preferred Time *
                </Label>
                <Select value={formData.time} onValueChange={(value) => handleInputChange("time", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Reason */}
              <div className="space-y-2">
                <Label htmlFor="reason" className="text-sm font-medium text-gray-700">
                  Reason for Visit *
                </Label>
                <Textarea
                  id="reason"
                  placeholder="Please describe your symptoms or reason for the appointment..."
                  value={formData.reason}
                  onChange={(e) => handleInputChange("reason", e.target.value)}
                  rows={4}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Provide as much detail as possible to help the doctor prepare for your consultation.
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Booking Appointment...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Book Appointment
                    </>
                  )}
                </Button>
              </div>

              {/* Form Validation Message */}
              {!isFormValid && (
                <div className="text-center">
                  <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                    Please fill in all required fields
                  </Badge>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card className="mt-6 bg-teal-50 border-teal-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-teal-800 mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Important Information
            </h3>
            <ul className="text-sm text-teal-700 space-y-1">
              <li>• Appointments are subject to doctor availability</li>
              <li>• You will receive a confirmation email within 24 hours</li>
              <li>• Please arrive 15 minutes before your scheduled time</li>
              <li>• Bring your ID and insurance card to the appointment</li>
              <li>• Cancellations must be made at least 24 hours in advance</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
