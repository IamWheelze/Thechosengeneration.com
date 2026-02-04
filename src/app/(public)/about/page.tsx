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
    name: "Pastor James Okonkwo",
    role: "Vision & Quality Lead",
    initials: "JO",
    description: "Over 15 years of experience in children's ministry and pastoral care.",
  },
  {
    name: "Sister Grace Adeyemi",
    role: "Administrator",
    initials: "GA",
    description: "Manages operations, scheduling, and ensures smooth program delivery.",
  },
  {
    name: "Brother Daniel Mensah",
    role: "Teacher Coordinator",
    initials: "DM",
    description: "Oversees teacher training, curriculum development, and class assignments.",
  },
  {
    name: "Sister Faith Nwachukwu",
    role: "Music & Worship Lead",
    initials: "FN",
    description: "Leads worship sessions and coordinates instrument training programs.",
  },
]

const milestones = [
  { year: "2018", event: "Ministry founded with 20 children" },
  { year: "2019", event: "First Foundation School graduation" },
  { year: "2020", event: "Virtual programs launched during pandemic" },
  { year: "2021", event: "Leadership Training program introduced" },
  { year: "2022", event: "Reached 200+ active children" },
  { year: "2023", event: "Expanded to multiple branches" },
  { year: "2024", event: "Digital platform launched" },
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
              <Badge variant="magic" className="mb-6">About Us</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                Raising Children to Know and Love God
              </h1>
              <p className="text-lg text-slate-600 mb-8">
                The Chosen Generation is a children&apos;s ministry dedicated to spiritual formation,
                discipleship, and nurturing the next generation of believers.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card variant="gradient" className="h-full">
                  <CardContent className="pt-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-6">
                      <Target className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h2>
                    <p className="text-slate-600 leading-relaxed">
                      To raise children who genuinely know God, deeply love His Word, and consistently
                      walk in His ways through intentional discipleship, structured spiritual formation,
                      and loving community support.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card variant="gradient" className="h-full">
                  <CardContent className="pt-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center mb-6">
                      <Eye className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Vision</h2>
                    <p className="text-slate-600 leading-relaxed">
                      To see a generation of young people who are firmly rooted in faith, equipped
                      to lead in their communities, and passionate about sharing God&apos;s love with
                      the world around them.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-16 md:py-24 bg-amber-50/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Badge variant="secondary" className="mb-4">Our Approach</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                Formation Over Entertainment
              </h2>
              <p className="text-slate-600">
                We believe that true spiritual growth comes through intentional discipleship,
                not through mere entertainment or activity.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card variant="glass" className="p-8">
                <div className="flex justify-center mb-6">
                  <Quote className="w-12 h-12 text-amber-400" />
                </div>
                <blockquote className="text-xl md:text-2xl text-center text-slate-700 italic leading-relaxed mb-6">
                  &ldquo;Train up a child in the way he should go: and when he is old,
                  he will not depart from it.&rdquo;
                </blockquote>
                <p className="text-center text-slate-500 font-medium">Proverbs 22:6</p>
              </Card>
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
                Dedicated servants who are passionate about children&apos;s spiritual development.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {leadershipTeam.map((leader, index) => (
                <motion.div
                  key={leader.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full text-center card-hover">
                    <CardContent className="pt-6">
                      <Avatar size="xl" className="mx-auto mb-4">
                        <AvatarFallback className="text-xl">{leader.initials}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-bold text-slate-800">{leader.name}</h3>
                      <p className="text-sm text-amber-600 font-medium mb-2">{leader.role}</p>
                      <p className="text-sm text-slate-500">{leader.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="magic" className="mb-4">Our Journey</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                Ministry Milestones
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-400 to-purple-400" />
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative flex items-center mb-8 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-amber-400 border-4 border-white shadow-md" />
                    <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <div className="bg-white rounded-xl p-4 shadow-md border border-slate-100">
                        <span className="text-amber-600 font-bold">{milestone.year}</span>
                        <p className="text-slate-600">{milestone.event}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
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
                    Register Your Child
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </Link>
                </Button>
                <Button size="xl" variant="ghost" className="text-white border-white/30 hover:bg-white/10" asChild>
                  <Link href="/contact">
                    Contact Us
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
