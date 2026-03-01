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
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const schedule = [
  {
    day: "Sunday",
    sessions: [
      { time: "9:00 AM - 10:30 AM", class: "FS1 - Group A", teacher: "Sarah Teacher", location: "Main Hall A", students: 15 },
      { time: "9:00 AM - 10:30 AM", class: "FS2 - Group A", teacher: "Brother Daniel", location: "Upper Room", students: 12 },
      { time: "11:00 AM - 12:30 PM", class: "FS1 - Group B", teacher: "Grace Assistant", location: "Main Hall B", students: 18 },
      { time: "2:00 PM - 4:00 PM", class: "Leadership", teacher: "Pastor James", location: "Conference Room", students: 8 },
    ],
  },
  {
    day: "Wednesday",
    sessions: [
      { time: "4:00 PM - 5:30 PM", class: "Prayer Meeting", teacher: "All Teachers", location: "Main Hall", students: 50 },
    ],
  },
  {
    day: "Saturday",
    sessions: [
      { time: "10:00 AM - 12:00 PM", class: "Music Practice", teacher: "Sister Grace", location: "Music Room", students: 20 },
      { time: "2:00 PM - 4:00 PM", class: "Teacher Training", teacher: "Pastor James", location: "Conference Room", students: 12 },
    ],
  },
]

const upcomingEvents = [
  { date: "Mar 8, 2026", event: "Parent-Teacher Meeting", time: "3:00 PM", location: "Main Hall" },
  { date: "Mar 15, 2026", event: "FS1 Graduation Ceremony", time: "10:00 AM", location: "Church Auditorium" },
  { date: "Mar 22, 2026", event: "Easter Camp", time: "All Day", location: "Camp Ground" },
  { date: "Apr 5, 2026", event: "New Term Begins", time: "9:00 AM", location: "All Locations" },
]

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Children", href: "/admin/children" },
  { icon: GraduationCap, label: "Teachers", href: "/admin/teachers" },
  { icon: School, label: "Classes", href: "/admin/classes" },
  { icon: BookOpen, label: "Curriculum", href: "/admin/curriculum" },
  { icon: Calendar, label: "Schedule", href: "/admin/schedule", active: true },
  { icon: BarChart3, label: "Reports", href: "/admin/reports" },
  { icon: FileText, label: "Documents", href: "/admin/documents" },
  { icon: Shield, label: "Safeguarding", href: "/admin/safeguarding" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
]

export default function AdminSchedulePage() {
  const [currentWeek, setCurrentWeek] = useState("Mar 1 - Mar 7, 2026")

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
            <h1 className="text-2xl font-bold text-slate-800">Schedule</h1>
            <p className="text-slate-500">Manage class schedules and events</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </Button>
        </div>

        {/* Week Navigation */}
        <Card className="mb-6">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <Button variant="outline" size="icon">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="text-center">
                <p className="text-sm text-slate-500">Current Week</p>
                <p className="font-bold text-slate-800">{currentWeek}</p>
              </div>
              <Button variant="outline" size="icon">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Schedule */}
          <div className="lg:col-span-2 space-y-4">
            {schedule.map((day) => (
              <Card key={day.day}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-amber-500" />
                    {day.day}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {day.sessions.map((session, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        <div className="text-center min-w-[100px]">
                          <Badge variant="outline" className="font-mono">
                            {session.time.split(" - ")[0]}
                          </Badge>
                          <p className="text-xs text-slate-400 mt-1">
                            to {session.time.split(" - ")[1]}
                          </p>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-800">{session.class}</h4>
                          <div className="flex flex-wrap gap-3 mt-1 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {session.teacher}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {session.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {session.students} students
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Upcoming Events Sidebar */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event, i) => (
                    <div key={i} className="border-l-2 border-purple-500 pl-4 py-1">
                      <p className="text-xs text-purple-600 font-medium">{event.date}</p>
                      <h4 className="font-medium text-slate-800">{event.event}</h4>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Events
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">6</p>
                    <p className="text-xs text-slate-500">Sessions</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">95</p>
                    <p className="text-xs text-slate-500">Students</p>
                  </div>
                  <div className="text-center p-3 bg-amber-50 rounded-lg">
                    <p className="text-2xl font-bold text-amber-600">12</p>
                    <p className="text-xs text-slate-500">Teachers</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">4</p>
                    <p className="text-xs text-slate-500">Locations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
