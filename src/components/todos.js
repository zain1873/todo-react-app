import React, { useState } from "react";
import "./todo.css";

function Todos() {
  const [text, setText] = useState("");
  const [task, setTask] = useState([]);
  const [isEditing, setIsEditing] = useState(null); 
  const [editedText, setEditedText] = useState("");

  // Add task to the list
  function addTask() {
    if (text) {
      setTask((task) => {
        const updateList = [...task, text];
        setText("");
        return updateList;
      });
    }
  }

  // Remove task by index
  const removeItem = (indexToRemove) => {
    setTask((task) => task.filter((_, index) => index !== indexToRemove));
  };

  // Edit task
  const editTask = (index) => {
    setIsEditing(index); 
    setEditedText(task[index]);
  };

  // Update task after editing
  const updateTask = (index) => {
    setTask((task) =>
      task.map((item, i) => (i === index ? editedText : item))
    );
    setIsEditing(null); // Reset the editing state
    setEditedText(""); // Clear the edited text
  };

  return (
    <div className="task-container mt-4">
      <h2 className="todo-title">Todo List</h2>

      <input
        type="text"
        placeholder="Enter a new task"
        className="task-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="task-button ms-2" onClick={addTask}>
        Add Task
      </button>

      <h5 className="list_heading">Here is your list</h5>

      <ul className="task_list">
        {task.map((item, index) => (
          <li key={index} className="task_item">
            {isEditing === index ? (
              // Show input for editing if the task is being edited
              <>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="edit_input"
                />
                <button
                  className="btn btn-success btn-sm ms-2"
                  onClick={() => updateTask(index)}
                >
                  Save
                </button>
              </>
            ) : (
              <div className="todo_functionality">
                {item}
                <div>
                <button
                  onClick={() => removeItem(index)}
                  className="btn btn-danger btn-sm ms-2"
                >
                  Remove
                </button>
                <button
                  onClick={() => editTask(index)}
                  className="btn btn-primary btn-sm ms-2"
                >
                  Edit
                </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
