'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX, Pause, Play, User, Users, Mic, Radio } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import image1 from "@/assets/Intro.png"
import image2 from "@/assets/Slide 1.png"
import image3 from "@/assets/Slide 2.png"
import image4 from "@/assets/Slide 3.png"
import image5 from "@/assets/Slide 4.png"
import image6 from "@/assets/Slide 5.png"
import image7 from "@/assets/Slide 6.png"
import image8 from "@/assets/Slide 7.png"
import image9 from "@/assets/Slide 8.png"
import image10 from "@/assets/Slide 9.png"
import image11 from "@/assets/Slide 10.png"
import image12 from "@/assets/Slide 11.png"
import image13 from "@/assets/Slide 12.png"
import image14 from "@/assets/Slide 13 (1).png"
import image15 from "@/assets/Slide 14.png"
import image16 from "@/assets/Slide 15.png"
import maleAvatar from "@/assets/avatar/male.jpg"
import femaleAvatar from "@/assets/avatar/female.jpg"
import confetti from 'canvas-confetti'

const slides = [
  {
    id: 1,
    src: image1,
    alt: "RolechAin Introduction Slide",
    content: "Welcome to RolechAin, the Role Play Agent Infrastructure for Web3. Our platform revolutionizes the way AI agents interact and operate in the decentralized web ecosystem."
  },
  {
    id: 2,
    src: image2,
    alt: "RolechAin AI Agent Infrastructure Slide",
    content: "RolechAin is the cutting-edge AI Agent Infrastructure for Web3. We provide a robust framework where developers and businesses can create, customize, train, and deploy AI agents for any role imaginable in the decentralized landscape."
  },
  {
    id: 3,
    src: image3,
    alt: "RolechAin Create Your Own Role Slide",
    content: "Create Your Own Role-Playing AI Agents with RolechAin. Our platform empowers your community with personalized AI agents that learn, adapt, and automate tasks. Whether you're integrating with existing token systems or building something entirely new, RolechAin has you covered."
  },
  {
    id: 4,
    src: image4,
    alt: "RolechAin Features Overview",
    content: "Discover the key features of RolechAin: Decentralized learning, real-time adaptation, seamless Web3 integration, and customizable AI personalities. Our platform ensures your AI agents are always at the forefront of blockchain technology."
  },
  {
    id: 5,
    src: image5,
    alt: "RolechAin Create Your Own Role Slide",
    content: "Slide 5 content"
  },
  {
    id: 6,
    src: image6,
    alt: "RolechAin Create Your Own Role Slide",
    content: "Slide 6 content"
  },
  {
    id: 7,
    src: image7,
    alt: "RolechAin Create Your Own Role Slide",
    content: "Slide 7 content"
  },
  {
    id: 8,
    src: image8,
    alt: "RolechAin Create Your Own Role Slide",
    content: "Slide 8 content"
  },
  {
    id: 9,
    src: image9,
    alt: "RolechAin Create Your Own Role Slide",
    content: "Slide 9 content"
  },
  {
    id: 10,
    src: image10,
    alt: "RolechAin Create Your Own Role Slide",
    content: "Slide 10 content"
  },
  {
    id: 11,
    src: image11,
    alt: "RolechAin Create Your Own Role Slide",
    content: "Slide 11 content"
  },
  {
    id: 12,
    src: image12,
    alt: "RolechAin Create Your Own Role Slide",
    content: "Slide 12 content"
  },
  {
    id: 13,
    src: image13,
    alt: "RolechAin Create Your Own Role Slide",
    content: "Slide 13 content"
  },
  {
    id: 14,
    src: image14,
    alt: "RolechAin Create Your Own Role Slide",
    content: "Slide 14 content"
  },
  {
    id: 15,
    src: image15,
    alt: "RolechAin Create Your Own Role Slide",
    content: "Slide 15 content"
  },
  {
    id: 16,
    src: image16,
    alt: "RolechAin Final Slide",
    content: "Thank you for exploring RolechAin. Join us in shaping the future of AI agents in Web3. Together, we can create a more intelligent, efficient, and decentralized digital world. Visit our website to learn more and start building your AI agents today."
  },
]

const getVoiceIcon = (voice: SpeechSynthesisVoice) => {
  if (voice.name.toLowerCase().includes('female')) return <User className="h-4 w-4" />;
  if (voice.name.toLowerCase().includes('male')) return <Users className="h-4 w-4" />;
  if (voice.name.toLowerCase().includes('neural')) return <Mic className="h-4 w-4" />;
  return <Radio className="h-4 w-4" />;
};

