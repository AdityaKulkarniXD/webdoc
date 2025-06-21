"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

const pathMap: Record<string, string> = {
  "/dashboard/hospital": "Dashboard",
  "/dashboard/hospital/doctors": "Doctors List",
  "/dashboard/hospital/doctors/add": "Add Doctor",
  "/dashboard/hospital/patients": "Patients",
}

export function HospitalBreadcrumb() {
  const pathname = usePathname()

  // Add safety check
  if (!pathname) {
    return null
  }

  // Generate breadcrumb items
  const pathSegments = pathname.split("/").filter(Boolean)
  const breadcrumbItems = []

  // Always start with Hospital
  breadcrumbItems.push({
    label: "Hospital",
    href: "/dashboard/hospital",
    isActive: pathname === "/dashboard/hospital",
  })

  // Add current page if not dashboard
  if (pathname !== "/dashboard/hospital") {
    const currentPageLabel = pathMap[pathname] || "Page"
    breadcrumbItems.push({
      label: currentPageLabel,
      href: pathname,
      isActive: true,
    })
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
      <div className="px-4 lg:px-6 py-3">
        <nav className="flex items-center space-x-2 text-sm">
          <Link
            href="/dashboard/hospital"
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Home className="h-4 w-4 mr-1" />
            <span className="font-medium">Hospital Portal</span>
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
                      className="text-blue-600 hover:text-blue-800 transition-colors px-2 py-1 rounded-md hover:bg-white/50"
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
