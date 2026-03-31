"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Sparkles, Key, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
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
    <div className="min-h-screen bg-amber-400 flex items-center justify-center p-4">
      {/* Star pattern overlay */}
      <div className="absolute inset-0 bg-pattern-stars opacity-40" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-xl">
            <Sparkles className="w-9 h-9 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-2xl text-slate-800">The Chosen</h1>
            <p className="text-sm text-orange-700 font-semibold -mt-1">Generation</p>
          </div>
        </Link>

        <Card className="shadow-2xl border-0 bg-white">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl text-slate-800">Welcome Back!</CardTitle>
            <CardDescription className="text-slate-600">
              Enter your PIN to start learning
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <Badge className="bg-orange-500 text-white px-4 py-1">
                <Sparkles className="w-4 h-4 mr-1" />
                Kids Zone
              </Badge>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="pin" className="text-center block text-lg font-medium">
                  Your Secret PIN
                </Label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-amber-500" />
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
                    className="pl-14 text-center text-4xl tracking-[0.5em] font-mono h-20 border-2 border-amber-300 focus:border-orange-500"
                    maxLength={4}
                    required
                  />
                </div>
                <p className="text-sm text-slate-500 text-center">
                  Ask your parent if you forgot your PIN
                </p>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-14 text-xl bg-orange-500 hover:bg-orange-600"
                disabled={isLoading || pin.length !== 4}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Checking...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6" />
                    Let&apos;s Go!
                    <ArrowRight className="w-6 h-6" />
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-500 mb-2">Don&apos;t have a PIN?</p>
              <Link
                href="/signup"
                className="text-orange-600 hover:text-orange-700 font-semibold text-lg"
              >
                Register here →
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
