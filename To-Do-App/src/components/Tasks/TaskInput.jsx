import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTask } from "../../store/slices/taskSlice"
import "../../styles/components/tasks.css"

const TaskInput = () => {
  const [taskText, setTaskText] = useState("")
  const [priority, setPriority] = useState("medium")
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (taskText.trim() && user?.id) {
      const newTask = {
        id: Date.now().toString(),
        text: taskText,
        completed: false,
        priority,
        createdAt: new Date().toISOString(),
      }

      dispatch(
        addTask({
          userId: user.id,
          task: newTask,
        }),
      )

      setTaskText("")
      setPriority("medium")
    }
  }

  return (
    <form className="task-input-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Add a new task..."
          className="task-input"
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="priority-select">
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>
      <button type="submit" className="add-task-btn">
        Add Task
      </button>
    </form>
  )
}

export default TaskInput

