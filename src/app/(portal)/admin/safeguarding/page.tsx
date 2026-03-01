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
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  AlertCircle,
  UserCheck,
  FileWarning,
  Phone,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const incidents = [
  {
    id: "1",
    type: "behavioral_1",
    child: "Michael B.",
    date: "Feb 28, 2026",
    description: "Minor disruption during class",
    status: "resolved",
    reportedBy: "Sarah Teacher",
  },
  {
    id: "2",
    type: "medical",
    child: "Emma T.",
    date: "Feb 25, 2026",
    description: "Mild allergic reaction, first aid administered",
    status: "resolved",
    reportedBy: "Grace Assistant",
  },
  {
    id: "3",
    type: "behavioral_2",
    child: "David O.",
    date: "Feb 20, 2026",
    description: "Repeated disruption, parents notified",
    status: "pending",
    reportedBy: "Brother Daniel",
  },
]

const trainingStatus = [
  { name: "Sarah Teacher", role: "Lead Teacher", completed: true, expiry: "Dec 2026" },
  { name: "Grace Assistant", role: "Assistant", completed: true, expiry: "Nov 2026" },
  { name: "Brother Daniel", role: "Lead Teacher", completed: true, expiry: "Jan 2027" },
  { name: "Pastor James", role: "Coordinator", completed: true, expiry: "Feb 2027" },
  { name: "Sister Mary", role: "Assistant", completed: false, expiry: "Overdue" },
]

const policies = [
  { name: "Child Protection Policy", version: "2.1", updated: "Jan 2026", status: "current" },
  { name: "Safeguarding Procedures", version: "1.5", updated: "Jan 2026", status: "current" },
  { name: "Photo & Media Consent", version: "1.2", updated: "Dec 2025", status: "current" },
  { name: "Emergency Procedures", version: "2.0", updated: "Nov 2025", status: "review" },
  { name: "Volunteer Guidelines", version: "1.3", updated: "Oct 2025", status: "current" },
]

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Children", href: "/admin/children" },
  { icon: GraduationCap, label: "Teachers", href: "/admin/teachers" },
  { icon: School, label: "Classes", href: "/admin/classes" },
  { icon: BookOpen, label: "Curriculum", href: "/admin/curriculum" },
  { icon: Calendar, label: "Schedule", href: "/admin/schedule" },
  { icon: BarChart3, label: "Reports", href: "/admin/reports" },
  { icon: FileText, label: "Documents", href: "/admin/documents" },
  { icon: Shield, label: "Safeguarding", href: "/admin/safeguarding", active: true },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
]

export default function AdminSafeguardingPage() {
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
            <h1 className="text-2xl font-bold text-slate-800">Safeguarding</h1>
            <p className="text-slate-500">Child protection and incident management</p>
          </div>
          <Button className="bg-red-600 hover:bg-red-700">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Report Incident
          </Button>
        </div>

        {/* Alert Banner */}
        <Card className="mb-6 border-amber-200 bg-amber-50">
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-800">1 Staff Training Overdue</h3>
                <p className="text-sm text-amber-700">Sister Mary's safeguarding training has expired. Please arrange renewal.</p>
              </div>
              <Button size="sm" variant="outline" className="ml-auto border-amber-300 text-amber-700">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Incidents</p>
                  <p className="text-2xl font-bold">{incidents.length}</p>
                </div>
                <FileWarning className="w-10 h-10 text-slate-300" />
              </div>
              <p className="text-xs text-slate-400 mt-2">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Pending Review</p>
                  <p className="text-2xl font-bold text-amber-600">{incidents.filter(i => i.status === "pending").length}</p>
                </div>
                <Clock className="w-10 h-10 text-amber-200" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Staff Trained</p>
                  <p className="text-2xl font-bold text-green-600">{trainingStatus.filter(t => t.completed).length}/{trainingStatus.length}</p>
                </div>
                <UserCheck className="w-10 h-10 text-green-200" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Policies Current</p>
                  <p className="text-2xl font-bold">{policies.filter(p => p.status === "current").length}/{policies.length}</p>
                </div>
                <FileText className="w-10 h-10 text-blue-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="incidents" className="space-y-6">
          <TabsList>
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
            <TabsTrigger value="training">Training Status</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
            <TabsTrigger value="contacts">Key Contacts</TabsTrigger>
          </TabsList>

          {/* Incidents Tab */}
          <TabsContent value="incidents">
            <Card>
              <CardHeader>
                <CardTitle>Recent Incidents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {incidents.map((incident) => (
                    <div key={incident.id} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        incident.type.includes("behavioral") ? "bg-amber-100" :
                        incident.type === "medical" ? "bg-blue-100" : "bg-red-100"
                      }`}>
                        <AlertTriangle className={`w-5 h-5 ${
                          incident.type.includes("behavioral") ? "text-amber-600" :
                          incident.type === "medical" ? "text-blue-600" : "text-red-600"
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-slate-800">{incident.child}</h4>
                            <p className="text-sm text-slate-600">{incident.description}</p>
                            <p className="text-xs text-slate-400 mt-1">
                              {incident.date} • Reported by {incident.reportedBy}
                            </p>
                          </div>
                          <Badge variant={incident.status === "resolved" ? "success" : "warning"}>
                            {incident.status}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Training Tab */}
          <TabsContent value="training">
            <Card>
              <CardHeader>
                <CardTitle>Staff Training Status</CardTitle>
                <CardDescription>Safeguarding training compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trainingStatus.map((staff) => (
                    <div key={staff.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          staff.completed ? "bg-green-100" : "bg-red-100"
                        }`}>
                          {staff.completed ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-800">{staff.name}</h4>
                          <p className="text-sm text-slate-500">{staff.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={staff.completed ? "success" : "danger"}>
                          {staff.completed ? "Completed" : "Overdue"}
                        </Badge>
                        <p className="text-xs text-slate-400 mt-1">
                          {staff.completed ? `Expires: ${staff.expiry}` : "Requires immediate action"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Policies Tab */}
          <TabsContent value="policies">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Safeguarding Policies</CardTitle>
                    <CardDescription>Current policy documents</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Policy
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {policies.map((policy) => (
                    <div key={policy.name} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-slate-400" />
                        <div>
                          <h4 className="font-medium text-slate-800">{policy.name}</h4>
                          <p className="text-xs text-slate-500">Version {policy.version} • Updated {policy.updated}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={policy.status === "current" ? "success" : "warning"}>
                          {policy.status === "current" ? "Current" : "Needs Review"}
                        </Badge>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Designated Safeguarding Lead</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-10 h-10 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Pastor James</h3>
                    <p className="text-slate-500 mb-4">Ministry Coordinator</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2 text-slate-600">
                        <Phone className="w-4 h-4" />
                        <span>+234 800 456 7890</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-slate-600">
                        <Mail className="w-4 h-4" />
                        <span>safeguarding@tcg.org</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Deputy Safeguarding Lead</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Sister Sarah</h3>
                    <p className="text-slate-500 mb-4">Lead Teacher</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2 text-slate-600">
                        <Phone className="w-4 h-4" />
                        <span>+234 800 123 4567</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-slate-600">
                        <Mail className="w-4 h-4" />
                        <span>sarah@tcg.org</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
