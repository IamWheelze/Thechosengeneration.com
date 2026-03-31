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
  Heart,
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

// Generate unique 4-digit PIN
function generatePIN(): string {
  return Math.floor(1000 + Math.random() * 9000).toString()
}

// Floating animation variants
const floatVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Animated background elements
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50" />

      {/* Animated stars */}
      <div className="absolute inset-0 bg-pattern-stars opacity-30" />

      {/* Floating decorative elements */}
      <motion.div
        variants={floatVariants}
        animate="animate"
        className="absolute top-20 left-10 text-6xl opacity-20"
      >
        📖
      </motion.div>
      <motion.div
        variants={floatVariants}
        animate="animate"
        style={{ animationDelay: "0.5s" }}
        className="absolute top-40 right-10 text-5xl opacity-20"
      >
        ✝️
      </motion.div>
      <motion.div
        variants={floatVariants}
        animate="animate"
        style={{ animationDelay: "1s" }}
        className="absolute bottom-40 left-20 text-4xl opacity-20"
      >
        🙏
      </motion.div>
      <motion.div
        variants={floatVariants}
        animate="animate"
        style={{ animationDelay: "1.5s" }}
        className="absolute bottom-20 right-20 text-5xl opacity-20"
      >
        ⭐
      </motion.div>
      <motion.div
        variants={floatVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
        className="absolute top-1/3 right-1/4 text-4xl opacity-15"
      >
        💛
      </motion.div>

      {/* Animated circles */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-amber-300 to-orange-300"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-pink-300 to-purple-300"
      />
    </div>
  )
}

