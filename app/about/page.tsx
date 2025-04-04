"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Sun, Wind, Droplets, Leaf, Flame } from "lucide-react"

export default function AboutPage() {
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

  const energySources = [
    {
      id: "solar",
      title: "Solar Energy",
      icon: <Sun className="h-8 w-8 text-yellow-500" />,
      description:
        "Solar energy harnesses power from the sun's radiation. This energy can be converted into electricity or heat using technologies like solar panels (photovoltaic cells) and solar thermal systems.",
      systems: [
        "Photovoltaic (PV) Systems: Convert sunlight directly into electricity.",
        "Solar Thermal Systems: Capture heat from the sun to heat water or air for residential and industrial use.",
      ],
      advantages: [
        "Abundant and available worldwide.",
        "Low operational costs after installation.",
        "Scalable from small homes to large power plants.",
      ],
      challenges: [
        "Intermittent availability (only during the day or when the weather is clear).",
        "Requires significant space for large installations.",
      ],
    },
    {
      id: "wind",
      title: "Wind Energy",
      icon: <Wind className="h-8 w-8 text-blue-500" />,
      description:
        "Wind energy is captured by turbines that convert the kinetic energy from wind into electricity. Wind farms can be onshore (land) or offshore (water).",
      systems: [],
      advantages: [
        "Produces no emissions during operation.",
        "Suitable for large-scale power generation.",
        "Can be combined with other land uses, such as agriculture.",
      ],
      challenges: [
        "Wind is variable and intermittent.",
        "Turbines can be noisy and impact landscapes.",
        "Concerns about the effect on wildlife, especially birds and bats.",
      ],
    },
    {
      id: "hydro",
      title: "Hydropower",
      icon: <Droplets className="h-8 w-8 text-blue-600" />,
      description:
        "Hydropower uses the energy of moving water (rivers, waterfalls, tides) to generate electricity. It is one of the most established renewable energy sources.",
      systems: [],
      advantages: [
        "Reliable and capable of generating large amounts of electricity.",
        "Provides water storage and flood control benefits.",
        "Can produce power continuously (baseload energy).",
      ],
      challenges: [
        "Can disrupt local ecosystems and displace communities.",
        "Requires large amounts of water and specific geographic conditions.",
      ],
    },
    {
      id: "biomass",
      title: "Biomass Energy",
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      description:
        "Biomass energy comes from organic materials like plants, wood, agricultural residues, and waste. Biomass can be burned directly or converted into biofuels or biogas.",
      systems: [],
      advantages: [
        "Utilizes waste products and reduces landfill use.",
        "Can be converted into liquid fuels for transportation.",
        "Carbon-neutral if managed sustainably.",
      ],
      challenges: [
        "Can lead to deforestation if not managed sustainably.",
        "May emit air pollutants if not properly controlled.",
        "Requires large land areas for growing biomass feedstock.",
      ],
    },
    {
      id: "geothermal",
      title: "Geothermal Energy",
      icon: <Flame className="h-8 w-8 text-orange-500" />,
      description:
        "Geothermal energy taps into heat from the Earth's core to generate electricity or provide direct heating by accessing underground reservoirs of hot water and steam.",
      systems: [],
      advantages: [
        "Provides continuous (baseload) energy, unlike solar or wind.",
        "Low emissions compared to fossil fuels.",
        "Small land footprint.",
      ],
      challenges: [
        "Limited to areas with significant geothermal activity.",
        "High upfront costs for exploration and infrastructure development.",
        "Can release small amounts of harmful gases trapped beneath the earth's surface.",
      ],
    },
  ]

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Renewable</span>
              <br />
              <span className="gradient-text">Energy Sources</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg">
              Discover sustainable energy solutions that power our future while protecting our planet.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {energySources.map((source, index) => (
              <motion.div
                key={source.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="relative h-[300px] w-full rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={`/eco/solar.jpg?height=300&width=500&text=${source.title}`}
                      alt={source.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-6 flex items-center gap-3">
                        {source.icon}
                        <h2 className="text-2xl font-bold text-white">{source.title}</h2>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <motion.div variants={fadeInUp} className="flex items-center gap-3">
                    {source.icon}
                    <h2 className="text-3xl font-bold">{source.title}</h2>
                  </motion.div>

                  <motion.p variants={fadeInUp} className="text-gray-600 dark:text-gray-300">
                    {source.description}
                  </motion.p>

                  {source.systems.length > 0 && (
                    <motion.div variants={fadeInUp}>
                      <h3 className="text-xl font-semibold mb-3">Systems:</h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                        {source.systems.map((system, i) => (
                          <li key={i}>{system}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  <motion.div variants={fadeInUp}>
                    <h3 className="text-xl font-semibold mb-3">Advantages:</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                      {source.advantages.map((advantage, i) => (
                        <li key={i}>{advantage}</li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <h3 className="text-xl font-semibold mb-3">Challenges:</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                      {source.challenges.map((challenge, i) => (
                        <li key={i}>{challenge}</li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

