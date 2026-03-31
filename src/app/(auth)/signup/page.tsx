"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  UserPlus,
  Phone,
  Sparkles,
  CheckCircle2,
  Baby,
  Calendar,
  School,
  Key,
  Copy,
  Check,
  BookOpen,
  Star,
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
import { createClient } from "@/lib/supabase/client"

function generatePIN(): string {
  return Math.floor(1000 + Math.random() * 9000).toString()
}

export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState("")
  const [user, setUser] = useState<{ email: string; name: string } | null>(null)
  const [generatedPIN, setGeneratedPIN] = useState("")
  const [copied, setCopied] = useState(false)
  const [step, setStep] = useState<"login" | "child-info" | "complete">("login")

  const [phone, setPhone] = useState("")
  const [churchName, setChurchName] = useState("")

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

  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (authUser) {
        setUser({
          email: authUser.email || "",
          name: authUser.user_metadata?.full_name || authUser.email || "",
        })
        setStep("child-info")
      }
    }
    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        setUser({
          email: session.user.email || "",
          name: session.user.user_metadata?.full_name || session.user.email || "",
        })
        setStep("child-info")
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    setError("")

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/signup`,
        },
      })

      if (error) throw error
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google sign in failed")
      setIsGoogleLoading(false)
    }
  }

  const handleChildChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChildData({ ...childData, [e.target.name]: e.target.value })
  }

  const copyPIN = () => {
    navigator.clipboard.writeText(generatedPIN)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async () => {
    if (!childData.firstName || !childData.lastName || !childData.dateOfBirth || !childData.gender) {
      setError("Please fill in all required fields")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (!authUser) throw new Error("Not authenticated")

      const pin = generatePIN()

      await supabase.from("profiles").upsert({
        id: authUser.id,
        email: authUser.email,
        full_name: authUser.user_metadata?.full_name || "",
        phone: phone,
        church_name: churchName,
        role: "parent",
      })

      const { error: childError } = await supabase.from("children").insert({
        parent_id: authUser.id,
        first_name: childData.firstName,
        last_name: childData.lastName,
        display_name: `${childData.firstName} ${childData.lastName.charAt(0)}.`,
        date_of_birth: childData.dateOfBirth,
        gender: childData.gender,
        school_name: childData.schoolName || null,
        school_grade: childData.schoolGrade || null,
        medical_conditions: childData.medicalConditions || null,
        photo_consent: childData.photoConsent,
        pin_code: pin,
      })

      if (childError) throw childError

      setGeneratedPIN(pin)
      setStep("complete")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-amber-400 flex items-center justify-center p-4 py-8">
      {/* Star pattern overlay */}
      <div className="absolute inset-0 bg-pattern-stars opacity-40" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-xl">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-2xl text-slate-800">The Chosen</h1>
            <p className="text-sm text-orange-700 font-semibold -mt-1">Generation</p>
          </div>
        </Link>

        <Card className="shadow-2xl border-0 bg-white">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl text-slate-800">
              {step === "complete" ? "Registration Complete!" : "Register Your Child"}
            </CardTitle>
            <CardDescription className="text-slate-600">
              {step === "login" && "Sign in with Google to get started"}
              {step === "child-info" && "Enter your child's information"}
              {step === "complete" && "Save your child's PIN"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Step 1: Google Sign In */}
            {step === "login" && (
              <div className="space-y-6">
                <Button
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading}
                  className="w-full h-14 text-lg bg-white hover:bg-gray-50 text-slate-700 border-2 border-slate-200 shadow-md"
                >
                  {isGoogleLoading ? (
                    <span className="animate-spin mr-2">⏳</span>
                  ) : (
                    <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  )}
                  Continue with Google
                </Button>

                <p className="text-center text-sm text-slate-500">
                  By signing up, you agree to our{" "}
                  <Link href="/terms" className="text-orange-600 hover:underline">Terms</Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-orange-600 hover:underline">Privacy Policy</Link>
                </p>

                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <p className="text-center text-slate-600">
                  Already registered?{" "}
                  <Link href="/login" className="text-orange-600 hover:text-orange-700 font-semibold">
                    Sign in here
                  </Link>
                </p>
              </div>
            )}

            {/* Step 2: Child Information */}
            {step === "child-info" && (
              <div className="space-y-4">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-700">Signed in as {user?.email}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 234 567 8900"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="churchName">Church (optional)</Label>
                    <Input
                      id="churchName"
                      placeholder="Church name"
                      value={churchName}
                      onChange={(e) => setChurchName(e.target.value)}
                    />
                  </div>
                </div>

                <Badge className="bg-orange-500 text-white">
                  <Baby className="w-3 h-3 mr-1" />
                  Child Information
                </Badge>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="Emma"
                      value={childData.firstName}
                      onChange={handleChildChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
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
                    <Label htmlFor="schoolName">School</Label>
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
                    <Label htmlFor="schoolGrade">Grade</Label>
                    <Input
                      id="schoolGrade"
                      name="schoolGrade"
                      placeholder="Grade 3"
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
                    placeholder="None"
                    value={childData.medicalConditions}
                    onChange={handleChildChange}
                  />
                </div>

                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="photoConsent"
                      checked={childData.photoConsent}
                      onCheckedChange={(checked) =>
                        setChildData({ ...childData, photoConsent: checked as boolean })
                      }
                    />
                    <div>
                      <Label htmlFor="photoConsent" className="text-sm font-medium">
                        Photo & Media Consent
                      </Label>
                      <p className="text-xs text-slate-500 mt-1">
                        I consent to my child being photographed during ministry activities.
                      </p>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <Button onClick={handleSubmit} className="w-full h-12 text-lg bg-orange-500 hover:bg-orange-600" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">⏳</span>
                      Registering...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <UserPlus className="w-5 h-5" />
                      Complete Registration
                    </span>
                  )}
                </Button>
              </div>
            )}

            {/* Step 3: Success with PIN */}
            {step === "complete" && (
              <div className="space-y-6 text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    Welcome, {childData.firstName}!
                  </h3>
                  <p className="text-slate-600">
                    Here is your child&apos;s login PIN:
                  </p>
                </div>

                <div className="bg-amber-100 p-6 rounded-xl border-2 border-amber-300">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Key className="w-5 h-5 text-amber-700" />
                    <span className="text-sm font-medium text-amber-700">Child&apos;s Login PIN</span>
                  </div>
                  <div className="text-5xl font-bold tracking-[0.3em] text-amber-700 font-mono">
                    {generatedPIN}
                  </div>
                  <Button
                    variant="outline"
                    onClick={copyPIN}
                    className="mt-4 border-amber-400 text-amber-700 hover:bg-amber-50"
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

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-left">
                  <p className="text-sm text-blue-700 font-medium mb-2">
                    Your child uses this PIN to:
                  </p>
                  <ul className="text-sm text-blue-600 space-y-1">
                    <li className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> Access lessons
                    </li>
                    <li className="flex items-center gap-2">
                      <Star className="w-4 h-4" /> View progress
                    </li>
                    <li className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" /> Earn badges
                    </li>
                  </ul>
                </div>

                <Link href="/login" className="block">
                  <Button className="w-full h-12 text-lg bg-orange-500 hover:bg-orange-600">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Go to Login
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
