import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function HospitalAuth() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Back to Home - Top Left */}
      <div className="absolute top-4 left-4 z-10">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </div>

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Hospital Portal</CardTitle>
              <CardDescription className="text-gray-600">
                Access your healthcare facility management system
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
                    <Label htmlFor="hospital-email">Hospital Email</Label>
                    <Input id="hospital-email" type="email" placeholder="admin@hospital.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hospital-password">Password</Label>
                    <Input id="hospital-password" type="password" />
                  </div>
                  <div className="pt-4">
                    <Link href="/dashboard/hospital">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Login to Hospital Portal</Button>
                    </Link>
                  </div>
                  <div className="text-center pt-2">
                    <Link href="#" className="text-sm text-blue-600 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="hospital-name">Hospital Name</Label>
                    <Input id="hospital-name" placeholder="City General Hospital" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hospital-email-signup">Admin Email</Label>
                    <Input id="hospital-email-signup" type="email" placeholder="admin@hospital.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hospital-phone">Phone Number</Label>
                    <Input id="hospital-phone" type="tel" placeholder="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hospital-password-signup">Password</Label>
                    <Input id="hospital-password-signup" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hospital-confirm-password">Confirm Password</Label>
                    <Input id="hospital-confirm-password" type="password" />
                  </div>
                  <div className="pt-4">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Create Hospital Account</Button>
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
