"use client"

import { motion } from "framer-motion"

type NavigationProps = {
  activeSection: string
}

export default function Navigation({ activeSection }: NavigationProps) {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "how-it-works", label: "Process" },
    { id: "why-us", label: "Benefits" },
    { id: "testimonials", label: "Clients" },
    { id: "contact", label: "Contact" },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.div
      className="nav-indicator hidden md:flex"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {navItems.map((item) => (
        <motion.div
          key={item.id}
          className="nav-item relative cursor-pointer"
          onClick={() => scrollToSection(item.id)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className={`nav-dot ${activeSection === item.id ? "active" : ""}`} />
          <div className="nav-label font-medium text-sm">{item.label}</div>
        </motion.div>
      ))}
    </motion.div>
  )
}
