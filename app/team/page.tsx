"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Linkedin, Github, Twitter } from "lucide-react"

export default function TeamPage() {
  const teamMembers = [
    {
      id: 1,
      name: "Tannu Choudhary",
      role: "MCA 1st Year @IGDTUW",
      image: "/eco/tannu.jpeg",
      social: [
        { platform: "linkedin", url: "https://LinkedIn.com/in/tchoudhary1611", icon: <Linkedin className="h-5 w-5" /> },
        { platform: "github", url: "https://GitHub.com/tannuiscoding", icon: <Github className="h-5 w-5" /> },
        { platform: "twitter", url: "https://x.com/tannuiscoding", icon: <Twitter className="h-5 w-5" /> },
      ],
    },
    {
      id: 2,
      name: "Mansi",
      role: "MCA 1st Year @IGDTUW",
      image: "/eco/mansi.jpeg",
      social: [
        {
          platform: "linkedin",
          url: "https://www.linkedin.com/in/mansi-b4533b203/",
          icon: <Linkedin className="h-5 w-5" />,
        },
        { platform: "github", url: "https://github.com/MansiJangid", icon: <Github className="h-5 w-5" /> },
      ],
    },
    {
      id: 3,
      name: "Ritika Sharma",
      role: "MCA 1st Year @IGDTUW",
      image: "/eco/ritika.jpeg",
      social: [
        {
          platform: "linkedin",
          url: "https://www.linkedin.com/in/ritika-sharma-075863184",
          icon: <Linkedin className="h-5 w-5" />,
        },
        { platform: "github", url: "https://github.com/Ritika0077", icon: <Github className="h-5 w-5" /> },
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

  const socialVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
    hover: {
      scale: 1.2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
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
              <span className="gradient-text">Team Members</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Meet the talented individuals behind GoEco who are passionate about creating a sustainable future.
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
              >
                <div className="relative h-80 w-full overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{member.role}</p>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Follow Us:</h4>
                  <div className="flex justify-center gap-4">
                    {member.social.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={socialVariants}
                        whileHover="hover"
                        className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-primary/10 transition-colors"
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