// Illustration of children with Bible
function ChildrenIllustration() {
  return (
    <div className="flex justify-center mb-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="flex items-end gap-2">
          {/* Child 1 - reading */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center text-2xl shadow-lg">
              👧
            </div>
            <div className="w-8 h-6 bg-amber-600 rounded-sm mt-1 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-amber-100" />
            </div>
          </motion.div>

          {/* Bible in center */}
          <motion.div
            animate={{ rotateY: [0, 10, 0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-16 h-20 bg-gradient-to-br from-amber-700 to-amber-900 rounded-r-lg shadow-xl flex items-center justify-center relative mx-2"
          >
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-amber-950 rounded-l" />
            <span className="text-amber-200 text-xs font-bold">BIBLE</span>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 -right-2"
            >
              <Sparkles className="w-5 h-5 text-amber-400" />
            </motion.div>
          </motion.div>

          {/* Child 2 - praying */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center text-2xl shadow-lg">
              👦
            </div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-pink-400 mt-1" />
            </motion.div>
          </motion.div>
        </div>

        {/* Sparkles around */}
        <motion.div
          animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          className="absolute -top-4 left-1/4"
        >
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
        </motion.div>
        <motion.div
          animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
          className="absolute -top-2 right-1/4"
        >
          <Star className="w-3 h-3 text-pink-400 fill-pink-400" />
        </motion.div>
      </motion.div>
    </div>
  )
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

  // Parent contact info
  const [phone, setPhone] = useState("")
  const [churchName, setChurchName] = useState("")

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

  const supabase = createClient()

  // Check if user is already logged in
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

    // Listen for auth changes (after Google redirect)
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

      // Generate unique PIN
      const pin = generatePIN()

      // Update parent profile
      await supabase.from("profiles").upsert({
        id: authUser.id,
        email: authUser.email,
        full_name: authUser.user_metadata?.full_name || "",
        phone: phone,
        church_name: churchName,
        role: "parent",
      })

      // Insert child record
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
    <div className="min-h-screen flex items-center justify-center p-4 py-8 relative">
      <AnimatedBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-4">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg"
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h1 className="font-bold text-xl text-slate-800">The Chosen</h1>
            <p className="text-xs text-amber-600 font-medium -mt-1">Generation</p>
          </div>
        </Link>

        {/* Illustration */}
        {step === "login" && <ChildrenIllustration />}

        <Card variant="glass" className="shadow-2xl border-white/50">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              {step === "complete" ? "Registration Complete!" : "Register Your Child"}
            </CardTitle>
            <CardDescription className="text-slate-600">
              {step === "login" && "Sign in with Google to get started"}
              {step === "child-info" && "Enter your child's information"}
              {step === "complete" && "Save your child's PIN to access the curriculum"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Step 1: Google Sign In */}
            {step === "login" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <Button
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading}
                  className="w-full h-14 text-lg bg-white hover:bg-gray-50 text-slate-700 border-2 border-slate-200 shadow-lg hover:shadow-xl transition-all"
                >
                  {isGoogleLoading ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="mr-2"
                    >
                      ⏳
                    </motion.span>
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

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white/70 text-slate-500 rounded">Secure & Easy</span>
                  </div>
                </div>

                <div className="text-center text-sm text-slate-500">
                  By signing up, you agree to our{" "}
                  <Link href="/terms" className="text-amber-600 hover:underline font-medium">Terms</Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-amber-600 hover:underline font-medium">Privacy Policy</Link>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="mt-6 text-center text-sm text-slate-500">
                  Already registered?{" "}
                  <Link href="/login" className="text-amber-600 hover:text-amber-700 font-semibold">
                    Sign in here
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Step 2: Child Information */}
            {step === "child-info" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                {/* Show logged in user */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">Signed in as {user?.email}</span>
                </motion.div>

                {/* Optional parent contact */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-slate-700">Phone (optional)</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 234 567 8900"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10 border-slate-200 focus:border-amber-400"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="churchName" className="text-slate-700">Church (optional)</Label>
                    <Input
                      id="churchName"
                      placeholder="Church name"
                      value={churchName}
                      onChange={(e) => setChurchName(e.target.value)}
                      className="border-slate-200 focus:border-amber-400"
                    />
                  </div>
                </div>

                <Badge variant="magic" className="mt-4">
                  <Baby className="w-3 h-3 mr-1" />
                  Child Information
                </Badge>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-slate-700">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="Emma"
                      value={childData.firstName}
                      onChange={handleChildChange}
                      className="border-slate-200 focus:border-amber-400"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-slate-700">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      value={childData.lastName}
                      onChange={handleChildChange}
                      className="border-slate-200 focus:border-amber-400"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="text-slate-700">Date of Birth *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={childData.dateOfBirth}
                        onChange={handleChildChange}
                        className="pl-10 border-slate-200 focus:border-amber-400"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-slate-700">Gender *</Label>
                    <Select
                      value={childData.gender}
                      onValueChange={(value) => setChildData({ ...childData, gender: value })}
                    >
                      <SelectTrigger className="border-slate-200 focus:border-amber-400">
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
                    <Label htmlFor="schoolName" className="text-slate-700">School</Label>
                    <div className="relative">
                      <School className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="schoolName"
                        name="schoolName"
                        placeholder="School name"
                        value={childData.schoolName}
                        onChange={handleChildChange}
                        className="pl-10 border-slate-200 focus:border-amber-400"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schoolGrade" className="text-slate-700">Grade</Label>
                    <Input
                      id="schoolGrade"
                      name="schoolGrade"
                      placeholder="Grade 3"
                      value={childData.schoolGrade}
                      onChange={handleChildChange}
                      className="border-slate-200 focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medicalConditions" className="text-slate-700">Medical Conditions/Allergies</Label>
                  <Input
                    id="medicalConditions"
                    name="medicalConditions"
                    placeholder="None"
                    value={childData.medicalConditions}
                    onChange={handleChildChange}
                    className="border-slate-200 focus:border-amber-400"
                  />
                </div>

                <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="photoConsent"
                      checked={childData.photoConsent}
                      onCheckedChange={(checked) =>
                        setChildData({ ...childData, photoConsent: checked as boolean })
                      }
                      className="border-amber-400 data-[state=checked]:bg-amber-500"
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

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <Button onClick={handleSubmit} className="w-full h-12 text-lg shadow-lg" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        ⏳
                      </motion.span>
                      Registering...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <UserPlus className="w-5 h-5" />
                      Complete Registration
                    </span>
                  )}
                </Button>
              </motion.div>
            )}

            {/* Step 3: Success with PIN */}
            {step === "complete" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg"
                >
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </motion.div>

                <div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold text-slate-800 mb-2"
                  >
                    Welcome, {childData.firstName}! 🎉
                  </motion.h3>
                  <p className="text-slate-600">
                    Here is your child&apos;s unique login PIN:
                  </p>
                </div>

                {/* PIN Display */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-amber-100 via-orange-100 to-pink-100 p-8 rounded-2xl border-2 border-amber-300 shadow-xl"
                >
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Key className="w-6 h-6 text-amber-600" />
                    <span className="text-sm font-semibold text-amber-700">Child&apos;s Login PIN</span>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", bounce: 0.4 }}
                    className="text-6xl font-bold tracking-[0.4em] text-amber-600 font-mono"
                  >
                    {generatedPIN}
                  </motion.div>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={copyPIN}
                    className="mt-6 border-amber-400 text-amber-700 hover:bg-amber-50"
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5 mr-2 text-green-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5 mr-2" />
                        Copy PIN
                      </>
                    )}
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200 text-left"
                >
                  <p className="text-sm text-blue-700 font-medium mb-2">
                    ✨ Your child uses this PIN to:
                  </p>
                  <ul className="text-sm text-blue-600 space-y-2">
                    <li className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> Access lessons and curriculum
                    </li>
                    <li className="flex items-center gap-2">
                      <Star className="w-4 h-4" /> View scores and progress
                    </li>
                    <li className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" /> Earn badges and rewards
                    </li>
                  </ul>
                </motion.div>

                <Link href="/login" className="block">
                  <Button variant="magic" className="w-full h-14 text-lg shadow-xl">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Go to Login
                  </Button>
                </Link>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
