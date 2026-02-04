"use client"

import React, { useEffect, useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface ConfettiPiece {
  id: number
  x: number
  color: string
  delay: number
  rotation: number
  size: number
}

const COLORS = [
  "#FFC700", // Gold
  "#FF69B4", // Pink
  "#00BFFF", // Blue
  "#00FF7F", // Green
  "#9370DB", // Purple
  "#FF6347", // Coral
  "#FFD700", // Yellow
]

const random = (min: number, max: number) => Math.random() * (max - min) + min

interface ConfettiProps {
  active: boolean
  count?: number
  duration?: number
  className?: string
}

export function Confetti({
  active,
  count = 50,
  duration = 3000,
  className,
}: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])
  const timeoutRef = useRef<NodeJS.Timeout>()

  const generatePieces = useCallback(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: random(0, 100),
      color: COLORS[Math.floor(random(0, COLORS.length))],
      delay: random(0, 0.5),
      rotation: random(0, 360),
      size: random(8, 14),
    }))
  }, [count])

  useEffect(() => {
    if (active) {
      setPieces(generatePieces())
      timeoutRef.current = setTimeout(() => {
        setPieces([])
      }, duration)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [active, generatePieces, duration])

  return (
    <div
      className={cn(
        "fixed inset-0 pointer-events-none z-50 overflow-hidden hide-in-calm",
        className
      )}
    >
      <AnimatePresence>
        {pieces.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{
              y: -20,
              x: `${piece.x}vw`,
              rotate: 0,
              opacity: 1,
            }}
            animate={{
              y: "100vh",
              rotate: piece.rotation + 720,
              opacity: [1, 1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: random(2, 4),
              delay: piece.delay,
              ease: [0.23, 1, 0.32, 1],
            }}
            style={{
              position: "absolute",
              width: piece.size,
              height: piece.size * 0.6,
              backgroundColor: piece.color,
              borderRadius: "2px",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

// Celebration confetti with multiple bursts
interface CelebrationConfettiProps {
  active: boolean
  bursts?: number
  className?: string
}

export function CelebrationConfetti({
  active,
  bursts = 3,
  className,
}: CelebrationConfettiProps) {
  const [activeBursts, setActiveBursts] = useState<number[]>([])

  useEffect(() => {
    if (active) {
      const burstIds: number[] = []
      for (let i = 0; i < bursts; i++) {
        setTimeout(() => {
          setActiveBursts((prev) => [...prev, i])
          setTimeout(() => {
            setActiveBursts((prev) => prev.filter((id) => id !== i))
          }, 3500)
        }, i * 400)
        burstIds.push(i)
      }
    }
  }, [active, bursts])

  return (
    <>
      {activeBursts.map((burstId) => (
        <Confetti key={burstId} active={true} count={30} className={className} />
      ))}
    </>
  )
}
