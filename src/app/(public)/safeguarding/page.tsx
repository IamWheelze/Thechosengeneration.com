"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Shield,
  Heart,
  AlertTriangle,
  Phone,
  Mail,
  CheckCircle2,
  Users,
  Lock,
  Eye,
  FileText,
  ChevronRight,
} from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const safeguardingPrinciples = [
  {
    icon: Heart,
    title: "Child-First Approach",
    description: "Every decision we make prioritizes the safety, wellbeing, and dignity of every child in our care.",
  },
  {
    icon: Users,
    title: "Trained Staff",
    description: "All teachers and volunteers undergo comprehensive safeguarding training and background checks.",
  },
  {
    icon: Lock,
    title: "Safe Environment",
    description: "Our facilities and procedures are designed to minimize risks and create a secure atmosphere.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "We maintain open communication with parents and clear reporting procedures for any concerns.",
  },
]

const policies = [
  {
    title: "Recruitment & Selection",
    content: "All staff and volunteers undergo thorough background checks, reference verification, and interviews before working with children. This includes criminal record checks and safeguarding awareness assessments.",
  },
  {
    title: "Training Requirements",
    content: "Every person working with children must complete our safeguarding training program, which covers child protection, recognizing signs of abuse, appropriate boundaries, and reporting procedures. Training is updated annually.",
  },
  {
    title: "Supervision & Ratios",
    content: "We maintain strict adult-to-child ratios in all settings. Two-adult rule is enforced at all times. Children are never left alone with a single adult. All activities are conducted in visible, open areas.",
  },
  {
    title: "Photo & Media Policy",
    content: "Parental consent is required for all photographs. Images are stored securely and used only for approved purposes. Children's full names are never published alongside their photos without explicit permission.",
  },
  {
    title: "Physical Contact Guidelines",
    content: "Physical contact is limited to what is necessary and appropriate. Side hugs and high-fives are acceptable. Any necessary physical assistance (first aid, comfort for distressed child) is documented and performed with another adult present.",
  },
  {
    title: "Communication Boundaries",
    content: "Staff may not have private communications with children through personal devices or social media. All parent/guardian communication goes through official ministry channels.",
  },
]

const reportingSteps = [
  "If you observe concerning behavior or a child discloses information to you",
  "Document what you observed or what the child said (using their words)",
  "Report immediately to the Safeguarding Lead or Administration",
  "Do not investigate or question the child further",
  "Maintain confidentiality - only share with those who need to know",
  "Follow up with the Safeguarding Lead for next steps",
]

export default function SafeguardingPage() {
  return (
    <div className="min-h-screen bg-gradient-warm">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-amber-50 to-white overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="success" className="mb-6">
                <Shield className="w-3 h-3 mr-1" />
                Child Protection
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                Safeguarding Our Children
              </h1>
              <p className="text-lg text-slate-600 mb-8">
                At The Chosen Generation, the safety and wellbeing of every child is our highest priority.
                We are committed to creating and maintaining a safe environment where children can grow in faith.
              </p>
            </div>
          </div>
        </section>

        {/* Commitment Statement */}
        <section className="py-12 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Shield className="w-16 h-16 mx-auto mb-4 opacity-90" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Commitment</h2>
              <p className="text-lg text-white/90">
                We believe that all children have the right to be safe, protected, and free from harm.
                We are committed to practices that protect children from abuse, neglect, and exploitation.
                Every person involved in our ministry shares this responsibility.
              </p>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="default" className="mb-4">Our Approach</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                Safeguarding Principles
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {safeguardingPrinciples.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="glow" className="h-full text-center card-hover">
                    <CardContent className="pt-6">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center mx-auto mb-4">
                        <principle.icon className="w-7 h-7 text-green-600" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 mb-2">{principle.title}</h3>
                      <p className="text-sm text-slate-600">{principle.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Policies */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4">Policies</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                  Our Safeguarding Policies
                </h2>
                <p className="text-slate-600">
                  These policies guide our practices and ensure consistent protection for all children.
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {policies.map((policy, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-white rounded-xl border border-slate-200 px-6"
                  >
                    <AccordionTrigger className="text-left font-semibold text-slate-800 hover:text-amber-600">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-amber-500" />
                        {policy.title}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 pb-4">
                      {policy.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Reporting Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="warning" className="mb-4">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Reporting
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                  How to Report a Concern
                </h2>
                <p className="text-slate-600">
                  If you have any concerns about a child&apos;s safety or welfare, please report immediately.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Steps */}
                <Card variant="gradient">
                  <CardHeader>
                    <CardTitle>Reporting Steps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-3">
                      {reportingSteps.map((step, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-sm font-bold shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-slate-600 text-sm">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>

                {/* Contact */}
                <Card variant="glow">
                  <CardHeader>
                    <CardTitle>Contact Our Safeguarding Team</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                        <h4 className="font-semibold text-slate-800 mb-2">Safeguarding Lead</h4>
                        <p className="text-slate-600 mb-3">Pastor James Okonkwo</p>
                        <div className="space-y-2">
                          <a href="tel:+1234567890" className="flex items-center gap-2 text-green-600 hover:text-green-700">
                            <Phone className="w-4 h-4" />
                            +1 (234) 567-8900
                          </a>
                          <a href="mailto:safeguarding@thechosengeneration.org" className="flex items-center gap-2 text-green-600 hover:text-green-700">
                            <Mail className="w-4 h-4" />
                            safeguarding@thechosengeneration.org
                          </a>
                        </div>
                      </div>

                      <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                        <h4 className="font-semibold text-slate-800 mb-2">Deputy Safeguarding Lead</h4>
                        <p className="text-slate-600 mb-3">Sister Grace Adeyemi</p>
                        <div className="space-y-2">
                          <a href="tel:+1234567891" className="flex items-center gap-2 text-amber-600 hover:text-amber-700">
                            <Phone className="w-4 h-4" />
                            +1 (234) 567-8901
                          </a>
                        </div>
                      </div>

                      <p className="text-sm text-slate-500 mt-4">
                        For emergencies, please contact local authorities immediately.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Parent Information */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="magic" className="mb-4">For Parents</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                Your Role in Safeguarding
              </h2>
              <p className="text-slate-600 mb-8">
                Parents and guardians are vital partners in keeping children safe.
                Here&apos;s how you can help:
              </p>

              <div className="grid md:grid-cols-2 gap-4 text-left">
                {[
                  "Talk openly with your child about their experiences at our programs",
                  "Teach your child about personal boundaries and body safety",
                  "Ensure we have current contact information for emergencies",
                  "Inform us of any special needs or concerns about your child",
                  "Report any concerns immediately - no concern is too small",
                  "Review our policies and discuss them with your child age-appropriately",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-green-500 to-emerald-500">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Questions About Our Safeguarding?
              </h2>
              <p className="text-lg text-white/90 mb-8">
                We welcome any questions about our child protection practices.
                Your peace of mind is important to us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="xl" variant="outline" className="bg-white text-green-600 border-white hover:bg-green-50" asChild>
                  <Link href="/contact">
                    Contact Us
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
