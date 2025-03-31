"use client"

import { useState, React  } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../store/slices/authSlice"
import "../../styles/components/auth.css"

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const { error, loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(credentials))
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to TaskMaster</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="auth-info">
          New users will be automatically registered.
        </p>
      </div>
    </div>
  )
}

export default Login

