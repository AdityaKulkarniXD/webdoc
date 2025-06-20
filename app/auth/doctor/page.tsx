import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserIcon as UserMd, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DoctorAuth() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Back to Home - Top Left */}
      <div className="absolute top-4 left-4 z-10">
        <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </div>

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-16 h-16 flex items-center justify-center">
                <UserMd className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Doctor Portal</CardTitle>
              <CardDescription className="text-gray-600">
                Access your medical practice management system
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="doctor-email">Email</Label>
                    <Input id="doctor-email" type="email" placeholder="doctor@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctor-password">Password</Label>
                    <Input id="doctor-password" type="password" />
                  </div>
                  <div className="pt-4">
                    <Link href="/dashboard/doctor">
                      <Button className="w-full bg-green-600 hover:bg-green-700">Login to Doctor Portal</Button>
                    </Link>
                  </div>
                  <div className="text-center pt-2">
                    <Link href="#" className="text-sm text-green-600 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="doctor-first-name">First Name</Label>
                      <Input id="doctor-first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doctor-last-name">Last Name</Label>
                      <Input id="doctor-last-name" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctor-email-signup">Email</Label>
                    <Input id="doctor-email-signup" type="email" placeholder="doctor@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctor-license">Medical License</Label>
                    <Input id="doctor-license" placeholder="MD123456" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctor-specialty">Specialty</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="dermatology">Dermatology</SelectItem>
                        <SelectItem value="neurology">Neurology</SelectItem>
                        <SelectItem value="pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="psychiatry">Psychiatry</SelectItem>
                        <SelectItem value="general">General Medicine</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctor-password-signup">Password</Label>
                    <Input id="doctor-password-signup" type="password" />
                  </div>
                  <div className="pt-4">
                    <Button className="w-full bg-green-600 hover:bg-green-700">Create Doctor Account</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
