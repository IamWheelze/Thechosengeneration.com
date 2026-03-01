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
  Search,
  Plus,
  Download,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  Award,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

const teachers = [
  { id: "1", name: "Sarah Teacher", email: "sarah@tcg.org", phone: "+234 800 123 4567", role: "Lead Teacher", classes: ["FS1-A", "FS1-B"], students: 33, status: "active", safeguardingExpiry: "Dec 2026" },
  { id: "2", name: "Grace Assistant", email: "grace@tcg.org", phone: "+234 800 234 5678", role: "Assistant", classes: ["FS1-B"], students: 18, status: "active", safeguardingExpiry: "Nov 2026" },
  { id: "3", name: "Brother Daniel", email: "daniel@tcg.org", phone: "+234 800 345 6789", role: "Lead Teacher", classes: ["FS2-A"], students: 12, status: "active", safeguardingExpiry: "Jan 2027" },
  { id: "4", name: "Pastor James", email: "james@tcg.org", phone: "+234 800 456 7890", role: "Coordinator", classes: ["Leadership"], students: 8, status: "active", safeguardingExpiry: "Feb 2027" },
  { id: "5", name: "Sister Mary", email: "mary@tcg.org", phone: "+234 800 567 8901", role: "Assistant", classes: ["FS2-A"], students: 12, status: "inactive", safeguardingExpiry: "Mar 2026" },
]

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Children", href: "/admin/children" },
  { icon: GraduationCap, label: "Teachers", href: "/admin/teachers", active: true },
  { icon: School, label: "Classes", href: "/admin/classes" },
  { icon: BookOpen, label: "Curriculum", href: "/admin/curriculum" },
  { icon: Calendar, label: "Schedule", href: "/admin/schedule" },
  { icon: BarChart3, label: "Reports", href: "/admin/reports" },
  { icon: FileText, label: "Documents", href: "/admin/documents" },
  { icon: Shield, label: "Safeguarding", href: "/admin/safeguarding" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
]

export default function AdminTeachersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
            <h1 className="text-2xl font-bold text-slate-800">Teachers</h1>
            <p className="text-slate-500">Manage teaching staff and assignments</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Teacher
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Teachers</p>
                  <p className="text-2xl font-bold">{teachers.length}</p>
                </div>
                <GraduationCap className="w-10 h-10 text-blue-500 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Active</p>
                  <p className="text-2xl font-bold text-green-600">{teachers.filter(t => t.status === "active").length}</p>
                </div>
                <CheckCircle className="w-10 h-10 text-green-500 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Classes</p>
                  <p className="text-2xl font-bold">{new Set(teachers.flatMap(t => t.classes)).size}</p>
                </div>
                <School className="w-10 h-10 text-amber-500 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Students</p>
                  <p className="text-2xl font-bold">{teachers.reduce((sum, t) => sum + t.students, 0)}</p>
                </div>
                <Users className="w-10 h-10 text-purple-500 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search teachers..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredTeachers.map((teacher) => (
            <Card key={teacher.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-14 h-14">
                    <AvatarFallback className="bg-gradient-to-br from-amber-400 to-orange-500 text-white text-lg">
                      {teacher.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800">{teacher.name}</h3>
                    <Badge variant={teacher.status === "active" ? "success" : "secondary"}>
                      {teacher.role}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Mail className="w-4 h-4" />
                    {teacher.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Phone className="w-4 h-4" />
                    {teacher.phone}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-2xl font-bold text-slate-800">{teacher.classes.length}</p>
                    <p className="text-xs text-slate-500">Classes</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-2xl font-bold text-slate-800">{teacher.students}</p>
                    <p className="text-xs text-slate-500">Students</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {teacher.classes.map(cls => (
                    <Badge key={cls} variant="outline">{cls}</Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-slate-500">Safeguarding: {teacher.safeguardingExpiry}</span>
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
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
