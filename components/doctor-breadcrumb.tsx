"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

const pathMap: Record<string, string> = {
  "/dashboard/doctor": "Dashboard",
  "/dashboard/doctor/appointments": "All Appointments",
  "/dashboard/doctor/patients": "Patient Management",
  "/dashboard/doctor/settings": "Settings",
}

export function DoctorBreadcrumb() {
  const pathname = usePathname()

  // Add safety check
  if (!pathname) {
    return null
  }

  // Generate breadcrumb items
  const breadcrumbItems = []

  // Always start with Doctor
  breadcrumbItems.push({
    label: "Doctor Portal",
    href: "/dashboard/doctor",
    isActive: pathname === "/dashboard/doctor",
  })

  // Add current page if not dashboard
  if (pathname !== "/dashboard/doctor") {
    const currentPageLabel = pathMap[pathname] || "Page"
    breadcrumbItems.push({
      label: currentPageLabel,
      href: pathname,
      isActive: true,
    })
  }

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
      <div className="px-4 lg:px-6 py-3">
        <nav className="flex items-center space-x-2 text-sm">
          <Link
            href="/dashboard/doctor"
            className="flex items-center text-green-600 hover:text-green-800 transition-colors"
          >
            <Home className="h-4 w-4 mr-1" />
            <span className="font-medium">Doctor Portal</span>
          </Link>

          {breadcrumbItems.length > 1 && (
            <>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              {breadcrumbItems.slice(1).map((item, index) => (
                <div key={item.href} className="flex items-center">
                  {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400 mr-2" />}
                  {item.isActive ? (
                    <span className="text-gray-900 font-medium bg-white px-3 py-1 rounded-full shadow-sm border">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-green-600 hover:text-green-800 transition-colors px-2 py-1 rounded-md hover:bg-white/50"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </>
          )}
        </nav>
      </div>
    </div>
  )
}
