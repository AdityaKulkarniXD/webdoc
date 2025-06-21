import type React from "react"
import { PatientSidebar } from "@/components/patient-sidebar"
import { PatientBreadcrumb } from "@/components/patient-breadcrumb"

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <PatientSidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <div className="bg-white border-b px-6 py-4 shadow-sm">
          <PatientBreadcrumb />
        </div>
        <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  )
}
