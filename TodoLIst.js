import React, { useState } from "react";
import "./TodoList.css";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([newTask, ...tasks]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    if (editIndex === index) {
      setEditIndex(null);
    }
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditedTask(tasks[index]);
  };

  const saveEdit = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editIndex] = editedTask;
    setTasks(updatedTasks);
    setEditIndex(null);
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
        />
        <button className="add-button" onClick={addTask}>
          Add Task
        </button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <div className="task-container">
              {editIndex === index ? (
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
              ) : (
                <span>{task}</span>
              )}
              <div className="button-container">
                {editIndex === index ? (
                  <button className="save-button" onClick={saveEdit}>
                    Save
                  </button>
                ) : (
                  <button
                    className="edit-button"
                    onClick={() => startEdit(index)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="delete-button"
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
