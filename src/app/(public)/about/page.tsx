"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Target,
  Eye,
  Heart,
  BookOpen,
  Users,
  Award,
  ChevronRight,
  Quote,
  Globe,
  Shield,
  HandHeart,
  Star,
} from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { StaggerContainer, StaggerItem } from "@/components/animations/page-transition"

const coreValues = [
  {
    icon: BookOpen,
    title: "Scripture-Centered",
    description: "Every teaching and activity is grounded in God's Word, ensuring biblical truth shapes young hearts.",
  },
  {
    icon: Heart,
    title: "Love-Driven",
    description: "We create an environment where every child feels loved, valued, and accepted as God's creation.",
  },
  {
    icon: Users,
    title: "Community-Focused",
    description: "Building a family of believers where children learn to support and encourage one another.",
  },
  {
    icon: Award,
    title: "Excellence in Service",
    description: "We strive for excellence in everything we do as an offering to God and service to families.",
  },
]

const leadershipTeam = [
  {
    name: "Egbodofo Joshua",
    role: "Founder & Vision Lead",
    initials: "EJ",
    description: "Christian teacher, mentor, and discipleship leader with a passion for raising children rooted in Christ.",
  },
]

const milestones = [
  { year: "2018 – 2020", event: "Children gatherings at home and Sunday school ministry." },
  { year: "2021", event: "Structured children programs established in Delta State, Nigeria." },
  { year: "2022 – 2024", event: "Children programs established and continued in Jos, Nigeria." },
  { year: "2023 – 2025", event: "Children and teenage mentorship programs in Senegal." },
  { year: "2026 – Present", event: "Expansion, refinement, and growth of The Choosing Generation." },
]

const whatWeRaise = [
  "Knows God personally",
  "Understands their identity in Christ",
  "Walks in love, discipline, and truth",
  "Learns to pray, lead, and stand firm in faith",
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-warm">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-amber-50 to-white overflow-hidden">
          <div className="absolute inset-0 bg-pattern-stars opacity-20" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="magic" className="mb-6">Who We Are</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                The Choosing Generation
              </h1>
              <p className="text-lg text-slate-600 mb-4">
                A Christian discipleship ministry for children and teenagers aged 5 to 18.
              </p>
              <p className="text-xl text-amber-600 font-medium">
                Raising a generation that knows God, walks in truth, and leads with Christ.
              </p>
            </div>
          </div>
        </section>

        {/* What We Raise Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                We Exist to Raise a Generation That:
              </h2>
              <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {whatWeRaise.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Star className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
              <p className="text-lg text-slate-600 mt-8">
                We believe Christianity is not just a belief system — it is a <strong>family</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Core Belief Section */}
        <section className="py-16 md:py-24 bg-amber-50/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6">
                <Users className="w-3 h-3 mr-1" />
                Our Core Belief
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                Family in Christ
              </h2>
              <p className="text-xl text-slate-600 mb-6">
                At the heart of The Choosing Generation is one truth:
              </p>

              <Card variant="glass" className="p-8 mb-8">
                <div className="flex justify-center mb-6">
                  <Quote className="w-12 h-12 text-amber-400" />
                </div>
                <blockquote className="text-xl md:text-2xl text-center text-amber-600 italic leading-relaxed mb-4 font-semibold">
                  &ldquo;If you are not rooted in a godly family, you will struggle to grow well.&rdquo;
                </blockquote>
              </Card>

              <p className="text-lg text-slate-600 mb-8">
                Children are not meant to grow alone. They are meant to grow together, grounded in
                Scripture, prayer, and godly relationships.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {[
                  { icon: BookOpen, text: "We learn together" },
                  { icon: HandHeart, text: "We pray together" },
                  { icon: Star, text: "We grow together" },
                  { icon: Shield, text: "We carry one another" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="p-4 rounded-xl bg-white border border-amber-100 shadow-sm"
                    whileHover={{ y: -3 }}
                  >
                    <item.icon className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                    <p className="font-medium text-slate-700 text-sm">{item.text}</p>
                  </motion.div>
                ))}
              </div>

              <p className="text-lg text-slate-600 mt-8">
                Every child who joins is welcomed into a safe spiritual family where <strong>love</strong>,{" "}
                <strong>correction</strong>, <strong>encouragement</strong>, and <strong>truth</strong> work together.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="default" className="mb-4">What We Believe</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                Our Core Values
              </h2>
            </div>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {coreValues.map((value) => (
                <StaggerItem key={value.title}>
                  <Card variant="glow" className="h-full text-center card-hover">
                    <CardContent className="pt-6">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center mx-auto mb-4">
                        <value.icon className="w-7 h-7 text-amber-600" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 mb-2">{value.title}</h3>
                      <p className="text-sm text-slate-600">{value.description}</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="success" className="mb-4">Our Team</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                Leadership Team
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Each leader serves with dedication to teaching, prayer, and care.
              </p>
            </div>

            <div className="max-w-md mx-auto">
              {leadershipTeam.map((leader, index) => (
                <motion.div
                  key={leader.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="text-center card-hover">
                    <CardContent className="pt-6">
                      <Avatar size="xl" className="mx-auto mb-4">
                        <AvatarFallback className="text-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white">
                          {leader.initials}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-xl font-bold text-slate-800">{leader.name}</h3>
                      <p className="text-amber-600 font-medium mb-2">{leader.role}</p>
                      <p className="text-slate-600">{leader.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-slate-500 italic">
                Additional leadership team members will be added here.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="magic" className="mb-4">
                <Globe className="w-3 h-3 mr-1" />
                2018 – Present
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                Ministry Journey
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4 md:gap-6 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-amber-500 flex-shrink-0" />
                    {index < milestones.length - 1 && <div className="w-0.5 h-full bg-amber-200 mt-1" />}
                  </div>
                  <div className="pb-6">
                    <span className="text-sm font-semibold text-amber-600">{milestone.year}</span>
                    <p className="text-slate-700 mt-1">{milestone.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Where We Serve */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-amber-50/50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                Where We Have Served
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  flag: "🇳🇬",
                  location: "Delta State, Nigeria",
                  description: "Children's meetings and discipleship programs.",
                },
                {
                  flag: "🇳🇬",
                  location: "Jos, Nigeria",
                  description: "Ongoing children programs and structured teaching.",
                },
                {
                  flag: "🇸🇳",
                  location: "Senegal",
                  description: "Children and teenage discipleship, including leadership mentorship.",
                },
              ].map((place, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-6 text-center shadow-lg"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="text-5xl mb-4 block">{place.flag}</span>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{place.location}</h3>
                  <p className="text-slate-600">{place.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-amber-500 to-orange-500">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join Our Family
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Become part of a community dedicated to raising children in the knowledge and love of God.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="xl" variant="outline" className="bg-white text-amber-600 border-white hover:bg-amber-50" asChild>
                  <Link href="/signup">
                    <Heart className="w-5 h-5 mr-2" />
                    Enroll Your Child (Ages 5–18)
                  </Link>
                </Button>
                <Button size="xl" variant="ghost" className="text-white border-white/30 hover:bg-white/10" asChild>
                  <Link href="/contact">
                    Apply as Teacher/Mentor
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
