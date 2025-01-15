import { Pause, Play } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from "@/lib/utils"

interface PauseButtonProps {
  isPaused: boolean
  onClick: () => void
  className?: string
}

export function PauseButton({ isPaused, onClick, className }: PauseButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "relative h-12 w-12  bg-black/50 text-white shadow-lg items-center justify-center rounded-full",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 opacity-75"
        initial={{ scale: 1 }}
        animate={{ scale: isPaused ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 1, repeat: isPaused ? Infinity : 0 }}
      />
      {isPaused ? (
        <Play className="h-5 w-5 relative z-10 top-0 left-4" />
      ) : (
        <Pause className="h-5 w-5 relative z-10 top-0 left-4" />
      )}
    </motion.button>
  )
}

