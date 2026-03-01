"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ChevronLeft,
  Settings,
  User,
  Palette,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Sparkles,
  Heart,
  Star,
  LogOut,
  Trophy,
  FileText,
  HelpCircle,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BubblesBackground } from "@/components/animations/bubbles"

// Demo child data
const childData = {
  name: "Sarah M.",
  level: "Foundation School 1",
  class: "FS1-Sunday Morning",
  teacher: "Sister Grace",
  points: 285,
  badges: 5,
  streak: 7,
}

const themeColors = [
  { id: "amber", color: "bg-amber-500", label: "Sunshine" },
  { id: "pink", color: "bg-pink-500", label: "Bubblegum" },
  { id: "blue", color: "bg-blue-500", label: "Ocean" },
  { id: "green", color: "bg-green-500", label: "Forest" },
  { id: "purple", color: "bg-purple-500", label: "Grape" },
]

export default function ChildSettingsPage() {
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [calmMode, setCalmMode] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState("amber")

  return (
    <div className="min-h-screen bg-gradient-warm pb-24">
      <BubblesBackground count={4} />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-amber-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/child">
                <ChevronLeft className="w-5 h-5" />
              </Link>
            </Button>
            <h1 className="font-bold text-lg text-slate-800 ml-2 flex items-center gap-2">
              <Settings className="w-5 h-5 text-amber-500" />
              Settings
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card variant="gradient" className="overflow-hidden">
            <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 h-2" />
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                  <AvatarFallback className="bg-gradient-to-br from-amber-400 to-orange-500 text-white text-2xl font-bold">
                    {childData.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{childData.name}</h2>
                  <p className="text-slate-500">{childData.level}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="gold">
                      <Star className="w-3 h-3 mr-1" />
                      {childData.points} pts
                    </Badge>
                    <Badge variant="secondary">
                      <Trophy className="w-3 h-3 mr-1" />
                      {childData.badges} badges
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Class Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <h3 className="text-sm font-semibold text-slate-500 mb-2 px-1">MY CLASS</h3>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-800">{childData.class}</h4>
                  <p className="text-sm text-slate-500">Teacher: {childData.teacher}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Appearance Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h3 className="text-sm font-semibold text-slate-500 mb-2 px-1">APPEARANCE</h3>
          <Card>
            <CardContent className="p-4 space-y-4">
              {/* Theme Colors */}
              <div>
                <Label className="text-slate-700 mb-3 block flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Choose Your Color
                </Label>
                <div className="flex gap-3">
                  {themeColors.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`w-12 h-12 rounded-full ${theme.color} transition-transform ${
                        selectedTheme === theme.id
                          ? "ring-4 ring-offset-2 ring-slate-400 scale-110"
                          : "hover:scale-105"
                      }`}
                      title={theme.label}
                    />
                  ))}
                </div>
              </div>

              {/* Calm Mode */}
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  {calmMode ? (
                    <Moon className="w-5 h-5 text-indigo-500" />
                  ) : (
                    <Sun className="w-5 h-5 text-amber-500" />
                  )}
                  <div>
                    <Label className="text-slate-700">Calm Mode</Label>
                    <p className="text-xs text-slate-400">Less animations & softer colors</p>
                  </div>
                </div>
                <Switch checked={calmMode} onCheckedChange={setCalmMode} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sound Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h3 className="text-sm font-semibold text-slate-500 mb-2 px-1">SOUNDS</h3>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {soundEnabled ? (
                    <Volume2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <VolumeX className="w-5 h-5 text-slate-400" />
                  )}
                  <div>
                    <Label className="text-slate-700">Sound Effects</Label>
                    <p className="text-xs text-slate-400">Celebration sounds & clicks</p>
                  </div>
                </div>
                <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Help & Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <h3 className="text-sm font-semibold text-slate-500 mb-2 px-1">HELP</h3>
          <Card>
            <CardContent className="p-0">
              <button className="w-full flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors text-left border-b border-slate-100">
                <HelpCircle className="w-5 h-5 text-blue-500" />
                <span className="text-slate-700">How to Use the App</span>
              </button>
              <button className="w-full flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors text-left">
                <MessageCircle className="w-5 h-5 text-green-500" />
                <span className="text-slate-700">Ask My Teacher</span>
              </button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Fun Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <h3 className="text-sm font-semibold text-slate-500 mb-2 px-1">MY JOURNEY</h3>
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-100">
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl mb-1">
                    <Heart className="w-8 h-8 text-red-400 mx-auto" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600">{childData.streak}</div>
                  <div className="text-xs text-slate-500">Day Streak</div>
                </div>
                <div>
                  <div className="text-3xl mb-1">
                    <Trophy className="w-8 h-8 text-amber-400 mx-auto" />
                  </div>
                  <div className="text-2xl font-bold text-amber-600">{childData.badges}</div>
                  <div className="text-xs text-slate-500">Badges</div>
                </div>
                <div>
                  <div className="text-3xl mb-1">
                    <Sparkles className="w-8 h-8 text-yellow-400 mx-auto" />
                  </div>
                  <div className="text-2xl font-bold text-yellow-600">{childData.points}</div>
                  <div className="text-xs text-slate-500">Points</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button variant="outline" className="w-full text-slate-500" asChild>
            <Link href="/login">
              <LogOut className="w-4 h-4 mr-2" />
              Switch User
            </Link>
          </Button>
          <p className="text-xs text-slate-400 text-center mt-3">
            Ask a parent or teacher if you need help!
          </p>
        </motion.div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around h-16">
            <Link href="/child" className="flex flex-col items-center text-slate-400 hover:text-amber-600">
              <Sparkles className="w-6 h-6" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link href="/child/tasks" className="flex flex-col items-center text-slate-400 hover:text-amber-600">
              <FileText className="w-6 h-6" />
              <span className="text-xs mt-1">Tasks</span>
            </Link>
            <Link href="/child/awards" className="flex flex-col items-center text-slate-400 hover:text-amber-600">
              <Trophy className="w-6 h-6" />
              <span className="text-xs mt-1">Awards</span>
            </Link>
            <Link href="/child/settings" className="flex flex-col items-center text-amber-600">
              <Settings className="w-6 h-6" />
              <span className="text-xs mt-1">Settings</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
