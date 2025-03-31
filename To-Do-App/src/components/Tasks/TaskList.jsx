"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteTask, updateTask } from "../../store/slices/taskSlice"
import TaskItem from "./TaskItem"
import "../../styles/components/tasks.css"

const TaskList = ({ tasks }) => {
  const [filter, setFilter] = useState("all")
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleDelete = (id) => {
    if (user?.id) {
      dispatch(
        deleteTask({
          userId: user.id,
          taskId: id,
        }),
      )
    }
  }

  const handleToggleComplete = (task) => {
    if (user?.id) {
      dispatch(
        updateTask({
          userId: user.id,
          task: {
            ...task,
            completed: !task.completed,
          },
        }),
      )
    }
  }

  const handleUpdatePriority = (task, priority) => {
    if (user?.id) {
      dispatch(
        updateTask({
          userId: user.id,
          task: {
            ...task,
            priority,
          },
        }),
      )
    }
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true
    if (filter === "completed") return task.completed
    if (filter === "active") return !task.completed
    if (filter === "high" || filter === "medium" || filter === "low") {
      return task.priority === filter
    }
    return true
  })

  // Sort tasks by priority (high > medium > low)
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  return (
    <div className="task-list-container">
      <div className="task-filters">
        <button className={`filter-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>
          All
        </button>
        <button className={`filter-btn ${filter === "active" ? "active" : ""}`} onClick={() => setFilter("active")}>
          Active
        </button>
        <button
          className={`filter-btn ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button className={`filter-btn ${filter === "high" ? "active" : ""}`} onClick={() => setFilter("high")}>
          High Priority
        </button>
        <button className={`filter-btn ${filter === "medium" ? "active" : ""}`} onClick={() => setFilter("medium")}>
          Medium Priority
        </button>
        <button className={`filter-btn ${filter === "low" ? "active" : ""}`} onClick={() => setFilter("low")}>
          Low Priority
        </button>
      </div>

      {sortedTasks.length === 0 ? (
        <div className="empty-list">
          <p>No tasks found. Add some tasks to get started!</p>
        </div>
      ) : (
        <ul className="task-list">
          {sortedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onToggleComplete={handleToggleComplete}
              onUpdatePriority={handleUpdatePriority}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default TaskList

