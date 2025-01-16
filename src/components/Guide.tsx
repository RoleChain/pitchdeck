'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import chatIcon from '@/assets/avatar/agent.png'
import pauseSlideIcon from '@/assets/avatar/slidepause.png'
import voiceIcon from '@/assets/avatar/voice.png'

const guideSteps = [
  {
    title: 'Chat Interface',
    description: 'Click the chat button to open a conversation with our AI assistant.',
    icon: chatIcon,
  },
  {
    title: 'Slideshow Controls',
    description: 'Use the play/pause button to control the automatic slideshow.',
    icon: pauseSlideIcon,
  },
  {
    title: 'Voice Assistance',
    description: 'Click the voice button to have the slide content read aloud.',
    icon: voiceIcon,
  },
]

export function Guide() {
  const [isOpen, setIsOpen] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const hasSeenGuide = localStorage.getItem('hasSeenGuide')
    if (hasSeenGuide) {
      setIsOpen(false)
    }
  }, [])

  const closeGuide = () => {
    setIsOpen(false)
    localStorage.setItem('hasSeenGuide', 'true')
  }

  const nextStep = () => {
    if (currentStep < guideSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      closeGuide()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-4 right-4 bg-gradient-to-r from-blue-500/80 to-pink-500/80 p-4 rounded-lg shadow-lg z-50 max-w-md mx-auto"
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-white hover:bg-white/20"
            onClick={closeGuide}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="text-white">
            <div className="text-4xl mb-2">
              <img
                src={guideSteps[currentStep].icon.src}
                alt={guideSteps[currentStep].title}
                className="w-12 h-12"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">{guideSteps[currentStep].title}</h3>
            <p className="mb-4">{guideSteps[currentStep].description}</p>
            <div className="flex justify-between items-center">
              <div className="space-x-1">
                {guideSteps.map((_, index) => (
                  <span
                    key={index}
                    className={`inline-block w-2 h-2 rounded-full ${
                      index === currentStep ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
              <Button variant="secondary" onClick={nextStep}>
                {currentStep < guideSteps.length - 1 ? 'Next' : 'Got it'}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


