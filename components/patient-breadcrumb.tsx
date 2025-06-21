"use client"

import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function PatientBreadcrumb() {
  const pathname = usePathname()

  const getBreadcrumbItems = () => {
    const segments = pathname.split("/").filter(Boolean)

    const items = []

    // Always start with Dashboard
    items.push({
      label: "Dashboard",
      href: "/dashboard/patient",
      isActive: pathname === "/dashboard/patient",
    })

    // Handle different routes
    if (segments.includes("doctors")) {
      items.push({
        label: "Find Doctors",
        href: "/dashboard/patient/doctors",
        isActive: pathname === "/dashboard/patient/doctors",
      })
    } else if (segments.includes("medical-history")) {
      items.push({
        label: "Medical History",
        href: "/dashboard/patient/medical-history",
        isActive: pathname === "/dashboard/patient/medical-history",
      })
    } else if (segments.includes("video-calls")) {
      items.push({
        label: "Video Appointments",
        href: "/dashboard/patient/video-calls",
        isActive: pathname === "/dashboard/patient/video-calls",
      })
    } else if (segments.includes("settings")) {
      items.push({
        label: "Settings",
        href: "/dashboard/patient/settings",
        isActive: pathname === "/dashboard/patient/settings",
      })
    }

    return items
  }

  const breadcrumbItems = getBreadcrumbItems()

  // Always show breadcrumb, even for dashboard
  return (
    <div className="flex items-center space-x-2">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => (
            <div key={item.href} className="flex items-center">
              <BreadcrumbItem>
                {item.isActive ? (
                  <BreadcrumbPage className="text-teal-600 font-medium">{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.href} className="text-gray-600 hover:text-teal-600">
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator className="text-gray-400" />}
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
