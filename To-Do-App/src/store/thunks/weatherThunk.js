import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchWeatherData } from "../../services/weatherApi"

export const fetchWeather = createAsyncThunk("weather/fetchWeather", async ({ lat, lon }, { rejectWithValue }) => {
  try {
    const data = await fetchWeatherData(lat, lon)
    console.log(data)
    return {
      location: data.city,
      temp: data.temperature,
      humidity: data.humidity,
      description: data.weather_description,
      main: data.forecast[0].weather_description,
      
    }
  } catch (error) {
    console.log(error)
    return rejectWithValue(error.message || "Failed to fetch weather data")
  }
})

