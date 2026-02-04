"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  Settings,
  LogOut,
  Bell,
  TrendingUp,
  TrendingDown,
  UserPlus,
  School,
  Shield,
  FileText,
  BarChart3,
  Search,
  Filter,
  MoreVertical,
  Plus,
  Download,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Demo data
const adminData = {
  name: "Admin User",
}

const stats = {
  totalChildren: 156,
  totalTeachers: 12,
  totalClasses: 8,
  activeEnrollment: 142,
  attendanceRate: 87,
  completionRate: 72,
  pendingRegistrations: 5,
  incidentsThisMonth: 2,
}

const recentRegistrations = [
  { id: "1", parent: "Mary Johnson", child: "Sarah J.", date: "Feb 4, 2026", status: "pending" },
  { id: "2", parent: "Peter Smith", child: "John S.", date: "Feb 3, 2026", status: "pending" },
  { id: "3", parent: "Grace Okonkwo", child: "David O.", date: "Feb 3, 2026", status: "approved" },
  { id: "4", parent: "James Adeyemi", child: "Faith A.", date: "Feb 2, 2026", status: "approved" },
  { id: "5", parent: "Ruth Mensah", child: "Samuel M.", date: "Feb 1, 2026", status: "pending" },
]

const classes = [
  { id: "1", name: "FS1 - Group A", level: "FS1", teacher: "Sarah Teacher", students: 15, capacity: 20 },
  { id: "2", name: "FS1 - Group B", level: "FS1", teacher: "Grace Assistant", students: 18, capacity: 20 },
  { id: "3", name: "FS2 - Group A", level: "FS2", teacher: "Brother Daniel", students: 12, capacity: 15 },
  { id: "4", name: "Leadership", level: "LEADERSHIP", teacher: "Pastor James", students: 8, capacity: 10 },
]

const teachers = [
  { id: "1", name: "Sarah Teacher", role: "Lead Teacher", classes: 2, students: 33, status: "active" },
  { id: "2", name: "Grace Assistant", role: "Assistant", classes: 1, students: 18, status: "active" },
  { id: "3", name: "Brother Daniel", role: "Lead Teacher", classes: 1, students: 12, status: "active" },
  { id: "4", name: "Pastor James", role: "Coordinator", classes: 1, students: 8, status: "active" },
]

