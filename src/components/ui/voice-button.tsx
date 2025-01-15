
"use client"

import { cn } from "@/lib/utils"
import { EarOff, AudioLines } from 'lucide-react'
import { motion, HTMLMotionProps } from "framer-motion"

interface VoiceButtonProps extends HTMLMotionProps<"button"> {
  isActive?: boolean
}

export function VoiceButton({
  className,
  isActive,
  ...props
}: VoiceButtonProps) {
  return (
    <motion.button
      className={cn(
        "relative flex h-12 w-12 items-center justify-center rounded-full",
        "bg-gradient-to-r from-blue-500 to-pink-500  text-white shadow-lg",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {isActive && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 1 }}
          animate={{
            scale: [1, 1.2, 1.2, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["50%", "50%", "20%", "50%", "50%"],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1
          }}
        >
          <div className="h-full w-full rounded-full bg-gradient-to-r from-blue-500 to-pink-500 " />
        </motion.div>
      )}
      {isActive ? (
        <AudioLines className="h-5 w-5 relative z-10" />
      ) : (
        <EarOff className="h-5 w-5 relative z-10" />
      )}
    </motion.button>
  )
}

