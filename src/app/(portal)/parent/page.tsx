"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Users,
  BookOpen,
  Trophy,
  Calendar,
  Clock,
  ChevronRight,
  Bell,
  Settings,
  LogOut,
  Star,
  CheckCircle2,
  Heart,
  TrendingUp,
  MessageCircle,
  Plus,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StaggerContainer, StaggerItem } from "@/components/animations/page-transition"
import { BADGE_CONFIG, type BadgeType } from "@/types/database.types"

// Demo data
const parentData = {
  name: "John Doe",
  email: "parent@example.com",
}

const children = [
  {
    id: "1",
    name: "Emma",
    displayName: "Emma D.",
    avatar: "ED",
    level: "FS1",
    class: "Foundation School 1 - Group A",
    teacher: "Sarah Teacher",
    weeklyProgress: 75,
    attendance: 100,
    prayerStreak: 5,
    totalPoints: 120,
    recentBadges: ["prayer_warrior", "faithful_student"] as BadgeType[],
  },
  {
    id: "2",
    name: "Daniel",
    displayName: "Daniel D.",
    avatar: "DD",
    level: "FS2",
    class: "Foundation School 2 - Group B",
    teacher: "Brother Daniel",
    weeklyProgress: 60,
    attendance: 85,
    prayerStreak: 3,
    totalPoints: 95,
    recentBadges: ["perfect_attendance"] as BadgeType[],
  },
]

const upcomingSessions = [
  { child: "Emma", date: "Feb 8, 2026", time: "9:00 AM", type: "Regular Session" },
  { child: "Daniel", date: "Feb 8, 2026", time: "9:00 AM", type: "Regular Session" },
  { child: "Both", date: "Feb 15, 2026", time: "10:00 AM", type: "Monthly Meeting" },
]

const recentActivity = [
  { child: "Emma", action: "Completed task: Morning Prayer", time: "2 hours ago", icon: CheckCircle2 },
  { child: "Daniel", action: "Earned badge: Perfect Attendance", time: "Yesterday", icon: Trophy },
  { child: "Emma", action: "Prayer check-in completed", time: "Yesterday", icon: Heart },
  { child: "Emma", action: "Completed task: Read John Chapter 3", time: "2 days ago", icon: BookOpen },
]

