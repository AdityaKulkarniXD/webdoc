import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, User, Lock, Bell, Shield } from "lucide-react"
import { DoctorBreadcrumb } from "@/components/doctor-breadcrumb"

export default function DoctorSettings() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="px-4 lg:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3 lg:ml-0 ml-12">
            <Settings className="h-5 w-5 text-green-600" />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
              <p className="text-xs text-gray-600">Manage your account and preferences</p>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <DoctorBreadcrumb />

      <div className="p-4 lg:p-6">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="profile" className="text-xs">
                Profile
              </TabsTrigger>
              <TabsTrigger value="security" className="text-xs">
                Security
              </TabsTrigger>
              <TabsTrigger value="notifications" className="text-xs">
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy" className="text-xs">
                Privacy
              </TabsTrigger>
            </TabsList>

            {/* Profile Settings */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-sm">
                    <User className="h-4 w-4 mr-2" />
                    Profile Information
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Update your personal and professional information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-xs">
                        First Name
                      </Label>
                      <Input id="firstName" defaultValue="Sarah" className="text-xs" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-xs">
                        Last Name
                      </Label>
                      <Input id="lastName" defaultValue="Johnson" className="text-xs" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs">
                        Email Address
                      </Label>
                      <Input id="email" type="email" defaultValue="sarah.johnson@hospital.com" className="text-xs" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-xs">
                        Phone Number
                      </Label>
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" className="text-xs" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="specialty" className="text-xs">
                        Specialty
                      </Label>
                      <Select defaultValue="cardiology">
                        <SelectTrigger className="text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cardiology">Cardiology</SelectItem>
                          <SelectItem value="neurology">Neurology</SelectItem>
                          <SelectItem value="pediatrics">Pediatrics</SelectItem>
                          <SelectItem value="orthopedics">Orthopedics</SelectItem>
                          <SelectItem value="dermatology">Dermatology</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="license" className="text-xs">
                        Medical License
                      </Label>
                      <Input id="license" defaultValue="MD123456" className="text-xs" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-xs">
                      Professional Bio
                    </Label>
                    <Textarea
                      id="bio"
                      rows={4}
                      defaultValue="Experienced cardiologist with over 15 years of practice. Specialized in interventional cardiology and heart disease prevention."
                      className="text-xs"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-green-600 hover:bg-green-700 text-xs">Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-sm">
                      <Lock className="h-4 w-4 mr-2" />
                      Change Password
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Update your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword" className="text-xs">
                        Current Password
                      </Label>
                      <Input id="currentPassword" type="password" className="text-xs" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-xs">
                        New Password
                      </Label>
                      <Input id="newPassword" type="password" className="text-xs" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-xs">
                        Confirm New Password
                      </Label>
                      <Input id="confirmPassword" type="password" className="text-xs" />
                    </div>
                    <div className="flex justify-end">
                      <Button className="bg-green-600 hover:bg-green-700 text-xs">Update Password</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Two-Factor Authentication</CardTitle>
                    <CardDescription className="text-xs">
                      Add an extra layer of security to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Two-Factor Authentication</p>
                        <p className="text-xs text-gray-600">Secure your account with 2FA</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">
                        Enable 2FA
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-sm">
                    <Bell className="h-4 w-4 mr-2" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription className="text-xs">Choose how you want to be notified</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Appointment Reminders</p>
                        <p className="text-xs text-gray-600">Get notified about upcoming appointments</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">
                        Enabled
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Video Call Notifications</p>
                        <p className="text-xs text-gray-600">Alerts for incoming video calls</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">
                        Enabled
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Patient Messages</p>
                        <p className="text-xs text-gray-600">Notifications for patient communications</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">
                        Enabled
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">System Updates</p>
                        <p className="text-xs text-gray-600">Important system announcements</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">
                        Enabled
                      </Button>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-3 text-sm">Notification Methods</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="emailNotif" defaultChecked className="rounded" />
                        <Label htmlFor="emailNotif" className="text-xs">
                          Email notifications
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="smsNotif" defaultChecked className="rounded" />
                        <Label htmlFor="smsNotif" className="text-xs">
                          SMS notifications
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="pushNotif" defaultChecked className="rounded" />
                        <Label htmlFor="pushNotif" className="text-xs">
                          Push notifications
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-green-600 hover:bg-green-700 text-xs">Save Preferences</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Settings */}
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-sm">
                    <Shield className="h-4 w-4 mr-2" />
                    Privacy & Data
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Manage your privacy settings and data preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Profile Visibility</p>
                        <p className="text-xs text-gray-600">Control who can see your profile information</p>
                      </div>
                      <Select defaultValue="hospital">
                        <SelectTrigger className="w-32 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="hospital">Hospital Only</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Data Analytics</p>
                        <p className="text-xs text-gray-600">Allow anonymous usage analytics</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">
                        Enabled
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Marketing Communications</p>
                        <p className="text-xs text-gray-600">Receive updates about new features</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">
                        Disabled
                      </Button>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-3 text-sm">Data Management</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start text-xs">
                        Download My Data
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-red-600 hover:text-red-700 text-xs"
                      >
                        Delete Account
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-green-600 hover:bg-green-700 text-xs">Save Settings</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
