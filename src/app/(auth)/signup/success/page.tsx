"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, Mail, ArrowRight, Home, BookOpen, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function SignupSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-amber-50 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.4 }}
            >
              <CheckCircle className="w-14 h-14 text-green-600" />
            </motion.div>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Registration Successful!
          </h1>
          <p className="text-slate-600">
            Welcome to The Chosen Generation Bible School
          </p>
        </motion.div>

        {/* Main Card */}
        <Card className="border-green-100 shadow-xl mb-6">
          <CardContent className="pt-6">
            {/* Email Verification Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <Mail className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-amber-800 mb-1">
                    Check Your Email
                  </h3>
                  <p className="text-sm text-amber-700">
                    We've sent a confirmation email to verify your account.
                    Please click the link in the email to activate your account.
                  </p>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <h3 className="font-semibold text-slate-800 mb-4">What happens next?</h3>
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-slate-700">Verify your email</h4>
                  <p className="text-sm text-slate-500">
                    Click the link in your inbox to confirm your account
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-slate-700">Enrollment review</h4>
                  <p className="text-sm text-slate-500">
                    Our team will review and approve your child's enrollment
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-slate-700">Class assignment</h4>
                  <p className="text-sm text-slate-500">
                    Your child will be assigned to an appropriate class
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-bold text-sm">4</span>
                </div>
                <div>
                  <h4 className="font-medium text-slate-700">Start learning!</h4>
                  <p className="text-sm text-slate-500">
                    Access the parent portal to track your child's progress
                  </p>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button asChild className="w-full" size="lg">
            <Link href="/login" className="flex items-center justify-center gap-2">
              Sign In to Your Account
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>

          <div className="flex gap-3">
            <Button variant="outline" asChild className="flex-1">
              <Link href="/" className="flex items-center justify-center gap-2">
                <Home className="w-4 h-4" />
                Home
              </Link>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link href="/programs" className="flex items-center justify-center gap-2">
                <BookOpen className="w-4 h-4" />
                Programs
              </Link>
            </Button>
          </div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center"
        >
          <Card className="bg-slate-50 border-slate-200">
            <CardContent className="py-4">
              <div className="flex items-center justify-center gap-2 text-slate-600">
                <Calendar className="w-5 h-5" />
                <span className="text-sm">
                  Classes run every <strong>Sunday</strong> at various locations
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Help Link */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Didn't receive the email?{" "}
          <Link href="/contact" className="text-amber-600 hover:underline font-medium">
            Contact us
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
