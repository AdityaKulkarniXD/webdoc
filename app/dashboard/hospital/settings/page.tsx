import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, ArrowLeft, Building2, Lock, Bell, Shield } from "lucide-react"
import Link from "next/link"
import { HospitalBreadcrumb } from "@/components/hospital-breadcrumb"

export default function HospitalSettings() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="px-4 lg:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3 lg:ml-0 ml-12">
            <Link href="/dashboard/hospital">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <Settings className="h-5 w-5 text-blue-600" />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Hospital Settings</h1>
              <p className="text-xs text-gray-600">Manage hospital account and preferences</p>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <HospitalBreadcrumb />

      <div className="p-4 lg:p-6">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="profile">Hospital Info</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
            </TabsList>

            {/* Hospital Information */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-sm">
                    <Building2 className="h-4 w-4 mr-2" />
                    Hospital Information
                  </CardTitle>
                  <CardDescription className="text-xs">Update your hospital's information and settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="hospitalName" className="text-xs">
                        Hospital Name
                      </Label>
                      <Input id="hospitalName" defaultValue="City General Hospital" className="text-xs" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hospitalType" className="text-xs">
                        Hospital Type
                      </Label>
                      <Select defaultValue="general">
                        <SelectTrigger className="text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Hospital</SelectItem>
                          <SelectItem value="specialty">Specialty Hospital</SelectItem>
                          <SelectItem value="teaching">Teaching Hospital</SelectItem>
                          <SelectItem value="research">Research Hospital</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="adminEmail" className="text-xs">
                        Admin Email
                      </Label>
                      <Input
                        id="adminEmail"
                        type="email"
                        defaultValue="admin@citygeneralhospital.com"
                        className="text-xs"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hospitalPhone" className="text-xs">
                        Phone Number
                      </Label>
                      <Input id="hospitalPhone" type="tel" defaultValue="+1 (555) 123-4567" className="text-xs" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-xs">
                      Address
                    </Label>
                    <Textarea
                      id="address"
                      rows={3}
                      defaultValue="123 Medical Center Drive, Healthcare City, HC 12345"
                      className="text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="capacity" className="text-xs">
                        Bed Capacity
                      </Label>
                      <Input id="capacity" type="number" defaultValue="500" className="text-xs" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="departments" className="text-xs">
                        Number of Departments
                      </Label>
                      <Input id="departments" type="number" defaultValue="12" className="text-xs" />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-xs">Save Changes</Button>
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
                      Update your admin password to keep your account secure
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
                      <Button className="bg-blue-600 hover:bg-blue-700 text-xs">Update Password</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Two-Factor Authentication</CardTitle>
                    <CardDescription className="text-xs">
                      Add an extra layer of security to your hospital account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Two-Factor Authentication</p>
                        <p className="text-xs text-gray-600">Secure your hospital account with 2FA</p>
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
                  <CardDescription className="text-xs">Choose how your hospital wants to be notified</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">New Doctor Registrations</p>
                        <p className="text-xs text-gray-600">Get notified when doctors join your hospital</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">
                        Enabled
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Patient Admissions</p>
                        <p className="text-xs text-gray-600">Alerts for new patient admissions</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">
                        Enabled
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">System Alerts</p>
                        <p className="text-xs text-gray-600">Important system notifications</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">
                        Enabled
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Compliance Updates</p>
                        <p className="text-xs text-gray-600">Healthcare compliance notifications</p>
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
                        <input type="checkbox" id="dashboardNotif" defaultChecked className="rounded" />
                        <Label htmlFor="dashboardNotif" className="text-xs">
                          Dashboard notifications
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-xs">Save Preferences</Button>
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
                    Manage your hospital's privacy settings and data preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Hospital Directory Listing</p>
                        <p className="text-xs text-gray-600">Allow your hospital to appear in public directories</p>
                      </div>
                      <Select defaultValue="public">
                        <SelectTrigger className="w-32 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                          <SelectItem value="network">Network Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Data Analytics</p>
                        <p className="text-xs text-gray-600">Allow anonymous usage analytics for improvement</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">
                        Enabled
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Third-party Integrations</p>
                        <p className="text-xs text-gray-600">Share data with approved healthcare partners</p>
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
                        Export Hospital Data
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-xs">
                        Data Retention Settings
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-red-600 hover:text-red-700 text-xs"
                      >
                        Delete Hospital Account
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-xs">Save Settings</Button>
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
