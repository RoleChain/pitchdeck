"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader2, X } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader } from './card'
import { Textarea } from './textarea'
import Agent from '@/assets/avatar/agent.png'
import Image from 'next/image'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

interface ChatInterfaceProps {
  onOpenChange?: (isOpen: boolean) => void
  className?: string
}

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowWidth
}

export function ChatInterface({ onOpenChange, className }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const windowWidth = useWindowWidth()
  const isMobile = windowWidth <= 767

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    onOpenChange?.(isOpen)
  }, [isOpen, onOpenChange])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thank you for your question . I'll help guide you through....",
        role: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 2000)
  }

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-black text-amber-400 shadow-lg",
          className
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-pink-400/20"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="text-2xl"><Image src={Agent || "/placeholder.svg"} alt="Token" className="w-10 h-10" /></span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : "100%", y: isMobile ? "100%" : 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: isMobile ? 0 : "100%", y: isMobile ? "100%" : 0 }}
            className="fixed md:bottom-24 bottom-0 md:right-6 right-0 z-50 w-full md:w-96 md:h-[75vh] h-[50vh]"
           
          >
            <Card className="border-amber-400/20 bg-gradient-to-b from-blue-500/60 to-pink-500/60 md:rounded-lg rounded-t-lg md:rounded-b-lg h-full flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-amber-400/20 p-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/avatar.jpg" alt="AI Assistant" />
                      <AvatarFallback className="bg-zinc-800 text-amber-400">AI</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-zinc-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-400">Assistant</h3>
                    <p className="text-xs text-amber-400/70">Always here to help</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-amber-400 hover:text-amber-500 bg-zinc-800 rounded-full hover:bg-zinc-800/50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>

              <CardContent className="flex-grow overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex w-full",
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div
                        className={cn(
                          "rounded-lg px-4 py-2 max-w-[80%] break-words",
                          message.role === 'user'
                            ? 'bg-amber-400 text-black'
                            : 'bg-zinc-800 text-amber-400'
                        )}
                      >
                        {message.content}
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-amber-400">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Typing...</span>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              <CardFooter className="border-t border-amber-400/20 p-4">
                <form onSubmit={handleSubmit} className="flex w-full gap-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask your query..."
                    className="min-h-[50px] max-h-[100px] bg-zinc-800 border-amber-400/20 text-amber-400 placeholder:text-amber-400/50 focus-visible:ring-amber-400"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSubmit(e)
                      }
                    }}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="h-[57px] w-[50px] bg-zinc-800 text-amber-400 "
                    disabled={!input.trim() || isTyping}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}



