import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // State to store the list of todos
  const [todos, setTodos] = useState(() => {
    // Load initial todos from localStorage if they exist
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // State for the input field
  const [inputValue, setInputValue] = useState("");

  // Save todos to localStorage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Handle adding a new task
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return; // Prevent adding empty tasks

    const newTodo = {
      id: Date.now(), // Unique ID
      text: inputValue,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue(""); // Clear input
  };

  // Handle toggling the completed status
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Handle deleting a task
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="app-container">
      <div className="todo-box">
        <h2>Task Master</h2>
        
        {/* Input Form */}
        <form onSubmit={handleAddTodo} className="todo-form">
          <input
            type="text"
            placeholder="Add a new task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>

        {/* Todo List */}
        <ul className="todo-list">
          {todos.length === 0 ? (
            <p className="empty-message">No tasks yet. Add one above!</p>
          ) : (
            todos.map((todo) => (
              <li key={todo.id} className={todo.completed ? "completed" : ""}>
                <span onClick={() => toggleComplete(todo.id)}>
                  {todo.text}
                </span>
                <button 
                  className="delete-btn" 
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  ✕
                </button>
              </li>
            ))
          )}
        </ul>
        
        {/* Task Counter */}
        {todos.length > 0 && (
          <div className="todo-footer">
            <p>{todos.filter(t => !t.completed).length} tasks remaining</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;