import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { saveUserData, loadUserData } from "../../services/localStorage"

export const loadTasks = createAsyncThunk("tasks/loadTasks", async (userId, { rejectWithValue }) => {
  try {
    if (!userId) {
      return rejectWithValue("User ID is required to load tasks")
    }
    const tasks = loadUserData(userId, "tasks") || []
    return tasks
  } catch (error) {
    return rejectWithValue(error.message || "Failed to load tasks")
  }
})

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    addTask: (state, action) => {
      const { userId, task } = action.payload
      state.tasks.push(task)
      saveUserData(userId, "tasks", state.tasks)
    },
    deleteTask: (state, action) => {
      const { userId, taskId } = action.payload
      state.tasks = state.tasks.filter((task) => task.id !== taskId)
      saveUserData(userId, "tasks", state.tasks)
    },
    updateTask: (state, action) => {
      const { userId, task } = action.payload
      const index = state.tasks.findIndex((t) => t.id === task.id)
      if (index !== -1) {
        state.tasks[index] = task
        saveUserData(userId, "tasks", state.tasks)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTasks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadTasks.fulfilled, (state, action) => {
        state.tasks = action.payload
        state.loading = false
      })
      .addCase(loadTasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to load tasks"
      })
  },
})

export const { addTask, deleteTask, updateTask } = taskSlice.actions
export default taskSlice.reducer

