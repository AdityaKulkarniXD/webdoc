"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { VideoCallInterface } from "@/components/video-call-interface"

interface PageProps {
  params: {
    appointmentId: string
  }
}

// Mock appointment data - in real app, this would come from API
const getAppointmentData = (appointmentId: string) => {
  const appointments = {
    "1": {
      doctorName: "Dr. Sarah Johnson",
      patientName: "Jane Smith",
      specialty: "Cardiology",
      appointmentTime: "2:00 PM - 2:30 PM",
      date: "2024-01-20",
    },
    "2": {
      doctorName: "Dr. Michael Chen",
      patientName: "Jane Smith",
      specialty: "Neurology",
      appointmentTime: "10:00 AM - 10:30 AM",
      date: "2024-01-21",
    },
    "3": {
      doctorName: "Dr. Sarah Johnson",
      patientName: "Jane Smith",
      specialty: "Cardiology",
      appointmentTime: "2:00 PM - 2:30 PM",
      date: "2024-01-20",
    },
  }

  return appointments[appointmentId as keyof typeof appointments] || appointments["1"]
}

export default function PatientVideoCallPage({ params }: PageProps) {
  const router = useRouter()
  const [callEnded, setCallEnded] = useState(false)

  const appointmentData = getAppointmentData(params.appointmentId)

  const handleEndCall = () => {
    setCallEnded(true)
    // Redirect back to video calls page after a short delay
    setTimeout(() => {
      router.push("/dashboard/patient/video-calls")
    }, 2000)
  }

  if (callEnded) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Call Ended</h2>
          <p className="text-gray-300 mb-4">Thank you for the consultation</p>
          <p className="text-sm text-gray-400">Redirecting to video calls...</p>
        </div>
      </div>
    )
  }

  return (
    <VideoCallInterface
      doctorName={appointmentData.doctorName}
      patientName={appointmentData.patientName}
      userType="patient"
      appointmentId={params.appointmentId}
      onEndCall={handleEndCall}
    />
  )
}
