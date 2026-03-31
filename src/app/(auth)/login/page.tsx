"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Sparkles, Key, ArrowRight, BookOpen, Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"

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

      {/* Animated stars pattern */}
      <div className="absolute inset-0 bg-pattern-stars opacity-30" />

      {/* Floating decorative elements */}
      <motion.div
        variants={floatVariants}
        animate="animate"
        className="absolute top-20 left-10 text-6xl opacity-20"
      >
        ⭐
      </motion.div>
      <motion.div
        variants={floatVariants}
        animate="animate"
        style={{ animationDelay: "0.5s" }}
        className="absolute top-32 right-16 text-5xl opacity-20"
      >
        📖
      </motion.div>
      <motion.div
        variants={floatVariants}
        animate="animate"
        style={{ animationDelay: "1s" }}
        className="absolute bottom-40 left-16 text-4xl opacity-20"
      >
        🙏
      </motion.div>
      <motion.div
        variants={floatVariants}
        animate="animate"
        style={{ animationDelay: "1.5s" }}
        className="absolute bottom-32 right-10 text-5xl opacity-20"
      >
        💛
      </motion.div>
      <motion.div
        variants={floatVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
        className="absolute top-1/2 left-1/4 text-3xl opacity-15"
      >
        ✝️
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

// Animated child character
function ChildCharacter() {
  return (
    <div className="flex justify-center mb-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Child reading */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center text-4xl shadow-lg border-4 border-white">
              👧
            </div>
            {/* Sparkles */}
            <motion.div
              animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute -top-2 -right-2"
            >
              <Sparkles className="w-6 h-6 text-amber-400" />
            </motion.div>
          </div>

          {/* Book below */}
          <motion.div
            animate={{ rotateZ: [-2, 2, -2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-2 flex items-center gap-1"
          >
            <BookOpen className="w-8 h-8 text-amber-600" />
          </motion.div>
        </motion.div>

        {/* Floating hearts */}
        <motion.div
          animate={{ y: [-20, -40, -20], opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0 }}
          className="absolute -top-4 left-0"
        >
          <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
        </motion.div>
        <motion.div
          animate={{ y: [-20, -40, -20], opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          className="absolute -top-4 right-0"
        >
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [pin, setPin] = useState("")

  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      if (pin.length !== 4) {
        throw new Error("PIN must be 4 digits")
      }

      // Look up child by PIN in database
      const { data: child, error: dbError } = await supabase
        .from("children")
        .select("id, first_name, last_name, display_name, current_level, total_points")
        .eq("pin_code", pin)
        .single()

      if (dbError || !child) {
        throw new Error("Invalid PIN. Please try again.")
      }

      // Store child data in session storage
      sessionStorage.setItem("childSession", JSON.stringify({
        id: child.id,
        firstName: child.first_name,
        lastName: child.last_name,
        displayName: child.display_name,
        level: child.current_level || 1,
        points: child.total_points || 0,
      }))

      // Navigate to child portal
      router.push("/child")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <AnimatedBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-6">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg"
          >
            <Sparkles className="w-7 h-7 text-white" />
          </motion.div>
          <div>
            <h1 className="font-bold text-2xl text-slate-800">The Chosen</h1>
            <p className="text-sm text-amber-600 font-medium -mt-1">Generation</p>
          </div>
        </Link>

        {/* Child illustration */}
        <ChildCharacter />

        <Card variant="glass" className="shadow-2xl border-white/50">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Welcome Back!
            </CardTitle>
            <CardDescription className="text-slate-600">
              Enter your PIN to start learning
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <Badge variant="magic" className="text-sm px-4 py-1">
                <Sparkles className="w-4 h-4 mr-1" />
                Kids Zone
              </Badge>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="pin" className="text-center block text-lg text-slate-700 font-medium">
                  Your Secret PIN
                </Label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Key className="w-6 h-6 text-amber-500" />
                    </motion.div>
                  </div>
                  <Input
                    id="pin"
                    type="text"
                    inputMode="numeric"
                    placeholder="----"
                    value={pin}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 4)
                      setPin(val)
                    }}
                    className="pl-14 text-center text-4xl tracking-[0.6em] font-mono h-20 border-2 border-amber-200 focus:border-amber-400 rounded-xl bg-white/80"
                    maxLength={4}
                    required
                  />
                </div>
                <p className="text-sm text-slate-500 text-center flex items-center justify-center gap-1">
                  <span>🔒</span> Ask your parent if you forgot your PIN
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center"
                >
                  {error}
                </motion.div>
              )}

              <Button
                type="submit"
                variant="magic"
                className="w-full h-16 text-xl shadow-xl"
                disabled={isLoading || pin.length !== 4}
              >
                {isLoading ? (
                  <span className="flex items-center gap-3">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="text-2xl"
                    >
                      ⏳
                    </motion.span>
                    Checking...
                  </span>
                ) : (
                  <span className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6" />
                    Let&apos;s Go!
                    <ArrowRight className="w-6 h-6" />
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-500 mb-2">Don&apos;t have a PIN yet?</p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold text-lg"
              >
                Register here
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Fun decorative text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-slate-400 text-sm mt-6"
        >
          Learning about God is an adventure! 🌟
        </motion.p>
      </motion.div>
    </div>
  )
}
