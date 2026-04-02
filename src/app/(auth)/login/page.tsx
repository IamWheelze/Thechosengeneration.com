"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Sparkles, Key, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"

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

      const { data: child, error: dbError } = await supabase
        .from("children")
        .select("id, first_name, last_name, display_name, current_level, total_points")
        .eq("pin_code", pin)
        .single()

      if (dbError || !child) {
        throw new Error("Invalid PIN. Please try again.")
      }

      sessionStorage.setItem("childSession", JSON.stringify({
        id: child.id,
        firstName: child.first_name,
        lastName: child.last_name,
        displayName: child.display_name,
        level: child.current_level || 1,
        points: child.total_points || 0,
      }))

      router.push("/child")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-300 via-amber-300 to-orange-300 p-4 flex items-center justify-center overflow-hidden relative">
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

      <div className="w-full max-w-md relative z-10">
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
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-5xl"
              >
                👋
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-orange-800">Welcome Back!</h2>
                <p className="text-orange-600 text-sm">Enter your secret PIN to start</p>
              </div>
            </div>
          </div>

          {/* Card content */}
          <div className="p-6">
            {/* Kids Zone Badge */}
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg"
              >
                <Sparkles className="w-5 h-5" />
                Kids Zone
                <Sparkles className="w-5 h-5" />
              </motion.div>
            </div>

            {/* Cute kids illustration */}
            <div className="flex justify-center gap-3 mb-6">
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-5xl">👧</motion.div>
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }} className="text-5xl">📚</motion.div>
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }} className="text-5xl">👦</motion.div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* PIN Input Section */}
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-5 rounded-2xl border-3 border-amber-300">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Key className="w-7 h-7 text-amber-600" />
                  </motion.div>
                  <span className="text-amber-700 font-bold text-lg">Your Secret PIN</span>
                </div>

                <Input
                  id="pin"
                  type="text"
                  inputMode="numeric"
                  placeholder="• • • •"
                  value={pin}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 4)
                    setPin(val)
                  }}
                  className="text-center text-5xl tracking-[0.6em] font-mono h-20 border-3 border-amber-400 rounded-2xl bg-white focus:border-orange-500 focus:ring-orange-500"
                  maxLength={4}
                  required
                />

                <p className="text-amber-600 text-sm text-center mt-3 flex items-center justify-center gap-1">
                  <span>🔒</span> Ask your parent if you forgot
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ x: -10 }}
                  animate={{ x: 0 }}
                  className="p-4 rounded-2xl bg-red-100 border-2 border-red-300 text-red-600 text-center flex items-center justify-center gap-2"
                >
                  <span className="text-xl">😕</span> {error}
                </motion.div>
              )}

              <Button
                type="submit"
                disabled={isLoading || pin.length !== 4}
                className="w-full h-16 text-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-2xl shadow-lg disabled:opacity-50"
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
                    <span className="text-2xl">🚀</span>
                    Let&apos;s Go!
                    <ArrowRight className="w-6 h-6" />
                  </span>
                )}
              </Button>
            </form>

            {/* Register link */}
            <div className="mt-6 text-center">
              <div className="bg-blue-50 p-4 rounded-2xl border-2 border-blue-200">
                <p className="text-blue-600 mb-1">Don&apos;t have a PIN yet?</p>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-bold text-lg"
                >
                  <span>📝</span> Register here <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Colorful bottom bar */}
          <div className="h-3 bg-gradient-to-r from-purple-400 via-blue-400 via-green-400 via-yellow-400 to-red-400" />
        </motion.div>

        {/* Fun footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-orange-700 font-medium mt-6 text-lg"
        >
          Learning about God is fun! 🌟
        </motion.p>
      </div>
    </div>
  )
}
