'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
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


const slides = [
  {
    id: 1,
    src: image1,
    alt: "RolechAin Introduction Slide"
  },
  {
    id: 2,
    src: image2,
    alt: "RolechAin AI Agent Infrastructure Slide"
  },
  {
    id: 3,
    src: image3,
    alt: "RolechAin Create Your Own Role Slide"
  },
  {
    id: 4,
    src: image4,
    alt: "RolechAin Create Your Own Role Slide"
  },
  {
    id: 5,
    src: image5,
    alt: "RolechAin Create Your Own Role Slide"
  },
  {
    id: 6,
    src: image6,
    alt: "RolechAin Create Your Own Role Slide"
  },
  {
    id: 7,
    src: image7,
    alt: "RolechAin Create Your Own Role Slide"
  },
  {
    id: 8,
    src: image8,
    alt: "RolechAin Create Your Own Role Slide"
  },
  {
    id: 9,
    src: image9,
    alt: "RolechAin Create Your Own Role Slide"
  },
  {
    id: 10,
    src: image10,
    alt: "RolechAin Create Your Own Role Slide"
  },
  {
    id: 11,
    src: image11,
    alt: "RolechAin Create Your Own Role Slide"
  },
  {
    id: 12,
    src: image12,
    alt: "RolechAin Create Your Own Role Slide"
  },
  {
    id: 13,
    src: image13,
    alt: "RolechAin Create Your Own Role Slide"
  },
  {
    id: 14,
    src: image14,
    alt: "RolechAin Create Your Own Role Slide"
  },
  {
    id: 15,
    src: image15,
    alt: "RolechAin Create Your Own Role Slide"
  },
  {
    id: 16,
    src: image16,
    alt: "RolechAin Create Your Own Role Slide"
  },
  
]

export default function PresentationSlider() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        api?.scrollPrev()
      } else if (e.key === 'ArrowRight') {
        api?.scrollNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [api])

  // Track current slide
  useEffect(() => {
    if (!api) return

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 relative bg-gradient-to-b from-background via-background/80 to-background rounded-xl">

      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          loop: true,
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
                  className="object-contain "
                  loading={index <= 2 ? "eager" : "lazy"} // Load first 3 images eagerly
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  quality={75}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation controls with better mobile styling */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <CarouselPrevious className="relative sm:absolute left-4 md:-left-6 sm:-translate-y-[250%]" />
          <div className="flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={` rounded-full ${
                  current === index
                    ? 'w-3 h-3 bg-primary shadow-sm'
                    : 'w-2 h-2 bg-primary/30 hover:bg-primary/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <CarouselNext className="relative sm:absolute right-4 md:-right-6 sm:-translate-y-[250%]" />
        </div>
      </Carousel>
      
      {/* Slide counter */}
      <div className="text-center mt-4 text-sm text-muted-foreground">
        Slide {current + 1} of {slides.length}
      </div>
    </div>
  )
}

