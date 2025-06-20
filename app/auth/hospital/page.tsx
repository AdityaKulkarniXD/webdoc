"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, ArrowLeft, Loader2 } from "lucide-react"

export default function HospitalAuth() {
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: '',
    address: ''
  });

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle login form submission
  const handleLogin = async () => {
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/v1/hospital/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store token in localStorage
        localStorage.setItem('hospitalToken', data.token);
        setSuccess('Login successful! Redirecting...');
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          window.location.href = '/dashboard/hospital';
        }, 1500);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle signup form submission
  const handleSignup = async () => {
    setError('');
    setSuccess('');

    // Validate passwords match
    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/v1/hospital/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: signupData.name,
          email: signupData.email,
          password: signupData.password,
          location: signupData.location,
          phone: signupData.phone,
          address: signupData.address
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess('Hospital registered successfully! Please login.');
        // Reset form
        setSignupData({
          name: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          location: '',
          address: ''
        });
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input changes for login
  interface LoginData {
    email: string;
    password: string;
  }

  interface LoginChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

  const handleLoginChange = (e: LoginChangeEvent) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  // Handle input changes for signup
  interface SignupData {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    location: string;
    address: string;
  }

  interface SignupChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

  const handleSignupChange = (e: SignupChangeEvent) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Back to Home - Top Left */}
      <div className="absolute top-4 left-4 z-10">
        <a href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">Back to Home</span>
        </a>
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
              {/* Error/Success Messages */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm text-green-600">{success}</p>
                </div>
              )}

              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="hospital-email">Hospital Email</Label>
                      <Input 
                        id="hospital-email" 
                        name="email"
                        type="email" 
                        placeholder="admin@hospital.com"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hospital-password">Password</Label>
                      <Input 
                        id="hospital-password" 
                        name="password"
                        type="password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        disabled={isLoading}
                      />
                    </div>
                    <div className="pt-4">
                      <Button 
                        onClick={handleLogin}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Logging in...
                          </>
                        ) : (
                          'Login to Hospital Portal'
                        )}
                      </Button>
                    </div>
                    <div className="text-center pt-2">
                      <a href="#" className="text-sm text-blue-600 hover:underline">
                        Forgot password?
                      </a>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="hospital-name">Hospital Name</Label>
                      <Input 
                        id="hospital-name" 
                        name="name"
                        placeholder="City General Hospital"
                        value={signupData.name}
                        onChange={handleSignupChange}
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hospital-email-signup">Admin Email</Label>
                      <Input 
                        id="hospital-email-signup" 
                        name="email"
                        type="email" 
                        placeholder="admin@hospital.com"
                        value={signupData.email}
                        onChange={handleSignupChange}
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hospital-phone">Phone Number</Label>
                      <Input 
                        id="hospital-phone" 
                        name="phone"
                        type="tel" 
                        placeholder="1234567890"
                        value={signupData.phone}
                        onChange={handleSignupChange}
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hospital-location">Location</Label>
                      <Input 
                        id="hospital-location" 
                        name="location"
                        placeholder="City, State"
                        value={signupData.location}
                        onChange={handleSignupChange}
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hospital-address">Address</Label>
                      <Input 
                        id="hospital-address" 
                        name="address"
                        placeholder="Complete hospital address"
                        value={signupData.address}
                        onChange={handleSignupChange}
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hospital-password-signup">Password</Label>
                      <Input 
                        id="hospital-password-signup" 
                        name="password"
                        type="password"
                        value={signupData.password}
                        onChange={handleSignupChange}
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hospital-confirm-password">Confirm Password</Label>
                      <Input 
                        id="hospital-confirm-password" 
                        name="confirmPassword"
                        type="password"
                        value={signupData.confirmPassword}
                        onChange={handleSignupChange}
                        disabled={isLoading}
                      />
                    </div>
                    <div className="pt-4">
                      <Button 
                        onClick={handleSignup}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating Account...
                          </>
                        ) : (
                          'Create Hospital Account'
                        )}
                      </Button>
                    </div>
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