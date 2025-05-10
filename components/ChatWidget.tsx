"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Message = {
  role: "user" | "assistant"
  content: string
}

type ChatWidgetProps = {
  onClose: () => void
}

export default function ChatWidget({ onClose }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Hi there! How can I help you with your software licenses today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const exampleQuestions = [
    "How do I sell my license?",
    "What types of licenses do you accept?",
    "How long does the process take?",
    "How is the valuation determined?",
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // This is a mock implementation since we don't have actual OpenAI credentials
      // In a real implementation, you would use the AI SDK with proper credentials
      const prompt = `You are a helpful assistant for SoftSell, a software license resale company. 
      Answer the following question about software license reselling: ${input}`

      // Simulate AI response
      setTimeout(() => {
        let response = ""

        if (input.toLowerCase().includes("sell") || input.toLowerCase().includes("how")) {
          response =
            "To sell your software licenses with SoftSell, simply upload your license details through our secure portal. Our team will evaluate them and provide you with a competitive valuation within 24 hours. Once you accept our offer, you'll receive payment within 48 hours."
        } else if (input.toLowerCase().includes("type") || input.toLowerCase().includes("accept")) {
          response =
            "We accept a wide range of software licenses including enterprise software, cloud services, SaaS subscriptions, desktop applications, and more. Our expertise spans across major vendors like Microsoft, Adobe, Oracle, SAP, and many others."
        } else if (input.toLowerCase().includes("time") || input.toLowerCase().includes("long")) {
          response =
            "The entire process typically takes 3-5 business days from submission to payment. Valuation is provided within 24 hours, and once you accept our offer, payment is processed within 48 hours."
        } else if (input.toLowerCase().includes("valuation") || input.toLowerCase().includes("worth")) {
          response =
            "Our valuation is determined by analyzing current market demand, the software's popularity, remaining subscription time, and license type. We leverage our extensive network of buyers to ensure you get the best possible value for your licenses."
        } else {
          response =
            "Thank you for your question. Our team specializes in helping businesses maximize the value of their unused software licenses. Could you provide more details about your specific needs so I can better assist you?"
        }

        const assistantMessage: Message = {
          role: "assistant",
          content: response,
        }

        setMessages((prev) => [...prev, assistantMessage])
        setIsLoading(false)
      }, 1500)
    } catch (error) {
      console.error("Error generating response:", error)
      const errorMessage: Message = {
        role: "assistant",
        content: "I'm sorry, I encountered an error. Please try again later.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleExampleClick = (question: string) => {
    setInput(question)
  }

  return (
    <motion.div
      className="fixed bottom-20 right-6 w-80 sm:w-96 h-[500px] bg-card rounded-xl shadow-xl border z-40 flex flex-col overflow-hidden"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 border-b bg-blue-600 text-white rounded-t-xl flex justify-between items-center">
        <h3 className="font-semibold">SoftSell Assistant</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 rounded-full hover:bg-white/20 text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === "user" ? "bg-blue-600 text-white" : "bg-muted"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-muted p-3 rounded-lg">
              <div className="flex space-x-2">
                <div
                  className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-muted-foreground mb-2">Example questions:</p>
          <div className="flex flex-wrap gap-2">
            {exampleQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs py-1 h-auto"
                onClick={() => handleExampleClick(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-full"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 text-white hover:bg-blue-700 rounded-full"
          >
            <svg
              xmlns="https://img.lovepik.com/png/20231105/chatbot-cartoon-smart-vector-intelligent-technology-agent-assistant_502617_wh1200.png"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
