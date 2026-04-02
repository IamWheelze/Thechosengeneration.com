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
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
    <div className="min-h-screen bg-gradient-to-b from-yellow-300 via-amber-300 to-orange-300 p-4 py-8 overflow-hidden relative">
      {/* Decorative floating shapes */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 text-6xl"
      >
        ⭐
      </motion.div>
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-20 right-10 text-5xl"
      >
        📖
      </motion.div>
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-32 left-8 text-5xl"
      >
        🙏
      </motion.div>
      <motion.div
        animate={{ y: [0, -18, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-40 right-12 text-5xl"
      >
        💛
      </motion.div>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/3 left-4 text-4xl opacity-60"
      >
        ✨
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-4 text-4xl opacity-60"
      >
        🌟
      </motion.div>

      <div className="max-w-lg mx-auto relative z-10">
        {/* Header with logo */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-6"
        >
          <Link href="/" className="inline-flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg border-4 border-white"
            >
              <Sparkles className="w-9 h-9 text-white" />
            </motion.div>
            <div className="text-left">
              <h1 className="font-bold text-3xl text-orange-800 drop-shadow-sm">The Chosen</h1>
              <p className="text-lg text-orange-600 font-semibold -mt-1">Generation</p>
            </div>
          </Link>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl border-4 border-orange-400 overflow-hidden"
        >
          {/* Colorful top bar */}
          <div className="h-3 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400" />

          {/* Foundation Values */}
          <div className="flex justify-center gap-2 py-3 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
            <span className="text-white font-bold text-sm">FAMILY</span>
            <span className="text-white">•</span>
            <span className="text-white font-bold text-sm">IDENTITY</span>
            <span className="text-white">•</span>
            <span className="text-white font-bold text-sm">PURPOSE</span>
          </div>

          {/* Card header */}
          <div className="bg-gradient-to-r from-orange-100 to-yellow-100 px-6 py-5 border-b-2 border-orange-200">
            <div className="flex items-center justify-center gap-3">
              {step === "complete" ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-white" />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl"
                >
                  👨‍👩‍👧‍👦
                </motion.div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-orange-800">
                  {step === "complete" ? "All Done!" : "Register Your Child"}
                </h2>
                <p className="text-orange-600 text-sm">
                  {step === "login" && "Join our Bible School family"}
                  {step === "child-info" && "Tell us about your child"}
                  {step === "complete" && "Save the PIN below"}
                </p>
              </div>
            </div>
          </div>

          {/* Card content */}
          <div className="p-6">
            {/* Step 1: Google Sign In */}
            {step === "login" && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="space-y-5"
              >
                {/* Cute illustration */}
                <div className="flex justify-center gap-4 py-4">
                  <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-5xl">👧</motion.div>
                  <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} className="text-5xl">📚</motion.div>
                  <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} className="text-5xl">👦</motion.div>
                </div>

                <Button
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading}
                  className="w-full h-14 text-lg bg-white hover:bg-gray-50 text-slate-700 border-3 border-slate-300 shadow-lg rounded-2xl"
                >
                  {isGoogleLoading ? (
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="text-2xl mr-2">⏳</motion.span>
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

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-0.5 bg-orange-200 rounded" />
                  <span className="text-orange-400 text-sm font-medium">Safe & Secure</span>
                  <div className="flex-1 h-0.5 bg-orange-200 rounded" />
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-red-100 border-2 border-red-300 text-red-600 text-sm flex items-center gap-2">
                    <span>⚠️</span> {error}
                  </div>
                )}

                <div className="text-center pt-2">
                  <p className="text-slate-500 mb-1">Already have a PIN?</p>
                  <Link href="/login" className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-bold text-lg">
                    Sign in here <span>→</span>
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Step 2: Child Information */}
            {step === "child-info" && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="space-y-4"
              >
                <div className="p-3 bg-green-100 rounded-xl border-2 border-green-300 flex items-center gap-2">
                  <span className="text-xl">✅</span>
                  <span className="text-sm text-green-700 font-medium">Signed in as {user?.email}</span>
                </div>

                {/* Parent Contact Section */}
                <div className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200">
                  <h3 className="font-bold text-blue-700 mb-3 flex items-center gap-2">
                    <span className="text-xl">👨‍👩‍👧</span> Parent Contact (Optional)
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="phone" className="text-blue-600 text-sm">Phone</Label>
                      <div className="relative mt-1">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 234 567 8900"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="pl-10 rounded-xl border-2 border-blue-200"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="churchName" className="text-blue-600 text-sm">Church</Label>
                      <Input
                        id="churchName"
                        placeholder="Church name"
                        value={churchName}
                        onChange={(e) => setChurchName(e.target.value)}
                        className="mt-1 rounded-xl border-2 border-blue-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Child Info Section */}
                <div className="bg-pink-50 rounded-2xl p-4 border-2 border-pink-200">
                  <h3 className="font-bold text-pink-700 mb-3 flex items-center gap-2">
                    <span className="text-xl">👶</span> Child Information
                  </h3>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="firstName" className="text-pink-600 text-sm">First Name *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="Emma"
                          value={childData.firstName}
                          onChange={handleChildChange}
                          className="mt-1 rounded-xl border-2 border-pink-200"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-pink-600 text-sm">Last Name *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Doe"
                          value={childData.lastName}
                          onChange={handleChildChange}
                          className="mt-1 rounded-xl border-2 border-pink-200"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="dateOfBirth" className="text-pink-600 text-sm">Birthday *</Label>
                        <div className="relative mt-1">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-400" />
                          <Input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            value={childData.dateOfBirth}
                            onChange={handleChildChange}
                            className="pl-10 rounded-xl border-2 border-pink-200"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="gender" className="text-pink-600 text-sm">Gender *</Label>
                        <Select
                          value={childData.gender}
                          onValueChange={(value) => setChildData({ ...childData, gender: value })}
                        >
                          <SelectTrigger className="mt-1 rounded-xl border-2 border-pink-200">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">👦 Boy</SelectItem>
                            <SelectItem value="female">👧 Girl</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="schoolName" className="text-pink-600 text-sm">School</Label>
                        <div className="relative mt-1">
                          <School className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-400" />
                          <Input
                            id="schoolName"
                            name="schoolName"
                            placeholder="School name"
                            value={childData.schoolName}
                            onChange={handleChildChange}
                            className="pl-10 rounded-xl border-2 border-pink-200"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="schoolGrade" className="text-pink-600 text-sm">Grade</Label>
                        <Input
                          id="schoolGrade"
                          name="schoolGrade"
                          placeholder="Grade 3"
                          value={childData.schoolGrade}
                          onChange={handleChildChange}
                          className="mt-1 rounded-xl border-2 border-pink-200"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="medicalConditions" className="text-pink-600 text-sm">Allergies/Medical</Label>
                      <Input
                        id="medicalConditions"
                        name="medicalConditions"
                        placeholder="None"
                        value={childData.medicalConditions}
                        onChange={handleChildChange}
                        className="mt-1 rounded-xl border-2 border-pink-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Photo Consent */}
                <div className="bg-amber-50 rounded-2xl p-4 border-2 border-amber-200">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="photoConsent"
                      checked={childData.photoConsent}
                      onCheckedChange={(checked) =>
                        setChildData({ ...childData, photoConsent: checked as boolean })
                      }
                      className="mt-1 border-2 border-amber-400"
                    />
                    <div>
                      <Label htmlFor="photoConsent" className="text-amber-700 font-medium flex items-center gap-2">
                        <span>📷</span> Photo Consent
                      </Label>
                      <p className="text-xs text-amber-600 mt-1">
                        Allow photos during ministry activities
                      </p>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-red-100 border-2 border-red-300 text-red-600 text-sm flex items-center gap-2">
                    <span>⚠️</span> {error}
                  </div>
                )}

                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full h-14 text-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-2xl shadow-lg"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>⏳</motion.span>
                      Registering...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <UserPlus className="w-6 h-6" />
                      Complete Registration
                    </span>
                  )}
                </Button>
              </motion.div>
            )}

            {/* Step 3: Success with PIN */}
            {step === "complete" && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="space-y-5 text-center"
              >
                {/* Celebration */}
                <div className="flex justify-center gap-2 text-4xl">
                  <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}>🎉</motion.span>
                  <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}>⭐</motion.span>
                  <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}>🎊</motion.span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-800">
                    Welcome, {childData.firstName}!
                  </h3>
                  <p className="text-slate-600">Here&apos;s your secret login PIN:</p>
                </div>

                {/* PIN Display */}
                <div className="bg-gradient-to-br from-yellow-100 to-amber-100 p-6 rounded-2xl border-4 border-amber-400 shadow-inner">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Key className="w-6 h-6 text-amber-600" />
                    <span className="text-amber-700 font-bold">Your PIN</span>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="text-6xl font-bold tracking-[0.4em] text-amber-700 font-mono"
                  >
                    {generatedPIN}
                  </motion.div>
                  <Button
                    variant="outline"
                    onClick={copyPIN}
                    className="mt-4 rounded-xl border-2 border-amber-400 text-amber-700 hover:bg-amber-50"
                  >
                    {copied ? (
                      <><Check className="w-5 h-5 mr-2 text-green-600" /> Copied!</>
                    ) : (
                      <><Copy className="w-5 h-5 mr-2" /> Copy PIN</>
                    )}
                  </Button>
                </div>

                {/* What's next */}
                <div className="bg-blue-50 p-4 rounded-2xl border-2 border-blue-200 text-left">
                  <p className="text-blue-700 font-bold mb-2 flex items-center gap-2">
                    <span>📝</span> With this PIN, your child can:
                  </p>
                  <div className="space-y-2 text-blue-600">
                    <div className="flex items-center gap-2"><BookOpen className="w-5 h-5" /> Access Bible lessons</div>
                    <div className="flex items-center gap-2"><Star className="w-5 h-5" /> Earn points & badges</div>
                    <div className="flex items-center gap-2"><Heart className="w-5 h-5" /> Track their progress</div>
                  </div>
                </div>

                <Link href="/login">
                  <Button className="w-full h-14 text-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-2xl shadow-lg">
                    <Sparkles className="w-6 h-6 mr-2" />
                    Go to Login
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Colorful bottom bar */}
          <div className="h-3 bg-gradient-to-r from-purple-400 via-blue-400 via-green-400 via-yellow-400 to-red-400" />
        </motion.div>

        {/* Footer */}
        <p className="text-center text-orange-700 text-sm mt-4">
          By registering, you agree to our{" "}
          <Link href="/terms" className="underline font-medium">Terms</Link> &{" "}
          <Link href="/privacy" className="underline font-medium">Privacy</Link>
        </p>
      </div>
    </div>
  )
}
