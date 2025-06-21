import type React from "react"
import { HospitalSidebar } from "@/components/hospital-sidebar"

export default function HospitalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <HospitalSidebar />
      <div className="lg:pl-64">{children}</div>
    </div>
  )
}
