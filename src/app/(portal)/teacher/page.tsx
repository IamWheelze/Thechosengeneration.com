"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Users,
  BookOpen,
  ClipboardCheck,
  Award,
  Calendar,
  Clock,
  ChevronRight,
  Plus,
  Bell,
  Settings,
  LogOut,
  Search,
  Filter,
  MoreVertical,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StaggerContainer, StaggerItem } from "@/components/animations/page-transition"

// Demo data
const teacherData = {
  name: "Sarah Teacher",
  classes: 2,
  totalStudents: 28,
}

const classData = {
  id: "1",
  name: "Foundation School 1 - Group A",
  level: "FS1",
  schedule: "Sat & Sun, 9:00 AM - 12:00 PM",
  studentCount: 15,
  attendance: 87,
}

const students = [
  { id: "1", name: "Emma D.", avatar: "ED", level: "FS1", progress: 75, attendance: 100, status: "active" },
  { id: "2", name: "James K.", avatar: "JK", level: "FS1", progress: 60, attendance: 85, status: "active" },
  { id: "3", name: "Sophia M.", avatar: "SM", level: "FS1", progress: 90, attendance: 100, status: "active" },
  { id: "4", name: "Daniel O.", avatar: "DO", level: "FS1", progress: 45, attendance: 70, status: "at-risk" },
  { id: "5", name: "Grace A.", avatar: "GA", level: "FS1", progress: 80, attendance: 95, status: "active" },
  { id: "6", name: "Michael N.", avatar: "MN", level: "FS1", progress: 55, attendance: 80, status: "active" },
]

const pendingSubmissions = [
  { id: "1", child: "Emma D.", task: "Memory Verse: John 3:16", submittedAt: "2 hours ago", type: "teacher_approved" },
  { id: "2", child: "James K.", task: "Prayer Reflection", submittedAt: "5 hours ago", type: "short_answer" },
  { id: "3", child: "Sophia M.", task: "Memory Verse: John 3:16", submittedAt: "1 day ago", type: "teacher_approved" },
]

const weeklyTasks = [
  { id: "1", title: "Morning Prayer", type: "checkbox", completions: 12, total: 15 },
  { id: "2", title: "Read John Chapter 3", type: "checkbox", completions: 10, total: 15 },
  { id: "3", title: "Memory Verse: John 3:16", type: "teacher_approved", completions: 5, total: 15 },
  { id: "4", title: "Prayer Reflection", type: "short_answer", completions: 8, total: 15 },
  { id: "5", title: "Worship Practice", type: "checkbox", completions: 6, total: 15 },
]

const upcomingEvents = [
  { title: "Saturday Session", date: "Feb 8, 2026", time: "9:00 AM" },
  { title: "Sunday Session", date: "Feb 9, 2026", time: "9:00 AM" },
  { title: "Monthly General Meeting", date: "Feb 15, 2026", time: "10:00 AM" },
]

export default function TeacherDashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-slate-800 hidden sm:inline">Teacher Portal</span>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
                <Avatar>
                  <AvatarFallback>ST</AvatarFallback>
                </Avatar>
                <span className="font-medium text-slate-700 hidden sm:inline">{teacherData.name}</span>
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
            Welcome back, {teacherData.name.split(" ")[0]}!
          </h1>
          <p className="text-slate-500">
            Here&apos;s what&apos;s happening with your classes today.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Students", value: teacherData.totalStudents, icon: Users, color: "text-blue-600 bg-blue-100" },
            { label: "Classes", value: teacherData.classes, icon: BookOpen, color: "text-purple-600 bg-purple-100" },
            { label: "Pending Reviews", value: pendingSubmissions.length, icon: ClipboardCheck, color: "text-amber-600 bg-amber-100" },
            { label: "Avg Attendance", value: `${classData.attendance}%`, icon: Calendar, color: "text-green-600 bg-green-100" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">{stat.label}</p>
                      <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
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
            {/* Class Overview */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{classData.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Badge variant="level">{classData.level}</Badge>
                      <span>{classData.schedule}</span>
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Task
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="students" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="students">Students ({classData.studentCount})</TabsTrigger>
                    <TabsTrigger value="tasks">Tasks</TabsTrigger>
                  </TabsList>

                  <TabsContent value="students">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          placeholder="Search students..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                      <Button variant="outline" size="icon">
                        <Filter className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {filteredStudents.map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{student.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-slate-800">{student.name}</span>
                                {student.status === "at-risk" && (
                                  <Badge variant="warning" className="text-xs">At Risk</Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-3 text-sm text-slate-500">
                                <span>Progress: {student.progress}%</span>
                                <span>Attendance: {student.attendance}%</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={student.progress} className="w-20 h-2" />
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="tasks">
                    <div className="space-y-3">
                      {weeklyTasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                              <BookOpen className="w-5 h-5 text-amber-600" />
                            </div>
                            <div>
                              <span className="font-medium text-slate-800">{task.title}</span>
                              <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Badge variant="outline" className="text-xs">{task.type.replace("_", " ")}</Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-medium text-slate-800">
                              {task.completions}/{task.total}
                            </span>
                            <Progress value={(task.completions / task.total) * 100} className="w-20 h-2 mt-1" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Pending Submissions */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardCheck className="w-5 h-5 text-amber-500" />
                    Pending Reviews
                  </CardTitle>
                  <Badge variant="warning">{pendingSubmissions.length} pending</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingSubmissions.map((submission) => (
                    <div
                      key={submission.id}
                      className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                          <AlertCircle className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{submission.child}</p>
                          <p className="text-sm text-slate-500">{submission.task}</p>
                          <p className="text-xs text-slate-400">{submission.submittedAt}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50">
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
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
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Task
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Award className="w-4 h-4 mr-2" />
                  Award Badge
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Mark Attendance
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <ClipboardCheck className="w-4 h-4 mr-2" />
                  Submit Weekly Report
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-500" />
                  Upcoming
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600">
                        {event.date.split(" ")[1].replace(",", "")}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{event.title}</p>
                        <p className="text-sm text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {event.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Award Badge */}
            <Card variant="gradient">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">Recognize Excellence</h3>
                <p className="text-sm text-slate-500 mb-4">
                  Award badges to students who show outstanding effort.
                </p>
                <Button className="w-full">
                  Award a Badge
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
