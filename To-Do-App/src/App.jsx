
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Header from "./components/Layout/Header"
import Footer from "./components/Layout/Footer"
import Login from "./components/Auth/Login"
import TaskDashboard from "./components/Tasks/TaskDashboard"
import { loadTasks } from "./store/slices/taskSlice"
import { checkAuthState } from "./store/slices/authSlice"

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuthState())
  }, [dispatch])

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      dispatch(loadTasks(user.id))
    }
  }, [dispatch, isAuthenticated, user])

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">{isAuthenticated ? <TaskDashboard /> : <Login />}</main>
      <Footer />
    </div>
  )
}

export default App

