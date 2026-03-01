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
  Edit,
  Eye,
  ChevronRight,
  CheckCircle,
  Clock,
  Book,
  Heart,
  Music,
  Flame,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const curriculum = {
  FS1: {
    name: "Foundation School 1",
    duration: "12 months",
    bibleGoal: "Genesis to Esther",
    modules: [
      { id: 1, title: "Creation & The Fall", weeks: 4, topics: ["Genesis 1-3", "God as Creator", "Sin enters the world"], status: "completed" },
      { id: 2, title: "The Patriarchs", weeks: 6, topics: ["Abraham's faith", "Isaac & Jacob", "Joseph in Egypt"], status: "completed" },
      { id: 3, title: "Exodus & Freedom", weeks: 4, topics: ["Moses' calling", "Plagues & Passover", "Red Sea crossing"], status: "in_progress" },
      { id: 4, title: "Law & Wilderness", weeks: 5, topics: ["Ten Commandments", "Tabernacle", "40 years journey"], status: "upcoming" },
      { id: 5, title: "Conquest & Judges", weeks: 5, topics: ["Joshua leads", "Battle of Jericho", "Cycle of judges"], status: "upcoming" },
      { id: 6, title: "Kings & Kingdom", weeks: 6, topics: ["Saul, David, Solomon", "United Kingdom", "Temple built"], status: "upcoming" },
    ],
  },
  FS2: {
    name: "Foundation School 2",
    duration: "12 months",
    bibleGoal: "Job to Malachi + Gospels",
    modules: [
      { id: 1, title: "Wisdom Literature", weeks: 6, topics: ["Job's trials", "Psalms of David", "Proverbs & Ecclesiastes"], status: "completed" },
      { id: 2, title: "Major Prophets", weeks: 6, topics: ["Isaiah's visions", "Jeremiah's call", "Ezekiel & Daniel"], status: "in_progress" },
      { id: 3, title: "Minor Prophets", weeks: 4, topics: ["Hosea to Malachi", "Prophecies of Christ", "Return from exile"], status: "upcoming" },
      { id: 4, title: "Life of Jesus", weeks: 8, topics: ["Birth & ministry", "Miracles & parables", "Death & resurrection"], status: "upcoming" },
      { id: 5, title: "Teachings of Jesus", weeks: 6, topics: ["Sermon on Mount", "Kingdom parables", "Great Commission"], status: "upcoming" },
    ],
  },
  LEADERSHIP: {
    name: "Leadership Training",
    duration: "12 months",
    bibleGoal: "Acts to Revelation + Leadership",
    modules: [
      { id: 1, title: "Early Church", weeks: 6, topics: ["Acts of Apostles", "Holy Spirit power", "Church growth"], status: "in_progress" },
      { id: 2, title: "Paul's Letters", weeks: 8, topics: ["Romans to Philemon", "Doctrine & practice", "Christian living"], status: "upcoming" },
      { id: 3, title: "General Epistles", weeks: 4, topics: ["Hebrews to Jude", "Faith in action", "Last days"], status: "upcoming" },
      { id: 4, title: "Revelation", weeks: 4, topics: ["Letters to churches", "End times", "New Heaven & Earth"], status: "upcoming" },
      { id: 5, title: "Leadership Skills", weeks: 8, topics: ["Servant leadership", "Teaching methods", "Ministry practice"], status: "upcoming" },
    ],
  },
}

const disciplines = [
  { icon: Book, name: "Bible Reading", description: "Complete reading of assigned books" },
  { icon: Heart, name: "Memory Verses", description: "Weekly scripture memorization" },
  { icon: Flame, name: "Prayer", description: "Daily prayer check-ins and practice" },
  { icon: Music, name: "Worship", description: "Singing and instrument training" },
  { icon: Users, name: "Fellowship", description: "Group activities and service" },
]

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Children", href: "/admin/children" },
  { icon: GraduationCap, label: "Teachers", href: "/admin/teachers" },
  { icon: School, label: "Classes", href: "/admin/classes" },
  { icon: BookOpen, label: "Curriculum", href: "/admin/curriculum", active: true },
  { icon: Calendar, label: "Schedule", href: "/admin/schedule" },
  { icon: BarChart3, label: "Reports", href: "/admin/reports" },
  { icon: FileText, label: "Documents", href: "/admin/documents" },
  { icon: Shield, label: "Safeguarding", href: "/admin/safeguarding" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
]

export default function AdminCurriculumPage() {
  const [activeLevel, setActiveLevel] = useState<"FS1" | "FS2" | "LEADERSHIP">("FS1")

  const currentCurriculum = curriculum[activeLevel]
  const completedModules = currentCurriculum.modules.filter(m => m.status === "completed").length
  const totalModules = currentCurriculum.modules.length
  const progress = Math.round((completedModules / totalModules) * 100)

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
            <h1 className="text-2xl font-bold text-slate-800">Curriculum</h1>
            <p className="text-slate-500">Manage teaching content and modules</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Module
          </Button>
        </div>

        {/* Level Tabs */}
        <Tabs value={activeLevel} onValueChange={(v) => setActiveLevel(v as typeof activeLevel)} className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="FS1">Foundation School 1</TabsTrigger>
            <TabsTrigger value="FS2">Foundation School 2</TabsTrigger>
            <TabsTrigger value="LEADERSHIP">Leadership</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Level Overview */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{currentCurriculum.name}</CardTitle>
                <CardDescription>
                  Duration: {currentCurriculum.duration} • Bible Goal: {currentCurriculum.bibleGoal}
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500">Overall Progress</span>
                  <span className="font-medium">{completedModules} / {totalModules} modules</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              <div className="text-2xl font-bold text-amber-600">{progress}%</div>
            </div>
          </CardContent>
        </Card>

        {/* Modules */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Modules</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {currentCurriculum.modules.map((module) => (
                <AccordionItem key={module.id} value={`module-${module.id}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-4 w-full pr-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        module.status === "completed" ? "bg-green-100" :
                        module.status === "in_progress" ? "bg-amber-100" : "bg-slate-100"
                      }`}>
                        {module.status === "completed" ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : module.status === "in_progress" ? (
                          <Clock className="w-4 h-4 text-amber-600" />
                        ) : (
                          <span className="text-sm font-medium text-slate-400">{module.id}</span>
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium">{module.title}</p>
                        <p className="text-sm text-slate-500">{module.weeks} weeks</p>
                      </div>
                      <Badge variant={
                        module.status === "completed" ? "success" :
                        module.status === "in_progress" ? "warning" : "secondary"
                      }>
                        {module.status === "in_progress" ? "In Progress" :
                         module.status === "completed" ? "Completed" : "Upcoming"}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-12 pr-4 pb-4">
                      <h4 className="font-medium text-slate-700 mb-2">Topics Covered:</h4>
                      <ul className="space-y-1">
                        {module.topics.map((topic, i) => (
                          <li key={i} className="flex items-center gap-2 text-slate-600">
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit Module
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Core Disciplines */}
        <Card>
          <CardHeader>
            <CardTitle>Core Disciplines</CardTitle>
            <CardDescription>Essential practices integrated across all levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {disciplines.map((discipline) => (
                <div key={discipline.name} className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3">
                    <discipline.icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <h4 className="font-medium text-slate-800 mb-1">{discipline.name}</h4>
                  <p className="text-xs text-slate-500">{discipline.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
