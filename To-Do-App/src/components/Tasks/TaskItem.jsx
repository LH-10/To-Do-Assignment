import { useState } from "react"
import "../../styles/components/tasks.css"

const TaskItem = ({ task, onDelete, onToggleComplete, onUpdatePriority }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedPriority, setEditedPriority] = useState(task.priority)

  const handlePriorityChange = (e) => {
    setEditedPriority(e.target.value)
  }

  const handleSave = () => {
    onUpdatePriority(task, editedPriority)
    setIsEditing(false)
  }

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "high":
        return "priority-high"
      case "medium":
        return "priority-medium"
      case "low":
        return "priority-low"
      default:
        return ""
    }
  }

  return (
    <li className={`task-item ${task.completed ? "completed" : ""} ${getPriorityClass(task.priority)}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task)}
          className="task-checkbox"
        />
        <span className="task-text">{task.text}</span>
      </div>

      <div className="task-actions">
        {isEditing ? (
          <div className="priority-edit">
            <select value={editedPriority} onChange={handlePriorityChange} className="priority-select-small">
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button onClick={handleSave} className="save-btn">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="cancel-btn">
              Cancel
            </button>
          </div>
        ) : (
          <>
            <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
            <button onClick={() => setIsEditing(true)} className="edit-btn">
              Edit Priority
            </button>
            <button onClick={() => onDelete(task.id)} className="delete-btn">
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  )
}

export default TaskItem

