import { createSlice } from "@reduxjs/toolkit"
import { fetchWeather } from "../thunks/weatherThunk"

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    weather: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.weather = action.payload
        state.loading = false
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default weatherSlice.reducer

