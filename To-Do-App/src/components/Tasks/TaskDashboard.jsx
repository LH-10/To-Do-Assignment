import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import TaskInput from "./TaskInput"
import TaskList from "./TaskList"
import WeatherWidget from "./WeatherWidget"
import { fetchWeather } from "../../store/thunks/weatherThunk"
import "../../styles/components/tasks.css"

const TaskDashboard = () => {
  const { tasks } = useSelector((state) => state.tasks)
  const { weather, loading: weatherLoading, error: weatherError } = useSelector((state) => state.weather)
  const dispatch = useDispatch()

  useEffect(() => {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       const { latitude, longitude } = position.coords
    //       dispatch(fetchWeather({ lat: latitude, lon: longitude }))
    //     },
    //     (error) => {
    //       console.error("Error getting location:", error)
    //       // Default to a location if geolocation fails
    //       dispatch(fetchWeather({ lat: 40.7128, lon: -74.006 })) // New York
    //     },
    //   )
    // } else {
      // Default to a location if geolocation is not supported
      dispatch(fetchWeather({ lat: 40.7128, lon: -74.006 })) // New York
    // }
  }, [dispatch])

  return (
    <div className="task-dashboard">
      <div className="dashboard-header">
        <h2>Your Tasks</h2>
        <WeatherWidget weather={weather} loading={weatherLoading} error={weatherError} />
      </div>
      <TaskInput />
      <TaskList tasks={tasks} />
    </div>
  )
}

export default TaskDashboard

