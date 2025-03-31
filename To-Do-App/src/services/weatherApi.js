export const fetchWeatherData = async (lat, lon) => {
  try {
   
    const Now=new Date()
    const     hours=Now.getHours()
    console.log(hours)
    const randomId = Math.floor( Math.random() + hours) + 1
    const response = await fetch(
      `https://www.freetestapi.com/api/v1/weathers/${randomId}`,
    )

    if (!response.ok) {
      throw new Error("Weather data fetch failed")
    }
    const modifiedResponse={}
    return await response.json()
  } catch (error) {
    console.error("Error fetching weather data:", error)
    return getMockWeatherData()
  }
}

const getMockWeatherData = () => {
  const weatherConditions = [
    {
      main: { temp: 22, feels_like: 23, humidity: 65 },
      weather: [{ main: "Clear", description: "clear sky", icon: "01d" }],
      name: "Sample City",
    },
    {
      main: { temp: 18, feels_like: 17, humidity: 75 },
      weather: [{ main: "Clouds", description: "scattered clouds", icon: "03d" }],
      name: "Sample City",
    },
    {
      main: { temp: 15, feels_like: 14, humidity: 85 },
      weather: [{ main: "Rain", description: "light rain", icon: "10d" }],
      name: "Sample City",
    },
  ]

  return weatherConditions[Math.floor(Math.random() * weatherConditions.length)]
}


// export const fetchWeatherData = async () => {
//   try {
//     const Now=new Date()
//     hours=Now.getHours()
//     console.log(hours)
//     const randomId = Math.floor(Math.random() * 50) + 1

//     const response = await fetch(`https://freetestapi.com/api/v1/weathers/${randomId}`)

//     if (!response.ok) {
//       throw new Error("Weather data fetch failed")
//     }

//     const data = await response.json()

//     return {
//       main: {
//         temp: data.temperature,
//         humidity: data.humidity,
//       },
//       weather: [
//         {
//           main: getWeatherMain(data.weather_description),
//           description: data.weather_description,
//           icon: getWeatherIcon(data.weather_description),
//         },
//       ],
//       name: data.city,
//       sys: { country: data.country },
//       wind: { speed: data.wind_speed },
//       forecast: data.forecast,
//     }
//   } catch (error) {
//     console.error("Error fetching weather data:", error)
//     return getMockWeatherData()
//   }
// }

// // Helper function to determine weather main category from description
// const getWeatherMain = (description) => {
//   description = description.toLowerCase()

//   if (description.includes("clear") || description.includes("sunny")) {
//     return "Clear"
//   } else if (description.includes("cloud")) {
//     return "Clouds"
//   } else if (description.includes("rain") || description.includes("drizzle") || description.includes("shower")) {
//     return "Rain"
//   } else if (description.includes("snow")) {
//     return "Snow"
//   } else if (description.includes("thunder") || description.includes("storm")) {
//     return "Thunderstorm"
//   } else if (description.includes("fog") || description.includes("mist") || description.includes("haze")) {
//     return "Fog"
//   } else {
//     return "Other"
//   }
// }

// const getWeatherIcon = (description) => {
//   description = description.toLowerCase()

//   if (description.includes("clear") || description.includes("sunny")) {
//     return "01d"
//   } else if (description.includes("partly cloudy")) {
//     return "02d"
//   } else if (description.includes("cloud")) {
//     return "03d"
//   } else if (description.includes("rain") || description.includes("shower")) {
//     return "10d"
//   } else if (description.includes("thunder") || description.includes("storm")) {
//     return "11d"
//   } else if (description.includes("snow")) {
//     return "13d"
//   } else if (description.includes("fog") || description.includes("mist") || description.includes("haze")) {
//     return "50d"
//   } else {
//     return "01d" // Default icon
//   }
// }

// const getMockWeatherData = () => {
//   const weatherConditions = [
//     {
//       main: { temp: 22, feels_like: 23, humidity: 65 },
//       weather: [{ main: "Clear", description: "clear sky", icon: "01d" }],
//       name: "Sample City",
//       sys: { country: "US" },
//       wind: { speed: 10 },
//     },
//     {
//       main: { temp: 18, feels_like: 17, humidity: 75 },
//       weather: [{ main: "Clouds", description: "scattered clouds", icon: "03d" }],
//       name: "Sample City",
//       sys: { country: "US" },
//       wind: { speed: 8 },
//     },
//     {
//       main: { temp: 15, feels_like: 14, humidity: 85 },
//       weather: [{ main: "Rain", description: "light rain", icon: "10d" }],
//       name: "Sample City",
//       sys: { country: "US" },
//       wind: { speed: 12 },
//     },
//  ]

//   return weatherConditions[Math.floor(Math.random() * weatherConditions.length)]
// }

