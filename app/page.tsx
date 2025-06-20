import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Stethoscope,
  Users,
  Video,
  Shield,
  Clock,
  ArrowRight,
  Building2,
  UserIcon as UserMd,
  User,
  CheckCircle,
  Star,
  Award,
  Globe,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "MedLynk - Healthcare Platform",
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-xl shadow-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                MedLynk
              </span>
              <p className="text-xs text-gray-500 font-medium">Professional Healthcare Platform</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="#about" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="#contact" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Contact
            </Link>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="absolute inset-0 opacity-5"></div>
        <div className="container mx-auto text-center relative">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100 px-4 py-2 text-sm font-medium">
              🏥 Trusted by 50+ Healthcare Institutions
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Advanced Healthcare
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Management Platform
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Streamline your healthcare operations with our comprehensive telemedicine platform. Connect patients,
              doctors, and hospitals through secure, AI-powered digital health solutions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base font-medium">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-3 text-base font-medium border-gray-300">
                Watch Demo
                <Video className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600">10K+</div>
                <div className="text-sm text-gray-600 font-medium">Patients Served</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-green-600">500+</div>
                <div className="text-sm text-gray-600 font-medium">Healthcare Providers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-purple-600">50+</div>
                <div className="text-sm text-gray-600 font-medium">Partner Hospitals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-orange-600">99.9%</div>
                <div className="text-sm text-gray-600 font-medium">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Type Selection */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your Access Portal</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tailored experiences for every healthcare stakeholder. Select your role to access specialized tools and
              features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {/* Hospital Portal */}
            <Card className="group relative overflow-hidden border-2 hover:border-blue-200 transition-all duration-300 hover:shadow-2xl flex flex-col h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="text-center pb-6 relative z-10">
                <div className="mx-auto mb-6 p-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl w-24 h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="h-12 w-12 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 mb-2">Hospital Management</CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  Comprehensive hospital administration, staff management, and operational oversight
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 pb-8 flex-1 flex flex-col">
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                    <span className="text-sm">Doctor & Staff Management</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                    <span className="text-sm">Patient Analytics & Insights</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                    <span className="text-sm">Resource Planning & Optimization</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                    <span className="text-sm">Quality Monitoring & Compliance</span>
                  </li>
                </ul>
                <Link href="/auth/hospital">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white group-hover:shadow-lg transition-all text-sm font-medium py-3">
                    Access Hospital Portal
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Doctor Portal */}
            <Card className="group relative overflow-hidden border-2 hover:border-green-200 transition-all duration-300 hover:shadow-2xl flex flex-col h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="text-center pb-6 relative z-10">
                <div className="mx-auto mb-6 p-6 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl w-24 h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <UserMd className="h-12 w-12 text-green-600" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 mb-2">Doctor Dashboard</CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  Professional medical practice management with advanced patient care tools
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 pb-8 flex-1 flex flex-col">
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-sm">Secure Video Consultations</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-sm">Digital Patient Records</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-sm">Smart Appointment Scheduling</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-sm">AI-Powered Health Analytics</span>
                  </li>
                </ul>
                <Link href="/auth/doctor">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white group-hover:shadow-lg transition-all text-sm font-medium py-3">
                    Access Doctor Portal
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Patient Portal */}
            <Card className="group relative overflow-hidden border-2 hover:border-purple-200 transition-all duration-300 hover:shadow-2xl flex flex-col h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="text-center pb-6 relative z-10">
                <div className="mx-auto mb-6 p-6 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl w-24 h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <User className="h-12 w-12 text-purple-600" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 mb-2">Patient Care</CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  Personalized healthcare experience with easy access to medical services
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 pb-8 flex-1 flex flex-col">
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0" />
                    <span className="text-sm">Find & Book Specialists</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0" />
                    <span className="text-sm">Complete Medical History</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0" />
                    <span className="text-sm">Virtual Consultations</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0" />
                    <span className="text-sm">Health Tracking & Monitoring</span>
                  </li>
                </ul>
                <Link href="/auth/patient">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white group-hover:shadow-lg transition-all text-sm font-medium py-3">
                    Access Patient Portal
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100 px-4 py-2 text-sm font-medium">
              Advanced Technology
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Cutting-Edge Healthcare Features</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience the future of healthcare with our comprehensive suite of professional-grade tools and features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardContent className="p-8">
                <div className="bg-blue-100 p-4 rounded-xl w-fit mb-6">
                  <Video className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Video Consultations</h3>
                <p className="text-gray-600 leading-relaxed">
                  HIPAA-compliant video calls with end-to-end encryption, HD quality, and seamless integration
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardContent className="p-8">
                <div className="bg-green-100 p-4 rounded-xl w-fit mb-6">
                  <Stethoscope className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Triage</h3>
                <p className="text-gray-600 leading-relaxed">
                  Intelligent symptom assessment and priority routing with machine learning algorithms
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardContent className="p-8">
                <div className="bg-purple-100 p-4 rounded-xl w-fit mb-6">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Digital Health Records</h3>
                <p className="text-gray-600 leading-relaxed">
                  Comprehensive, secure medical history management with blockchain-level security
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardContent className="p-8">
                <div className="bg-orange-100 p-4 rounded-xl w-fit mb-6">
                  <Heart className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Wearable Integration</h3>
                <p className="text-gray-600 leading-relaxed">
                  Real-time health monitoring from Apple Health, Fitbit, and other leading devices
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardContent className="p-8">
                <div className="bg-red-100 p-4 rounded-xl w-fit mb-6">
                  <Clock className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Scheduling</h3>
                <p className="text-gray-600 leading-relaxed">
                  Automated appointment booking with intelligent calendar management and reminders
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardContent className="p-8">
                <div className="bg-teal-100 p-4 rounded-xl w-fit mb-6">
                  <Users className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Multi-Platform Access</h3>
                <p className="text-gray-600 leading-relaxed">
                  Seamless experience across web, mobile, and tablet with real-time synchronization
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by Healthcare Leaders</h2>
            <p className="text-lg text-gray-600">See what healthcare professionals are saying about MediConnect</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "MediConnect has revolutionized our patient care delivery. The platform is intuitive and our staff
                  adoption was seamless."
                </p>
                <div className="flex items-center">
                  <div className="bg-blue-600 rounded-full p-2 mr-4">
                    <UserMd className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Dr. Sarah Mitchell</p>
                    <p className="text-sm text-gray-600">Chief Medical Officer, City Hospital</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "The AI triage system has improved our emergency response times by 40%. Exceptional technology."
                </p>
                <div className="flex items-center">
                  <div className="bg-green-600 rounded-full p-2 mr-4">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Michael Chen</p>
                    <p className="text-sm text-gray-600">Hospital Administrator, Metro Health</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "As a patient, I love how easy it is to access my records and schedule appointments. Game-changer!"
                </p>
                <div className="flex items-center">
                  <div className="bg-purple-600 rounded-full p-2 mr-4">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Emma Rodriguez</p>
                    <p className="text-sm text-gray-600">Patient & Healthcare Advocate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-xl">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold">MedLynk</span>
                  <p className="text-sm text-gray-400">Professional Healthcare Platform</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Revolutionizing healthcare through innovative technology, compassionate care, and seamless digital
                experiences for patients, doctors, and healthcare institutions.
              </p>
              <div className="flex space-x-4 mt-6">
                <div className="bg-gray-800 p-2 rounded-lg">
                  <Award className="h-5 w-5 text-blue-400" />
                </div>
                <div className="bg-gray-800 p-2 rounded-lg">
                  <Shield className="h-5 w-5 text-green-400" />
                </div>
                <div className="bg-gray-800 p-2 rounded-lg">
                  <Globe className="h-5 w-5 text-purple-400" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">Platform Access</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/auth/hospital" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Hospital Portal
                  </Link>
                </li>
                <li>
                  <Link href="/auth/doctor" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Doctor Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/auth/patient" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Patient Care
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    API Documentation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">Contact Info</h4>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-400 text-sm">
                  <Phone className="h-4 w-4 mr-3" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center text-gray-400 text-sm">
                  <Mail className="h-4 w-4 mr-3" />
                  support@medlynk.com
                </li>
                <li className="flex items-center text-gray-400 text-sm">
                  <MapPin className="h-4 w-4 mr-3" />
                  San Francisco, CA
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2024 MediConnect. All rights reserved. HIPAA Compliant & SOC 2 Certified.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Security
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
