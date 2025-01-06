'use client'

import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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
import image14 from "@/assets/Slide 13.png"
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
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <Carousel className="w-full">
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-center gap-2 mt-4">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  )
}

