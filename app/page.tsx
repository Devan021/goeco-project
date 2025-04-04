"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Leaf, Wind, Sun, Droplets, Award, TrendingUp, Shield, Recycle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const y = useTransform(scrollY, [0, 300], [0, 100])

  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 hero-gradient">
        <div className="absolute inset-0 z-0">
          <motion.div
            style={{ opacity, y }}
            className="absolute inset-0 bg-gradient-to-b from-green-50 to-transparent dark:from-green-900/20 dark:to-transparent"
          />
        </div>

        <div className="container mx-auto px-4 z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-block px-4 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-primary text-sm font-medium mb-4"
              >
                NATURAL ENVIRONMENT
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              >
                <span className="gradient-text">Be Safe</span> Controls Environment
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-lg"
              >
                Professionally optimize transparent intellectual strategies and connect best practices for a sustainable
                future.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Button size="lg" asChild>
                  <Link href="/service">Let's Talk</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">Read More</Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
            <div className="relative h-[400px] w-full">
  {/* Video Container with Rounded Corners */}
  <div className="h-full w-full rounded-2xl overflow-hidden">
    <video
      src="/eco/eco3.mp4"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="object-cover h-full w-full"
    />
  </div>

  {/* Eco-Friendly Button Placed Outside the Overflow-Hidden Div */}
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
    className="absolute -bottom-6 -right-6 bg-primary text-white p-4 rounded-lg shadow-lg"
  >
    <div className="flex items-center gap-2">
      <Leaf className="h-5 w-5" />
      <span className="font-medium">Eco-Friendly</span>
    </div>
  </motion.div>
</div>

            </motion.div>
          </div>

          <div className="flex justify-center mt-12">
            <div className="flex gap-2">
              {[0, 1, 2].map((index) => (
                <motion.button
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    activeSlide === index ? "w-8 bg-primary" : "w-2 bg-gray-300 dark:bg-gray-700"
                  }`}
                  onClick={() => setActiveSlide(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Ticker */}
      <div className="bg-gray-50 dark:bg-gray-900 py-4 overflow-hidden">
        <div className="ticker-wrapper">
          {[
            { icon: <Droplets className="mr-2 h-5 w-5" />, text: "Ocean-Recycling" },
            { icon: <Leaf className="mr-2 h-5 w-5" />, text: "Environmental" },
            { icon: <Sun className="mr-2 h-5 w-5" />, text: "Renewable-Energy" },
            { icon: <Wind className="mr-2 h-5 w-5" />, text: "Wind-Power" },
            { icon: <Droplets className="mr-2 h-5 w-5" />, text: "Ocean-Recycling" },
            { icon: <Leaf className="mr-2 h-5 w-5" />, text: "Environmental" },
            { icon: <Sun className="mr-2 h-5 w-5" />, text: "Renewable-Energy" },
            { icon: <Wind className="mr-2 h-5 w-5" />, text: "Wind-Power" },
          ].map((item, index) => (
            <div key={index} className="ticker-item">
              {item.icon}
              <span className="font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-[400px] w-full">
                <Image
                  src="/eco/eco1.jpg?height=400&width=400"
                  alt="About GoEco"
                  fill
                  className="object-contain rounded-lg"
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg flex items-center gap-2"
                >
                  <Award className="h-6 w-6 text-yellow-500" />
                  <span className="font-medium">AWARD WINNING</span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-primary text-sm font-medium mb-4"
              >
                ABOUT COMPANY
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Environmental Sustainable Forever Green Future
              </motion.h2>

              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="space-y-6 mt-8"
              >
                <motion.div variants={fadeInUp} className="flex gap-4">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg text-primary">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Economic Benefits</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Alternative innovation and ethical approaches to optimize environmental utilization with
                      transparent growth in a natural state.
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex gap-4">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg text-primary">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Safe Environment</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Alternative innovation and ethical approaches to optimize environmental utilization with
                      transparent growth in a natural state.
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <Button asChild>
                  <Link href="/about">More About</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-primary text-sm font-medium mb-4">
              OUR SERVICES
            </div>
            <h2 className="text-3xl md:text-4xl font-bold max-w-3xl mx-auto">
              GoEco Provides Environment's Best Leading Services
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Recycle />,
                title: "Recycling Solutions",
                description:
                  "Alternative innovation to ethical network environmental utilization with transparent growth in a natural state.",
                image: "/eco/eco1.jpg?height=150&width=220",
              },
              {
                icon: <Shield />,
                title: "Safe Environment",
                description:
                  "Alternative innovation to ethical network environmental utilization with transparent growth in a natural state.",
                image: "/eco/background.jpg?height=150&width=220",
              },
              {
                icon: <Droplets />,
                title: "Cleaning Ocean",
                description:
                  "Alternative innovation to ethical network environmental utilization with transparent growth in a natural state.",
                image: "/eco/eco1.jpg?height=150&width=220",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg text-primary inline-block mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{service.description}</p>
                </div>
                <div className="relative h-[150px] w-full">
                  <Image src={service.image || "/eco/savetheplanet.png"} alt={service.title} fill className="object-cover" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <Button size="lg" asChild>
              <Link href="/service">View All Services</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-primary text-sm font-medium mb-4"
              >
                OUR GOALS
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Getting A Greener Future Safe Environment
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-gray-600 dark:text-gray-400 mb-8"
              >
                Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate
                one-to-one customer service with robust ideas. Dynamically innovate resource-leveling customer service
                for state of the art customer service.
              </motion.p>

              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4 mb-8"
              >
                {[
                  { icon: <CheckCircle className="h-5 w-5 text-primary mr-2" />, text: "Safe Environment" },
                  { icon: <CheckCircle className="h-5 w-5 text-primary mr-2" />, text: "Recycling Solutions" },
                  { icon: <CheckCircle className="h-5 w-5 text-primary mr-2" />, text: "Renewable Energy" },
                  { icon: <CheckCircle className="h-5 w-5 text-primary mr-2" />, text: "Carbon Reduction" },
                ].map((item, index) => (
                  <motion.div key={index} variants={fadeInUp} className="flex items-center">
                    {item.icon}
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="space-y-6"
              >
                <motion.div variants={fadeInUp}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Recycling</span>
                    <span>95%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "95%" }}
                      transition={{ delay: 0.5, duration: 1 }}
                      viewport={{ once: true }}
                      className="progress-bar"
                    />
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Ocean Cleaning</span>
                    <span>80%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "80%" }}
                      transition={{ delay: 0.7, duration: 1 }}
                      viewport={{ once: true }}
                      className="progress-bar"
                    />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-[400px] w-full">
                <Image
                  src="/eco/savetheplanet.png?height=400&width=400"
                  alt="Save the Planet"
                  fill
                  className="object-contain rounded-lg"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute top-10 right-10 bg-primary text-white p-6 rounded-lg shadow-lg transform -rotate-6"
                >
                  <div className="text-center">
                    <div className="text-sm font-medium">SAVE THE</div>
                    <div className="text-2xl font-bold">PLANET</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

