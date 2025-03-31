import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { saveToLocalStorage, loadFromLocalStorage, getAllUsers, saveAllUsers } from "../../services/localStorage"

export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (!credentials.username.trim() || !credentials.password.trim()) {
      return rejectWithValue("Username and password are required")
    }
    const users = getAllUsers()
    let user = users.find((u) => u.username === credentials.username)
    if (user) {
      if (user.password !== credentials.password) {
        return rejectWithValue("Incorrect password")
      }
    } else {
      user = {
        id: Date.now().toString(),
        username: credentials.username,
        password: credentials.password, 
        name: credentials.username,
        email: `${credentials.username.toLowerCase()}@example.com`,
        createdAt: new Date().toISOString(),
      }

      users.push(user)
      saveAllUsers(users)
    }

    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  } catch (error) {
    return rejectWithValue(error.message || "Login failed")
  }
})

export const checkAuthState = createAsyncThunk("auth/checkState", async () => {
  const authData = loadFromLocalStorage("authState")
  return authData || { isAuthenticated: false, user: null }
})

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      saveToLocalStorage("authState", { isAuthenticated: false, user: null })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.user = action.payload
        state.loading = false
        saveToLocalStorage("authState", {
          isAuthenticated: true,
          user: action.payload,
        })
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Login failed"
      })
      .addCase(checkAuthState.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated
        state.user = action.payload.user
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer

