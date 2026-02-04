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
    duration: "2 Weeks",
    description: "Building the basics of faith through prayer, worship, and Scripture.",
    color: "from-green-400 to-emerald-500",
    icon: "🌱",
    level: "Beginner",
  },
  {
    title: "Foundation School 2",
    duration: "3 Weeks",
    description: "Deepening understanding through Bible study and spiritual disciplines.",
    color: "from-blue-400 to-indigo-500",
    icon: "📖",
    level: "Intermediate",
  },
  {
    title: "Leadership Training",
    duration: "2 Weeks",
    description: "Developing young leaders who can guide and mentor others.",
    color: "from-purple-400 to-pink-500",
    icon: "👑",
    level: "Advanced",
  },
]

const features = [
  {
    icon: BookOpen,
    title: "Bible-Centered Learning",
    description: "Every lesson is rooted in Scripture, helping children build a strong foundation in God's Word.",
  },
  {
    icon: Heart,
    title: "Discipleship Focus",
    description: "We prioritize formation over entertainment, nurturing genuine spiritual growth.",
  },
  {
    icon: Users,
    title: "Small Group Care",
    description: "Each child receives personal attention from dedicated, trained teachers.",
  },
  {
    icon: Shield,
    title: "Safe Environment",
    description: "Comprehensive safeguarding policies ensure every child feels secure and protected.",
  },
]

const testimonials = [
  {
    quote: "My daughter has grown so much in her faith. She now leads our family in prayer!",
    author: "Sarah M.",
    role: "Parent",
  },
  {
    quote: "The teachers truly care about each child's spiritual development. It's been amazing to watch.",
    author: "David K.",
    role: "Parent",
  },
  {
    quote: "I learned how to pray and read my Bible. Now I talk to God every day!",
    author: "Emma, age 9",
    role: "Student",
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
                  Raising the Next Generation for Christ
                </Badge>
              </SlideIn>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight"
              >
                Welcome to{" "}
                <SparklesAnimation color="#fbbf24">
                  <span className="text-gradient">The Chosen Generation</span>
                </SparklesAnimation>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto"
              >
                A Bible school where children discover the joy of knowing God, loving His Word,
                and walking in His ways through intentional discipleship.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button size="xl" asChild>
                  <Link href="/signup">
                    Register Your Child
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </Link>
                </Button>
                <Button size="xl" variant="outline" asChild>
                  <Link href="/programs">
                    Explore Programs
                  </Link>
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-12 grid grid-cols-3 gap-4 md:gap-8 max-w-lg mx-auto"
              >
                {[
                  { value: "500+", label: "Children" },
                  { value: "50+", label: "Teachers" },
                  { value: "3", label: "Programs" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-amber-600">{stat.value}</div>
                    <div className="text-sm text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        </section>

        {/* Programs Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="default" className="mb-4">Our Programs</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                A Journey of Faith
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Three progressive levels designed to nurture children from foundational faith
                to becoming young leaders in the Kingdom.
              </p>
            </div>

            <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {programs.map((program, index) => (
                <StaggerItem key={program.title}>
                  <Card variant="glow" className="h-full card-hover overflow-hidden group">
                    <div className={`h-2 bg-gradient-to-r ${program.color}`} />
                    <CardContent className="pt-6">
                      <div className="text-4xl mb-4">{program.icon}</div>
                      <Badge variant="level" className="mb-3">{program.level}</Badge>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{program.title}</h3>
                      <p className="text-sm text-slate-500 mb-3">Duration: {program.duration}</p>
                      <p className="text-slate-600">{program.description}</p>
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

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-amber-50/50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">Why Choose Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                Formation, Not Entertainment
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                We believe in intentional discipleship that transforms hearts and minds,
                preparing children to be lifelong followers of Christ.
              </p>
            </div>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <StaggerItem key={feature.title}>
                  <Card variant="glass" className="h-full text-center card-hover">
                    <CardContent className="pt-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center mx-auto mb-4">
                        <feature.icon className="w-7 h-7 text-amber-600" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 mb-2">{feature.title}</h3>
                      <p className="text-sm text-slate-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="success" className="mb-4">Testimonials</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                Stories of Transformation
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="gradient" className="h-full">
                    <CardContent className="pt-6">
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-slate-700 italic mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                      <div>
                        <p className="font-semibold text-slate-800">{testimonial.author}</p>
                        <p className="text-sm text-slate-500">{testimonial.role}</p>
                      </div>
                    </CardContent>
                  </Card>
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
                <Award className="w-16 h-16 mx-auto mb-6 opacity-90" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Give Your Child the Gift of Faith
                </h2>
                <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
                  Join hundreds of families who have trusted us to nurture their children&apos;s
                  spiritual growth. Registration is now open!
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
                      <Calendar className="w-5 h-5 mr-2" />
                      Schedule a Visit
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
