"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  UserPlus,
  User,
  Mail,
  Lock,
  Phone,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle2,
  Baby,
  Calendar,
  School,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { createClient } from "@/lib/supabase/client"

const steps = [
  { id: 1, title: "Parent Info", icon: User },
  { id: 2, title: "Child Info", icon: Baby },
  { id: 3, title: "Confirm", icon: CheckCircle2 },
]

export default function SignupPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // Parent form state
  const [parentData, setParentData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    churchName: "",
  })

  // Child form state
  const [childData, setChildData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    schoolName: "",
    schoolGrade: "",
    medicalConditions: "",
    photoConsent: false,
  })

  const progress = (currentStep / steps.length) * 100

  const handleParentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParentData({ ...parentData, [e.target.name]: e.target.value })
  }

  const handleChildChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChildData({ ...childData, [e.target.name]: e.target.value })
  }

  const validateStep1 = () => {
    if (!parentData.firstName || !parentData.lastName || !parentData.email || !parentData.password) {
      setError("Please fill in all required fields")
      return false
    }
    if (parentData.password.length < 8) {
      setError("Password must be at least 8 characters")
      return false
    }
    if (parentData.password !== parentData.confirmPassword) {
      setError("Passwords do not match")
      return false
    }
    setError("")
    return true
  }

  const validateStep2 = () => {
    if (!childData.firstName || !childData.lastName || !childData.dateOfBirth || !childData.gender) {
      setError("Please fill in all required fields")
      return false
    }
    setError("")
    return true
  }

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2)
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3)
    }
  }

  const handleBack = () => {
    setError("")
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError("")

    try {
      const supabase = createClient()

      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: parentData.email,
        password: parentData.password,
        options: {
          data: {
            name: `${parentData.firstName} ${parentData.lastName}`,
            phone: parentData.phone,
          },
        },
      })

      if (authError) throw authError

      // For demo, redirect to success page
      router.push("/signup/success")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  const getDisplayName = () => {
    if (childData.lastName) {
      return `${childData.firstName} ${childData.lastName.charAt(0)}.`
    }
    return childData.firstName
  }

  return (
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center p-4 py-8">
      <div className="absolute inset-0 bg-pattern-stars opacity-20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-slate-800">The Chosen</h1>
            <p className="text-xs text-amber-600 font-medium -mt-1">Generation</p>
          </div>
        </Link>

        <Card variant="glass" className="shadow-xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">Register Your Child</CardTitle>
            <CardDescription>
              Join our family and start your child&apos;s faith journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex items-center gap-1 text-sm ${
                      currentStep >= step.id ? "text-amber-600" : "text-slate-400"
                    }`}
                  >
                    <step.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{step.title}</span>
                  </div>
                ))}
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Step 1: Parent Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <Badge variant="default" className="mb-2">Parent/Guardian Information</Badge>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      value={parentData.firstName}
                      onChange={handleParentChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      value={parentData.lastName}
                      onChange={handleParentChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="parent@example.com"
                      value={parentData.email}
                      onChange={handleParentChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (234) 567-8900"
                      value={parentData.phone}
                      onChange={handleParentChange}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="churchName">Church Name</Label>
                  <Input
                    id="churchName"
                    name="churchName"
                    placeholder="Your church name"
                    value={parentData.churchName}
                    onChange={handleParentChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Min 8 characters"
                        value={parentData.password}
                        onChange={handleParentChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        value={parentData.confirmPassword}
                        onChange={handleParentChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="showPassword"
                    checked={showPassword}
                    onCheckedChange={(checked) => setShowPassword(checked as boolean)}
                  />
                  <Label htmlFor="showPassword" className="text-sm text-slate-500">
                    Show passwords
                  </Label>
                </div>
              </motion.div>
            )}

            {/* Step 2: Child Information */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <Badge variant="magic" className="mb-2">
                  <Baby className="w-3 h-3 mr-1" />
                  Child Information
                </Badge>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="childFirstName">First Name *</Label>
                    <Input
                      id="childFirstName"
                      name="firstName"
                      placeholder="Emma"
                      value={childData.firstName}
                      onChange={handleChildChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="childLastName">Last Name *</Label>
                    <Input
                      id="childLastName"
                      name="lastName"
                      placeholder="Doe"
                      value={childData.lastName}
                      onChange={handleChildChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={childData.dateOfBirth}
                        onChange={handleChildChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select
                      value={childData.gender}
                      onValueChange={(value) => setChildData({ ...childData, gender: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="schoolName">School Name</Label>
                    <div className="relative">
                      <School className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="schoolName"
                        name="schoolName"
                        placeholder="School name"
                        value={childData.schoolName}
                        onChange={handleChildChange}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schoolGrade">Grade/Class</Label>
                    <Input
                      id="schoolGrade"
                      name="schoolGrade"
                      placeholder="e.g., Grade 3"
                      value={childData.schoolGrade}
                      onChange={handleChildChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medicalConditions">Medical Conditions/Allergies</Label>
                  <Input
                    id="medicalConditions"
                    name="medicalConditions"
                    placeholder="Enter any conditions or 'None'"
                    value={childData.medicalConditions}
                    onChange={handleChildChange}
                  />
                </div>

                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="photoConsent"
                      checked={childData.photoConsent}
                      onCheckedChange={(checked) =>
                        setChildData({ ...childData, photoConsent: checked as boolean })
                      }
                    />
                    <div>
                      <Label htmlFor="photoConsent" className="text-sm font-medium text-slate-700">
                        Photo & Media Consent
                      </Label>
                      <p className="text-xs text-slate-500 mt-1">
                        I consent to my child being photographed during ministry activities.
                        Photos may be used for internal records and, with further permission,
                        for ministry communications.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <Badge variant="success" className="mb-2">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Review & Confirm
                </Badge>

                <div className="space-y-4">
                  <Card className="bg-slate-50">
                    <CardContent className="pt-4">
                      <h4 className="font-semibold text-slate-800 mb-2">Parent Information</h4>
                      <div className="text-sm text-slate-600 space-y-1">
                        <p><span className="font-medium">Name:</span> {parentData.firstName} {parentData.lastName}</p>
                        <p><span className="font-medium">Email:</span> {parentData.email}</p>
                        {parentData.phone && <p><span className="font-medium">Phone:</span> {parentData.phone}</p>}
                        {parentData.churchName && <p><span className="font-medium">Church:</span> {parentData.churchName}</p>}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-amber-50 border-amber-100">
                    <CardContent className="pt-4">
                      <h4 className="font-semibold text-slate-800 mb-2">Child Information</h4>
                      <div className="text-sm text-slate-600 space-y-1">
                        <p><span className="font-medium">Display Name:</span> {getDisplayName()}</p>
                        <p><span className="font-medium">Date of Birth:</span> {childData.dateOfBirth}</p>
                        <p><span className="font-medium">Gender:</span> {childData.gender}</p>
                        {childData.schoolName && <p><span className="font-medium">School:</span> {childData.schoolName}</p>}
                        <p><span className="font-medium">Photo Consent:</span> {childData.photoConsent ? "Yes" : "No"}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <p className="text-sm text-blue-700">
                      <strong>What happens next?</strong> After registration, our team will review
                      your application and contact you with your child&apos;s class assignment
                      and login PIN within 24-48 hours.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm mt-4">
                {error}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-6">
              {currentStep > 1 && (
                <Button variant="outline" onClick={handleBack} className="flex-1">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              {currentStep < 3 ? (
                <Button onClick={handleNext} className="flex-1">
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="flex-1" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">&#9696;</span>
                      Registering...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      Complete Registration
                    </span>
                  )}
                </Button>
              )}
            </div>

            <div className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link href="/login" className="text-amber-600 hover:text-amber-700 font-medium">
                Sign in here
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
