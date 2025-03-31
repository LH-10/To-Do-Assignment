export const saveToLocalStorage = (key, data) => {
  try {
    const serializedData = JSON.stringify(data)
    localStorage.setItem(key, serializedData)
  } catch (error) {
    console.error("Error saving to localStorage:", error)
  }
}

export const loadFromLocalStorage = (key) => {
  try {
    const serializedData = localStorage.getItem(key)
    if (serializedData === null) {
      return undefined
    }
    return JSON.parse(serializedData)
  } catch (error) {
    console.error("Error loading from localStorage:", error)
    return undefined
  }
}

export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error("Error removing from localStorage:", error)
  }
}

export const saveUserData = (userId, dataKey, data) => {
  try {
    const key = `user_${userId}_${dataKey}`
    const serializedData = JSON.stringify(data)
    localStorage.setItem(key, serializedData)
  } catch (error) {
    console.error("Error saving user data to localStorage:", error)
  }
}

export const loadUserData = (userId, dataKey) => {
  try {
    const key = `user_${userId}_${dataKey}`
    const serializedData = localStorage.getItem(key)
    if (serializedData === null) {
      return undefined
    }
    return JSON.parse(serializedData)
  } catch (error) {
    console.error("Error loading user data from localStorage:", error)
    return undefined
  }
}

export const getAllUsers = () => {
  try {
    const users = loadFromLocalStorage("users") || []
    return users
  } catch (error) {
    console.error("Error loading users from localStorage:", error)
    return []
  }
}

export const saveAllUsers = (users) => {
  try {
    saveToLocalStorage("users", users)
  } catch (error) {
    console.error("Error saving users to localStorage:", error)
  }
}

