"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Shield,
  Eye,
  Lock,
  Database,
  Share2,
  UserCheck,
  Trash2,
  Mail,
  Baby,
  Globe,
} from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-slate-800 to-slate-700">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <Badge variant="secondary" className="mb-4">
              <Shield className="w-4 h-4 mr-1" />
              Privacy
            </Badge>
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-slate-300 max-w-2xl mx-auto">
              How we collect, use, and protect your personal information
            </p>
            <p className="text-sm text-slate-400 mt-4">Last updated: February 2026</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">

          {/* Privacy Summary Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-3 gap-4 mb-12"
          >
            <Card className="text-center border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <Lock className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-slate-800">Secure</h3>
                <p className="text-sm text-slate-600">Data encrypted in transit and at rest</p>
              </CardContent>
            </Card>
            <Card className="text-center border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <Eye className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <h3 className="font-bold text-slate-800">Transparent</h3>
                <p className="text-sm text-slate-600">Clear about what we collect</p>
              </CardContent>
            </Card>
            <Card className="text-center border-purple-200 bg-purple-50">
              <CardContent className="pt-6">
                <UserCheck className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                <h3 className="font-bold text-slate-800">Your Control</h3>
                <p className="text-sm text-slate-600">Access and delete your data</p>
              </CardContent>
            </Card>
          </motion.div>

          <div className="space-y-8">

            {/* Information We Collect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5 text-amber-600" />
                    1. Information We Collect
                  </h2>
                  <div className="space-y-4 text-slate-600">
                    <div>
                      <h3 className="font-semibold text-slate-700 mb-2">Parent/Guardian Information:</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Full name and contact details (email, phone)</li>
                        <li>Church affiliation (optional)</li>
                        <li>Account credentials</li>
                        <li>Emergency contact information</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-700 mb-2">Child Information:</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>First name and last initial (for display)</li>
                        <li>Full name (for records)</li>
                        <li>Date of birth and age group</li>
                        <li>Gender</li>
                        <li>School information</li>
                        <li>Medical conditions and dietary needs</li>
                        <li>Special learning needs (if applicable)</li>
                        <li>Photos (with explicit consent)</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-700 mb-2">Usage Information:</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Task completion and progress data</li>
                        <li>Attendance records</li>
                        <li>Prayer check-in data</li>
                        <li>Device and browser information</li>
                        <li>Access logs for security</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Children's Privacy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Baby className="w-5 h-5 text-amber-600" />
                    2. Children's Privacy (COPPA Compliance)
                  </h2>
                  <div className="space-y-4 text-slate-600">
                    <p>
                      We are committed to protecting children's privacy. Our practices comply
                      with the Children's Online Privacy Protection Act (COPPA):
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Parental Consent:</strong> We require verifiable parental consent
                        before collecting personal information from children under 13.
                      </li>
                      <li>
                        <strong>Limited Collection:</strong> We only collect information necessary
                        for participation in our Bible school program.
                      </li>
                      <li>
                        <strong>No Marketing:</strong> We do not use children's data for marketing
                        or advertising purposes.
                      </li>
                      <li>
                        <strong>No Third-Party Sharing:</strong> Children's data is never sold or
                        shared with third parties for commercial purposes.
                      </li>
                      <li>
                        <strong>Parental Access:</strong> Parents can review, modify, or delete
                        their child's information at any time.
                      </li>
                      <li>
                        <strong>Photo Privacy:</strong> Children's photos require explicit opt-in
                        consent and are shared only within the ministry platform.
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* How We Use Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-amber-600" />
                    3. How We Use Information
                  </h2>
                  <div className="space-y-4 text-slate-600">
                    <p>We use collected information to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Provide and improve our Bible school services</li>
                      <li>Track student progress and attendance</li>
                      <li>Communicate with parents about their children</li>
                      <li>Ensure child safety and safeguarding</li>
                      <li>Award badges and recognize achievements</li>
                      <li>Handle medical or emergency situations</li>
                      <li>Send ministry updates and announcements (with consent)</li>
                      <li>Maintain security and prevent abuse</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Data Sharing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-amber-600" />
                    4. Data Sharing
                  </h2>
                  <div className="space-y-4 text-slate-600">
                    <p><strong>We DO share information with:</strong></p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                      <li>
                        <strong>Teachers:</strong> Limited child information necessary for
                        teaching and supervision
                      </li>
                      <li>
                        <strong>Service Providers:</strong> Trusted services for hosting (Supabase),
                        email, etc., under strict data protection agreements
                      </li>
                      <li>
                        <strong>Legal Requirements:</strong> When required by law or to protect
                        child safety
                      </li>
                    </ul>
                    <p><strong>We NEVER:</strong></p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Sell personal information</li>
                      <li>Share data with advertisers</li>
                      <li>Use data for profiling or commercial purposes</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Data Security */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-amber-600" />
                    5. Data Security
                  </h2>
                  <div className="space-y-4 text-slate-600">
                    <p>We implement industry-standard security measures:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>SSL/TLS encryption for all data transmission</li>
                      <li>Encrypted database storage</li>
                      <li>Secure authentication with hashed passwords</li>
                      <li>Role-based access controls</li>
                      <li>Regular security audits</li>
                      <li>Staff training on data protection</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Your Rights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-amber-600" />
                    6. Your Rights
                  </h2>
                  <div className="space-y-4 text-slate-600">
                    <p>You have the right to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Access:</strong> Request a copy of your personal data
                      </li>
                      <li>
                        <strong>Correction:</strong> Update inaccurate information
                      </li>
                      <li>
                        <strong>Deletion:</strong> Request removal of your data
                      </li>
                      <li>
                        <strong>Portability:</strong> Receive your data in a standard format
                      </li>
                      <li>
                        <strong>Withdraw Consent:</strong> Opt out of optional data processing
                      </li>
                      <li>
                        <strong>Complaint:</strong> File a complaint with relevant authorities
                      </li>
                    </ul>
                    <p className="mt-4">
                      To exercise these rights, contact us using the information below.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Data Retention */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Trash2 className="w-5 h-5 text-amber-600" />
                    7. Data Retention
                  </h2>
                  <div className="space-y-4 text-slate-600">
                    <p>
                      We retain personal information only as long as necessary:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Active Accounts:</strong> Data retained while account is active
                      </li>
                      <li>
                        <strong>After Graduation/Withdrawal:</strong> Basic records retained
                        for 3 years for reference and certificates
                      </li>
                      <li>
                        <strong>Safeguarding Records:</strong> Retained as required by law
                        (typically 25 years for child protection records)
                      </li>
                      <li>
                        <strong>Account Deletion:</strong> Most data deleted within 30 days
                        of request
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* International Transfers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-amber-600" />
                    8. International Data
                  </h2>
                  <p className="text-slate-600">
                    Our ministry operates in Nigeria and Senegal. Data may be processed in
                    different locations. We ensure appropriate safeguards are in place for
                    any international data transfers, including using service providers that
                    comply with international data protection standards.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-amber-200">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-amber-600" />
                    9. Contact Us
                  </h2>
                  <p className="text-slate-600 mb-4">
                    For privacy concerns or to exercise your rights:
                  </p>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-slate-700">
                      <strong>Data Protection Contact</strong><br />
                      The Chosen Generation Ministry<br />
                      Email: <a href="mailto:privacy@thechosengeneration.org" className="text-amber-600 hover:underline">privacy@thechosengeneration.org</a>
                    </p>
                  </div>
                  <p className="text-sm text-slate-500 mt-4">
                    We aim to respond to all requests within 30 days.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
