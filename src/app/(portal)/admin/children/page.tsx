"use client"

import { useState, useEffect } from "react"
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
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Key,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { createClient } from "@/lib/supabase/client"

interface Child {
  id: string
  first_name: string
  last_name: string
  display_name: string
  date_of_birth: string
  gender: string
  school_name: string | null
  school_grade: string | null
  pin_code: string
  current_level: number
  total_points: number
  created_at: string
  parent_email?: string
  parent_name?: string
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Children", href: "/admin/children", active: true },
  { icon: GraduationCap, label: "Teachers", href: "/admin/teachers" },
  { icon: School, label: "Classes", href: "/admin/classes" },
  { icon: BookOpen, label: "Curriculum", href: "/admin/curriculum" },
  { icon: Calendar, label: "Schedule", href: "/admin/schedule" },
  { icon: BarChart3, label: "Reports", href: "/admin/reports" },
  { icon: FileText, label: "Documents", href: "/admin/documents" },
  { icon: Shield, label: "Safeguarding", href: "/admin/safeguarding" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
]

export default function AdminChildrenPage() {
  const [children, setChildren] = useState<Child[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedChild, setSelectedChild] = useState<Child | null>(null)
  const [showPinDialog, setShowPinDialog] = useState(false)

  const supabase = createClient()

  // Fetch children from Supabase
  const fetchChildren = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from("children")
        .select(`
          *,
          profiles:parent_id (
            email,
            full_name
          )
        `)
        .order("created_at", { ascending: false })

      if (error) throw error

      const formattedData = data?.map((child) => ({
        ...child,
        parent_email: child.profiles?.email,
        parent_name: child.profiles?.full_name,
      })) || []

      setChildren(formattedData)
    } catch (error) {
      console.error("Error fetching children:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchChildren()
  }, [])

  const filteredChildren = children.filter(child => {
    const fullName = `${child.first_name} ${child.last_name}`.toLowerCase()
    const parentName = child.parent_name?.toLowerCase() || ""
    return fullName.includes(searchQuery.toLowerCase()) ||
           parentName.includes(searchQuery.toLowerCase())
  })

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const handleViewPin = (child: Child) => {
    setSelectedChild(child)
    setShowPinDialog(true)
  }

  const handleDelete = async (childId: string) => {
    if (!confirm("Are you sure you want to delete this child?")) return

    try {
      const { error } = await supabase
        .from("children")
        .delete()
        .eq("id", childId)

      if (error) throw error

      fetchChildren()
    } catch (error) {
      console.error("Error deleting child:", error)
      alert("Failed to delete child")
    }
  }

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
            <h1 className="text-2xl font-bold text-slate-800">Children</h1>
            <p className="text-slate-500">Manage enrolled children and view their PINs</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={fetchChildren} disabled={isLoading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Children</p>
                  <p className="text-2xl font-bold">{children.length}</p>
                </div>
                <Users className="w-10 h-10 text-blue-500 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Boys</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {children.filter(c => c.gender === "male").length}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-xl">👦</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Girls</p>
                  <p className="text-2xl font-bold text-pink-600">
                    {children.filter(c => c.gender === "female").length}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                  <span className="text-xl">👧</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Points</p>
                  <p className="text-2xl font-bold text-amber-600">
                    {children.reduce((sum, c) => sum + (c.total_points || 0), 0)}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <span className="text-xl">⭐</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by child name or parent name..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Children Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Children ({filteredChildren.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-10">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto text-slate-400" />
                <p className="mt-2 text-slate-500">Loading children...</p>
              </div>
            ) : filteredChildren.length === 0 ? (
              <div className="text-center py-10">
                <Users className="w-12 h-12 mx-auto text-slate-300" />
                <p className="mt-2 text-slate-500">No children found</p>
                <p className="text-sm text-slate-400">Children will appear here after parents register</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Child</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Parent</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Age</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">School</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Points</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">PIN</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Registered</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredChildren.map((child) => (
                      <tr key={child.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback className={`${child.gender === "female" ? "bg-pink-100 text-pink-700" : "bg-blue-100 text-blue-700"}`}>
                                {child.first_name[0]}{child.last_name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-slate-800">{child.first_name} {child.last_name}</p>
                              <p className="text-xs text-slate-500">{child.gender === "male" ? "👦 Boy" : "👧 Girl"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-slate-700">{child.parent_name || "—"}</p>
                          <p className="text-xs text-slate-400">{child.parent_email || "—"}</p>
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {child.date_of_birth ? `${calculateAge(child.date_of_birth)} yrs` : "—"}
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-slate-600">{child.school_name || "—"}</p>
                          <p className="text-xs text-slate-400">{child.school_grade || ""}</p>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                            ⭐ {child.total_points || 0}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewPin(child)}
                            className="font-mono"
                          >
                            <Key className="w-3 h-3 mr-1" />
                            View
                          </Button>
                        </td>
                        <td className="py-3 px-4 text-slate-500 text-sm">
                          {new Date(child.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" onClick={() => handleViewPin(child)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(child.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* PIN Dialog */}
      <Dialog open={showPinDialog} onOpenChange={setShowPinDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Child Details</DialogTitle>
            <DialogDescription>
              View {selectedChild?.first_name}&apos;s information and login PIN
            </DialogDescription>
          </DialogHeader>
          {selectedChild && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className={`text-xl ${selectedChild.gender === "female" ? "bg-pink-100 text-pink-700" : "bg-blue-100 text-blue-700"}`}>
                    {selectedChild.first_name[0]}{selectedChild.last_name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{selectedChild.first_name} {selectedChild.last_name}</h3>
                  <p className="text-slate-500">{selectedChild.display_name}</p>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-xl border-2 border-amber-200 text-center">
                <p className="text-sm text-amber-700 font-medium mb-2">Login PIN</p>
                <p className="text-4xl font-bold font-mono tracking-widest text-amber-800">
                  {selectedChild.pin_code}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Parent</p>
                  <p className="font-medium">{selectedChild.parent_name || "—"}</p>
                </div>
                <div>
                  <p className="text-slate-500">Email</p>
                  <p className="font-medium">{selectedChild.parent_email || "—"}</p>
                </div>
                <div>
                  <p className="text-slate-500">Date of Birth</p>
                  <p className="font-medium">{selectedChild.date_of_birth || "—"}</p>
                </div>
                <div>
                  <p className="text-slate-500">School</p>
                  <p className="font-medium">{selectedChild.school_name || "—"}</p>
                </div>
                <div>
                  <p className="text-slate-500">Level</p>
                  <p className="font-medium">Level {selectedChild.current_level || 1}</p>
                </div>
                <div>
                  <p className="text-slate-500">Points</p>
                  <p className="font-medium">⭐ {selectedChild.total_points || 0}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
