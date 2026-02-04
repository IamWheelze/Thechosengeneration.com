"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { LogIn, User, Lock, Sparkles, ArrowRight, Eye, EyeOff, Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/parent"

  const [activeTab, setActiveTab] = useState("parent")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // Parent/Teacher login state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Child login state
  const [childUsername, setChildUsername] = useState("")
  const [childPin, setChildPin] = useState("")

  const handleParentLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      router.push(redirect)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChildLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // For demo purposes - in production, this would verify against the child's PIN
      // and create a limited session
      if (childPin.length !== 4) {
        throw new Error("PIN must be 4 digits")
      }

      // Demo: Accept any 4-digit PIN for now
      // In production: verify PIN against hashed PIN in database
      router.push("/child")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-pattern-stars opacity-20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-slate-800">The Chosen</h1>
            <p className="text-xs text-amber-600 font-medium -mt-1">Generation</p>
          </div>
        </Link>

        <Card variant="glass" className="shadow-xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">Welcome Back!</CardTitle>
            <CardDescription>
              Sign in to access your portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="parent" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Parent/Teacher
                </TabsTrigger>
                <TabsTrigger value="child" className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Child
                </TabsTrigger>
              </TabsList>

              {/* Parent/Teacher Login */}
              <TabsContent value="parent">
                <form onSubmit={handleParentLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="parent@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/forgot-password" className="text-xs text-amber-600 hover:text-amber-700">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin">&#9696;</span>
                        Signing in...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <LogIn className="w-4 h-4" />
                        Sign In
                      </span>
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* Child Login */}
              <TabsContent value="child">
                <div className="text-center mb-4">
                  <Badge variant="magic" className="mb-2">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Kids Zone
                  </Badge>
                  <p className="text-sm text-slate-500">
                    Enter your username and secret PIN
                  </p>
                </div>

                <form onSubmit={handleChildLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="childUsername">Your Name</Label>
                    <div className="relative">
                      <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
                      <Input
                        id="childUsername"
                        type="text"
                        placeholder="Enter your name"
                        value={childUsername}
                        onChange={(e) => setChildUsername(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="childPin">Secret PIN</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
                      <Input
                        id="childPin"
                        type="password"
                        placeholder="Enter 4-digit PIN"
                        value={childPin}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "").slice(0, 4)
                          setChildPin(val)
                        }}
                        className="pl-10 text-center text-2xl tracking-[0.5em] font-mono"
                        maxLength={4}
                        required
                      />
                    </div>
                    <p className="text-xs text-slate-400 text-center">
                      Ask your parent if you forgot your PIN
                    </p>
                  </div>

                  {error && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  <Button type="submit" variant="magic" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin">&#9696;</span>
                        Entering...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Let&apos;s Go!
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-amber-600 hover:text-amber-700 font-medium">
                Register here
              </Link>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-slate-400 mt-6">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="text-amber-600 hover:underline">Terms</Link>
          {" "}and{" "}
          <Link href="/privacy" className="text-amber-600 hover:underline">Privacy Policy</Link>
        </p>
      </motion.div>
    </div>
  )
}