const getVoiceAvatarFallback = (voice: SpeechSynthesisVoice) => {
  return voice.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

export default function PresentationSlider() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoice, setSelectedVoice] = useState<string>('')
  const speechSynthesis = useRef<SpeechSynthesis | null>(null)
  const speechUtterance = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    speechSynthesis.current = window.speechSynthesis
    speechUtterance.current = new SpeechSynthesisUtterance()

    const loadVoices = () => {
      const availableVoices = speechSynthesis.current?.getVoices() || []
      const englishVoices = availableVoices.filter(voice => voice.lang.startsWith('en-'))

      // More comprehensive detection of male/female voices
      const maleVoice = englishVoices.find(voice =>
        voice.name.toLowerCase().includes('male') ||
        voice.name.toLowerCase().includes('david') ||
        voice.name.toLowerCase().includes('james') ||
        voice.name.toLowerCase().includes('john')
      )

      const femaleVoice = englishVoices.find(voice =>
        voice.name.toLowerCase().includes('female') ||
        voice.name.toLowerCase().includes('zira') ||
        voice.name.toLowerCase().includes('samantha') ||
        voice.name.toLowerCase().includes('susan')
      )

      const selectedVoices = [maleVoice, femaleVoice].filter(Boolean) as SpeechSynthesisVoice[]
      console.log('Available voices:', selectedVoices.map(v => v.name)) // Debug log
      setVoices(selectedVoices)
      if (selectedVoices.length === 0) {
        console.log('No English male/female voices found. Available voices:', availableVoices.map(v => `${v.name} (${v.lang})`))
      }
      if (selectedVoices.length > 0) {
        setSelectedVoice(selectedVoices[0].name)
      }
    }

    loadVoices()
    if (speechSynthesis.current?.onvoiceschanged !== undefined) {
      speechSynthesis.current.onvoiceschanged = loadVoices
    }
  }, [])

  useEffect(() => {
    if (speechUtterance.current && selectedVoice) {
      const voice = voices.find(v => v.name === selectedVoice)
      if (voice) {
        speechUtterance.current.voice = voice
      }
    }
  }, [selectedVoice, voices])

  const speakContent = (content: string) => {
    if (speechSynthesis.current && speechUtterance.current) {
      speechSynthesis.current.cancel()
      speechUtterance.current.text = content
      speechSynthesis.current.speak(speechUtterance.current)
      setIsSpeaking(true)
      setIsPaused(false)
    }
  }

  const toggleSpeech = () => {
    if (isSpeaking) {
      if (isPaused) {
        speechSynthesis.current?.resume()
        setIsPaused(false)
      } else {
        speechSynthesis.current?.pause()
        setIsPaused(true)
      }
    } else {
      speakContent(slides[current].content)
    }
  }

  const stopSpeech = () => {
    speechSynthesis.current?.cancel()
    setIsSpeaking(false)
    setIsPaused(false)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        api?.scrollPrev()
      } else if (e.key === 'ArrowRight' && current < slides.length - 1) {
        api?.scrollNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [api, current])

  useEffect(() => {
    if (!api) return

    api.on('select', () => {
      const newCurrent = api.selectedScrollSnap()
      setCurrent(newCurrent)
      
      // Trigger confetti on the last slide
      if (newCurrent === slides.length - 1) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
      }
    })
  }, [api])

  useEffect(() => {
    if (isSpeaking && !isPaused) {
      speakContent(slides[current].content)
    }
  }, [current])

  const getAvatarSrc = () => {
    const voice = voices.find(v => v.name === selectedVoice)
    if (voice) {
      if (voice.name.toLowerCase().includes('zira')) {
        return femaleAvatar.src
      } else if (voice.name.toLowerCase().includes('david')) {
        return maleAvatar.src
      }
    }
    return maleAvatar.src // Default to male avatar if no specific match is found
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 relative rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted-foreground">
          Slide {current + 1} of {slides.length}
        </div>
        <div className="flex items-center gap-2">
          {voices.length > 0 && (
            <>
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage
                  src={getAvatarSrc()}
                  alt={selectedVoice.toLowerCase().includes('zira') ? "Female voice avatar" : "Male voice avatar"}
                />
                <AvatarFallback>{getVoiceAvatarFallback(voices.find(v => v.name === selectedVoice)!)}</AvatarFallback>
              </Avatar>
              <div className='bg-white rounded-lg'>
              <Select
                value={selectedVoice}
                onValueChange={setSelectedVoice}
              >
                <SelectTrigger className="w-[220px]">
                  <SelectValue>
                    <span className="truncate">{selectedVoice}</span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {voices.map((voice) => (
                    <SelectItem key={voice.name} value={voice.name}>
                      <div className="flex items-center">
                        <span className="truncate">{voice.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              </div>
            </>
          )}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleSpeech}
            aria-label={isSpeaking ? (isPaused ? "Resume speech" : "Pause speech") : "Start speech"}
          >
            {isSpeaking ? (
              isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
          {isSpeaking && (
            <Button
              variant="outline"
              size="icon"
              onClick={stopSpeech}
              aria-label="Stop speech"
            >
              <VolumeX className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          loop: false,
        }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id}>
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-contain"
                  loading={index <= 2 ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  quality={75}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="flex items-center justify-center gap-4 mt-6">
          <CarouselPrevious className="relative sm:absolute left-4 md:-left-6 sm:-translate-y-[250%]" />
          <div className="flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`rounded-full ${
                  current === index
                    ? 'w-3 h-3 bg-primary shadow-sm'
                    : 'w-2 h-2 bg-white hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <CarouselNext className="relative sm:absolute right-4 md:-right-6 sm:-translate-y-[250%]" />
        </div>
      </Carousel>
    </div>
  )
}

