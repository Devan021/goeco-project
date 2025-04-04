"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/service", label: "Service" },
  { href: "/work", label: "Work" },
  { href: "/team", label: "Team" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMobile()
  const [activePath, setActivePath] = useState("/")

  useEffect(() => {
    setActivePath(window.location.pathname)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const menuItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 },
  }

  return (
    <motion.header
      variants={headerVariants}
      initial="initial"
      animate="animate"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <motion.div whileHover={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.5 }}>
            <Image src="/eco/logo.png" alt="GoEco Logo" width={50} height={50} className="object-contain" />
          </motion.div>
          <motion.span
            className="text-xl font-bold text-primary hidden sm:inline-block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            GoEco
          </motion.span>
        </Link>

        {!isMobile ? (
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -2 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium relative",
                    activePath === item.href
                      ? "text-primary"
                      : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary",
                  )}
                >
                  {item.label}
                  {activePath === item.href && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button asChild>
                <Link href="/service">Get Started</Link>
              </Button>
            </motion.div>
          </nav>
        ) : (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 dark:text-gray-300"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </motion.button>
        )}

        <AnimatePresence>
          {isOpen && isMobile && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col p-6"
            >
              <div className="flex justify-between items-center mb-8">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <Image src="/eco/logo.png" alt="GoEco Logo" width={40} height={40} />
                  <span className="text-xl font-bold text-primary">GoEco</span>
                </Link>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 dark:text-gray-300"
                >
                  <X size={24} />
                </motion.button>
              </div>

              <nav className="flex flex-col gap-6 mt-8">
                {navItems.map((item) => (
                  <motion.div key={item.href} variants={menuItemVariants} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={item.href}
                      className={cn(
                        "text-lg font-medium block py-2",
                        activePath === item.href ? "text-primary" : "text-gray-700 dark:text-gray-300",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div variants={menuItemVariants} className="mt-4">
                  <Button asChild className="w-full">
                    <Link href="/service" onClick={() => setIsOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}




