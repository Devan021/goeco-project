import { Chart } from "@/components/ui/chart"
$(document).ready(() => {
  // Mobile menu toggle
  $(".mobile-toggle").click(function () {
    $(this).toggleClass("active")
    $("nav").toggleClass("active")
  })

  // Initialize ScrollReveal
  const sr = ScrollReveal({
    origin: "bottom",
    distance: "30px",
    duration: 1000,
    reset: false,
  })

  sr.reveal(".weather-card", { interval: 200 })
  sr.reveal(".energy-card", { interval: 300 })

  // Form submission
  $("#energyForm").on("submit", function (event) {
    event.preventDefault()
    const formData = $(this).serialize()

    // Hide error message and results
    $(".error-message").hide()
    $(".results-container").hide()
    $(".no-results").hide()

    // Show loading indicator
    $(".loading-indicator").fadeIn()
    $(".btn").prop("disabled", true)

    // Send AJAX request
    $.post("/predict", formData)
      .done((data) => {
        // Update location info
        $(".location-text").text(`${data.city}, ${data.state}`)

        // Update weather information
        $(".temperature").text(data.weather.temperature.toFixed(1) + "°C")
        $(".wind-speed").text(data.weather.wind_speed.toFixed(1) + " m/s")
        $(".cloud-cover").text(data.weather.cloud_cover + "%")
        $(".condition").text(capitalizeFirstLetter(data.weather.condition))

        // Update weather card icons based on conditions
        updateWeatherIcons(data.weather.condition)

        // Handle energy sources
        const energySourcesContainer = $(".energy-sources")
        energySourcesContainer.empty()

        if (data.energy_sources && data.energy_sources.length > 0) {
          // Create comparison chart
          createComparisonChart(data.energy_sources)

          // Create energy source cards
          data.energy_sources.forEach((source) => {
            const energyCard = createEnergyCard(source)
            energySourcesContainer.append(energyCard)

            // Animate efficiency fill after a short delay
            setTimeout(() => {
              energyCard.find(".efficiency-fill").css("width", `${source.efficiency}%`)
            }, 300)
          })

          $(".results-container").fadeIn()
        } else {
          $(".no-results").fadeIn()
          $(".results-container").fadeIn()
        }
      })
      .fail((jqXHR) => {
        const errorMessage = jqXHR.responseJSON?.error || "An unexpected error occurred. Please try again."
        $(".error-message").text(errorMessage).fadeIn()
      })
      .always(() => {
        $(".loading-indicator").hide()
        $(".btn").prop("disabled", false)

        // Scroll to results
        if ($(".results-container").is(":visible")) {
          $("html, body").animate(
            {
              scrollTop: $(".results-container").offset().top - 100,
            },
            800,
          )
        }
      })
  })

  // Helper function to create energy card
  function createEnergyCard(source) {
    let iconClass = "fa-sun"
    let iconColor = "#f59e0b" // Yellow for solar

    if (source.name === "Wind Energy") {
      iconClass = "fa-wind"
      iconColor = "#3b82f6" // Blue for wind
    } else if (source.name === "Hydropower") {
      iconClass = "fa-water"
      iconColor = "#0ea5e9" // Light blue for hydro
    } else if (source.name === "Geothermal Energy") {
      iconClass = "fa-fire"
      iconColor = "#ef4444" // Red for geothermal
    }

    const card = $('<div class="energy-card">')

    // Card header
    const header = $('<div class="energy-card-header">')
    header.html(`
            <h3><i class="fas ${iconClass}" style="color: ${iconColor}"></i> ${source.name}</h3>
            <div class="efficiency-badge">${source.efficiency.toFixed(1)}% Efficiency</div>
        `)

    // Card body
    const body = $('<div class="energy-card-body">')

    // Efficiency meter
    const efficiencyMeter = $(`
            <div class="efficiency-meter">
                <div class="efficiency-fill" style="width: 0%"></div>
            </div>
        `)

    // Description
    const description = $(`
            <div class="energy-card-description">
                <p>${source.description}</p>
            </div>
        `)

    body.append(efficiencyMeter, description)

    // Cost-benefit analysis
    if (source.cost_benefit) {
      const costBenefit = $(`
                <div class="cost-benefit-section">
                    <h4><i class="fas fa-chart-line"></i> Cost-Benefit Analysis</h4>
                    <div class="cost-benefit-grid">
                        <div class="cost-item">
                            <p>Installation Cost</p>
                            <div class="value">₹${source.cost_benefit.installation_cost.toLocaleString("en-IN")}</div>
                        </div>
                        <div class="cost-item">
                            <p>Annual Savings</p>
                            <div class="value" style="color: var(--success-color)">₹${source.cost_benefit.annual_savings.toLocaleString("en-IN")}</div>
                        </div>
                        <div class="cost-item">
                            <p>Govt. Incentives</p>
                            <div class="value" style="color: var(--secondary-color)">₹${source.cost_benefit.government_incentives.toLocaleString("en-IN")}</div>
                        </div>
                        <div class="cost-item">
                            <p>ROI</p>
                            <div class="value">${source.cost_benefit.roi}%</div>
                        </div>
                        <div class="cost-item">
                            <p>Payback Period</p>
                            <div class="value">${source.cost_benefit.payback_period} years</div>
                        </div>
                        <div class="cost-item">
                            <p>Carbon Reduction</p>
                            <div class="value" style="color: var(--success-color)">${source.cost_benefit.carbon_reduction} tons/year</div>
                        </div>
                    </div>
                </div>
            `)

      body.append(costBenefit)
    }

    card.append(header, body)
    return card
  }

  // Create comparison chart
  function createComparisonChart(energySources) {
    const ctx = document.getElementById("efficiencyChart").getContext("2d")

    // Destroy existing chart if it exists
    if (window.efficiencyChart) {
      window.efficiencyChart.destroy()
    }

    // Prepare data
    const labels = energySources.map((source) => source.name)
    const efficiencyData = energySources.map((source) => source.efficiency)
    const roiData = energySources.map((source) => (source.cost_benefit ? source.cost_benefit.roi : 0))

    // Set colors based on energy type
    const backgroundColors = energySources.map((source) => {
      if (source.name === "Solar Energy") return "rgba(245, 158, 11, 0.7)"
      if (source.name === "Wind Energy") return "rgba(59, 130, 246, 0.7)"
      if (source.name === "Hydropower") return "rgba(14, 165, 233, 0.7)"
      if (source.name === "Geothermal Energy") return "rgba(239, 68, 68, 0.7)"
      return "rgba(16, 185, 129, 0.7)"
    })

    const borderColors = energySources.map((source) => {
      if (source.name === "Solar Energy") return "rgb(245, 158, 11)"
      if (source.name === "Wind Energy") return "rgb(59, 130, 246)"
      if (source.name === "Hydropower") return "rgb(14, 165, 233)"
      if (source.name === "Geothermal Energy") return "rgb(239, 68, 68)"
      return "rgb(16, 185, 129)"
    })

    // Create chart
    window.efficiencyChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Efficiency (%)",
            data: efficiencyData,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1,
          },
          {
            label: "ROI (%)",
            data: roiData,
            backgroundColor: "rgba(16, 185, 129, 0.5)",
            borderColor: "rgb(16, 185, 129)",
            borderWidth: 1,
            type: "line",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Percentage (%)",
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                let label = context.dataset.label || ""
                if (label) {
                  label += ": "
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y.toFixed(1) + "%"
                }
                return label
              },
            },
          },
        },
      },
    })
  }

  // Update weather icons based on condition
  function updateWeatherIcons(condition) {
    condition = condition.toLowerCase()

    if (condition.includes("sun") || condition.includes("clear")) {
      $(".weather-card:nth-child(1) i").removeClass().addClass("fas fa-thermometer-half text-red-500")
      $(".weather-card:nth-child(3) i").removeClass().addClass("fas fa-cloud text-gray-400")
      $(".weather-card:nth-child(4) i").removeClass().addClass("fas fa-sun text-yellow-500")
    } else if (condition.includes("cloud")) {
      $(".weather-card:nth-child(3) i").removeClass().addClass("fas fa-cloud text-blue-400")
      $(".weather-card:nth-child(4) i").removeClass().addClass("fas fa-cloud-sun text-blue-500")
    } else if (condition.includes("rain") || condition.includes("drizzle")) {
      $(".weather-card:nth-child(3) i").removeClass().addClass("fas fa-cloud-rain text-blue-500")
      $(".weather-card:nth-child(4) i").removeClass().addClass("fas fa-cloud-rain text-blue-600")
    } else if (condition.includes("storm") || condition.includes("thunder")) {
      $(".weather-card:nth-child(3) i").removeClass().addClass("fas fa-cloud-showers-heavy text-blue-700")
      $(".weather-card:nth-child(4) i").removeClass().addClass("fas fa-bolt text-yellow-500")
    } else if (condition.includes("snow")) {
      $(".weather-card:nth-child(3) i").removeClass().addClass("fas fa-snowflake text-blue-300")
      $(".weather-card:nth-child(4) i").removeClass().addClass("fas fa-snowflake text-blue-300")
    } else if (condition.includes("fog") || condition.includes("mist")) {
      $(".weather-card:nth-child(3) i").removeClass().addClass("fas fa-smog text-gray-500")
      $(".weather-card:nth-child(4) i").removeClass().addClass("fas fa-smog text-gray-500")
    }

    // Wind icon is always the same
    $(".weather-card:nth-child(2) i").removeClass().addClass("fas fa-wind text-blue-500")
  }

  // Helper function to capitalize first letter
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
})

