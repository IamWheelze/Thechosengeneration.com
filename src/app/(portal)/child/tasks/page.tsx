"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft,
  CheckCircle2,
  Circle,
  Clock,
  Trophy,
  Star,
  Sparkles,
  BookOpen,
  Heart,
  Music,
  MessageSquare,
  Camera,
  FileText,
  Send,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { BubblesBackground } from "@/components/animations/bubbles"
import { CelebrationConfetti } from "@/components/animations/confetti"

// Demo tasks data
const weeklyTasks = [
  {
    id: 1,
    title: "Read Genesis Chapter 1",
    description: "Read about how God created the world in 7 days",
    type: "checkbox",
    icon: BookOpen,
    points: 10,
    completed: true,
    category: "bible",
  },
  {
    id: 2,
    title: "Memorize John 3:16",
    description: "Learn this important Bible verse by heart",
    type: "checkbox",
    icon: Heart,
    points: 15,
    completed: true,
    category: "memory",
  },
  {
    id: 3,
    title: "Write a Prayer",
    description: "Write a short prayer thanking God for something",
    type: "short_answer",
    icon: MessageSquare,
    points: 20,
    completed: false,
    category: "prayer",
  },
  {
    id: 4,
    title: "Practice Worship Song",
    description: "Learn the new worship song for Sunday",
    type: "teacher_approved",
    icon: Music,
    points: 15,
    completed: false,
    category: "worship",
  },
  {
    id: 5,
    title: "Draw Your Favorite Bible Story",
    description: "Draw a picture of your favorite Bible story",
    type: "file_upload",
    icon: Camera,
    points: 25,
    completed: false,
    category: "creative",
  },
]

const categories = [
  { id: "all", label: "All Tasks", icon: Star },
  { id: "bible", label: "Bible", icon: BookOpen },
  { id: "memory", label: "Memory", icon: Heart },
  { id: "prayer", label: "Prayer", icon: MessageSquare },
  { id: "worship", label: "Worship", icon: Music },
  { id: "creative", label: "Creative", icon: Camera },
]

