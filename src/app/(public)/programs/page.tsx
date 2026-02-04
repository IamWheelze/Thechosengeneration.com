"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  BookOpen,
  Clock,
  CheckCircle2,
  ChevronRight,
  Calendar,
  Users,
  Target,
  Award,
  Sparkles,
} from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const programs = [
  {
    id: "fs1",
    title: "Foundation School 1",
    subtitle: "Building the Basics of Faith",
    duration: "2 Weeks",
    schedule: "Saturday & Sunday, 9:00 AM - 12:00 PM",
    ageGroup: "Ages 4-12",
    passingScore: 60,
    color: "from-green-400 to-emerald-500",
    icon: "🌱",
    description:
      "The entry-level program where children establish their foundational understanding of prayer, worship, and Scripture. Perfect for first-timers or those new to structured Bible learning.",
    objectives: [
      "Learn basic prayer principles and develop a personal prayer life",
      "Understand the importance of worship and praise",
      "Begin reading and memorizing Scripture passages",
      "Build friendships within the community of faith",
      "Develop discipline and attentiveness in spiritual matters",
    ],
    curriculum: [
      { week: 1, topics: ["Introduction to Prayer", "Why We Pray", "Types of Prayer", "Prayer Practice Sessions"] },
      { week: 2, topics: ["Introduction to Scripture", "Bible Stories", "Memory Verses", "Final Prayer Stretch (6 hours)"] },
    ],
    assessment: [
      { category: "Attendance & Participation", weight: 30 },
      { category: "Prayer Engagement", weight: 25 },
      { category: "Bible Lessons", weight: 15 },
      { category: "Attitude & Discipline", weight: 10 },
      { category: "Final Prayer Stretch", weight: 20 },
    ],
  },
  {
    id: "fs2",
    title: "Foundation School 2",
    subtitle: "Deepening Understanding",
    duration: "3 Weeks",
    schedule: "Saturday & Sunday, 9:00 AM - 1:00 PM",
    ageGroup: "Ages 6-12",
    passingScore: 70,
    color: "from-blue-400 to-indigo-500",
    icon: "📖",
    description:
      "Building on Foundation School 1, this intermediate program takes children deeper into Bible study, spiritual disciplines, and personal devotion. Students develop stronger prayer habits and begin systematic Scripture reading.",
    objectives: [
      "Develop consistent Bible reading habits",
      "Understand major Bible themes and stories",
      "Practice longer prayer sessions with greater depth",
      "Learn to journal spiritual reflections",
      "Begin understanding God's character through Scripture",
    ],
    curriculum: [
      { week: 1, topics: ["Advanced Prayer Techniques", "Intercession", "Warfare Prayers", "Prayer Journal Writing"] },
      { week: 2, topics: ["Old Testament Overview", "Key Bible Characters", "Lessons from Patriarchs", "Scripture Memory"] },
      { week: 3, topics: ["New Testament Foundations", "Life of Jesus", "Acts of the Apostles", "Final Prayer Stretch (12 hours)"] },
    ],
    assessment: [
      { category: "Attendance & Participation", weight: 25 },
      { category: "Prayer Engagement", weight: 25 },
      { category: "Bible Study", weight: 20 },
      { category: "Attitude & Teachability", weight: 10 },
      { category: "Final Prayer Stretch", weight: 20 },
    ],
  },
  {
    id: "leadership",
    title: "Leadership Training",
    subtitle: "Developing Young Leaders",
    duration: "2 Weeks",
    schedule: "Saturday & Sunday, 9:00 AM - 2:00 PM",
    ageGroup: "Ages 8-14",
    passingScore: 80,
    color: "from-purple-400 to-pink-500",
    icon: "👑",
    description:
      "The advanced program for children who have completed Foundation School 2 with excellence. This intensive training prepares young believers to serve, lead, and mentor others in their faith journey.",
    objectives: [
      "Develop leadership and mentoring skills",
      "Learn to teach and explain Scripture to others",
      "Practice facilitating small group discussions",
      "Build accountability and character",
      "Prepare for service within the ministry",
    ],
    curriculum: [
      { week: 1, topics: ["Servant Leadership", "Character Building", "Teaching Basics", "Mentoring Skills"] },
      { week: 2, topics: ["Practical Ministry", "Working with Younger Children", "Responsibility & Accountability", "Final Prayer Stretch (12 hours)"] },
    ],
    assessment: [
      { category: "Attendance & Reliability", weight: 25 },
      { category: "Prayer Capacity & Leadership", weight: 30 },
      { category: "Bible Understanding & Teaching", weight: 15 },
      { category: "Character & Accountability", weight: 10 },
      { category: "Final Prayer Stretch", weight: 20 },
    ],
  },
]

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-gradient-warm">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-amber-50 to-white overflow-hidden">
          <div className="absolute inset-0 bg-pattern-stars opacity-20" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="magic" className="mb-6">
                <Sparkles className="w-3 h-3 mr-1" />
                Our Programs
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                A Progressive Journey of Faith
              </h1>
              <p className="text-lg text-slate-600 mb-8">
                Three carefully designed levels that take children from foundational understanding
                to confident spiritual leadership, each building upon the previous.
              </p>
            </div>

            {/* Journey Path */}
            <div className="max-w-4xl mx-auto mt-8">
              <div className="flex items-center justify-between relative">
                <div className="absolute left-0 right-0 top-1/2 h-2 bg-slate-100 -translate-y-1/2 rounded-full" />
                {programs.map((program, index) => (
                  <motion.div
                    key={program.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                    className="relative flex flex-col items-center"
                  >
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${program.color} flex items-center justify-center text-2xl shadow-lg z-10`}>
                      {program.icon}
                    </div>
                    <span className="mt-2 text-sm font-medium text-slate-600 text-center max-w-[100px]">
                      {program.title}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Programs Detail Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="fs1" className="max-w-5xl mx-auto">
              <TabsList className="grid grid-cols-3 w-full h-auto p-1 mb-8">
                {programs.map((program) => (
                  <TabsTrigger
                    key={program.id}
                    value={program.id}
                    className="flex flex-col items-center gap-1 py-3 data-[state=active]:bg-white"
                  >
                    <span className="text-xl">{program.icon}</span>
                    <span className="text-xs md:text-sm font-medium">{program.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {programs.map((program) => (
                <TabsContent key={program.id} value={program.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Program Header */}
                    <Card variant="gradient" className="mb-8 overflow-hidden">
                      <div className={`h-2 bg-gradient-to-r ${program.color}`} />
                      <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${program.color} flex items-center justify-center text-2xl shadow-lg`}>
                                {program.icon}
                              </div>
                              <div>
                                <h2 className="text-2xl font-bold text-slate-800">{program.title}</h2>
                                <p className="text-amber-600 font-medium">{program.subtitle}</p>
                              </div>
                            </div>
                            <p className="text-slate-600 mb-4">{program.description}</p>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {program.duration}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {program.ageGroup}
                            </Badge>
                            <Badge variant="gold" className="flex items-center gap-1">
                              <Target className="w-3 h-3" />
                              {program.passingScore}% to Pass
                            </Badge>
                          </div>
                        </div>
                        <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Calendar className="w-4 h-4 text-amber-500" />
                            <span className="font-medium">Schedule:</span>
                            {program.schedule}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Objectives */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-amber-500" />
                            Learning Objectives
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {program.objectives.map((objective, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <span className="text-slate-600 text-sm">{objective}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Assessment */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Award className="w-5 h-5 text-amber-500" />
                            Assessment Criteria
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {program.assessment.map((item) => (
                              <div key={item.category}>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-slate-600">{item.category}</span>
                                  <span className="font-medium text-slate-800">{item.weight}%</span>
                                </div>
                                <Progress value={item.weight} className="h-2" />
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Curriculum */}
                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-amber-500" />
                          Curriculum Overview
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {program.curriculum.map((week, index) => (
                            <div key={index} className="border border-slate-100 rounded-xl p-4">
                              <div className="flex items-center gap-2 mb-3">
                                <Badge variant={index === program.curriculum.length - 1 ? "magic" : "default"}>
                                  Week {week.week}
                                </Badge>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {week.topics.map((topic, i) => (
                                  <span key={i} className="px-3 py-1 bg-slate-50 rounded-lg text-sm text-slate-600">
                                    {topic}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-amber-500 to-orange-500">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Begin the Journey?
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Register your child today and watch them grow in faith, knowledge, and character.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="xl" variant="outline" className="bg-white text-amber-600 border-white hover:bg-amber-50" asChild>
                  <Link href="/signup">
                    Register Now
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </Link>
                </Button>
                <Button size="xl" variant="ghost" className="text-white border-white/30 hover:bg-white/10" asChild>
                  <Link href="/contact">
                    Have Questions?
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
