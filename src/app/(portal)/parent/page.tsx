"use client"

export const dynamic = 'force-dynamic'

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
  Key,
  Copy,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { createClient } from "@/lib/supabase/client"

interface Child {
  id: string
  first_name: string
  last_name: string
  display_name: string
  date_of_birth: string
  gender: string
  pin_code: string
  total_points: number
  current_level: number
  school_name?: string
  school_grade?: string
}

interface ParentProfile {
  id: string
  email: string
  full_name: string
  phone?: string
  church_name?: string
}

export default function ParentDashboard() {
  const router = useRouter()
  const supabase = createClient()

  const [isLoading, setIsLoading] = useState(true)
  const [parent, setParent] = useState<ParentProfile | null>(null)
  const [children, setChildren] = useState<Child[]>([])
  const [selectedChild, setSelectedChild] = useState<Child | null>(null)
  const [showPinDialog, setShowPinDialog] = useState(false)
  const [pinChild, setPinChild] = useState<Child | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetchParentData()
  }, [])

  const fetchParentData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (profile) {
        setParent({
          id: profile.id,
          email: profile.email || user.email || "",
          full_name: profile.full_name || user.user_metadata?.full_name || "Parent",
          phone: profile.phone,
          church_name: profile.church_name,
        })
      } else {
        setParent({
          id: user.id,
          email: user.email || "",
          full_name: user.user_metadata?.full_name || "Parent",
        })
      }

      const { data: childrenData } = await supabase
        .from("children")
        .select("*")
        .eq("parent_id", user.id)
        .order("created_at", { ascending: true })

      if (childrenData && childrenData.length > 0) {
        setChildren(childrenData)
        setSelectedChild(childrenData[0])
      }
    } catch (error) {
      console.error("Error fetching parent data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  const showPIN = (child: Child) => {
    setPinChild(child)
    setShowPinDialog(true)
    setCopied(false)
  }

  const copyPIN = () => {
    if (pinChild) {
      navigator.clipboard.writeText(pinChild.pin_code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
  }

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="text-6xl"
        >
          ⭐
        </motion.div>
      </div>
    )
  }

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
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
                <Avatar>
                  <AvatarFallback>{parent ? getInitials(parent.full_name) : "P"}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-slate-700 hidden sm:inline">
                  {parent?.full_name?.split(" ")[0]}
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="w-5 h-5" />
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
            Welcome, {parent?.full_name?.split(" ")[0]}!
          </h1>
          <p className="text-slate-500">
            Track your children&apos;s spiritual growth and progress.
          </p>
        </motion.div>

        {/* No Children Message */}
        {children.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-6xl mb-4">👶</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No Children Registered Yet</h3>
              <p className="text-slate-500 mb-4">Register your child to get started!</p>
              <Button asChild>
                <Link href="/signup">
                  <Plus className="w-4 h-4 mr-2" />
                  Register a Child
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Children Overview Cards */}
        {children.length > 0 && (
          <>
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
                      selectedChild?.id === child.id
                        ? "ring-2 ring-amber-400 shadow-lg"
                        : "hover:shadow-md"
                    }`}
                    onClick={() => setSelectedChild(child)}
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="text-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white">
                              {getInitials(child.display_name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-bold text-slate-800">{child.display_name}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {child.gender === "male" ? "👦" : "👧"} {calculateAge(child.date_of_birth)} years
                              </Badge>
                              <Badge variant="outline" className="text-xs border-amber-300 text-amber-700">
                                Level {child.current_level || 1}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            showPIN(child)
                          }}
                        >
                          <Key className="w-5 h-5 text-amber-600" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-amber-50 rounded-xl">
                          <div className="text-2xl font-bold text-amber-600">
                            <Star className="w-5 h-5 inline mr-1" />
                            {child.total_points || 0}
                          </div>
                          <div className="text-xs text-slate-500">Total Points</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-xl">
                          <div className="text-2xl font-bold text-green-600">
                            <Trophy className="w-5 h-5 inline mr-1" />
                            {child.current_level || 1}
                          </div>
                          <div className="text-xs text-slate-500">Current Level</div>
                        </div>
                      </div>

                      {child.school_name && (
                        <div className="text-sm text-slate-500 flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {child.school_name} {child.school_grade && `• ${child.school_grade}`}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Selected Child Details */}
                {selectedChild && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-14 h-14">
                            <AvatarFallback className="text-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white">
                              {getInitials(selectedChild.display_name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle>{selectedChild.first_name}&apos;s Progress</CardTitle>
                            <CardDescription>
                              {selectedChild.gender === "male" ? "Boy" : "Girl"} • Age {calculateAge(selectedChild.date_of_birth)}
                            </CardDescription>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => showPIN(selectedChild)}
                        >
                          <Key className="w-4 h-4 mr-1" />
                          View PIN
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="mb-4">
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="progress">Progress</TabsTrigger>
                          <TabsTrigger value="info">Info</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
                              <div className="flex items-center gap-2 mb-2">
                                <Star className="w-5 h-5 text-amber-500" />
                                <span className="font-medium text-slate-700">Total Points</span>
                              </div>
                              <div className="text-3xl font-bold text-amber-600">
                                {selectedChild.total_points || 0}
                              </div>
                              <p className="text-xs text-slate-500 mt-1">
                                Keep earning points to level up!
                              </p>
                            </div>

                            <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                              <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="w-5 h-5 text-green-500" />
                                <span className="font-medium text-slate-700">Current Level</span>
                              </div>
                              <div className="text-3xl font-bold text-green-600">
                                Level {selectedChild.current_level || 1}
                              </div>
                              <p className="text-xs text-slate-500 mt-1">
                                {100 - ((selectedChild.total_points || 0) % 100)} points to next level
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
                            <div className="flex items-center gap-2 mb-2">
                              <Heart className="w-5 h-5 text-blue-500" />
                              <span className="font-medium text-slate-700">Encouragement</span>
                            </div>
                            <p className="text-slate-600">
                              {selectedChild.first_name} is making great progress! Keep encouraging them to complete their daily tasks and prayers.
                            </p>
                          </div>
                        </TabsContent>

                        <TabsContent value="progress">
                          <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-slate-50">
                              <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium text-slate-600">Level Progress</span>
                                <span className="text-sm font-bold text-amber-600">
                                  {(selectedChild.total_points || 0) % 100}/100
                                </span>
                              </div>
                              <Progress value={(selectedChild.total_points || 0) % 100} className="h-3" />
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                              <div className="text-center p-3 bg-amber-50 rounded-xl">
                                <div className="text-2xl font-bold text-amber-600">{selectedChild.total_points || 0}</div>
                                <div className="text-xs text-slate-500">Points</div>
                              </div>
                              <div className="text-center p-3 bg-green-50 rounded-xl">
                                <div className="text-2xl font-bold text-green-600">{selectedChild.current_level || 1}</div>
                                <div className="text-xs text-slate-500">Level</div>
                              </div>
                              <div className="text-center p-3 bg-purple-50 rounded-xl">
                                <div className="text-2xl font-bold text-purple-600">0</div>
                                <div className="text-xs text-slate-500">Badges</div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="info">
                          <div className="space-y-3">
                            <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                              <span className="text-slate-500">Full Name</span>
                              <span className="font-medium text-slate-800">
                                {selectedChild.first_name} {selectedChild.last_name}
                              </span>
                            </div>
                            <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                              <span className="text-slate-500">Date of Birth</span>
                              <span className="font-medium text-slate-800">
                                {new Date(selectedChild.date_of_birth).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                              <span className="text-slate-500">Gender</span>
                              <span className="font-medium text-slate-800">
                                {selectedChild.gender === "male" ? "Boy 👦" : "Girl 👧"}
                              </span>
                            </div>
                            {selectedChild.school_name && (
                              <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                                <span className="text-slate-500">School</span>
                                <span className="font-medium text-slate-800">{selectedChild.school_name}</span>
                              </div>
                            )}
                            {selectedChild.school_grade && (
                              <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                                <span className="text-slate-500">Grade</span>
                                <span className="font-medium text-slate-800">{selectedChild.school_grade}</span>
                              </div>
                            )}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button className="w-full justify-start" variant="outline" asChild>
                      <Link href="/signup">
                        <Plus className="w-4 h-4 mr-2" />
                        Register Another Child
                      </Link>
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact Teacher
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

                {/* Children's PINs */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Key className="w-5 h-5 text-amber-500" />
                      Login PINs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {children.map((child) => (
                        <div
                          key={child.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-100"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{child.gender === "male" ? "👦" : "👧"}</span>
                            <span className="font-medium text-slate-700">{child.first_name}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-amber-600 hover:text-amber-700"
                            onClick={() => showPIN(child)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Prayer Reminder */}
                <Card className="overflow-hidden">
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
          </>
        )}
      </main>

      {/* PIN Dialog */}
      <Dialog open={showPinDialog} onOpenChange={setShowPinDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Key className="w-5 h-5 text-amber-500" />
              {pinChild?.first_name}&apos;s Login PIN
            </DialogTitle>
            <DialogDescription>
              Use this PIN to log into the child portal
            </DialogDescription>
          </DialogHeader>
          <div className="text-center py-6">
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-6 border-2 border-amber-300">
              <div className="text-5xl font-bold tracking-[0.3em] text-amber-700 font-mono">
                {pinChild?.pin_code}
              </div>
            </div>
            <div className="flex gap-2 justify-center mt-4">
              <Button variant="outline" onClick={copyPIN}>
                {copied ? (
                  <><Check className="w-4 h-4 mr-2 text-green-600" /> Copied!</>
                ) : (
                  <><Copy className="w-4 h-4 mr-2" /> Copy PIN</>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  if (pinChild && parent) {
                    const subject = encodeURIComponent(`${pinChild.first_name}'s Login PIN - The Chosen Generation`)
                    const body = encodeURIComponent(
                      `Hello!\n\n${pinChild.first_name}'s login PIN for The Chosen Generation Bible School is:\n\n${pinChild.pin_code}\n\nLogin at: ${window.location.origin}/login\n\nBlessings!`
                    )
                    window.location.href = `mailto:${parent.email}?subject=${subject}&body=${body}`
                  }
                }}
              >
                <span className="mr-2">📧</span> Email
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
