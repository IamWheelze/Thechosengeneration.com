"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Heart,
  BookOpen,
  Users,
  Award,
  Quote,
  Globe,
  Shield,
  HandHeart,
  Star,
  Music,
  Flame,
  Church,
  Baby,
  Tv,
  MapPin,
} from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { StaggerContainer, StaggerItem, SlideIn } from "@/components/animations/page-transition"

const coreValues = [
  {
    icon: BookOpen,
    title: "Scripture-Centered",
    description: "Every teaching is grounded in God's Word. Children complete the entire Bible and are rooted in doctrine.",
  },
  {
    icon: Heart,
    title: "Love-Driven",
    description: "Every child is known, assigned, and supervised. We create an environment of love, correction, and truth.",
  },
  {
    icon: Users,
    title: "Community & Family",
    description: "Christianity is a family. Children grow together, grounded in prayer and godly relationships.",
  },
  {
    icon: Shield,
    title: "Discipline & Order",
    description: "Growth is enforced through structure. No growth is accidental, no authority unchecked, no discipline optional.",
  },
]

const founderStoryTimeline = [
  {
    icon: Baby,
    period: "Early Childhood",
    title: "The Legacy Program",
    description: "Our founder's mother began a children's Bible study ministry called Legacy — filled with music, singing, teaching, and joy. Children gathered, songs were sung, and the Word of God was taught in ways children could understand.",
  },
  {
    icon: Tv,
    period: "Growing Up",
    title: "National Television & Drama",
    description: "By God's grace, Legacy grew. It was recorded, performed, and eventually aired on national television (NTA). Children acted, sang, played instruments, and learned about God through Bible-based dramas, faith-centered skits, and creative storytelling.",
  },
  {
    icon: Heart,
    period: "Teenage & University Years",
    title: "A Lifelong Love for Children",
    description: "Even when the recordings stopped, the love for children never left. Children naturally gathered — in homes, in church, in offices. This was not accidental. God was preparing something.",
  },
  {
    icon: Flame,
    period: "2019",
    title: "A Turning Point",
    description: "Before the pandemic, our founder returned to Nigeria and resumed Sunday school teaching. Children gathered to worship, pray, watch Christian movies, and sing through the night. Even during COVID-19 lockdowns, children kept coming.",
  },
  {
    icon: Users,
    period: "NYSC Year",
    title: "NCCF & The Move of God",
    description: "During NYSC, over 50 children and teenagers gathered regularly for prayers, Bible studies, and school teaching. Children prayed. Children understood Scripture. Children responded to God. The power of God working in children became unmistakably clear.",
  },
  {
    icon: Church,
    period: "Jos Ministry",
    title: "Structured Children's Ministry",
    description: "In Jos, attendance grew from 50 to over 100. A three-day children's camp with nearly 70 children produced testimonies of deeper love for God, clearer prayer lives, healings, miracles, and spiritual sensitivity.",
  },
  {
    icon: Globe,
    period: "2023 – Present",
    title: "International Expansion",
    description: "Children and teenage mentorship programs expanded to Senegal, including leadership transitions and discipleship for young people stepping into ministry roles.",
  },
]

