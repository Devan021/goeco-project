"use client"

import { motion } from "framer-motion"
import { Sun, Wind, Flame, Droplets } from "lucide-react"

export default function WorkPage() {
  const energyPartners = [
    {
      category: "Solar Energy",
      icon: <Sun className="h-6 w-6" />,
      color: "from-yellow-400 to-orange-500",
      partners: [
        { name: "Tesla Energy", description: "Solar Power Solutions" },
        { name: "Adani Solar", description: "Solar Manufacturing" },
        { name: "Vikram Solar", description: "PV Technology" },
      ],
    },
    {
      category: "Wind Energy",
      icon: <Wind className="h-6 w-6" />,
      color: "from-blue-400 to-cyan-500",
      partners: [
        { name: "Suzlon Energy", description: "Wind Turbine Manufacturing" },
        { name: "Envision Energy", description: "Smart Wind Solutions" },
        { name: "Enercon", description: "Wind Energy Systems" },
        { name: "Vestas Wind Systems", description: "Wind Power Solutions" },
      ],
    },
    {
      category: "Geothermal Energy",
      icon: <Flame className="h-6 w-6" />,
      color: "from-red-400 to-orange-500",
      partners: [
        { name: "Enel GreenPower", description: "Geothermal Solutions" },
        { name: "KenGen", description: "Geothermal Power" },
        { name: "Cyrq Energy", description: "Geothermal Plants" },
        { name: "Mitsubishi Energy", description: "Geothermal Technology" },
      ],
    },
    {
      category: "Water Energy",
      icon: <Droplets className="h-6 w-6" />,
      color: "from-blue-500 to-indigo-600",
      partners: [
        { name: "Tata Power", description: "Hydroelectric Solutions" },
        { name: "Voith Hydro", description: "Hydro Technology" },
        { name: "SN Power", description: "Hydropower Generation" },
        { name: "Verdant Power", description: "Marine Energy Systems" },
      ],
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
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const partnerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <div className="pt-24 pb-16">
      <section className="py-12 md:py-20 bg-gradient-to-b from-green-50 to-white dark:from-green-900/20 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Our Energy Partners</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Collaborating with industry leaders for a sustainable future
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {energyPartners.map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
              >
                <div className={`bg-gradient-to-r ${category.color} p-6 flex items-center gap-3`}>
                  <div className="bg-white/20 p-3 rounded-full text-white">{category.icon}</div>
                  <h3 className="text-2xl font-bold text-white">{category.category}</h3>
                </div>
                <div className="p-6">
                  <motion.ul variants={containerVariants} className="space-y-6">
                    {category.partners.map((partner, idx) => (
                      <motion.li
                        key={idx}
                        variants={partnerVariants}
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-4 border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0 last:pb-0"
                      >
                        <div className="bg-gray-100 dark:bg-gray-700 h-10 w-10 rounded-full flex items-center justify-center text-primary">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold">{partner.name}</h4>
                          <p className="text-gray-600 dark:text-gray-400">{partner.description}</p>
                        </div>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

