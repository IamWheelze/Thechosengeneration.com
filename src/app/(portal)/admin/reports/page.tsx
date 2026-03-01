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
  Download,
  TrendingUp,
  TrendingDown,
  PieChart,
  Activity,
  Target,
  Award,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const attendanceData = {
  overall: 87,
  byClass: [
    { name: "FS1-A", rate: 92 },
    { name: "FS1-B", rate: 88 },
    { name: "FS2-A", rate: 85 },
    { name: "Leadership", rate: 95 },
  ],
  trend: "+3%",
}

const completionData = {
  overall: 72,
  byClass: [
    { name: "FS1-A", rate: 78 },
    { name: "FS1-B", rate: 70 },
    { name: "FS2-A", rate: 68 },
    { name: "Leadership", rate: 85 },
  ],
  trend: "+5%",
}

const topPerformers = [
  { name: "Sarah J.", class: "FS1-A", points: 450, badges: 8 },
  { name: "David O.", class: "FS2-A", points: 420, badges: 7 },
  { name: "Emma T.", class: "FS1-B", points: 395, badges: 6 },
  { name: "John S.", class: "Leadership", points: 380, badges: 9 },
  { name: "Faith A.", class: "FS2-A", points: 365, badges: 5 },
]

const monthlyStats = [
  { month: "Jan", attendance: 85, completion: 68 },
  { month: "Feb", attendance: 87, completion: 72 },
]

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Children", href: "/admin/children" },
  { icon: GraduationCap, label: "Teachers", href: "/admin/teachers" },
  { icon: School, label: "Classes", href: "/admin/classes" },
  { icon: BookOpen, label: "Curriculum", href: "/admin/curriculum" },
  { icon: Calendar, label: "Schedule", href: "/admin/schedule" },
  { icon: BarChart3, label: "Reports", href: "/admin/reports", active: true },
  { icon: FileText, label: "Documents", href: "/admin/documents" },
  { icon: Shield, label: "Safeguarding", href: "/admin/safeguarding" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
]

export default function AdminReportsPage() {
  const [dateRange, setDateRange] = useState("this-month")

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
            <h1 className="text-2xl font-bold text-slate-800">Reports</h1>
            <p className="text-slate-500">Analytics and performance insights</p>
          </div>
          <div className="flex gap-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="this-quarter">This Quarter</SelectItem>
                <SelectItem value="this-year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-500">Attendance Rate</p>
                <Badge variant="success" className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {attendanceData.trend}
                </Badge>
              </div>
              <p className="text-3xl font-bold text-slate-800">{attendanceData.overall}%</p>
              <Progress value={attendanceData.overall} className="h-2 mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-500">Task Completion</p>
                <Badge variant="success" className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {completionData.trend}
                </Badge>
              </div>
              <p className="text-3xl font-bold text-slate-800">{completionData.overall}%</p>
              <Progress value={completionData.overall} className="h-2 mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-500">Active Students</p>
                <Activity className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-slate-800">142</p>
              <p className="text-xs text-slate-400 mt-2">of 156 enrolled</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-500">Badges Awarded</p>
                <Award className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-3xl font-bold text-slate-800">89</p>
              <p className="text-xs text-slate-400 mt-2">this month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Attendance by Class */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                Attendance by Class
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendanceData.byClass.map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">{item.name}</span>
                      <span className="font-medium">{item.rate}%</span>
                    </div>
                    <Progress
                      value={item.rate}
                      className={`h-2 ${
                        item.rate >= 90 ? "[&>div]:bg-green-500" :
                        item.rate >= 80 ? "[&>div]:bg-amber-500" : "[&>div]:bg-red-500"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Completion by Class */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-purple-500" />
                Task Completion by Class
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completionData.byClass.map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">{item.name}</span>
                      <span className="font-medium">{item.rate}%</span>
                    </div>
                    <Progress
                      value={item.rate}
                      className={`h-2 ${
                        item.rate >= 80 ? "[&>div]:bg-green-500" :
                        item.rate >= 60 ? "[&>div]:bg-amber-500" : "[&>div]:bg-red-500"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                Top Performers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topPerformers.map((student, i) => (
                  <div key={student.name} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      i === 0 ? "bg-amber-100 text-amber-700" :
                      i === 1 ? "bg-slate-200 text-slate-700" :
                      i === 2 ? "bg-orange-100 text-orange-700" : "bg-slate-100 text-slate-500"
                    }`}>
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-800">{student.name}</p>
                      <p className="text-xs text-slate-500">{student.class}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-amber-600">{student.points}</p>
                      <p className="text-xs text-slate-400">{student.badges} badges</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Reports</CardTitle>
            <CardDescription>Download pre-configured reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "Attendance Report", icon: Users, description: "Weekly attendance summary" },
                { name: "Progress Report", icon: TrendingUp, description: "Student progress overview" },
                { name: "Badge Summary", icon: Award, description: "Awards and achievements" },
                { name: "Teacher Report", icon: GraduationCap, description: "Teacher activity log" },
              ].map((report) => (
                <Card key={report.name} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                      <report.icon className="w-6 h-6 text-slate-600" />
                    </div>
                    <h4 className="font-medium text-slate-800">{report.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">{report.description}</p>
                    <Button variant="outline" size="sm" className="mt-3">
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
