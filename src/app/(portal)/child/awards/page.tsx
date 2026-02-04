"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Trophy,
  Sparkles,
  Star,
  ChevronLeft,
  Award,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BubblesBackground } from "@/components/animations/bubbles"
import { CelebrationConfetti } from "@/components/animations/confetti"
import { BADGE_CONFIG, type BadgeType } from "@/types/database.types"

// Demo data for earned badges
const earnedBadges: { type: BadgeType; date: string; reason: string }[] = [
  { type: "prayer_warrior", date: "Feb 2, 2026", reason: "Completed 5 days of prayer check-ins" },
  { type: "faithful_student", date: "Jan 28, 2026", reason: "Completed all assignments for the week" },
  { type: "perfect_attendance", date: "Jan 21, 2026", reason: "Attended all sessions this week" },
  { type: "scripture_scholar", date: "Jan 14, 2026", reason: "Memorized all memory verses" },
  { type: "helping_hand", date: "Jan 7, 2026", reason: "Helped younger students during class" },
]

// All possible badges
const allBadges = Object.entries(BADGE_CONFIG).map(([type, config]) => ({
  type: type as BadgeType,
  ...config,
  earned: earnedBadges.some((b) => b.type === type),
}))

export default function AwardsPage() {
  const [selectedBadge, setSelectedBadge] = useState<typeof earnedBadges[0] | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleBadgeClick = (badge: typeof earnedBadges[0]) => {
    setSelectedBadge(badge)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 100)
  }

  return (
    <div className="min-h-screen bg-gradient-warm pb-24">
      <BubblesBackground count={6} />
      <CelebrationConfetti active={showConfetti} />

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
              <Trophy className="w-5 h-5 text-amber-500" />
              Trophy Room
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card variant="gradient" className="overflow-hidden">
            <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 h-2" />
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center justify-around text-center">
                <div>
                  <div className="text-3xl font-bold text-amber-600">{earnedBadges.length}</div>
                  <div className="text-sm text-slate-500">Badges Earned</div>
                </div>
                <div className="w-px h-12 bg-slate-200" />
                <div>
                  <div className="text-3xl font-bold text-purple-600">{allBadges.length}</div>
                  <div className="text-sm text-slate-500">Total Available</div>
                </div>
                <div className="w-px h-12 bg-slate-200" />
                <div>
                  <div className="text-3xl font-bold text-green-600">
                    {Math.round((earnedBadges.length / allBadges.length) * 100)}%
                  </div>
                  <div className="text-sm text-slate-500">Complete</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs defaultValue="earned" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="earned" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              My Badges ({earnedBadges.length})
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              All Badges
            </TabsTrigger>
          </TabsList>

          {/* Earned Badges */}
          <TabsContent value="earned">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {earnedBadges.map((badge, index) => {
                const config = BADGE_CONFIG[badge.type]
                return (
                  <motion.div
                    key={index}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    onClick={() => handleBadgeClick(badge)}
                    className="cursor-pointer"
                  >
                    <Card variant="glow" className="text-center card-hover h-full">
                      <CardContent className="pt-6 pb-4">
                        <div className="relative">
                          <div className="text-5xl mb-3 star-burst animate-float">
                            {config.emoji}
                          </div>
                          <div className="absolute -top-1 -right-1">
                            <Sparkles className="w-4 h-4 text-amber-400 animate-sparkle" />
                          </div>
                        </div>
                        <h3 className="font-bold text-slate-800 text-sm mb-1">{config.label}</h3>
                        <p className="text-xs text-slate-500">{badge.date}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            {earnedBadges.length === 0 && (
              <div className="text-center py-12">
                <Trophy className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-600 mb-2">No badges yet!</h3>
                <p className="text-sm text-slate-400">
                  Complete tasks and check-ins to earn your first badge.
                </p>
              </div>
            )}
          </TabsContent>

          {/* All Badges */}
          <TabsContent value="all">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {allBadges.map((badge, index) => (
                <motion.div
                  key={badge.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    variant={badge.earned ? "glow" : "default"}
                    className={`text-center h-full ${!badge.earned ? "opacity-60" : ""}`}
                  >
                    <CardContent className="pt-6 pb-4">
                      <div className={`text-5xl mb-3 ${badge.earned ? "star-burst" : "grayscale"}`}>
                        {badge.emoji}
                      </div>
                      <h3 className="font-bold text-slate-800 text-sm mb-1">{badge.label}</h3>
                      <p className="text-xs text-slate-500 mb-2">{badge.description}</p>
                      {badge.earned ? (
                        <Badge variant="success" className="text-xs">Earned!</Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">Locked</Badge>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Badge Detail Modal */}
        <AnimatePresence>
          {selectedBadge && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedBadge(null)}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: "spring" }}
                onClick={(e) => e.stopPropagation()}
              >
                <Card variant="glass" className="max-w-sm text-center">
                  <CardContent className="pt-8 pb-6">
                    <div className="text-7xl mb-4 star-burst animate-float">
                      {BADGE_CONFIG[selectedBadge.type].emoji}
                    </div>
                    <Badge variant="gold" className="mb-4">Congratulations!</Badge>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">
                      {BADGE_CONFIG[selectedBadge.type].label}
                    </h2>
                    <p className="text-slate-600 mb-4">{selectedBadge.reason}</p>
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                      <Calendar className="w-4 h-4" />
                      Earned on {selectedBadge.date}
                    </div>
                    <Button className="mt-6" onClick={() => setSelectedBadge(null)}>
                      Awesome!
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trophy Shelf */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Trophy Shelf
          </h2>
          <div className="trophy-shelf rounded-xl p-4 relative overflow-hidden">
            <div className="flex items-end justify-center gap-4 min-h-[120px]">
              {earnedBadges.slice(0, 5).map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                  className="text-5xl transform hover:scale-110 transition-transform cursor-pointer"
                  onClick={() => handleBadgeClick(badge)}
                >
                  {BADGE_CONFIG[badge.type].emoji}
                </motion.div>
              ))}
              {earnedBadges.length < 5 &&
                Array.from({ length: 5 - earnedBadges.length }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="w-12 h-12 rounded-full bg-amber-900/30 border-2 border-dashed border-amber-700/50"
                  />
                ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-800 via-amber-600 to-amber-800" />
          </div>
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
              <Award className="w-6 h-6" />
              <span className="text-xs mt-1">Tasks</span>
            </Link>
            <Link href="/child/awards" className="flex flex-col items-center text-amber-600">
              <Trophy className="w-6 h-6" />
              <span className="text-xs mt-1">Awards</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
