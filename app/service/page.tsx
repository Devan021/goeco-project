"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Wind, Cloud, Thermometer, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"

export default function ServicePage() {
  const [formData, setFormData] = useState({
    city: "",
    state: "",
    sunshine_hours: "",
    power_requirement: "10",
    electricity_rate: "8",
    is_near_water: false,
    is_geothermal_region: false,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [results, setResults] = useState(null)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      try {
        // Mock response data
        const mockResults = {
          weather: {
            temperature: 28.5,
            wind_speed: 4.2,
            cloud_cover: 15,
            condition: "Sunny",
          },
          energy_sources: [
            {
              name: "Solar Energy",
              efficiency: 85.5,
              description: "Solar energy is highly recommended for your location due to abundant sunshine hours.",
              cost_benefit: {
                installation_cost: 350000,
                annual_savings: 48000,
                government_incentives: 75000,
                roi: 18.5,
                payback_period: 5.4,
                carbon_reduction: 12.8,
              },
            },
            {
              name: "Wind Energy",
              efficiency: 65.2,
              description: "Wind energy is a viable option with moderate efficiency in your region.",
              cost_benefit: {
                installation_cost: 420000,
                annual_savings: 38000,
                government_incentives: 60000,
                roi: 14.2,
                payback_period: 7.1,
                carbon_reduction: 10.5,
              },
            },
            {
              name: "Hydropower",
              efficiency: formData.is_near_water ? 78.4 : 25.3,
              description: formData.is_near_water
                ? "With your proximity to water sources, hydropower is an excellent option."
                : "Limited water sources in your area make hydropower less efficient.",
              cost_benefit: formData.is_near_water
                ? {
                    installation_cost: 520000,
                    annual_savings: 52000,
                    government_incentives: 85000,
                    roi: 16.8,
                    payback_period: 6.2,
                    carbon_reduction: 14.2,
                  }
                : null,
            },
          ],
        }

        setResults(mockResults)
      } catch (err) {
        setError("An unexpected error occurred. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }, 1500)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Renewable</span>
              <br />
              <span className="gradient-text">Energy Source Recommender</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Find your optimal renewable energy solution based on your location and requirements.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6 md:p-8 lg:p-10">
                <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6 text-center">
                  Find Your Optimal Renewable Energy Solution
                </motion.h2>

                <motion.form variants={containerVariants} onSubmit={handleSubmit} className="space-y-6">
                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city">City Name</Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="Enter City Name"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Select
                        id="state"
                        name="state"
                        value={formData.state}
                        onValueChange={(value) => setFormData({ ...formData, state: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="sunshine_hours">Sunshine Hours (0-24)</Label>
                      <Input
                        id="sunshine_hours"
                        name="sunshine_hours"
                        type="number"
                        min="0"
                        max="24"
                        placeholder="Enter Sunshine Hours"
                        value={formData.sunshine_hours}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="power_requirement">Power Requirement (kW)</Label>
                      <Input
                        id="power_requirement"
                        name="power_requirement"
                        type="number"
                        min="1"
                        placeholder="Power Requirement"
                        value={formData.power_requirement}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="electricity_rate">Electricity Rate (₹/kWh)</Label>
                      <Input
                        id="electricity_rate"
                        name="electricity_rate"
                        type="number"
                        min="1"
                        placeholder="Electricity Rate"
                        value={formData.electricity_rate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="is_near_water"
                        name="is_near_water"
                        checked={formData.is_near_water}
                        onCheckedChange={(checked) => setFormData({ ...formData, is_near_water: checked })}
                      />
                      <Label htmlFor="is_near_water">Near Water Source</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="is_geothermal_region"
                        name="is_geothermal_region"
                        checked={formData.is_geothermal_region}
                        onCheckedChange={(checked) => setFormData({ ...formData, is_geothermal_region: checked })}
                      />
                      <Label htmlFor="is_geothermal_region">In Geothermal Region</Label>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="pt-4">
                    <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          >
                            <Sun className="h-4 w-4" />
                          </motion.div>
                          Analyzing...
                        </span>
                      ) : (
                        "Find Renewable Energy Sources"
                      )}
                    </Button>
                  </motion.div>
                </motion.form>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg flex items-center gap-2"
                    >
                      <AlertCircle className="h-5 w-5" />
                      <p>{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {results && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="p-6 md:p-8 lg:p-10">
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl font-bold mb-6"
                      >
                        Current Weather Conditions
                      </motion.h3>

                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
                      >
                        <motion.div
                          variants={itemVariants}
                          className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg text-center"
                        >
                          <Thermometer className="h-8 w-8 mx-auto mb-2 text-red-500" />
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Temperature</h4>
                          <p className="text-xl font-bold">{results.weather.temperature}°C</p>
                        </motion.div>

                        <motion.div
                          variants={itemVariants}
                          className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg text-center"
                        >
                          <Wind className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Wind Speed</h4>
                          <p className="text-xl font-bold">{results.weather.wind_speed.toFixed(1)} m/s</p>
                        </motion.div>

                        <motion.div
                          variants={itemVariants}
                          className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg text-center"
                        >
                          <Cloud className="h-8 w-8 mx-auto mb-2 text-gray-500" />
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Cloud Cover</h4>
                          <p className="text-xl font-bold">{results.weather.cloud_cover}%</p>
                        </motion.div>

                        <motion.div
                          variants={itemVariants}
                          className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg text-center"
                        >
                          <Sun className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Condition</h4>
                          <p className="text-xl font-bold">{results.weather.condition}</p>
                        </motion.div>
                      </motion.div>

                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl font-bold mb-6"
                      >
                        Recommended Energy Sources
                      </motion.h3>

                      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                        {results.energy_sources.map((source, index) => (
                          <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm"
                          >
                            <div className="p-6">
                              <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold">{source.name}</h3>
                                <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                                  <span className="text-sm font-medium">
                                    Efficiency: {source.efficiency.toFixed(1)}%
                                  </span>
                                </div>
                              </div>

                              <div className="mb-4 bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${source.efficiency}%` }}
                                  transition={{ delay: 0.6 + index * 0.2, duration: 1 }}
                                  className="h-full bg-primary rounded-full"
                                />
                              </div>

                              <p className="text-gray-600 dark:text-gray-300 mb-6">{source.description}</p>

                              {source.cost_benefit && (
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    Cost-Benefit Analysis
                                  </h4>

                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <Card>
                                      <CardContent className="p-4">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Installation Cost</p>
                                        <p className="text-lg font-bold">
                                          ₹{source.cost_benefit.installation_cost.toLocaleString("en-IN")}
                                        </p>
                                      </CardContent>
                                    </Card>

                                    <Card>
                                      <CardContent className="p-4">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Annual Savings</p>
                                        <p className="text-lg font-bold text-green-600">
                                          ₹{source.cost_benefit.annual_savings.toLocaleString("en-IN")}
                                        </p>
                                      </CardContent>
                                    </Card>

                                    <Card>
                                      <CardContent className="p-4">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Govt. Incentives</p>
                                        <p className="text-lg font-bold text-blue-600">
                                          ₹{source.cost_benefit.government_incentives.toLocaleString("en-IN")}
                                        </p>
                                      </CardContent>
                                    </Card>

                                    <Card>
                                      <CardContent className="p-4">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">ROI</p>
                                        <p className="text-lg font-bold">{source.cost_benefit.roi}%</p>
                                      </CardContent>
                                    </Card>

                                    <Card>
                                      <CardContent className="p-4">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Payback Period</p>
                                        <p className="text-lg font-bold">{source.cost_benefit.payback_period} years</p>
                                      </CardContent>
                                    </Card>

                                    <Card>
                                      <CardContent className="p-4">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Carbon Reduction</p>
                                        <p className="text-lg font-bold text-green-600">
                                          {source.cost_benefit.carbon_reduction} tons/year
                                        </p>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

