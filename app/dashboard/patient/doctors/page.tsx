"use client"

import { useState } from "react"
import { Search, Filter, Star, MapPin, Clock, Video, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    hospital: "City General Hospital",
    rating: 4.9,
    reviews: 127,
    experience: "15 years",
    availability: "Available Today",
    nextSlot: "2:00 PM",
    consultationFee: "$150",
    image: "/placeholder.svg?height=80&width=80",
    status: "online",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    hospital: "Metro Medical Center",
    rating: 4.8,
    reviews: 89,
    experience: "12 years",
    availability: "Available Tomorrow",
    nextSlot: "10:00 AM",
    consultationFee: "$200",
    image: "/placeholder.svg?height=80&width=80",
    status: "busy",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Dermatology",
    hospital: "Skin Care Clinic",
    rating: 4.7,
    reviews: 156,
    experience: "8 years",
    availability: "Available Today",
    nextSlot: "4:30 PM",
    consultationFee: "$120",
    image: "/placeholder.svg?height=80&width=80",
    status: "online",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Pediatrics",
    hospital: "Children's Hospital",
    rating: 4.9,
    reviews: 203,
    experience: "20 years",
    availability: "Available Today",
    nextSlot: "3:15 PM",
    consultationFee: "$130",
    image: "/placeholder.svg?height=80&width=80",
    status: "online",
  },
]

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("")

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Find Doctors</h1>
        <p className="text-gray-600">Search and book appointments with qualified healthcare professionals</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search doctors by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="All Specialties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              <SelectItem value="Cardiology">Cardiology</SelectItem>
              <SelectItem value="Neurology">Neurology</SelectItem>
              <SelectItem value="Dermatology">Dermatology</SelectItem>
              <SelectItem value="Pediatrics">Pediatrics</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
                      <AvatarFallback>
                        {doctor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${
                        doctor.status === "online" ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                    <p className="text-teal-600 font-medium">{doctor.specialty}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {doctor.hospital}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {doctor.experience}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{doctor.rating}</span>
                        <span className="text-gray-500">({doctor.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:w-80 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={doctor.availability.includes("Today") ? "default" : "secondary"}
                      className={doctor.availability.includes("Today") ? "bg-green-100 text-green-800" : ""}
                    >
                      {doctor.availability}
                    </Badge>
                    <span className="text-lg font-semibold text-teal-600">{doctor.consultationFee}</span>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Next available:</span> {doctor.nextSlot}
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-teal-600 hover:bg-teal-700">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Appointment
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Video className="h-4 w-4 mr-2" />
                      Video Call
                    </Button>
                  </div>

                  <Button variant="ghost" className="w-full text-teal-600 hover:text-teal-700 hover:bg-teal-50">
                    View Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No doctors found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
