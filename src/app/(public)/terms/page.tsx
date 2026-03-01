"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { FileText, Shield, Users, AlertCircle, Scale, Mail } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TermsPage() {
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
              <FileText className="w-4 h-4 mr-1" />
              Legal
            </Badge>
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Please read these terms carefully before using our services
            </p>
            <p className="text-sm text-slate-400 mt-4">Last updated: February 2026</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-slate max-w-none">

            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Scale className="w-5 h-5 text-amber-600" />
                    1. Agreement to Terms
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    By accessing or using The Chosen Generation Bible School platform ("Service"),
                    you agree to be bound by these Terms of Service. If you disagree with any part
                    of the terms, you may not access the Service. This Service is operated by
                    The Chosen Generation Ministry for the purpose of providing children's Bible
                    education and spiritual development.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Eligibility */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-amber-600" />
                    2. Eligibility & Registration
                  </h2>
                  <div className="space-y-4 text-slate-600">
                    <p>
                      <strong>Parents/Guardians:</strong> You must be at least 18 years old and
                      the legal parent or guardian of any children you register. You are responsible
                      for all activities under your account.
                    </p>
                    <p>
                      <strong>Teachers:</strong> Must be approved by ministry leadership and
                      complete all required safeguarding training before accessing teacher features.
                    </p>
                    <p>
                      <strong>Children:</strong> Must be registered by a parent/guardian. Children
                      access the platform through supervised accounts with limited features appropriate
                      for their age group.
                    </p>
                    <p>
                      You agree to provide accurate, current, and complete information during
                      registration and to update such information as needed.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Acceptable Use */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-amber-600" />
                    3. Acceptable Use Policy
                  </h2>
                  <div className="space-y-4 text-slate-600">
                    <p>You agree NOT to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Use the Service for any unlawful purpose or in violation of these Terms</li>
                      <li>Share login credentials with unauthorized individuals</li>
                      <li>Attempt to gain unauthorized access to other accounts or systems</li>
                      <li>Upload content that is harmful, offensive, or inappropriate for children</li>
                      <li>Impersonate others or provide false information</li>
                      <li>Interfere with the proper functioning of the Service</li>
                      <li>Use automated systems to access the Service without permission</li>
                      <li>Collect personal information about other users without consent</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Child Safety */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="mb-8 border-amber-200 bg-amber-50">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                    4. Child Safety & Protection
                  </h2>
                  <div className="space-y-4 text-slate-600">
                    <p>
                      We take child safety extremely seriously. All users must comply with our
                      <Link href="/safeguarding" className="text-amber-600 hover:underline mx-1">
                        Safeguarding Policy
                      </Link>
                      which forms part of these Terms.
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Photo Consent:</strong> Photos of children are only shared with
                        explicit parental consent and within the platform only.
                      </li>
                      <li>
                        <strong>Communication:</strong> All teacher-parent communication occurs
                        through official platform channels.
                      </li>
                      <li>
                        <strong>Reporting:</strong> Any concerns about child safety must be reported
                        immediately to ministry leadership.
                      </li>
                      <li>
                        <strong>Supervision:</strong> Online activities are monitored by approved
                        ministry staff.
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold text-slate-800 mb-4">
                    5. Content & Intellectual Property
                  </h2>
                  <div className="space-y-4 text-slate-600">
                    <p>
                      <strong>Ministry Content:</strong> All curriculum, teaching materials, images,
                      and other content provided through the Service are owned by The Chosen Generation
                      Ministry and protected by copyright. You may not reproduce, distribute, or
                      create derivative works without written permission.
                    </p>
                    <p>
                      <strong>User Content:</strong> When you submit content (photos, testimonies, etc.),
                      you grant us a non-exclusive license to use this content for ministry purposes.
                      You retain ownership but allow us to display and share as appropriate.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Account Termination */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold text-slate-800 mb-4">
                    6. Account Termination
                  </h2>
                  <div className="space-y-4 text-slate-600">
                    <p>
                      We may suspend or terminate your account if you violate these Terms,
                      fail to comply with safeguarding requirements, or engage in conduct
                      harmful to the ministry or its members.
                    </p>
                    <p>
                      You may request account deletion at any time by contacting us. Upon
                      termination, your right to use the Service ceases immediately, though
                      we may retain certain information as required by law or for legitimate
                      ministry purposes.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Disclaimers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold text-slate-800 mb-4">
                    7. Disclaimers & Limitations
                  </h2>
                  <div className="space-y-4 text-slate-600">
                    <p>
                      The Service is provided "as is" without warranties of any kind. We do not
                      guarantee uninterrupted access or error-free operation.
                    </p>
                    <p>
                      While we strive to provide quality Bible education, we are not responsible
                      for individual spiritual outcomes. The Service supplements, but does not
                      replace, parental and church-based spiritual guidance.
                    </p>
                    <p>
                      To the maximum extent permitted by law, The Chosen Generation Ministry
                      shall not be liable for any indirect, incidental, or consequential damages
                      arising from use of the Service.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Changes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold text-slate-800 mb-4">
                    8. Changes to Terms
                  </h2>
                  <p className="text-slate-600">
                    We may update these Terms from time to time. Significant changes will be
                    communicated via email or platform notification. Continued use of the
                    Service after changes constitutes acceptance of the new Terms.
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
                    If you have questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-slate-700">
                      <strong>The Chosen Generation Ministry</strong><br />
                      Email: <a href="mailto:legal@thechosengeneration.org" className="text-amber-600 hover:underline">legal@thechosengeneration.org</a>
                    </p>
                  </div>
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