const recentActivity = [
  { action: "New registration submitted", user: "Mary Johnson", time: "10 min ago" },
  { action: "Task created for FS1-A", user: "Sarah Teacher", time: "1 hour ago" },
  { action: "Badge awarded to Emma D.", user: "Sarah Teacher", time: "2 hours ago" },
  { action: "Attendance marked for FS2-A", user: "Brother Daniel", time: "3 hours ago" },
  { action: "Weekly report submitted", user: "Grace Assistant", time: "Yesterday" },
]

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-slate-900 text-white hidden lg:block">
        <div className="p-4 border-b border-slate-800">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold">TCG Admin</h1>
              <p className="text-xs text-slate-400">Management Portal</p>
            </div>
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {[
            { icon: LayoutDashboard, label: "Dashboard", href: "/admin", active: true },
            { icon: Users, label: "Children", href: "/admin/children" },
            { icon: GraduationCap, label: "Teachers", href: "/admin/teachers" },
            { icon: School, label: "Classes", href: "/admin/classes" },
            { icon: BookOpen, label: "Curriculum", href: "/admin/curriculum" },
            { icon: Calendar, label: "Schedule", href: "/admin/schedule" },
            { icon: BarChart3, label: "Reports", href: "/admin/reports" },
            { icon: FileText, label: "Documents", href: "/admin/documents" },
            { icon: Shield, label: "Safeguarding", href: "/admin/safeguarding" },
            { icon: Settings, label: "Settings", href: "/admin/settings" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                item.active
                  ? "bg-amber-500 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-slate-700">AU</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">{adminData.name}</p>
              <p className="text-xs text-slate-400">Administrator</p>
            </div>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white" asChild>
              <Link href="/login">
                <LogOut className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
          <div className="px-4 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <div className="lg:hidden">
                  <Button variant="ghost" size="icon">
                    <LayoutDashboard className="w-5 h-5" />
                  </Button>
                </div>
                <h1 className="text-xl font-bold text-slate-800">Dashboard</h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-64"
                  />
                </div>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {stats.pendingRegistrations}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Total Children", value: stats.totalChildren, change: "+12", trend: "up", icon: Users, color: "blue" },
              { label: "Active Teachers", value: stats.totalTeachers, change: "+2", trend: "up", icon: GraduationCap, color: "purple" },
              { label: "Attendance Rate", value: `${stats.attendanceRate}%`, change: "+3%", trend: "up", icon: Calendar, color: "green" },
              { label: "Completion Rate", value: `${stats.completionRate}%`, change: "-2%", trend: "down", icon: CheckCircle2, color: "amber" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-slate-500">{stat.label}</p>
                        <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
                        <div className={`flex items-center gap-1 mt-1 text-sm ${
                          stat.trend === "up" ? "text-green-600" : "text-red-600"
                        }`}>
                          {stat.trend === "up" ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          <span>{stat.change}</span>
                        </div>
                      </div>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-100`}>
                        <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Alert Cards */}
          {(stats.pendingRegistrations > 0 || stats.incidentsThisMonth > 0) && (
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {stats.pendingRegistrations > 0 && (
                <Card className="border-amber-200 bg-amber-50">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800">{stats.pendingRegistrations} Pending Registrations</h3>
                        <p className="text-sm text-slate-600">Review and approve new applications</p>
                      </div>
                      <Button size="sm">Review</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              {stats.incidentsThisMonth > 0 && (
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800">{stats.incidentsThisMonth} Incidents This Month</h3>
                        <p className="text-sm text-slate-600">Review safeguarding reports</p>
                      </div>
                      <Button size="sm" variant="destructive">Review</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Registration Management */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <UserPlus className="w-5 h-5 text-amber-500" />
                      Recent Registrations
                    </CardTitle>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentRegistrations.map((reg) => (
                      <div
                        key={reg.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{reg.child.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-slate-800">{reg.child}</p>
                            <p className="text-sm text-slate-500">Parent: {reg.parent}</p>
                            <p className="text-xs text-slate-400">{reg.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={reg.status === "approved" ? "success" : "warning"}>
                            {reg.status}
                          </Badge>
                          {reg.status === "pending" && (
                            <Button variant="outline" size="sm">
                              Review
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Classes Overview */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <School className="w-5 h-5 text-amber-500" />
                      Classes Overview
                    </CardTitle>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Class
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {classes.map((cls) => (
                      <div
                        key={cls.id}
                        className="flex items-center justify-between p-4 rounded-xl border border-slate-200"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            cls.level === "FS1" ? "bg-green-100 text-green-600" :
                            cls.level === "FS2" ? "bg-blue-100 text-blue-600" :
                            "bg-purple-100 text-purple-600"
                          }`}>
                            <BookOpen className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{cls.name}</p>
                            <p className="text-sm text-slate-500">Teacher: {cls.teacher}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-medium text-slate-800">{cls.students}/{cls.capacity}</p>
                            <Progress value={(cls.students / cls.capacity) * 100} className="w-20 h-2" />
                          </div>
                          <Badge variant="level">{cls.level}</Badge>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Teachers */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-amber-500" />
                      Teachers
                    </CardTitle>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Teacher
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-sm text-slate-500 border-b border-slate-200">
                          <th className="pb-3 font-medium">Name</th>
                          <th className="pb-3 font-medium">Role</th>
                          <th className="pb-3 font-medium">Classes</th>
                          <th className="pb-3 font-medium">Students</th>
                          <th className="pb-3 font-medium">Status</th>
                          <th className="pb-3 font-medium"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {teachers.map((teacher) => (
                          <tr key={teacher.id} className="border-b border-slate-100">
                            <td className="py-3">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarFallback>{teacher.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium text-slate-800">{teacher.name}</span>
                              </div>
                            </td>
                            <td className="py-3 text-slate-600">{teacher.role}</td>
                            <td className="py-3 text-slate-600">{teacher.classes}</td>
                            <td className="py-3 text-slate-600">{teacher.students}</td>
                            <td className="py-3">
                              <Badge variant="success">{teacher.status}</Badge>
                            </td>
                            <td className="py-3">
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add New Child
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Add New Teacher
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <School className="w-4 h-4 mr-2" />
                    Create Class
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Reports
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-500" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-amber-400 mt-2" />
                        <div>
                          <p className="text-sm text-slate-700">{activity.action}</p>
                          <p className="text-xs text-slate-500">
                            by {activity.user} • {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* System Health */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { label: "Database", status: "Healthy", color: "green" },
                      { label: "Storage", status: "85% used", color: "amber" },
                      { label: "Auth Service", status: "Active", color: "green" },
                      { label: "Email Service", status: "Active", color: "green" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">{item.label}</span>
                        <Badge variant={item.color === "green" ? "success" : "warning"}>
                          {item.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
