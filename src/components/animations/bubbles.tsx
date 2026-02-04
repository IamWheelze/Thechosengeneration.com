"use client"

import React, { useEffect, useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface Bubble {
  id: number
  x: number
  size: number
  color: string
  duration: number
}

const BUBBLE_COLORS = [
  "rgba(251, 191, 36, 0.4)", // Amber
  "rgba(168, 85, 247, 0.3)", // Purple
  "rgba(59, 130, 246, 0.3)", // Blue
  "rgba(34, 197, 94, 0.3)", // Green
  "rgba(236, 72, 153, 0.3)", // Pink
]

const random = (min: number, max: number) => Math.random() * (max - min) + min

interface BubblesBackgroundProps {
  count?: number
  className?: string
}

export function BubblesBackground({
  count = 15,
  className,
}: BubblesBackgroundProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const idCounter = useRef(0)

  const createBubble = useCallback((): Bubble => {
    return {
      id: idCounter.current++,
      x: random(0, 100),
      size: random(20, 80),
      color: BUBBLE_COLORS[Math.floor(random(0, BUBBLE_COLORS.length))],
      duration: random(8, 15),
    }
  }, [])

  useEffect(() => {
    // Initial bubbles
    const initialBubbles = Array.from({ length: count }, createBubble)
    setBubbles(initialBubbles)

    // Continuous bubble generation
    const interval = setInterval(() => {
      setBubbles((prev) => {
        if (prev.length >= count * 1.5) {
          return [...prev.slice(1), createBubble()]
        }
        return [...prev, createBubble()]
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [count, createBubble])

  return (
    <div
      className={cn(
        "fixed inset-0 pointer-events-none overflow-hidden z-0 hide-in-calm",
        className
      )}
    >
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            initial={{
              bottom: -100,
              left: `${bubble.x}%`,
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              bottom: "110%",
              opacity: [0, 0.7, 0.7, 0],
              scale: [0.5, 1, 1, 0.8],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: bubble.duration,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              width: bubble.size,
              height: bubble.size,
              borderRadius: "50%",
              background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), ${bubble.color})`,
              boxShadow: "inset 0 0 10px rgba(255,255,255,0.5)",
            }}
            onAnimationComplete={() => {
              setBubbles((prev) => prev.filter((b) => b.id !== bubble.id))
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

// Interactive bubble burst on click/tap
interface BubbleBurstProps {
  children: React.ReactNode
  className?: string
  burstCount?: number
}

export function BubbleBurst({
  children,
  className,
  burstCount = 6,
}: BubbleBurstProps) {
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([])
  const idCounter = useRef(0)

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newBurst = {
      id: idCounter.current++,
      x,
      y,
    }
    setBursts((prev) => [...prev, newBurst])

    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== newBurst.id))
    }, 1000)
  }

  return (
    <div
      className={cn("relative cursor-pointer", className)}
      onClick={handleClick}
    >
      {children}
      <AnimatePresence>
        {bursts.map((burst) => (
          <div
            key={burst.id}
            className="absolute pointer-events-none"
            style={{ left: burst.x, top: burst.y }}
          >
            {Array.from({ length: burstCount }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i * 360) / burstCount * (Math.PI / 180)) * 40,
                  y: Math.sin((i * 360) / burstCount * (Math.PI / 180)) * 40,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: BUBBLE_COLORS[i % BUBBLE_COLORS.length],
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}
