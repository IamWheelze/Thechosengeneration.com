"use client"

import { useState } from "react"
import Link from "next/link"
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
import { BubblesBackground, BubbleBurst } from "@/components/animations/bubbles"
import { CelebrationConfetti } from "@/components/animations/confetti"
import { SparklesBurst } from "@/components/animations/sparkles"
import { CalmModeToggle } from "@/components/animations/calm-mode-provider"
import { ReactionBar } from "@/components/animations/sticker-reactions"
import { StaggerContainer, StaggerItem } from "@/components/animations/page-transition"
import { BADGE_CONFIG, type BadgeType } from "@/types/database.types"

// Demo data
const childData = {
  displayName: "Emma D.",
  level: "FS1",
  streakDays: 5,
  totalPoints: 120,
  weeklyProgress: 65,
}

const weeklyTasks = [
  { id: "1", title: "Morning Prayer", type: "checkbox", completed: true, points: 10 },
  { id: "2", title: "Read John Chapter 3", type: "checkbox", completed: true, points: 15 },
  { id: "3", title: "Memory Verse: John 3:16", type: "teacher_approved", completed: false, points: 20 },
  { id: "4", title: "Prayer Reflection", type: "short_answer", completed: false, points: 15 },
  { id: "5", title: "Worship Practice", type: "checkbox", completed: false, points: 10 },
]

const todayCheckins = {
  prayer: false,
  attendance: true,
}

const recentBadges: { type: BadgeType; date: string }[] = [
  { type: "prayer_warrior", date: "2 days ago" },
  { type: "faithful_student", date: "1 week ago" },
]

const journeyNodes = [
  { id: 1, title: "Day 1", status: "completed" },
  { id: 2, title: "Day 2", status: "completed" },
  { id: 3, title: "Day 3", status: "completed" },
  { id: 4, title: "Day 4", status: "completed" },
  { id: 5, title: "Day 5", status: "current" },
  { id: 6, title: "Day 6", status: "locked" },
  { id: 7, title: "Day 7", status: "locked" },
]

