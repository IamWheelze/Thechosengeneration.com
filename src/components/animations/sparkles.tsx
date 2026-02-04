"use client"

import React, { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface Sparkle {
  id: string
  createdAt: number
  color: string
  size: number
  style: {
    top: string
    left: string
  }
}

const DEFAULT_COLOR = "#FFC700"

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min

const generateSparkle = (color: string): Sparkle => {
  return {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    color,
    size: random(10, 20),
    style: {
      top: random(0, 100) + "%",
      left: random(0, 100) + "%",
    },
  }
}

const SparkleInstance = ({ color, size, style }: Omit<Sparkle, "id" | "createdAt">) => {
  return (
    <motion.svg
      initial={{ scale: 0, rotate: 0, opacity: 0 }}
      animate={{ scale: 1, rotate: 180, opacity: 1 }}
      exit={{ scale: 0, rotate: 360, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      style={{
        position: "absolute",
        pointerEvents: "none",
        ...style,
      }}
    >
      <path
        d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
        fill={color}
      />
    </motion.svg>
  )
}

interface SparklesProps {
  children: React.ReactNode
  color?: string
  className?: string
  count?: number
  minDelay?: number
  maxDelay?: number
}

export function Sparkles({
  children,
  color = DEFAULT_COLOR,
  className,
  count = 3,
  minDelay = 50,
  maxDelay = 500,
}: SparklesProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  const addSparkle = useCallback(() => {
    const sparkle = generateSparkle(color)
    setSparkles((prev) => [...prev, sparkle])
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== sparkle.id))
    }, 750)
  }, [color])

  useEffect(() => {
    const intervalId = setInterval(() => {
      addSparkle()
    }, random(minDelay, maxDelay))
    return () => clearInterval(intervalId)
  }, [addSparkle, minDelay, maxDelay])

  return (
    <span className={cn("relative inline-block", className)}>
      <AnimatePresence>
        {sparkles.slice(0, count).map((sparkle) => (
          <SparkleInstance
            key={sparkle.id}
            color={sparkle.color}
            size={sparkle.size}
            style={sparkle.style}
          />
        ))}
      </AnimatePresence>
      <span className="relative z-10">{children}</span>
    </span>
  )
}

// On-demand sparkle burst for celebrations
interface SparklesBurstProps {
  active: boolean
  count?: number
  colors?: string[]
  className?: string
}

export function SparklesBurst({
  active,
  count = 12,
  colors = ["#FFC700", "#FF69B4", "#00BFFF", "#00FF7F", "#9370DB"],
  className,
}: SparklesBurstProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    if (active) {
      const newSparkles = Array.from({ length: count }, () =>
        generateSparkle(colors[random(0, colors.length)])
      )
      setSparkles(newSparkles)
      setTimeout(() => setSparkles([]), 1000)
    }
  }, [active, count, colors])

  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <SparkleInstance
            key={sparkle.id}
            color={sparkle.color}
            size={sparkle.size}
            style={sparkle.style}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
