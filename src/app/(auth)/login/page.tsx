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

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [pin, setPin] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      if (pin.length !== 4) {
        throw new Error("PIN must be 4 digits")
      }

      // Store PIN in session storage for the child portal
      sessionStorage.setItem("childPIN", pin)

      // Navigate to child portal
      router.push("/child")
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
              Enter your PIN to access your lessons
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <Badge variant="magic" className="mb-2">
                <Sparkles className="w-3 h-3 mr-1" />
                Kids Zone
              </Badge>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="pin" className="text-center block">Your Secret PIN</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
                  <Input
                    id="pin"
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter 4-digit PIN"
                    value={pin}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 4)
                      setPin(val)
                    }}
                    className="pl-12 text-center text-3xl tracking-[0.5em] font-mono h-16"
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

              <Button type="submit" variant="magic" className="w-full h-12 text-lg" disabled={isLoading || pin.length !== 4}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">&#9696;</span>
                    Entering...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Let&apos;s Go!
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-500">
              Don&apos;t have a PIN?{" "}
              <Link href="/signup" className="text-amber-600 hover:text-amber-700 font-medium">
                Register here
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
