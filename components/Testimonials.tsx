"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO",
      company: "TechNova Solutions",
      image: "/placeholder.png?height=100&width=100",
      content:
        "SoftSell helped us recover over $50,000 from unused enterprise software licenses. Their valuation was spot on, and the entire process was completed within a week. Highly recommended for any business looking to optimize their software assets.",
    },
    {
      name: "Michael Chen",
      role: "IT Director",
      company: "Global Innovations Inc.",
      image: "/placeholder.png?height=100&width=100",
      content:
        "After downsizing our operations, we had numerous unused licenses. SoftSell not only found buyers quickly but also secured prices that were 30% higher than what we expected. Their expertise in the software resale market is unmatched.",
    },
    {
      name: "Ravi Kumar",
      role: "Head of IT Procurement",
      company: "Infosync Technologies, Bengaluru",
      image: "/placeholder.png?height=100&width=100",
      content:
        "With hundreds of unused licenses post-upgrade, we approached SoftSell. Within days, they helped us liquidate assets worth ₹30 lakhs. Their Indian support team was efficient and well-versed in compliance.",
    },
    {
      name: "Neha Shah",
      role: "CIO",
      company: "GreenEdge Solutions, Mumbai",
      image: "/placeholder.png?height=100&width=100",
      content:
        "SoftSell gave us an excellent resale value for our surplus Microsoft licenses. Their platform is transparent and tailored to Indian enterprise needs. We saved both time and operational cost.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="testimonials" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="text-center mb-16">
          <h2 className="section-heading">
            What Our <span className="blue-gradient-text">Clients Say</span>
          </h2>
          <p className="section-subheading">
            Don't just take our word for it. Here's what businesses like yours have to say about SoftSell.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full card-hover">
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-6">
                      <svg
                        width="45"
                        height="36"
                        viewBox="0 0 45 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-blue-300"
                      >
                        <path
                          d="M13.5 36H0V24C0 17.6348 1.6875 12.4922 5.0625 8.5723C8.4375 4.6523 13.2188 2.0508 19.4062 0.7676L21.9375 6.8848C17.9062 7.7441 14.7656 9.3223 12.5156 11.6191C10.2656 13.916 9.0312 16.7402 8.8125 20.0918H13.5V36ZM38.0625 36H24.5625V24C24.5625 17.6348 26.25 12.4922 29.625 8.5723C33 4.6523 37.7812 2.0508 44 0.7676L46.5312 6.8848C42.5 7.7441 39.3594 9.3223 37.1094 11.6191C34.8594 13.916 33.625 16.7402 33.375 20.0918H38.0625V36Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <p className="text-lg mb-6 flex-grow">{testimonial.content}</p>
                    <div className="flex items-center">
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage src={testimonial.image || "/placeholder.png"} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <div className="h-2 w-2 rounded-full bg-blue-300"></div>
            <div className="h-2 w-2 rounded-full bg-blue-300"></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
