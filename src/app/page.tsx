"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Sparkles,
  BookOpen,
  Heart,
  Users,
  Award,
  Calendar,
  ChevronRight,
  Star,
  Shield,
  Globe,
  Church,
  HandHeart,
  Clock,
} from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BubblesBackground } from "@/components/animations/bubbles"
import { Sparkles as SparklesAnimation } from "@/components/animations/sparkles"
import { StaggerContainer, StaggerItem, SlideIn } from "@/components/animations/page-transition"

const programs = [
  {
    title: "Foundation School 1",
    subtitle: "Family, Faith & Christian Foundations",
    duration: "2 Weeks",
    description: "The starting point for every child. Learn who God is, who Jesus Christ is, and what it means to be a Christian.",
    highlights: ["Who God Is", "Identity in Christ", "Family in Faith", "Basic Beliefs"],
    color: "from-amber-400 to-orange-500",
    icon: "🌱",
  },
  {
    title: "Foundation School 2",
    subtitle: "Intimacy With God",
    duration: "2 Weeks",
    description: "Focus on relationship, not religion. Learn what intimacy with God means and how it is developed.",
    highlights: ["Prayer Life", "Obedience", "Surrender", "Biblical Examples"],
    color: "from-blue-400 to-indigo-500",
    icon: "📖",
  },
  {
    title: "Foundation School 3",
    subtitle: "Leadership & Intercession",
    duration: "2 Weeks",
    description: "Prepare to stand as leaders. Learn about authority in Christ and territorial intercession.",
    highlights: ["Leadership", "Authority", "Intercession", "Influence"],
    color: "from-purple-400 to-violet-500",
    icon: "👑",
  },
]

const coreBeliefs = [
  { icon: BookOpen, text: "We learn together" },
  { icon: HandHeart, text: "We pray together" },
  { icon: Star, text: "We grow together" },
  { icon: Shield, text: "We carry one another" },
]

const whatWeRaise = [
  {
    icon: Heart,
    title: "Knows God Personally",
    description: "Building an intimate relationship with the Creator",
    color: "from-red-400 to-pink-500",
  },
  {
    icon: Shield,
    title: "Understands Identity in Christ",
    description: "Knowing who they are as children of God",
    color: "from-blue-400 to-indigo-500",
  },
  {
    icon: Star,
    title: "Walks in Love & Truth",
    description: "Living with discipline, love, and integrity",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: Church,
    title: "Leads with Faith",
    description: "Learning to pray, lead, and stand firm",
    color: "from-purple-400 to-violet-500",
  },
]

const ministryJourney = [
  {
    years: "2018 – 2020",
    title: "The Beginning",
    description: "Children gatherings at home and Sunday school ministry.",
    location: "Home Base",
  },
  {
    years: "2021",
    title: "Structured Programs",
    description: "Structured children programs established in Delta State.",
    location: "Delta State, Nigeria",
  },
  {
    years: "2022 – 2024",
    title: "Expansion to Jos",
    description: "Children programs established and continued in Jos.",
    location: "Jos, Nigeria",
  },
  {
    years: "2023 – 2025",
    title: "International Reach",
    description: "Children and teenage mentorship programs in Senegal, including leadership transitions.",
    location: "Senegal",
  },
  {
    years: "2026 – Present",
    title: "Growth & Refinement",
    description: "Expansion, refinement, and continued growth of The Choosing Generation.",
    location: "Multiple Locations",
  },
]

