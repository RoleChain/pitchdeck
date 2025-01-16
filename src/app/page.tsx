// 'use client'

// import { useState, useEffect } from 'react'
// import { motion } from 'framer-motion'
// import PresentationSlider from '@/components/presentation-slider'
// import { ChatInterface } from '@/components/ui/chat-interface'
// import { Guide } from '@/components/Guide'

// function useIsWideScreen() {
//   const [isWideScreen, setIsWideScreen] = useState(false)

//   useEffect(() => {
//     const mediaQuery = window.matchMedia('(min-width: 768px)')
//     setIsWideScreen(mediaQuery.matches)

//     const handleChange = (e: MediaQueryListEvent) => setIsWideScreen(e.matches)
//     mediaQuery.addEventListener('change', handleChange)

//     return () => mediaQuery.removeEventListener('change', handleChange)
//   }, [])

//   return isWideScreen
// }

// export default function Home() {
//   const [isChatOpen, setIsChatOpen] = useState(false)
//   const isWideScreen = useIsWideScreen()

//   return (
//     <main className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#190A1F] overflow-hidden">
//       <motion.div
//         animate={{
//           x: isChatOpen ? (isWideScreen ? -192 : "0%") : "0",
//           y: isChatOpen ? (isWideScreen ? 0 : "-25%") : "0",
//           scale: isChatOpen ? (isWideScreen ? 0.8 : 1) : 1,
//           zIndex: isChatOpen ? (isWideScreen ? 0 : 50) : 0
//         }}
//         className="w-full flex-1 flex items-center justify-center transition-all duration-300"
//       >
//         <PresentationSlider />
//       </motion.div>
//       <ChatInterface 
//         onOpenChange={setIsChatOpen} 
//         className={`${isChatOpen ? 'z-40' : 'z-50'}`}
//       />
//       <Guide />
//     </main>
//   )
// }


 'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import PresentationSlider, { type PresentationSliderRef } from '@/components/presentation-slider'
import { ChatInterface } from '@/components/ui/chat-interface'
import { Guide } from '@/components/Guide'
import { PauseButton } from '@/components/ui/pauseslide'
import { VoiceButton } from "@/components/ui/voice-button"

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
  const presentationRef = useRef<PresentationSliderRef>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const handlePauseClick = () => {
    if (presentationRef.current) {
      presentationRef.current.togglePause()
      setIsPaused(!isPaused)
    }
  }

  const handleVoiceClick = () => {
    if (presentationRef.current) {
      presentationRef.current.toggleSpeech()
      setIsSpeaking(!isSpeaking)
    }
  }

  return (
    <main className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#190A1F] overflow-hidden">
      <div className="fixed top-4 right-4 flex items-center gap-2 z-50">
        <PauseButton
          isPaused={isPaused}
          onClick={handlePauseClick}
          aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}
        />
        <VoiceButton
          onClick={handleVoiceClick}
          isActive={isSpeaking}
          aria-label={isSpeaking ? "Pause speech" : "Start speech"}
        />
      </div>
      <motion.div
        animate={{
          x: isChatOpen ? (isWideScreen ? -192 : "0%") : "0",
          y: isChatOpen ? (isWideScreen ? 0 : "-25%") : "0",
          scale: isChatOpen ? (isWideScreen ? 0.8 : 1) : 1,
          zIndex: isChatOpen ? (isWideScreen ? 0 : 50) : 0
        }}
        className="w-full flex-1 flex items-center justify-center transition-all duration-300"
      >
        <PresentationSlider ref={presentationRef} />
      </motion.div>
      <ChatInterface 
        onOpenChange={setIsChatOpen} 
        className={`${isChatOpen ? 'z-40' : 'z-50'}`}
      />
      <Guide />
    </main>
  )
}

