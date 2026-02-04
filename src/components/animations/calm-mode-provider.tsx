"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"

interface CalmModeContextType {
  calmMode: boolean
  toggleCalmMode: () => void
  setCalmMode: (value: boolean) => void
  reducedMotion: boolean
}

const CalmModeContext = createContext<CalmModeContextType | undefined>(undefined)

export function CalmModeProvider({ children }: { children: React.ReactNode }) {
  const [calmMode, setCalmModeState] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  // Check for system preference on mount
  useEffect(() => {
    // Check localStorage first
    const savedPreference = localStorage.getItem("calm-mode")
    if (savedPreference !== null) {
      setCalmModeState(savedPreference === "true")
    }

    // Check system prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Apply calm mode class to body
  useEffect(() => {
    if (calmMode || reducedMotion) {
      document.body.classList.add("calm-mode")
    } else {
      document.body.classList.remove("calm-mode")
    }
  }, [calmMode, reducedMotion])

  const toggleCalmMode = useCallback(() => {
    setCalmModeState((prev) => {
      const newValue = !prev
      localStorage.setItem("calm-mode", String(newValue))
      return newValue
    })
  }, [])

  const setCalmMode = useCallback((value: boolean) => {
    setCalmModeState(value)
    localStorage.setItem("calm-mode", String(value))
  }, [])

  return (
    <CalmModeContext.Provider
      value={{ calmMode, toggleCalmMode, setCalmMode, reducedMotion }}
    >
      {children}
    </CalmModeContext.Provider>
  )
}

export function useCalmMode() {
  const context = useContext(CalmModeContext)
  if (context === undefined) {
    throw new Error("useCalmMode must be used within a CalmModeProvider")
  }
  return context
}

// Calm mode toggle component
export function CalmModeToggle({ className }: { className?: string }) {
  const { calmMode, toggleCalmMode, reducedMotion } = useCalmMode()

  return (
    <button
      onClick={toggleCalmMode}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
        calmMode || reducedMotion
          ? "bg-slate-100 text-slate-600"
          : "bg-amber-50 text-amber-700"
      } ${className}`}
      aria-label={calmMode ? "Disable calm mode" : "Enable calm mode"}
    >
      {calmMode || reducedMotion ? (
        <>
          <span className="text-lg">🌙</span>
          <span className="text-sm font-medium">Calm Mode</span>
        </>
      ) : (
        <>
          <span className="text-lg">✨</span>
          <span className="text-sm font-medium">Fun Mode</span>
        </>
      )}
    </button>
  )
}
