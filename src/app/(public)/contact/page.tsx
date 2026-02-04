"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+1 (234) 567-8900", "+1 (234) 567-8901"],
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@thechosengeneration.org", "admin@thechosengeneration.org"],
    color: "from-blue-400 to-indigo-500",
  },
  {
    icon: MapPin,
    title: "Location",
    details: ["123 Faith Avenue", "City, Country 12345"],
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: ["Monday - Friday: 9 AM - 5 PM", "Saturday: 9 AM - 1 PM"],
    color: "from-purple-400 to-pink-500",
  },
]

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

const inquiryTypes = [
  { value: "general", label: "General Inquiry" },
  { value: "registration", label: "Registration Questions" },
  { value: "programs", label: "Program Information" },
  { value: "volunteering", label: "Volunteering" },
  { value: "partnership", label: "Partnership Opportunities" },
  { value: "other", label: "Other" },
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-amber-50 to-white overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="magic" className="mb-6">
                <MessageCircle className="w-3 h-3 mr-1" />
                Get in Touch
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                Contact Us
              </h1>
              <p className="text-lg text-slate-600 mb-8">
                Have questions about our programs or want to learn more?
                We&apos;d love to hear from you. Reach out through any of the methods below.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full card-hover">
                    <CardContent className="pt-6 text-center">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center mx-auto mb-4`}>
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-slate-800 mb-2">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-sm text-slate-600">{detail}</p>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div>
                <Card variant="gradient">
                  <CardHeader>
                    <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {submitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                          <Send className="w-8 h-8 text-green-500" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Message Sent!</h3>
                        <p className="text-slate-600 mb-6">
                          Thank you for reaching out. We&apos;ll get back to you within 24-48 hours.
                        </p>
                        <Button onClick={() => setSubmitted(false)} variant="outline">
                          Send Another Message
                        </Button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name *</Label>
                            <Input id="firstName" placeholder="John" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name *</Label>
                            <Input id="lastName" placeholder="Doe" required />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input id="email" type="email" placeholder="john@example.com" required />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" type="tel" placeholder="+1 (234) 567-8900" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="inquiryType">Inquiry Type *</Label>
                          <Select required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select inquiry type" />
                            </SelectTrigger>
                            <SelectContent>
                              {inquiryTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Message *</Label>
                          <Textarea
                            id="message"
                            placeholder="How can we help you?"
                            className="min-h-[150px]"
                            required
                          />
                        </div>

                        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <span className="animate-spin mr-2">&#9696;</span>
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Map & Social */}
              <div className="space-y-6">
                {/* Map Placeholder */}
                <Card className="overflow-hidden">
                  <div className="aspect-video bg-slate-100 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-100 opacity-50" />
                    <div className="relative text-center p-8">
                      <MapPin className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                      <h3 className="font-bold text-slate-800 mb-2">Find Us</h3>
                      <p className="text-slate-600 text-sm">
                        123 Faith Avenue<br />
                        City, Country 12345
                      </p>
                      <Button className="mt-4" variant="outline" asChild>
                        <a
                          href="https://maps.google.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open in Google Maps
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Connect With Us */}
                <Card variant="glow">
                  <CardHeader>
                    <CardTitle>Connect With Us</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      Follow us on social media for updates, inspiration, and to see what&apos;s
                      happening in our ministry.
                    </p>
                    <div className="flex gap-3">
                      {socialLinks.map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 flex items-center justify-center transition-colors"
                          aria-label={social.label}
                        >
                          <social.icon className="w-5 h-5 text-amber-600" />
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick FAQ */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Answers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">When are programs held?</h4>
                        <p className="text-sm text-slate-600">
                          Our programs run on Saturdays and Sundays. Check the Programs page for specific schedules.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">How do I register my child?</h4>
                        <p className="text-sm text-slate-600">
                          Click the &quot;Register&quot; button and complete the online form. Our team will contact you.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">Is there a fee?</h4>
                        <p className="text-sm text-slate-600">
                          Our programs are offered free of charge, though donations are welcome.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
