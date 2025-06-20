"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, ArrowLeft } from "lucide-react"

// Extend the Window interface to include patientToken
declare global {
  interface Window {
    patientToken?: string;
  }
}

export default function PatientAuth() {
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  // Signup form state
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    password: ''
  })

  // Loading and error states
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Handle login form changes
  interface LoginData {
    email: string;
    password: string;
  }

  interface SignupData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    password: string;
  }

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  // Handle signup form changes
  interface SignupChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

  const handleSignupChange = (e: SignupChangeEvent) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  // Handle gender selection
  interface GenderChangeEvent {
    target: {
      value: string;
    };
  }

  const handleGenderChange = (value: string) => {
    setSignupData({
      ...signupData,
      gender: value
    })
  }

  // Handle login submission
  const handleLogin = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('http:localhost:3000/api/v1/patient/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password
        })
      })

      const data = await response.json()

      if (response.ok) {
        // Store token in memory (since localStorage is not available)
        window.patientToken = data.token
        setSuccess('Login successful! Redirecting...')
        
        // Redirect to patient dashboard
        setTimeout(() => {
          window.location.href = '/dashboard/patient'
        }, 1500)
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Handle signup submission
  const handleSignup = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/patient/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: signupData.firstName,
          lastName: signupData.lastName,
          email: signupData.email,
          phone: signupData.phone,
          dateOfBirth: signupData.dateOfBirth,
          gender: signupData.gender,
          password: signupData.password
        })
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Account created successfully! Please login.')
        // Reset form
        setSignupData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          dateOfBirth: '',
          gender: '',
          password: ''
        })
        // Switch to login tab after 2 seconds
        setTimeout(() => {
          const loginTab = document.querySelector('[value="login"]')
          if (loginTab) {
            (loginTab as HTMLElement).click()
          }
        }, 2000)
      } else {
        setError(data.error || 'Registration failed')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      {/* Back to Home - Top Left */}
      <div className="absolute top-4 left-4 z-10">
        <a href="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">Back to Home</span>
        </a>
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
              {/* Error/Success Messages */}
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-md text-sm">
                  {success}
                </div>
              )}

              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient-email">Email</Label>
                    <Input 
                      id="patient-email" 
                      name="email"
                      type="email" 
                      placeholder="patient@example.com"
                      value={loginData.email}
                      onChange={handleLoginChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient-password">Password</Label>
                    <Input 
                      id="patient-password" 
                      name="password"
                      type="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                    />
                  </div>
                  <div className="pt-4">
                    <Button 
                      onClick={handleLogin}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Logging in...' : 'Login to Patient Portal'}
                    </Button>
                  </div>
                  <div className="text-center pt-2">
                    <a href="#" className="text-sm text-purple-600 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient-first-name">First Name</Label>
                      <Input 
                        id="patient-first-name" 
                        name="firstName"
                        placeholder="Jane"
                        value={signupData.firstName}
                        onChange={handleSignupChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-last-name">Last Name</Label>
                      <Input 
                        id="patient-last-name" 
                        name="lastName"
                        placeholder="Smith"
                        value={signupData.lastName}
                        onChange={handleSignupChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient-email-signup">Email</Label>
                    <Input 
                      id="patient-email-signup" 
                      name="email"
                      type="email" 
                      placeholder="patient@example.com"
                      value={signupData.email}
                      onChange={handleSignupChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient-phone">Phone Number</Label>
                    <Input 
                      id="patient-phone" 
                      name="phone"
                      type="tel" 
                      placeholder="+1 (555) 123-4567"
                      value={signupData.phone}
                      onChange={handleSignupChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient-dob">Date of Birth</Label>
                    <Input 
                      id="patient-dob" 
                      name="dateOfBirth"
                      type="date"
                      value={signupData.dateOfBirth}
                      onChange={handleSignupChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient-gender">Gender</Label>
                    <Select value={signupData.gender} onValueChange={handleGenderChange}>
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
                    <Input 
                      id="patient-password-signup" 
                      name="password"
                      type="password"
                      value={signupData.password}
                      onChange={handleSignupChange}
                    />
                  </div>
                  <div className="pt-4">
                    <Button 
                      onClick={handleSignup}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Creating Account...' : 'Create Patient Account'}
                    </Button>
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