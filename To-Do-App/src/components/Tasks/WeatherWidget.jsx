import { useState } from "react"
import "../../styles/components/tasks.css"

const WeatherWidget = ({ weather, loading, error }) => {
  const sunnyIcon="https://w7.pngwing.com/pngs/860/247/png-transparent-weather-clouds-sun-sunny-weather-color-icon.png"
  const rainyIcon="https://w7.pngwing.com/pngs/270/45/png-transparent-cloud-heavy-rain-rain-weather-weather-flat-icon.png"
  const clearIcon="https://cdn-icons-png.flaticon.com/512/3222/3222791.png"
  const cloudyIcon="https://www.svgrepo.com/show/311442/weather-cloudy.svg"

  if (loading) {
    return <div className="weather-widget loading">Loading weather data...</div>
  }

  if (error) {
    return <div className="weather-widget error">Unable to load weather data</div>
  }

  if (!weather) {
    return null
  }

  const getWeatherIcon=(weather)=>{
    const { main } = weather

    if (main.includes("Rain") || main.includes("Drizzle") || main.includes("Thunderstorm")) {
      return rainyIcon
    } else if (main.includes("snow")) {
      return ""
    } else if (main.includes("Clear")) {
      return clearIcon
    }
   else if (main.includes("Sunny")) {
    return sunnyIcon
    }
     else if (main.includes("cloudy") || main.includes("Cloudy")) {
      return cloudyIcon
    } else {
      return "Check weather conditions before outdoor tasks."
    }
  }

  const getWeatherAdvice = (weather) => {
    const { main } = weather
    
    if (main.includes("Rain") || main.includes("Drizzle") || main.includes("Thunderstorm")) {
      return "Consider rescheduling outdoor tasks due to rain."
    } else if (main.includes("snow")) {
      return "Snow conditions may affect outdoor tasks."
    } else if (main.includes("Clear Sky")) {
      return "Great weather for outdoor activities!"
    } 
    else if(main.includes("Sunny")){
      return "It's Sunny Out there"
    }
    else if (main.includes("cloudy")) {
      return "Partly cloudy, good for most outdoor tasks."
    } else {
      return "Check weather conditions before outdoor tasks."
    }
  }

  return (
    <div className="weather-widget">
      <div className="weather-info">
        <img
          src={getWeatherIcon(weather)}
          alt={weather.description}
          className="weather-icon"
        />
        <div className="weather-details">
          <h3>{weather.location}</h3>
          <p className="temperature">{Math.round(weather.temp)}°C</p>
          <p className="description">{weather.description}</p>
          <p className="advice">{getWeatherAdvice(weather)}</p>
        </div>
      </div>
    </div>
  )
}

export default WeatherWidget

