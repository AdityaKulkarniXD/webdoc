import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PatientAuth() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      {/* Back to Home - Top Left */}
      <div className="absolute top-4 left-4 z-10">
        <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </div>

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center">
                <User className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Patient Portal</CardTitle>
              <CardDescription className="text-gray-600">Access your personal healthcare dashboard</CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient-email">Email</Label>
                    <Input id="patient-email" type="email" placeholder="patient@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient-password">Password</Label>
                    <Input id="patient-password" type="password" />
                  </div>
                  <div className="pt-4">
                    <Link href="/dashboard/patient">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">Login to Patient Portal</Button>
                    </Link>
                  </div>
                  <div className="text-center pt-2">
                    <Link href="#" className="text-sm text-purple-600 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient-first-name">First Name</Label>
                      <Input id="patient-first-name" placeholder="Jane" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-last-name">Last Name</Label>
                      <Input id="patient-last-name" placeholder="Smith" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient-email-signup">Email</Label>
                    <Input id="patient-email-signup" type="email" placeholder="patient@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient-phone">Phone Number</Label>
                    <Input id="patient-phone" type="tel" placeholder="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient-dob">Date of Birth</Label>
                    <Input id="patient-dob" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient-gender">Gender</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient-password-signup">Password</Label>
                    <Input id="patient-password-signup" type="password" />
                  </div>
                  <div className="pt-4">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">Create Patient Account</Button>
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