const milestones = [
  { year: "2018 – 2020", event: "Children gatherings at home and Sunday school ministry." },
  { year: "2021", event: "Structured children programs established in Delta State, Nigeria." },
  { year: "2022 – 2024", event: "Children programs established and continued in Jos. Camp with 70+ children." },
  { year: "2023 – 2025", event: "Children and teenage mentorship programs in Senegal." },
  { year: "2026 – Present", event: "Expansion, refinement, and growth of The Choosing Generation." },
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
                {[
                  "Knows God personally",
                  "Understands their identity in Christ",
                  "Walks in love, discipline, and truth",
                  "Learns to pray, lead, and stand firm in faith",
                ].map((item, index) => (
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
                Children are not raised by emotion or preference, but by <strong>order</strong>.
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

              <Card variant="glass" className="p-8 mb-8">
                <div className="flex justify-center mb-6">
                  <Quote className="w-12 h-12 text-amber-400" />
                </div>
                <blockquote className="text-xl md:text-2xl text-center text-amber-600 italic leading-relaxed mb-4 font-semibold">
                  &ldquo;If you are not rooted in a godly family, you will struggle to grow well.&rdquo;
                </blockquote>
              </Card>

              <p className="text-lg text-slate-600 mb-6">
                This work exists to produce children who are <strong>prayer-rooted</strong>, deeply
                grounded in Scripture, <strong>disciplined in conduct</strong>, trained in worship,
                and capable of mentoring other children.
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

        {/* Founder's Story */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-amber-50/30 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="magic" className="mb-4">
                <Flame className="w-3 h-3 mr-1" />
                Our Story
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                How The Choosing Generation Began
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                The story did not begin with a website or a program. It began with family, faith, and obedience.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {founderStoryTimeline.map((chapter, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4 md:gap-6 mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <chapter.icon className="w-6 h-6 text-white" />
                    </div>
                    {index < founderStoryTimeline.length - 1 && (
                      <div className="w-0.5 h-full bg-amber-200 mt-2" />
                    )}
                  </div>
                  <div className="pb-4">
                    <span className="text-sm font-semibold text-amber-600">{chapter.period}</span>
                    <h3 className="text-xl font-bold text-slate-800 mt-1 mb-2">{chapter.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{chapter.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <SlideIn direction="up" className="mt-8">
              <Card variant="gradient" className="max-w-3xl mx-auto">
                <CardContent className="pt-6 text-center">
                  <Music className="w-10 h-10 text-amber-500 mx-auto mb-4" />
                  <p className="text-lg text-slate-700 italic mb-4">
                    &ldquo;Legacy, Legacy, Legacy… Legacy is the program to watch.&rdquo;
                  </p>
                  <p className="text-slate-600">
                    What you see today as The Choosing Generation is not something new.
                    It is a <strong>continuation</strong>, a <strong>stewardship</strong>, a{" "}
                    <strong>vision passed down and refined</strong>. The vision God gave through a mother,
                    is now being stepped fully into.
                  </p>
                </CardContent>
              </Card>
            </SlideIn>

            <SlideIn direction="up" className="mt-8 text-center">
              <p className="text-xl text-slate-700 font-medium max-w-2xl mx-auto">
                When children are taught early, loved deeply, and guided rightly,
                they become a generation that <strong>chooses God willingly</strong>.
              </p>
            </SlideIn>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-16 md:py-24 bg-white">
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="text-center card-hover">
                  <CardContent className="pt-6">
                    <Avatar size="xl" className="mx-auto mb-4">
                      <AvatarFallback className="text-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white">
                        EJ
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold text-slate-800">Egbodofo Joshua</h3>
                    <p className="text-amber-600 font-medium mb-2">Founder & Vision Lead</p>
                    <p className="text-slate-600">
                      Christian teacher, mentor, and discipleship leader with a passion for raising
                      children rooted in Christ. Continuing the vision that began through the Legacy
                      children&apos;s program.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="text-center mt-8">
              <p className="text-slate-500 italic">
                Additional leadership team members and leader photos will be added here.
              </p>
            </div>
          </div>
        </section>

        {/* Ministry Journey */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="magic" className="mb-4">
                <Globe className="w-3 h-3 mr-1" />
                2018 – Present
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                Ministry Timeline
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
        <section className="py-16 md:py-24 bg-white">
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
                  description: "Children's meetings, discipleship programs, and the original Legacy ministry.",
                },
                {
                  flag: "🇳🇬",
                  location: "Jos, Nigeria",
                  description: "Structured programs with 100+ children. Three-day camps with testimonies of healings and transformation.",
                },
                {
                  flag: "🇸🇳",
                  location: "Senegal",
                  description: "Children and teenage discipleship, including leadership mentorship and ministry transitions.",
                },
              ].map((place, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 text-center shadow-lg border border-amber-100"
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

        {/* Transformation Stories placeholder */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-amber-50/30 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <Badge variant="success" className="mb-4">
                <Heart className="w-3 h-3 mr-1" />
                Transformation Stories
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                Every Story Is Real
              </h2>
              <p className="text-slate-600 max-w-xl mx-auto">
                Stories shared by children, parents, and mentors — each reflecting growth,
                healing, changed understanding, and renewed faith.
              </p>
            </div>
            <div className="max-w-2xl mx-auto text-center">
              <Card variant="glass" className="p-8">
                <Award className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <p className="text-slate-500 italic">
                  Transformation stories are uploaded, edited, and approved by the ministry team.
                  Stories will appear here as they are published.
                </p>
              </Card>
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
                No growth is accidental. No discipline is optional.
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
