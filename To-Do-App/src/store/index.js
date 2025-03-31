import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import taskReducer from "./slices/taskSlice"
import weatherReducer from "./slices/weatherSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    weather: weatherReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["auth/login/fulfilled", "tasks/loadTasks/fulfilled"],
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        ignoredPaths: ["auth.user", "tasks.entities"],
      },
    }),
})

