"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Heart,
  Calendar,
  MapPin,
  Filter,
} from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StaggerContainer, StaggerItem } from "@/components/animations/page-transition"

// Demo gallery data - will be replaced with Supabase data
const galleryItems = [
  {
    id: 1,
    type: "image",
    src: "/images/gallery/worship-1.jpg",
    title: "Sunday Worship Session",
    description: "Children lifting their hands in praise during our Sunday worship service",
    category: "worship",
    date: "Feb 23, 2026",
    location: "Jos, Nigeria",
  },
  {
    id: 2,
    type: "image",
    src: "/images/gallery/bible-study-1.jpg",
    title: "Bible Study Class",
    description: "Foundation School 1 students learning about the book of Genesis",
    category: "classes",
    date: "Feb 20, 2026",
    location: "Jos, Nigeria",
  },
  {
    id: 3,
    type: "image",
    src: "/images/gallery/prayer-1.jpg",
    title: "Morning Prayer Session",
    description: "Children gathered for early morning prayers",
    category: "prayer",
    date: "Feb 18, 2026",
    location: "Delta State, Nigeria",
  },
  {
    id: 4,
    type: "image",
    src: "/images/gallery/camp-1.jpg",
    title: "Annual Children's Camp",
    description: "70+ children gathered for our annual 3-day Bible camp",
    category: "events",
    date: "Jan 15, 2026",
    location: "Jos, Nigeria",
  },
  {
    id: 5,
    type: "image",
    src: "/images/gallery/music-1.jpg",
    title: "Music Training",
    description: "Children learning to play instruments for worship",
    category: "worship",
    date: "Feb 10, 2026",
    location: "Senegal",
  },
  {
    id: 6,
    type: "image",
    src: "/images/gallery/graduation-1.jpg",
    title: "FS1 Graduation Ceremony",
    description: "Students graduating from Foundation School 1 to Foundation School 2",
    category: "events",
    date: "Dec 20, 2025",
    location: "Jos, Nigeria",
  },
  {
    id: 7,
    type: "image",
    src: "/images/gallery/outdoor-1.jpg",
    title: "Outdoor Fellowship",
    description: "Children enjoying fellowship time during our outdoor program",
    category: "events",
    date: "Feb 5, 2026",
    location: "Delta State, Nigeria",
  },
  {
    id: 8,
    type: "image",
    src: "/images/gallery/testimony-1.jpg",
    title: "Testimony Time",
    description: "A child sharing their testimony of God's goodness",
    category: "classes",
    date: "Jan 28, 2026",
    location: "Jos, Nigeria",
  },
]

const categories = [
  { id: "all", label: "All Photos" },
  { id: "worship", label: "Worship" },
  { id: "classes", label: "Classes" },
  { id: "prayer", label: "Prayer" },
  { id: "events", label: "Events" },
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null)
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredItems = activeCategory === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory)

  const navigateImage = (direction: "prev" | "next") => {
    if (!selectedImage) return
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id)
    let newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1
    if (newIndex < 0) newIndex = filteredItems.length - 1
    if (newIndex >= filteredItems.length) newIndex = 0
    setSelectedImage(filteredItems[newIndex])
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-500 opacity-90" />
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <Badge variant="gold" className="mb-4">
              <Camera className="w-4 h-4 mr-1" />
              Photo Gallery
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Capturing God's Work
            </h1>
            <p className="text-xl text-amber-100 max-w-2xl mx-auto">
              Moments of worship, learning, prayer, and fellowship from our Bible school ministry
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className="rounded-full"
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Gallery Grid */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <StaggerItem key={item.id}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="cursor-pointer group"
                  onClick={() => setSelectedImage(item)}
                >
                  <Card className="overflow-hidden h-full">
                    <div className="relative aspect-[4/3] bg-slate-200">
                      {/* Placeholder for actual images */}
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100">
                        <Camera className="w-12 h-12 text-amber-300" />
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                            <Play className="w-5 h-5 text-amber-600 ml-1" />
                          </div>
                        </motion.div>
                      </div>
                      <Badge
                        variant="secondary"
                        className="absolute top-2 right-2 text-xs"
                      >
                        {item.category}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-slate-800 mb-1 line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-500 line-clamp-2 mb-2">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {item.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <Camera className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No photos yet</h3>
              <p className="text-slate-500">Photos will be added soon!</p>
            </div>
          )}

          {/* Upload CTA for Ministry */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Card className="max-w-xl mx-auto bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
              <CardContent className="py-8">
                <Camera className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Share Your Moments
                </h3>
                <p className="text-slate-600 mb-4">
                  Parents and teachers can share photos through the portal.
                  All photos are reviewed before being published.
                </p>
                <Button asChild>
                  <a href="/login">Login to Upload</a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Navigation buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation()
                navigateImage("prev")
              }}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation()
                navigateImage("next")
              }}
            >
              <ChevronRight className="w-8 h-8" />
            </Button>

            {/* Image content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl mx-auto px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video bg-slate-800 rounded-lg overflow-hidden mb-4">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-800 to-orange-800">
                  <Camera className="w-24 h-24 text-amber-500/50" />
                </div>
              </div>
              <div className="text-center text-white">
                <h2 className="text-2xl font-bold mb-2">{selectedImage.title}</h2>
                <p className="text-slate-300 mb-4">{selectedImage.description}</p>
                <div className="flex items-center justify-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {selectedImage.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {selectedImage.location}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
