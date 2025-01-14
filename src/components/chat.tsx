"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Send } from 'lucide-react'

interface Message {
  text: string
  isUser: boolean
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isChatOpen, setIsChatOpen] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }])
      setInput("")
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "This is a simulated AI response.", isUser: false }])
      }, 1000)
    }
  }

  const toggleChat = () => setIsChatOpen(!isChatOpen)

  return (
    <>
      {isChatOpen ? (
        <div className="flex flex-col h-[400px] w-[300px] border rounded-lg overflow-hidden bg-white">
          <div className="flex justify-between items-center p-2 border-b">
            <span>Chat</span>
            <button onClick={toggleChat} className="text-red-500">Close</button>
          </div>
          <div className="flex-grow p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg ${
                  message.isUser ? "bg-blue-500 text-white ml-auto" : "bg-gray-200 text-black"
                } max-w-[80%]`}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex p-2 border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow mr-2 px-2 py-1 border rounded"
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <Button onClick={handleSend} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <button onClick={toggleChat} className="text-blue-500">Open Chat</button>
      )}
    </>
  )
}

