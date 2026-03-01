"use client"

import { useState } from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  Settings,
  LogOut,
  School,
  Shield,
  FileText,
  BarChart3,
  Plus,
  Eye,
  Edit,
  Clock,
  MapPin,
  UserPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

const classes = [
  {
    id: "1",
    name: "Foundation School 1 - Group A",
    code: "FS1-A",
    level: "FS1",
    teacher: "Sarah Teacher",
    assistant: "Grace Assistant",
    students: 15,
    capacity: 20,
    schedule: "Sunday 9:00 AM",
    location: "Main Hall - Section A",
    status: "active",
  },
  {
    id: "2",
    name: "Foundation School 1 - Group B",
    code: "FS1-B",
    level: "FS1",
    teacher: "Grace Assistant",
    students: 18,
    capacity: 20,
    schedule: "Sunday 11:00 AM",
    location: "Main Hall - Section B",
    status: "active",
  },
  {
    id: "3",
    name: "Foundation School 2 - Group A",
    code: "FS2-A",
    level: "FS2",
    teacher: "Brother Daniel",
    assistant: "Sister Mary",
    students: 12,
    capacity: 15,
    schedule: "Sunday 9:00 AM",
    location: "Upper Room",
    status: "active",
  },
  {
    id: "4",
    name: "Leadership Class",
    code: "LEAD",
    level: "LEADERSHIP",
    teacher: "Pastor James",
    students: 8,
    capacity: 10,
    schedule: "Sunday 2:00 PM",
    location: "Conference Room",
    status: "active",
  },
]

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Children", href: "/admin/children" },
  { icon: GraduationCap, label: "Teachers", href: "/admin/teachers" },
  { icon: School, label: "Classes", href: "/admin/classes", active: true },
  { icon: BookOpen, label: "Curriculum", href: "/admin/curriculum" },
  { icon: Calendar, label: "Schedule", href: "/admin/schedule" },
  { icon: BarChart3, label: "Reports", href: "/admin/reports" },
  { icon: FileText, label: "Documents", href: "/admin/documents" },
  { icon: Shield, label: "Safeguarding", href: "/admin/safeguarding" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
]

export default function AdminClassesPage() {
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
          {navItems.map((item) => (
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
          <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-white" asChild>
            <Link href="/login">
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Link>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Classes</h1>
            <p className="text-slate-500">Manage class groups and assignments</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Class
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Classes</p>
                  <p className="text-2xl font-bold">{classes.length}</p>
                </div>
                <School className="w-10 h-10 text-blue-500 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Capacity</p>
                  <p className="text-2xl font-bold">{classes.reduce((sum, c) => sum + c.capacity, 0)}</p>
                </div>
                <Users className="w-10 h-10 text-green-500 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Enrolled</p>
                  <p className="text-2xl font-bold">{classes.reduce((sum, c) => sum + c.students, 0)}</p>
                </div>
                <UserPlus className="w-10 h-10 text-amber-500 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Available Spots</p>
                  <p className="text-2xl font-bold text-green-600">
                    {classes.reduce((sum, c) => sum + (c.capacity - c.students), 0)}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Plus className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {classes.map((cls) => {
            const fillPercent = Math.round((cls.students / cls.capacity) * 100)
            const levelColors = {
              FS1: "from-blue-500 to-cyan-500",
              FS2: "from-purple-500 to-pink-500",
              LEADERSHIP: "from-amber-500 to-orange-500",
            }

            return (
              <Card key={cls.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`h-2 bg-gradient-to-r ${levelColors[cls.level as keyof typeof levelColors]}`} />
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge className={`mb-2 bg-gradient-to-r ${levelColors[cls.level as keyof typeof levelColors]} text-white border-0`}>
                        {cls.level}
                      </Badge>
                      <CardTitle className="text-lg">{cls.name}</CardTitle>
                      <p className="text-sm text-slate-500">Code: {cls.code}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Teacher Info */}
                  <div className="flex items-center gap-3 mb-4 p-3 bg-slate-50 rounded-lg">
                    <Avatar>
                      <AvatarFallback className="bg-amber-100 text-amber-700">
                        {cls.teacher.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-slate-800">{cls.teacher}</p>
                      <p className="text-xs text-slate-500">
                        Lead Teacher {cls.assistant && `• Asst: ${cls.assistant}`}
                      </p>
                    </div>
                  </div>

                  {/* Capacity */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-500">Enrollment</span>
                      <span className="text-sm font-medium">
                        {cls.students} / {cls.capacity} students
                      </span>
                    </div>
                    <Progress
                      value={fillPercent}
                      className={`h-2 ${fillPercent > 90 ? "[&>div]:bg-red-500" : fillPercent > 70 ? "[&>div]:bg-amber-500" : "[&>div]:bg-green-500"}`}
                    />
                    <p className="text-xs text-slate-400 mt-1">
                      {cls.capacity - cls.students} spots available
                    </p>
                  </div>

                  {/* Schedule & Location */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock className="w-4 h-4 text-slate-400" />
                      {cls.schedule}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {cls.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}