export default function ChildTasksPage() {
  const [tasks, setTasks] = useState(weeklyTasks)
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedTask, setSelectedTask] = useState<typeof weeklyTasks[0] | null>(null)
  const [answerText, setAnswerText] = useState("")
  const [showConfetti, setShowConfetti] = useState(false)

  const completedCount = tasks.filter(t => t.completed).length
  const totalPoints = tasks.filter(t => t.completed).reduce((sum, t) => sum + t.points, 0)
  const progressPercent = Math.round((completedCount / tasks.length) * 100)

  const filteredTasks = activeCategory === "all"
    ? tasks
    : tasks.filter(t => t.category === activeCategory)

  const handleCompleteTask = (taskId: number) => {
    setTasks(prev => prev.map(t =>
      t.id === taskId ? { ...t, completed: true } : t
    ))
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 100)
    setSelectedTask(null)
    setAnswerText("")
  }

  const getTaskTypeLabel = (type: string) => {
    switch (type) {
      case "checkbox": return "Check off"
      case "short_answer": return "Write answer"
      case "file_upload": return "Upload photo"
      case "teacher_approved": return "Teacher checks"
      default: return type
    }
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
              <FileText className="w-5 h-5 text-amber-500" />
              My Tasks
            </h1>
            <div className="ml-auto flex items-center gap-2">
              <Badge variant="gold" className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                {totalPoints} pts
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Progress Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card variant="gradient" className="overflow-hidden">
            <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 h-2" />
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">This Week's Progress</h2>
                  <p className="text-sm text-slate-500">
                    {completedCount} of {tasks.length} tasks completed
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-amber-600">{progressPercent}%</div>
                </div>
              </div>
              <Progress value={progressPercent} className="h-3" />
              {progressPercent === 100 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 flex items-center justify-center gap-2 text-green-600"
                >
                  <Trophy className="w-5 h-5" />
                  <span className="font-bold">All tasks completed! Amazing work!</span>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat.id)}
                className="flex-shrink-0 rounded-full"
              >
                <Icon className="w-4 h-4 mr-1" />
                {cat.label}
              </Button>
            )
          })}
        </div>

        {/* Tasks List */}
        <Tabs defaultValue="todo" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="todo" className="flex items-center gap-2">
              <Circle className="w-4 h-4" />
              To Do ({filteredTasks.filter(t => !t.completed).length})
            </TabsTrigger>
            <TabsTrigger value="done" className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Done ({filteredTasks.filter(t => t.completed).length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="todo">
            <div className="space-y-3">
              {filteredTasks.filter(t => !t.completed).map((task, index) => {
                const Icon = task.icon
                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className="cursor-pointer hover:border-amber-300 transition-colors"
                      onClick={() => setSelectedTask(task)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-6 h-6 text-amber-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-slate-800 mb-1">{task.title}</h3>
                            <p className="text-sm text-slate-500 mb-2">{task.description}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                <Clock className="w-3 h-3 mr-1" />
                                {getTaskTypeLabel(task.type)}
                              </Badge>
                              <Badge variant="gold" className="text-xs">
                                <Star className="w-3 h-3 mr-1" />
                                {task.points} pts
                              </Badge>
                            </div>
                          </div>
                          <Circle className="w-6 h-6 text-slate-300 flex-shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}

              {filteredTasks.filter(t => !t.completed).length === 0 && (
                <div className="text-center py-12">
                  <Trophy className="w-16 h-16 text-amber-300 mx-auto mb-4" />
                  <h3 className="font-bold text-slate-600 mb-2">All done!</h3>
                  <p className="text-sm text-slate-400">
                    You've completed all tasks in this category!
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="done">
            <div className="space-y-3">
              {filteredTasks.filter(t => t.completed).map((task, index) => {
                const Icon = task.icon
                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-6 h-6 text-green-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-slate-800 mb-1 line-through opacity-70">
                              {task.title}
                            </h3>
                            <p className="text-sm text-slate-500 mb-2">{task.description}</p>
                            <Badge variant="success" className="text-xs">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Completed +{task.points} pts
                            </Badge>
                          </div>
                          <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}

              {filteredTasks.filter(t => t.completed).length === 0 && (
                <div className="text-center py-12">
                  <Sparkles className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="font-bold text-slate-600 mb-2">No completed tasks yet</h3>
                  <p className="text-sm text-slate-400">
                    Complete tasks to see them here!
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Task Detail Modal */}
      <AnimatePresence>
        {selectedTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center"
            onClick={() => setSelectedTask(null)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full sm:max-w-md"
            >
              <Card className="rounded-t-3xl sm:rounded-xl border-t-4 border-t-amber-400">
                <CardContent className="pt-6 pb-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-4">
                      <selectedTask.icon className="w-8 h-8 text-amber-600" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">{selectedTask.title}</h2>
                    <p className="text-slate-500">{selectedTask.description}</p>
                    <Badge variant="gold" className="mt-3">
                      <Star className="w-3 h-3 mr-1" />
                      Earn {selectedTask.points} points
                    </Badge>
                  </div>

                  {/* Task Input Based on Type */}
                  {selectedTask.type === "short_answer" && (
                    <div className="mb-6">
                      <Textarea
                        placeholder="Write your answer here..."
                        value={answerText}
                        onChange={(e) => setAnswerText(e.target.value)}
                        className="min-h-[120px]"
                      />
                    </div>
                  )}

                  {selectedTask.type === "file_upload" && (
                    <div className="mb-6">
                      <div className="border-2 border-dashed border-amber-200 rounded-xl p-8 text-center bg-amber-50">
                        <Camera className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                        <p className="text-slate-600 font-medium">Tap to upload your drawing</p>
                        <p className="text-sm text-slate-400">Ask a parent to help!</p>
                      </div>
                    </div>
                  )}

                  {selectedTask.type === "teacher_approved" && (
                    <div className="mb-6 bg-blue-50 rounded-xl p-4 text-center">
                      <Award className="w-10 h-10 text-blue-500 mx-auto mb-2" />
                      <p className="text-blue-700 font-medium">Teacher will check this task</p>
                      <p className="text-sm text-blue-500">Practice and ask your teacher to approve!</p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setSelectedTask(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => handleCompleteTask(selectedTask.id)}
                      disabled={selectedTask.type === "short_answer" && !answerText.trim()}
                    >
                      {selectedTask.type === "checkbox" ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Mark Done
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Submit
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around h-16">
            <Link href="/child" className="flex flex-col items-center text-slate-400 hover:text-amber-600">
              <Sparkles className="w-6 h-6" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link href="/child/tasks" className="flex flex-col items-center text-amber-600">
              <FileText className="w-6 h-6" />
              <span className="text-xs mt-1">Tasks</span>
            </Link>
            <Link href="/child/awards" className="flex flex-col items-center text-slate-400 hover:text-amber-600">
              <Trophy className="w-6 h-6" />
              <span className="text-xs mt-1">Awards</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