export default function ChildDashboard() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)
  const [tasks, setTasks] = useState(weeklyTasks)
  const [checkins, setCheckins] = useState(todayCheckins)

  const completedTasks = tasks.filter((t) => t.completed).length
  const totalTasks = tasks.length

  const handleTaskComplete = (taskId: string) => {
    setTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    )
    setShowSparkles(true)
    setTimeout(() => setShowSparkles(false), 100)
  }

  const handlePrayerCheckin = () => {
    if (!checkins.prayer) {
      setCheckins({ ...checkins, prayer: true })
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 100)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-warm">
      <BubblesBackground count={8} />
      <CelebrationConfetti active={showConfetti} />
      <SparklesBurst active={showSparkles} />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-amber-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <BubbleBurst>
                <Avatar size="lg">
                  <AvatarFallback className="text-lg">ED</AvatarFallback>
                </Avatar>
              </BubbleBurst>
              <div>
                <h1 className="font-bold text-lg text-slate-800">Hi, {childData.displayName}!</h1>
                <div className="flex items-center gap-2">
                  <Badge variant="gold" className="text-xs">
                    <Flame className="w-3 h-3 mr-1" />
                    {childData.streakDays} Day Streak!
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CalmModeToggle />
              <Button variant="ghost" size="icon" asChild>
                <Link href="/login">
                  <LogOut className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-24">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card variant="gradient" className="overflow-hidden">
            <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 h-2" />
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm">This Week&apos;s Progress</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="font-bold text-slate-800">{completedTasks}/{totalTasks}</span>
                      <span className="text-sm text-slate-500">Tasks</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-amber-500" />
                      <span className="font-bold text-slate-800">{childData.totalPoints}</span>
                      <span className="text-sm text-slate-500">Points</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="level">{childData.level}</Badge>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Weekly Progress</span>
                  <span className="font-medium text-amber-600">{childData.weeklyProgress}%</span>
                </div>
                <Progress value={childData.weeklyProgress} variant="magic" className="h-3" />
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
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
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
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold progress-node ${node.status}`}
                      >
                        {node.status === "completed" ? (
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        ) : node.status === "current" ? (
                          <Star className="w-5 h-5 text-white" />
                        ) : (
                          node.id
                        )}
                      </div>
                      <span className="text-xs text-slate-500 mt-1">{node.title}</span>
                    </motion.div>
                    {index < journeyNodes.length - 1 && (
                      <div
                        className={`w-8 h-1 mx-1 rounded-full ${
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
          <h2 className="text-lg font-bold text-slate-800 mb-3">Daily Check-ins</h2>
          <div className="grid grid-cols-2 gap-4">
            <BubbleBurst>
              <Card
                variant={checkins.prayer ? "glow" : "default"}
                className={`cursor-pointer transition-all ${checkins.prayer ? "ring-2 ring-green-400" : ""}`}
                onClick={handlePrayerCheckin}
              >
                <CardContent className="pt-4 text-center">
                  <div className={`w-14 h-14 rounded-full mx-auto mb-2 flex items-center justify-center ${
                    checkins.prayer
                      ? "bg-green-100 text-green-600"
                      : "bg-amber-100 text-amber-600"
                  }`}>
                    <Heart className={`w-7 h-7 ${checkins.prayer ? "fill-current" : ""}`} />
                  </div>
                  <h3 className="font-semibold text-slate-800">Prayer</h3>
                  <p className="text-xs text-slate-500">
                    {checkins.prayer ? "Done for today!" : "Tap when done"}
                  </p>
                </CardContent>
              </Card>
            </BubbleBurst>

            <Card
              variant={checkins.attendance ? "glow" : "default"}
              className={checkins.attendance ? "ring-2 ring-green-400" : ""}
            >
              <CardContent className="pt-4 text-center">
                <div className={`w-14 h-14 rounded-full mx-auto mb-2 flex items-center justify-center ${
                  checkins.attendance
                    ? "bg-green-100 text-green-600"
                    : "bg-blue-100 text-blue-600"
                }`}>
                  <Calendar className={`w-7 h-7 ${checkins.attendance ? "" : ""}`} />
                </div>
                <h3 className="font-semibold text-slate-800">Attendance</h3>
                <p className="text-xs text-slate-500">
                  {checkins.attendance ? "You're here!" : "Check in"}
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
            <Link href="/child/tasks" className="text-sm text-amber-600 hover:text-amber-700 flex items-center">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <StaggerContainer className="space-y-3">
            {tasks.slice(0, 4).map((task) => (
              <StaggerItem key={task.id}>
                <BubbleBurst burstCount={4}>
                  <Card
                    variant={task.completed ? "glow" : "default"}
                    className={`cursor-pointer transition-all ${
                      task.completed ? "bg-green-50 border-green-200" : ""
                    }`}
                    onClick={() => task.type === "checkbox" && handleTaskComplete(task.id)}
                  >
                    <CardContent className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              task.completed
                                ? "bg-green-500 text-white"
                                : "bg-slate-100 text-slate-400"
                            }`}
                          >
                            {task.completed ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : task.type === "teacher_approved" ? (
                              <Star className="w-4 h-4" />
                            ) : (
                              <BookOpen className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <h4 className={`font-medium ${task.completed ? "text-green-700 line-through" : "text-slate-800"}`}>
                              {task.title}
                            </h4>
                            <div className="flex items-center gap-2">
                              <Badge variant={task.completed ? "success" : "outline"} className="text-xs">
                                +{task.points} pts
                              </Badge>
                              {task.type === "teacher_approved" && (
                                <Badge variant="secondary" className="text-xs">
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
                </BubbleBurst>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </motion.div>

        {/* Recent Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              Recent Awards
            </h2>
            <Link href="/child/awards" className="text-sm text-amber-600 hover:text-amber-700 flex items-center">
              Trophy Room <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {recentBadges.map((badge, index) => {
              const config = BADGE_CONFIG[badge.type]
              return (
                <motion.div
                  key={index}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                >
                  <Card variant="gradient" className="min-w-[140px] text-center card-hover">
                    <CardContent className="pt-4">
                      <div className="text-4xl mb-2 star-burst">{config.emoji}</div>
                      <h4 className="font-semibold text-slate-800 text-sm">{config.label}</h4>
                      <p className="text-xs text-slate-500">{badge.date}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
            <Link href="/child/awards">
              <Card className="min-w-[140px] h-full flex items-center justify-center border-dashed card-hover">
                <CardContent className="pt-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-2">
                    <Trophy className="w-6 h-6 text-slate-400" />
                  </div>
                  <p className="text-sm text-slate-500">View All</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </motion.div>

        {/* Reactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <ReactionBar onReaction={(type) => console.log("Reaction:", type)} />
        </motion.div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around h-16">
            <Link href="/child" className="flex flex-col items-center text-amber-600">
              <Sparkles className="w-6 h-6" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link href="/child/tasks" className="flex flex-col items-center text-slate-400 hover:text-amber-600">
              <BookOpen className="w-6 h-6" />
              <span className="text-xs mt-1">Tasks</span>
            </Link>
            <Link href="/child/awards" className="flex flex-col items-center text-slate-400 hover:text-amber-600">
              <Trophy className="w-6 h-6" />
              <span className="text-xs mt-1">Awards</span>
            </Link>
            <Link href="/child/settings" className="flex flex-col items-center text-slate-400 hover:text-amber-600">
              <Settings className="w-6 h-6" />
              <span className="text-xs mt-1">Settings</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
