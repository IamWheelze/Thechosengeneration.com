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
  Heart,
  AlertTriangle,
  Shield,
} from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const programs = [
  {
    id: "fs1",
    title: "Foundation School 1",
    subtitle: "Family, Faith & Christian Foundations",
    duration: "2 Weeks",
    schedule: "Daily Classes, ~3 hours",
    ageGroup: "Ages 5-18",
    color: "from-amber-400 to-orange-500",
    icon: "🌱",
    description:
      "This is the starting point for every child. Here, children are taught the foundational truths of Christianity with a special emphasis on Family in Christ, Belonging, Identity, Love and Responsibility.",
    whatTheyLearn: [
      "Who God is",
      "Who Jesus Christ is",
      "What it means to be a Christian",
      "The basic beliefs of our faith",
      "How Christians are called to live",
    ],
    emphasis: [
      "Family in Christ",
      "Belonging",
      "Identity",
      "Love and responsibility",
    ],
    keyLessons: [
      "Christianity is not isolation",
      "Faith grows in community",
      "God places us in families to help us stand",
    ],
  },
  {
    id: "fs2",
    title: "Foundation School 2",
    subtitle: "Intimacy With God",
    duration: "2 Weeks",
    schedule: "Daily Classes, ~3 hours",
    ageGroup: "Ages 5-18",
    color: "from-blue-400 to-indigo-500",
    icon: "📖",
    description:
      "This level focuses on relationship, not religion. Children are taught what intimacy with God means, how it is developed, and what flows out of it. They also learn from biblical examples of people who walked closely with God.",
    whatTheyLearn: [
      "What intimacy with God means",
      "How intimacy with God is developed",
      "Prayer, obedience, and surrender",
      "What flows out of intimacy with God",
      "Biblical examples of close walk with God",
    ],
    pitfalls: [
      "Pride",
      "Familiarity without obedience",
      "Speaking without listening",
      "Disobedience despite closeness",
    ],
    keyLessons: [
      "Being close to God requires humility, reverence, and obedience",
    ],
  },
  {
    id: "fs3",
    title: "Foundation School 3",
    subtitle: "Leadership, Authority & Territorial Intercession",
    duration: "2 Weeks",
    schedule: "Daily Classes, ~3 hours",
    ageGroup: "Ages 5-18",
    color: "from-purple-400 to-violet-500",
    icon: "👑",
    description:
      "This level prepares children to stand as leaders. They are taught leadership according to God's Word, influence and responsibility, authority in Christ, identity and placement, intercessory prayer, and spiritual responsibility over territories.",
    whatTheyLearn: [
      "Leadership according to God's Word",
      "Influence and responsibility",
      "Authority in Christ",
      "Identity and placement",
      "Intercessory prayer",
      "Spiritual responsibility over territories",
    ],
    keyLessons: [
      "How prayer shapes environments",
      "How leadership flows from character",
      "How God uses people to impact nations, families, and communities",
    ],
  },
]

const programStructure = [
  { icon: Calendar, label: "Duration", value: "2 weeks per foundation school" },
  { icon: BookOpen, label: "Schedule", value: "Daily classes" },
  { icon: Clock, label: "Daily Time", value: "Approximately 3 hours" },
  { icon: Target, label: "Bible Goal", value: "Complete New Testament in one month" },
]

const learningIncludes = [
  "Teaching sessions",
  "Guided prayer",
  "Group discussions",
  "Bible reading",
  "Recorded messages on healing, miracles, authority in Christ",
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
                Ages 5 – 18
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                Our Foundation Schools
              </h1>
              <p className="text-lg text-slate-600 mb-8">
                A structured journey of spiritual growth and discipleship through three progressive levels,
                each building upon the previous.
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

        {/* Program Structure */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-slate-800 text-center mb-8">
              Program Structure & Intensity
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {programStructure.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 text-center"
                  whileHover={{ y: -3 }}
                >
                  <item.icon className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                  <p className="text-xs text-slate-500 mb-1">{item.label}</p>
                  <p className="text-sm font-bold text-slate-800">{item.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="max-w-2xl mx-auto mt-8">
              <h3 className="text-lg font-semibold text-slate-800 text-center mb-4">Learning Includes:</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {learningIncludes.map((item, index) => (
                  <span key={index} className="px-4 py-2 bg-slate-100 rounded-full text-sm text-slate-600">
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-center text-slate-500 mt-4 text-sm">
                Advanced students continue with New Testament + Old Testament.
                Leadership students receive additional mentoring.
              </p>
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
                      {/* What They Learn */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-amber-500" />
                            What Children Learn
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {program.whatTheyLearn.map((item, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <span className="text-slate-600 text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Emphasis or Pitfalls */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            {program.id === "fs2" ? (
                              <>
                                <AlertTriangle className="w-5 h-5 text-orange-500" />
                                Pitfalls of Intimacy
                              </>
                            ) : program.id === "fs1" ? (
                              <>
                                <Heart className="w-5 h-5 text-red-500" />
                                Special Emphasis
                              </>
                            ) : (
                              <>
                                <Shield className="w-5 h-5 text-purple-500" />
                                Leadership Focus
                              </>
                            )}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {(program.pitfalls || program.emphasis || program.whatTheyLearn.slice(0, 4)).map((item, index) => (
                              <li key={index} className="flex items-start gap-3">
                                {program.id === "fs2" ? (
                                  <AlertTriangle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                                ) : (
                                  <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                )}
                                <span className="text-slate-600 text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Key Lessons */}
                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Award className="w-5 h-5 text-amber-500" />
                          Key Lessons
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {program.keyLessons.map((lesson, index) => (
                            <div key={index} className="flex items-center gap-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
                              <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
                              <span className="text-slate-700 font-medium">{lesson}</span>
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
                Enroll your child today and watch them grow in faith, knowledge, and character.
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