const locations = [
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
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-warm">
      <BubblesBackground count={10} />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-pattern-stars opacity-30" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <SlideIn direction="up">
                <Badge variant="magic" className="mb-6">
                  <Sparkles className="w-3 h-3 mr-1" />
                  A Discipleship Ministry for Children & Teens (Ages 5–18)
                </Badge>
              </SlideIn>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight"
              >
                <SparklesAnimation color="#fbbf24">
                  <span className="text-gradient">The Choosing Generation</span>
                </SparklesAnimation>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl md:text-2xl text-slate-700 mb-4 max-w-2xl mx-auto font-medium"
              >
                Raising children to know God, walk in truth, and lead with Christ
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg text-slate-600 mb-8 max-w-xl mx-auto"
              >
                A Christian discipleship ministry for children and teenagers aged 5 to 18
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button size="xl" asChild>
                  <Link href="/signup">
                    <Heart className="w-5 h-5 mr-2" />
                    Enroll Your Child
                  </Link>
                </Button>
                <Button size="xl" variant="outline" asChild>
                  <Link href="/programs">
                    <BookOpen className="w-5 h-5 mr-2" />
                    View Programs
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        </section>

        {/* Core Belief Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <SlideIn direction="up">
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
                <blockquote className="text-2xl md:text-3xl font-semibold text-amber-600 italic mb-8">
                  &ldquo;If you are not rooted in a godly family, you will struggle to grow well.&rdquo;
                </blockquote>
              </SlideIn>

              <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12">
                {coreBeliefs.map((item, index) => (
                  <StaggerItem key={index}>
                    <motion.div
                      className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100"
                      whileHover={{ y: -5 }}
                    >
                      <item.icon className="w-10 h-10 text-amber-500 mx-auto mb-4" />
                      <p className="font-semibold text-slate-700">{item.text}</p>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <SlideIn direction="up" className="mt-12">
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  We believe Christianity is not just a belief system — it is a <strong>family</strong>.
                  Children are not meant to grow alone. They are meant to grow together, grounded in
                  Scripture, prayer, and godly relationships.
                </p>
              </SlideIn>
            </div>
          </div>
        </section>

        {/* What We Raise Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-amber-50/50 to-white">
          <div className="container mx-auto px-4">
            <SlideIn direction="up">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                  We Exist to Raise a Generation That
                </h2>
              </div>
            </SlideIn>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {whatWeRaise.map((item, index) => (
                <StaggerItem key={index}>
                  <Card className="h-full card-hover border-0 shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-4`}
                      >
                        <item.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                      <p className="text-slate-600">{item.description}</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Programs Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="default" className="mb-4">
                <Award className="w-3 h-3 mr-1" />
                Ages 5 – 18
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                Our Foundation Schools
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                A structured journey of spiritual growth and discipleship
              </p>
            </div>

            <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {programs.map((program) => (
                <StaggerItem key={program.title}>
                  <Card variant="glow" className="h-full card-hover overflow-hidden group">
                    <div className={`h-2 bg-gradient-to-r ${program.color}`} />
                    <CardContent className="pt-6">
                      <div className="text-4xl mb-4">{program.icon}</div>
                      <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold mb-2">
                        {program.title}
                      </span>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{program.subtitle}</h3>
                      <p className="text-sm text-slate-500 mb-3">Duration: {program.duration}</p>
                      <p className="text-slate-600 mb-4">{program.description}</p>
                      <ul className="space-y-2">
                        {program.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                            <Star className="w-4 h-4 text-amber-500" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/programs"
                        className="inline-flex items-center text-amber-600 font-medium mt-4 group-hover:text-amber-700"
                      >
                        Learn more
                        <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Program Structure */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <SlideIn direction="up">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                  Program Structure
                </h2>
              </div>
            </SlideIn>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
              {[
                { icon: Calendar, label: "Duration", value: "2 weeks per school" },
                { icon: BookOpen, label: "Schedule", value: "Daily classes" },
                { icon: Clock, label: "Daily Time", value: "~3 hours" },
                { icon: BookOpen, label: "Bible Goal", value: "Complete NT in 1 month" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-6 text-center shadow-sm"
                  whileHover={{ y: -3 }}
                >
                  <item.icon className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                  <p className="text-sm text-slate-500 mb-1">{item.label}</p>
                  <p className="text-lg font-bold text-slate-800">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Ministry Journey */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <SlideIn direction="up">
              <div className="text-center mb-12">
                <Badge variant="success" className="mb-4">
                  <Globe className="w-3 h-3 mr-1" />
                  2018 – Present
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                  Our Ministry Journey
                </h2>
              </div>
            </SlideIn>

            <div className="max-w-3xl mx-auto">
              {ministryJourney.map((milestone, index) => (
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
                    {index < ministryJourney.length - 1 && <div className="w-0.5 h-full bg-amber-200 mt-1" />}
                  </div>
                  <div className="pb-6">
                    <span className="text-sm font-semibold text-amber-600">{milestone.years}</span>
                    <h3 className="text-xl font-bold text-slate-800 mt-1">{milestone.title}</h3>
                    <p className="text-slate-600 mt-1">{milestone.description}</p>
                    <span className="inline-flex items-center gap-1 text-sm text-slate-500 mt-2">
                      <Globe className="w-3 h-3" />
                      {milestone.location}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Where We Serve */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-amber-50/50 to-white">
          <div className="container mx-auto px-4">
            <SlideIn direction="up">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                  Where We Have Served
                </h2>
              </div>
            </SlideIn>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {locations.map((place, index) => (
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
        <section className="py-16 md:py-24 bg-gradient-to-r from-amber-500 to-orange-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-dots opacity-10" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <Heart className="w-16 h-16 mx-auto mb-6 opacity-90" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Join The Choosing Generation
                </h2>
                <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
                  Every child who joins is welcomed into a safe spiritual family where love,
                  correction, encouragement, and truth work together.
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
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
