"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Leaf, Wind, Sun, Droplets } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-16 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Image src="/eco/logo.png" alt="GoEco Logo" width={40} height={40} />
              <span className="text-xl font-bold text-primary">GoEco</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Providing sustainable solutions for a greener future. We help identify and reduce carbon emissions through
              innovative technologies.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: "#4267B2" }}
                className="text-gray-500 hover:text-primary"
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: "#1DA1F2" }}
                className="text-gray-500 hover:text-primary"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: "#E1306C" }}
                className="text-gray-500 hover:text-primary"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: "#0077B5" }}
                className="text-gray-500 hover:text-primary"
              >
                <Linkedin size={20} />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/service", label: "Services" },
                { href: "/work", label: "Our Partners" },
                { href: "/team", label: "Team" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Energy Solutions</h3>
            <ul className="space-y-2">
              {[
                { icon: <Sun size={16} />, label: "Solar Energy" },
                { icon: <Wind size={16} />, label: "Wind Energy" },
                { icon: <Droplets size={16} />, label: "Hydropower" },
                { icon: <Leaf size={16} />, label: "Biomass Energy" },
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-primary">{item.icon}</span>
                  <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">IGDTUW, Kashmere Gate, Delhi, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">contact@goeco.com</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-gray-200 dark:border-gray-800 py-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {currentYear} GoEco. All rights reserved. Designed with
            <span className="inline-block mx-1">❤️</span>
            for a sustainable future.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

