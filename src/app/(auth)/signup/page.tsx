"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  UserPlus,
  User,
  Mail,
  Phone,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Baby,
  Calendar,
  School,
  Key,
  Copy,
  Check,
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

const steps = [
  { id: 1, title: "Parent Info", icon: User },
  { id: 2, title: "Child Info", icon: Baby },
  { id: 3, title: "Complete", icon: CheckCircle2 },
]

// Generate unique 4-digit PIN
function generatePIN(): string {
  return Math.floor(1000 + Math.random() * 9000).toString()
}

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [generatedPIN, setGeneratedPIN] = useState("")
  const [copied, setCopied] = useState(false)

  // Parent form state (simplified - no password)
  const [parentData, setParentData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
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
    if (!parentData.firstName || !parentData.lastName || !parentData.email) {
      setError("Please fill in all required fields")
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
      handleSubmit()
    }
  }

  const handleBack = () => {
    setError("")
    setCurrentStep(currentStep - 1)
  }

  const copyPIN = () => {
    navigator.clipboard.writeText(generatedPIN)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError("")

    try {
      // Generate unique PIN for this child
      const pin = generatePIN()

      // Prepare data for Google Sheets
      const formData = {
        // Parent info
        parentFirstName: parentData.firstName,
        parentLastName: parentData.lastName,
        parentEmail: parentData.email,
        parentPhone: parentData.phone,
        churchName: parentData.churchName,
        // Child info
        childFirstName: childData.firstName,
        childLastName: childData.lastName,
        childDisplayName: `${childData.firstName} ${childData.lastName.charAt(0)}.`,
        dateOfBirth: childData.dateOfBirth,
        gender: childData.gender,
        schoolName: childData.schoolName,
        schoolGrade: childData.schoolGrade,
        medicalConditions: childData.medicalConditions,
        photoConsent: childData.photoConsent ? "Yes" : "No",
        // Generated PIN
        pin: pin,
        // Registration date
        registrationDate: new Date().toISOString(),
      }

      // Send to Google Sheets via Apps Script
      // Replace this URL with your Google Apps Script web app URL
      const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL

      if (GOOGLE_SCRIPT_URL) {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
      }

      // Set the generated PIN and show success
      setGeneratedPIN(pin)
      setCurrentStep(3)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
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
            <CardTitle className="text-2xl">
              {currentStep === 3 ? "Registration Complete!" : "Register Your Child"}
            </CardTitle>
            <CardDescription>
              {currentStep === 3
                ? "Save your child's PIN to access the curriculum"
                : "Join our family and start your child's faith journey"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Progress */}
            {currentStep < 3 && (
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
            )}

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
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Success with PIN */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    Welcome, {childData.firstName}!
                  </h3>
                  <p className="text-slate-600">
                    Registration successful! Here is your child&apos;s unique PIN:
                  </p>
                </div>

                {/* PIN Display */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border-2 border-amber-200">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Key className="w-5 h-5 text-amber-600" />
                    <span className="text-sm font-medium text-amber-700">Child&apos;s Login PIN</span>
                  </div>
                  <div className="text-5xl font-bold tracking-[0.3em] text-amber-600 font-mono">
                    {generatedPIN}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyPIN}
                    className="mt-4"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy PIN
                      </>
                    )}
                  </Button>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-left">
                  <p className="text-sm text-blue-700">
                    <strong>Important:</strong> Save this PIN! Your child will use it to:
                  </p>
                  <ul className="text-sm text-blue-600 mt-2 space-y-1 list-disc list-inside">
                    <li>Access their curriculum and lessons</li>
                    <li>View their scores and progress</li>
                    <li>Earn badges and rewards</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Link href="/login" className="flex-1">
                    <Button className="w-full">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Go to Login
                    </Button>
                  </Link>
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
            {currentStep < 3 && (
              <div className="flex gap-3 mt-6">
                {currentStep > 1 && (
                  <Button variant="outline" onClick={handleBack} className="flex-1">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                )}
                <Button onClick={handleNext} className="flex-1" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">&#9696;</span>
                      Registering...
                    </span>
                  ) : currentStep === 2 ? (
                    <span className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      Complete Registration
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </div>
            )}

            {currentStep < 3 && (
              <div className="mt-6 text-center text-sm text-slate-500">
                Already registered?{" "}
                <Link href="/login" className="text-amber-600 hover:text-amber-700 font-medium">
                  Sign in here
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