export default function ParentDashboard() {
  const [selectedChild, setSelectedChild] = useState(children[0])

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-slate-800 hidden sm:inline">Parent Portal</span>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  2
                </span>
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="font-medium text-slate-700 hidden sm:inline">{parentData.name}</span>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/login">
                  <LogOut className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-slate-800 mb-1">
            Welcome, {parentData.name.split(" ")[0]}!
          </h1>
          <p className="text-slate-500">
            Track your children&apos;s spiritual growth and progress.
          </p>
        </motion.div>

        {/* Children Overview Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {children.map((child, index) => (
            <motion.div
              key={child.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`cursor-pointer transition-all ${
                  selectedChild.id === child.id
                    ? "ring-2 ring-amber-400 shadow-lg"
                    : "hover:shadow-md"
                }`}
                onClick={() => setSelectedChild(child)}
              >
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar size="lg">
                        <AvatarFallback className="text-lg">{child.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold text-slate-800">{child.displayName}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="level">{child.level}</Badge>
                          <span className="text-sm text-slate-500">{child.class}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Eye className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-amber-600">{child.weeklyProgress}%</div>
                      <div className="text-xs text-slate-500">Weekly Progress</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{child.attendance}%</div>
                      <div className="text-xs text-slate-500">Attendance</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{child.prayerStreak}</div>
                      <div className="text-xs text-slate-500">Prayer Streak</div>
                    </div>
                  </div>

                  <Progress value={child.weeklyProgress} variant="success" className="h-2 mb-3" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500" />
                      <span className="text-sm font-medium text-slate-600">{child.totalPoints} points</span>
                    </div>
                    <div className="flex -space-x-1">
                      {child.recentBadges.slice(0, 3).map((badge, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-sm border-2 border-white"
                        >
                          {BADGE_CONFIG[badge].emoji}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Child Details */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar size="lg">
                      <AvatarFallback className="text-lg">{selectedChild.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{selectedChild.name}&apos;s Progress</CardTitle>
                      <CardDescription>
                        {selectedChild.class} • Teacher: {selectedChild.teacher}
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Full Profile
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="tasks">Tasks</TabsTrigger>
                    <TabsTrigger value="awards">Awards</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-600">Weekly Progress</span>
                            <span className="text-lg font-bold text-amber-600">{selectedChild.weeklyProgress}%</span>
                          </div>
                          <Progress value={selectedChild.weeklyProgress} variant="default" className="h-3" />
                          <p className="text-xs text-slate-500 mt-2">
                            {selectedChild.name} has completed 3 of 5 tasks this week
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-600">Attendance Rate</span>
                            <span className="text-lg font-bold text-green-600">{selectedChild.attendance}%</span>
                          </div>
                          <Progress value={selectedChild.attendance} variant="success" className="h-3" />
                          <p className="text-xs text-slate-500 mt-2">
                            Attended all sessions this month
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
                          <div className="flex items-center gap-2 mb-2">
                            <Heart className="w-5 h-5 text-purple-500" />
                            <span className="font-medium text-slate-700">Prayer Journey</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-3xl font-bold text-purple-600">{selectedChild.prayerStreak}</span>
                            <span className="text-slate-500">day streak</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            Keep it up! 2 more days to earn Prayer Warrior badge
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-5 h-5 text-blue-500" />
                            <span className="font-medium text-slate-700">Growth Trend</span>
                          </div>
                          <p className="text-sm text-slate-600">
                            {selectedChild.name} is showing excellent progress in Scripture memorization!
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="tasks">
                    <div className="space-y-3">
                      {[
                        { title: "Morning Prayer", status: "completed" },
                        { title: "Read John Chapter 3", status: "completed" },
                        { title: "Memory Verse: John 3:16", status: "pending" },
                        { title: "Prayer Reflection", status: "pending" },
                        { title: "Worship Practice", status: "pending" },
                      ].map((task, index) => (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-3 rounded-xl ${
                            task.status === "completed"
                              ? "bg-green-50 border border-green-100"
                              : "bg-slate-50 border border-slate-100"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                task.status === "completed"
                                  ? "bg-green-500 text-white"
                                  : "bg-slate-200 text-slate-400"
                              }`}
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <span
                              className={
                                task.status === "completed"
                                  ? "text-green-700 line-through"
                                  : "text-slate-700"
                              }
                            >
                              {task.title}
                            </span>
                          </div>
                          <Badge variant={task.status === "completed" ? "success" : "outline"}>
                            {task.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="awards">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {selectedChild.recentBadges.map((badge, index) => {
                        const config = BADGE_CONFIG[badge]
                        return (
                          <Card key={index} variant="glow" className="text-center">
                            <CardContent className="pt-4">
                              <div className="text-4xl mb-2">{config.emoji}</div>
                              <h4 className="font-semibold text-slate-800 text-sm">{config.label}</h4>
                              <p className="text-xs text-slate-500">{config.description}</p>
                            </CardContent>
                          </Card>
                        )
                      })}
                      {selectedChild.recentBadges.length === 0 && (
                        <div className="col-span-full text-center py-8 text-slate-500">
                          No badges earned yet. Keep encouraging {selectedChild.name}!
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-500" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <activity.icon className="w-5 h-5 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-700">
                          <span className="font-medium">{activity.child}</span> {activity.action.toLowerCase()}
                        </p>
                        <p className="text-xs text-slate-400">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message Teacher
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Register Another Child
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Schedule
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Update Profile
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-500" />
                  Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingSessions.map((session, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
                      <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-sm font-bold text-amber-600">
                        {session.date.split(" ")[1].replace(",", "")}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{session.type}</p>
                        <p className="text-sm text-slate-500">{session.child}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {session.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Prayer Reminder */}
            <Card variant="gradient" className="overflow-hidden">
              <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-2" />
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">Family Prayer Time</h3>
                <p className="text-sm text-slate-500 mb-4">
                  Pray together with your children and help them grow in faith.
                </p>
                <Button variant="secondary" className="w-full">
                  Prayer Guide
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
