"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  Trophy,
  Calendar,
  Star,
  ChevronRight,
  Flame,
  Heart,
  LogOut,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface ChildSession {
  id: string
  firstName: string
  lastName?: string
  displayName: string
  level: number
  points: number
}

// Demo tasks - in production these would come from the database
const defaultTasks = [
  { id: "1", title: "Morning Prayer", type: "checkbox", completed: false, points: 10 },
  { id: "2", title: "Read John Chapter 3", type: "checkbox", completed: false, points: 15 },
  { id: "3", title: "Memory Verse: John 3:16", type: "teacher_approved", completed: false, points: 20 },
  { id: "4", title: "Prayer Reflection", type: "short_answer", completed: false, points: 15 },
  { id: "5", title: "Worship Practice", type: "checkbox", completed: false, points: 10 },
]

const journeyNodes = [
  { id: 1, title: "Day 1", status: "current" },
  { id: 2, title: "Day 2", status: "locked" },
  { id: 3, title: "Day 3", status: "locked" },
  { id: 4, title: "Day 4", status: "locked" },
  { id: 5, title: "Day 5", status: "locked" },
  { id: 6, title: "Day 6", status: "locked" },
  { id: 7, title: "Day 7", status: "locked" },
]

const badges = [
  { emoji: "🙏", label: "Prayer Warrior", date: "New!" },
  { emoji: "📖", label: "Bible Reader", date: "Earn this!" },
]

