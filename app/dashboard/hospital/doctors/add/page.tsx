import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { UserPlus, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { HospitalBreadcrumb } from "@/components/hospital-breadcrumb"

export default function AddDoctorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="px-4 lg:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3 lg:ml-0 ml-12">
            <Link href="/dashboard/hospital/doctors">
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <UserPlus className="h-5 w-5 text-blue-600" />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Add New Doctor</h1>
              <p className="text-xs text-gray-600">Register a new medical professional</p>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <HospitalBreadcrumb />

      <div className="p-4 lg:p-6">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Doctor Information</CardTitle>
              <CardDescription className="text-xs">
                Please fill in all required information to register a new doctor
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form className="space-y-4">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-xs">
                      First Name *
                    </Label>
                    <Input id="firstName" placeholder="John" className="text-xs" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-xs">
                      Last Name *
                    </Label>
                    <Input id="lastName" placeholder="Doe" className="text-xs" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs">
                      Email Address *
                    </Label>
                    <Input id="email" type="email" placeholder="doctor@hospital.com" className="text-xs" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs">
                      Phone Number *
                    </Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="text-xs" />
                  </div>
                </div>

                {/* Professional Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="specialty" className="text-xs">
                      Specialty *
                    </Label>
                    <Select>
                      <SelectTrigger className="text-xs">
                        <SelectValue placeholder="Select specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="neurology">Neurology</SelectItem>
                        <SelectItem value="pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="orthopedics">Orthopedics</SelectItem>
                        <SelectItem value="dermatology">Dermatology</SelectItem>
                        <SelectItem value="psychiatry">Psychiatry</SelectItem>
                        <SelectItem value="general">General Medicine</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="license" className="text-xs">
                      Medical License *
                    </Label>
                    <Input id="license" placeholder="MD123456" className="text-xs" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-xs">
                      Years of Experience
                    </Label>
                    <Input id="experience" type="number" placeholder="5" className="text-xs" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-xs">
                      Department
                    </Label>
                    <Select>
                      <SelectTrigger className="text-xs">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emergency">Emergency</SelectItem>
                        <SelectItem value="surgery">Surgery</SelectItem>
                        <SelectItem value="outpatient">Outpatient</SelectItem>
                        <SelectItem value="icu">ICU</SelectItem>
                        <SelectItem value="pediatric">Pediatric</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-2">
                  <Label htmlFor="education" className="text-xs">
                    Education & Qualifications
                  </Label>
                  <Textarea
                    id="education"
                    placeholder="MD from Harvard Medical School, Residency at Johns Hopkins..."
                    className="text-xs"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-xs">
                    Professional Bio
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Brief description of the doctor's background and expertise..."
                    className="text-xs"
                    rows={3}
                  />
                </div>

                {/* Schedule Information */}
                <div className="space-y-2">
                  <Label className="text-xs">Working Hours</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startTime" className="text-xs">
                        Start Time
                      </Label>
                      <Input id="startTime" type="time" defaultValue="09:00" className="text-xs" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endTime" className="text-xs">
                        End Time
                      </Label>
                      <Input id="endTime" type="time" defaultValue="17:00" className="text-xs" />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button type="submit" className="flex-1 text-xs">
                    <UserPlus className="h-3 w-3 mr-2" />
                    Add Doctor
                  </Button>
                  <Link href="/dashboard/hospital/doctors" className="flex-1">
                    <Button type="button" variant="outline" className="w-full text-xs">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
