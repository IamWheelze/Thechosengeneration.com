"use client"

import React, { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

type ReactionType = "amen" | "clap" | "heart" | "praise" | "star"

interface Reaction {
  id: number
  type: ReactionType
  x: number
  y: number
}

const REACTION_EMOJIS: Record<ReactionType, string> = {
  amen: "🙏",
  clap: "👏",
  heart: "❤️",
  praise: "🙌",
  star: "⭐",
}

interface StickerReactionButtonProps {
  type: ReactionType
  onClick?: () => void
  className?: string
  size?: "sm" | "md" | "lg"
}

export function StickerReactionButton({
  type,
  onClick,
  className,
  size = "md",
}: StickerReactionButtonProps) {
  const [isPressed, setIsPressed] = useState(false)
  const [particles, setParticles] = useState<{ id: number; angle: number }[]>([])
  const idCounter = useRef(0)

  const sizes = {
    sm: "w-8 h-8 text-lg",
    md: "w-12 h-12 text-2xl",
    lg: "w-16 h-16 text-3xl",
  }

  const handleClick = () => {
    setIsPressed(true)
    setTimeout(() => setIsPressed(false), 200)

    // Create particle burst
    const newParticles = Array.from({ length: 6 }, (_, i) => ({
      id: idCounter.current++,
      angle: (i * 60) + Math.random() * 30,
    }))
    setParticles(newParticles)
    setTimeout(() => setParticles([]), 600)

    onClick?.()
  }

  return (
    <div className="relative">
      <motion.button
        onClick={handleClick}
        className={cn(
          "relative rounded-full bg-white shadow-md border-2 border-slate-100 flex items-center justify-center transition-colors hover:border-amber-200 hover:bg-amber-50",
          sizes[size],
          className
        )}
        whileTap={{ scale: 0.9 }}
        animate={isPressed ? { scale: [1, 1.3, 1] } : {}}
      >
        <span>{REACTION_EMOJIS[type]}</span>
      </motion.button>

      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
            animate={{
              scale: [0, 1, 0.5],
              x: Math.cos(particle.angle * (Math.PI / 180)) * 50,
              y: Math.sin(particle.angle * (Math.PI / 180)) * 50,
              opacity: [1, 1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          >
            <span className="text-lg">{REACTION_EMOJIS[type]}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

interface ReactionBarProps {
  onReaction?: (type: ReactionType) => void
  className?: string
}

export function ReactionBar({ onReaction, className }: ReactionBarProps) {
  const reactions: ReactionType[] = ["amen", "clap", "heart", "praise", "star"]

  return (
    <div
      className={cn(
        "flex items-center gap-2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-slate-100",
        className
      )}
    >
      {reactions.map((type) => (
        <StickerReactionButton
          key={type}
          type={type}
          size="sm"
          onClick={() => onReaction?.(type)}
        />
      ))}
    </div>
  )
}

// Floating reactions that rise up
interface FloatingReactionsProps {
  reactions: Reaction[]
  className?: string
}

export function FloatingReactions({ reactions, className }: FloatingReactionsProps) {
  return (
    <div className={cn("fixed inset-0 pointer-events-none overflow-hidden z-50", className)}>
      <AnimatePresence>
        {reactions.map((reaction) => (
          <motion.div
            key={reaction.id}
            initial={{
              x: reaction.x,
              y: reaction.y,
              scale: 0,
              opacity: 1,
            }}
            animate={{
              y: reaction.y - 200,
              scale: [0, 1.5, 1],
              opacity: [1, 1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute text-3xl"
          >
            {REACTION_EMOJIS[reaction.type]}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