export default function ChildDashboard() {
  const router = useRouter()
  const [childData, setChildData] = useState<ChildSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)
  const [tasks, setTasks] = useState(defaultTasks)
  const [checkins, setCheckins] = useState({ prayer: false, attendance: true })

  // Load child data from session storage
  useEffect(() => {
    const sessionData = sessionStorage.getItem("childSession")
    if (sessionData) {
      try {
        const parsed = JSON.parse(sessionData)
        setChildData(parsed)
      } catch {
        router.push("/login")
      }
    } else {
      router.push("/login")
    }
    setIsLoading(false)
  }, [router])

  const completedTasks = tasks.filter((t) => t.completed).length
  const totalTasks = tasks.length
  const weeklyProgress = Math.round((completedTasks / totalTasks) * 100)

  const handleTaskComplete = (taskId: string) => {
    setTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    )
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 2000)
  }

  const handlePrayerCheckin = () => {
    if (!checkins.prayer) {
      setCheckins({ ...checkins, prayer: true })
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 2000)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("childSession")
    router.push("/login")
  }

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="text-6xl"
        >
          ⭐
        </motion.div>
      </div>
    )
  }

  if (!childData) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50">
      {/* Animated background */}
      <div className="fixed inset-0 bg-pattern-stars opacity-20 pointer-events-none" />

      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -20, x: Math.random() * window.innerWidth, opacity: 1 }}
              animate={{ y: window.innerHeight + 20, opacity: 0 }}
              transition={{ duration: 2, delay: Math.random() * 0.5 }}
              className="absolute text-2xl"
            >
              {["⭐", "🎉", "✨", "💛", "🙏"][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-amber-100 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Avatar className="w-12 h-12 border-2 border-amber-300">
                  <AvatarFallback className="bg-gradient-to-br from-amber-400 to-orange-500 text-white text-lg font-bold">
                    {getInitials(childData.displayName)}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              <div>
                <h1 className="font-bold text-lg text-slate-800">Hi, {childData.firstName}! 👋</h1>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs border-amber-300 text-amber-700">
                    <Flame className="w-3 h-3 mr-1 text-orange-500" />
                    Level {childData.level}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-amber-300 text-amber-700">
                    <Star className="w-3 h-3 mr-1 text-amber-500" />
                    {childData.points} pts
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="w-5 h-5 text-slate-500" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-24 relative z-10">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 border-0 shadow-xl">
            <CardContent className="pt-6 pb-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm mb-1">This Week&apos;s Progress</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="font-bold text-2xl">{completedTasks}/{totalTasks}</span>
                        <p className="text-xs text-white/80">Tasks Done</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <Star className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="font-bold text-2xl">{childData.points}</span>
                        <p className="text-xs text-white/80">Points</p>
                      </div>
                    </div>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl"
                >
                  🌟
                </motion.div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Weekly Progress</span>
                  <span className="font-bold">{weeklyProgress}%</span>
                </div>
                <div className="h-3 bg-white/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${weeklyProgress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-white rounded-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Journey Path */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="bg-white/80 backdrop-blur border-amber-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
                <Sparkles className="w-5 h-5 text-amber-500" />
                This Week&apos;s Journey
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between overflow-x-auto pb-2">
                {journeyNodes.map((node, index) => (
                  <div key={node.id} className="flex items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-col items-center"
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shadow-md ${
                          node.status === "completed"
                            ? "bg-gradient-to-br from-green-400 to-emerald-500 text-white"
                            : node.status === "current"
                            ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white animate-pulse"
                            : "bg-slate-200 text-slate-400"
                        }`}
                      >
                        {node.status === "completed" ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : node.status === "current" ? (
                          <Star className="w-6 h-6" />
                        ) : (
                          node.id
                        )}
                      </div>
                      <span className="text-xs text-slate-500 mt-1 font-medium">{node.title}</span>
                    </motion.div>
                    {index < journeyNodes.length - 1 && (
                      <div
                        className={`w-6 h-1 mx-1 rounded-full ${
                          node.status === "completed" ? "bg-green-400" : "bg-slate-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Check-ins */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-500" />
            Daily Check-ins
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card
                className={`cursor-pointer transition-all bg-white/80 backdrop-blur ${
                  checkins.prayer ? "ring-2 ring-green-400 bg-green-50" : "hover:shadow-lg"
                }`}
                onClick={handlePrayerCheckin}
              >
                <CardContent className="pt-6 text-center">
                  <motion.div
                    animate={checkins.prayer ? { scale: [1, 1.2, 1] } : {}}
                    className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl ${
                      checkins.prayer
                        ? "bg-gradient-to-br from-green-400 to-emerald-500"
                        : "bg-gradient-to-br from-amber-100 to-amber-200"
                    }`}
                  >
                    {checkins.prayer ? "✅" : "🙏"}
                  </motion.div>
                  <h3 className="font-semibold text-slate-800">Prayer</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {checkins.prayer ? "Done for today! 🎉" : "Tap when done"}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <Card className={`bg-white/80 backdrop-blur ${checkins.attendance ? "ring-2 ring-green-400 bg-green-50" : ""}`}>
              <CardContent className="pt-6 text-center">
                <div className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl ${
                  checkins.attendance
                    ? "bg-gradient-to-br from-green-400 to-emerald-500"
                    : "bg-gradient-to-br from-blue-100 to-blue-200"
                }`}>
                  {checkins.attendance ? "✅" : "📅"}
                </div>
                <h3 className="font-semibold text-slate-800">Attendance</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {checkins.attendance ? "You're here! 🌟" : "Check in"}
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-500" />
              This Week&apos;s Tasks
            </h2>
            <Link href="/child/tasks" className="text-sm text-amber-600 hover:text-amber-700 flex items-center font-medium">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {tasks.slice(0, 4).map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card
                  className={`cursor-pointer transition-all bg-white/80 backdrop-blur hover:shadow-md ${
                    task.completed ? "bg-green-50 border-green-200" : ""
                  }`}
                  onClick={() => task.type === "checkbox" && handleTaskComplete(task.id)}
                >
                  <CardContent className="py-4 px-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                            task.completed
                              ? "bg-gradient-to-br from-green-400 to-emerald-500 text-white"
                              : "bg-slate-100"
                          }`}
                        >
                          {task.completed ? "✓" : task.type === "teacher_approved" ? "⭐" : "📖"}
                        </motion.div>
                        <div>
                          <h4 className={`font-medium ${task.completed ? "text-green-700 line-through" : "text-slate-800"}`}>
                            {task.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={`text-xs ${task.completed ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                              +{task.points} pts
                            </Badge>
                            {task.type === "teacher_approved" && !task.completed && (
                              <Badge variant="outline" className="text-xs border-blue-200 text-blue-600">
                                Needs Approval
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              Your Badges
            </h2>
            <Link href="/child/awards" className="text-sm text-amber-600 hover:text-amber-700 flex items-center font-medium">
              Trophy Room <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {badges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
              >
                <Card className="min-w-[130px] text-center bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-4 pb-4">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      className="text-4xl mb-2"
                    >
                      {badge.emoji}
                    </motion.div>
                    <h4 className="font-semibold text-slate-800 text-sm">{badge.label}</h4>
                    <p className="text-xs text-amber-600 font-medium mt-1">{badge.date}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-slate-200 z-50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around h-16">
            <Link href="/child" className="flex flex-col items-center text-amber-600">
              <Sparkles className="w-6 h-6" />
              <span className="text-xs mt-1 font-medium">Home</span>
            </Link>
            <Link href="/child/tasks" className="flex flex-col items-center text-slate-400 hover:text-amber-600 transition-colors">
              <BookOpen className="w-6 h-6" />
              <span className="text-xs mt-1">Tasks</span>
            </Link>
            <Link href="/child/awards" className="flex flex-col items-center text-slate-400 hover:text-amber-600 transition-colors">
              <Trophy className="w-6 h-6" />
              <span className="text-xs mt-1">Awards</span>
            </Link>
            <Link href="/child/settings" className="flex flex-col items-center text-slate-400 hover:text-amber-600 transition-colors">
              <Settings className="w-6 h-6" />
              <span className="text-xs mt-1">Settings</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
