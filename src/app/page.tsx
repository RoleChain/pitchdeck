'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PresentationSlider from '@/components/presentation-slider'
import { ChatInterface } from '@/components/ui/chat-interface'

function useIsWideScreen() {
  const [isWideScreen, setIsWideScreen] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')
    setIsWideScreen(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setIsWideScreen(e.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return isWideScreen
}

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const isWideScreen = useIsWideScreen()

  return (
    <main className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#190A1F] overflow-hidden">
      <motion.div
        animate={{
          x: isChatOpen ? (isWideScreen ? -192 : "0%") : "0",
          y: isChatOpen ? (isWideScreen ? 0 : "-25%") : "0",
          scale: isChatOpen ? (isWideScreen ? 0.8 : 1) : 1,
          zIndex: isChatOpen ? (isWideScreen ? 0 : 50) : 0
        }}
        className="w-full flex-1 flex items-center justify-center transition-all duration-300"
      >
        <PresentationSlider />
      </motion.div>
      <ChatInterface 
        onOpenChange={setIsChatOpen} 
        className={`${isChatOpen ? 'z-40' : 'z-50'}`}
      />
    </main>
  )
}

