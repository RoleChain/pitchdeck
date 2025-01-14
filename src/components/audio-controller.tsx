"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { RotateCcw, Play, Pause, RotateCw, MessageCircle } from 'lucide-react'

interface AudioControlsProps {
  isPlaying: boolean
  onPlayPause: () => void
  onRewind: () => void
  onForward: () => void
  currentSpeed: number
  onSpeedChange: () => void
  onChatToggle: () => void
  avatarUrl?: string
}

export function AudioControls({
  isPlaying,
  onPlayPause,
  onRewind,
  onForward,
  currentSpeed,
  onSpeedChange,
  onChatToggle,
  avatarUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-10%20at%204.54.51%20PM-HMZfF0nAjSuLCLJYY9unFx1oUab8Cf.jpeg"
}: AudioControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-6">
      <Avatar className="w-12 h-12 border-2 border-border">
        <AvatarImage src={avatarUrl} alt="Agent avatar" />
        <AvatarFallback>AI</AvatarFallback>
      </Avatar>
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onRewind}
          className="rounded-full"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>

        <Button
          variant="default"
          size="icon"
          onClick={onPlayPause}
          className="rounded-full bg-blue-600 hover:bg-blue-700 h-10 w-10"
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 ml-0.5" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onForward}
          className="rounded-full"
        >
          <RotateCw className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onSpeedChange}
          className="text-sm font-medium"
        >
          {currentSpeed}x
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onChatToggle}
          className="rounded-full"
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

