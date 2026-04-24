"use client"

export const dynamic = 'force-dynamic'

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Users,
  BookOpen,
  ClipboardCheck,
  Award,
  Calendar,
  Clock,
  Plus,
  Bell,
  Settings,
  LogOut,
  Search,
  Star,
  RefreshCw,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  gender: string
  current_level: number
  total_points: number
}

export default function TeacherDashboard() {
  const [children, setChildren] = useState<Child[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedChild, setSelectedChild] = useState<Child | null>(null)
  const [showAwardDialog, setShowAwardDialog] = useState(false)
  const [pointsToAdd, setPointsToAdd] = useState(10)

  const supabase = createClient()

  const fetchChildren = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from("children")
        .select("*")
        .order("total_points", { ascending: false })

      if (error) throw error
      setChildren(data || [])
    } catch (error) {
      console.error("Error fetching children:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchChildren()
  }, [])

  const filteredChildren = children.filter((child) =>
    `${child.first_name} ${child.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAwardPoints = async () => {
    if (!selectedChild) return

    try {
      const { error } = await supabase
        .from("children")
        .update({ total_points: (selectedChild.total_points || 0) + pointsToAdd })
        .eq("id", selectedChild.id)

      if (error) throw error

      setShowAwardDialog(false)
      setSelectedChild(null)
      fetchChildren()
    } catch (error) {
      console.error("Error awarding points:", error)
      alert("Failed to award points")
    }
  }

  const totalPoints = children.reduce((sum, c) => sum + (c.total_points || 0), 0)
  const avgPoints = children.length > 0 ? Math.round(totalPoints / children.length) : 0

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
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
                <Avatar>
                  <AvatarFallback className="bg-purple-100 text-purple-700">TC</AvatarFallback>
                </Avatar>
                <span className="font-medium text-slate-700 hidden sm:inline">Teacher</span>
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
            Teacher Dashboard
          </h1>
          <p className="text-slate-500">
            Manage students, award points, and track progress.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Students</p>
                  <p className="text-2xl font-bold text-slate-800">{children.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-100 text-blue-600">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Boys</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {children.filter(c => c.gender === "male").length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-100">
                  <span className="text-2xl">👦</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Girls</p>
                  <p className="text-2xl font-bold text-pink-600">
                    {children.filter(c => c.gender === "female").length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-pink-100">
                  <span className="text-2xl">👧</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Avg Points</p>
                  <p className="text-2xl font-bold text-amber-600">{avgPoints}</p>
                </div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-amber-100 text-amber-600">
                  <Star className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Students List */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Students</CardTitle>
                    <CardDescription>Click on a student to award points</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={fetchChildren} disabled={isLoading}>
                    <RefreshCw className={`w-4 h-4 mr-1 ${isLoading ? "animate-spin" : ""}`} />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
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
                </div>

                {isLoading ? (
                  <div className="text-center py-10">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto text-slate-400" />
                    <p className="mt-2 text-slate-500">Loading students...</p>
                  </div>
                ) : filteredChildren.length === 0 ? (
                  <div className="text-center py-10">
                    <Users className="w-12 h-12 mx-auto text-slate-300" />
                    <p className="mt-2 text-slate-500">No students found</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredChildren.map((child, index) => (
                      <motion.div
                        key={child.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => {
                          setSelectedChild(child)
                          setShowAwardDialog(true)
                        }}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-amber-50 transition-colors cursor-pointer border-2 border-transparent hover:border-amber-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar>
                              <AvatarFallback className={child.gender === "female" ? "bg-pink-100 text-pink-700" : "bg-blue-100 text-blue-700"}>
                                {child.first_name[0]}{child.last_name[0]}
                              </AvatarFallback>
                            </Avatar>
                            {index < 3 && (
                              <span className="absolute -top-1 -right-1 text-sm">
                                {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-slate-800">
                                {child.first_name} {child.last_name}
                              </span>
                              <span className="text-sm text-slate-400">
                                {child.gender === "male" ? "👦" : "👧"}
                              </span>
                            </div>
                            <p className="text-sm text-slate-500">Level {child.current_level || 1}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                            ⭐ {child.total_points || 0} pts
                          </Badge>
                          <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50">
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  Top Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {children.slice(0, 5).map((child, index) => (
                    <div key={child.id} className="flex items-center gap-3">
                      <span className="text-lg w-6">
                        {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `${index + 1}.`}
                      </span>
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className={`text-xs ${child.gender === "female" ? "bg-pink-100 text-pink-700" : "bg-blue-100 text-blue-700"}`}>
                          {child.first_name[0]}{child.last_name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">{child.first_name}</p>
                      </div>
                      <span className="text-sm font-bold text-amber-600">{child.total_points || 0}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <Award className="w-4 h-4 mr-2" />
                  Bulk Award Points
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Mark Attendance
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <ClipboardCheck className="w-4 h-4 mr-2" />
                  Submit Report
                </Button>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-slate-800 mb-1">Total Points Earned</h3>
                <p className="text-3xl font-bold text-amber-600">{totalPoints}</p>
                <p className="text-sm text-slate-500 mt-1">by all students</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Award Points Dialog */}
      <Dialog open={showAwardDialog} onOpenChange={setShowAwardDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Award Points</DialogTitle>
            <DialogDescription>
              Give points to {selectedChild?.first_name} for their achievement
            </DialogDescription>
          </DialogHeader>
          {selectedChild && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className={`text-xl ${selectedChild.gender === "female" ? "bg-pink-100 text-pink-700" : "bg-blue-100 text-blue-700"}`}>
                    {selectedChild.first_name[0]}{selectedChild.last_name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{selectedChild.first_name} {selectedChild.last_name}</h3>
                  <p className="text-slate-500">Current: ⭐ {selectedChild.total_points || 0} points</p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-sm text-slate-600 mb-3">Select points to award:</p>
                <div className="grid grid-cols-4 gap-2">
                  {[5, 10, 15, 20, 25, 50, 75, 100].map((pts) => (
                    <Button
                      key={pts}
                      variant={pointsToAdd === pts ? "default" : "outline"}
                      onClick={() => setPointsToAdd(pts)}
                      className={pointsToAdd === pts ? "bg-amber-500 hover:bg-amber-600" : ""}
                    >
                      +{pts}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <p className="text-green-700 text-center">
                  New total: <strong>{(selectedChild.total_points || 0) + pointsToAdd}</strong> points
                </p>
              </div>

              <Button onClick={handleAwardPoints} className="w-full bg-green-500 hover:bg-green-600">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Award {pointsToAdd} Points
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
