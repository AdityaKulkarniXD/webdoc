import type React from "react"
import { DoctorSidebar } from "@/components/doctor-sidebar"

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DoctorSidebar />
      <div className="lg:pl-80">{children}</div>
    </div>
  )
}
