import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../store/slices/authSlice"
import "../../styles/components/layout.css"

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header className="header">
      <div className="logo">
        <h1>TaskMaster</h1>
      </div>
      {isAuthenticated && user && (
        <div className="user-controls">
          <span className="welcome-message">Welcome, {user.name}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </header>
  )
}

export default Header

