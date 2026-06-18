import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const completedTasks = todos.filter((todo) => todo.completed);
  const pendingTasks = todos.filter((todo) => !todo.completed);

  return (
    <div className="app-container">
      <div className="todo-box">
        <h2>🚀 Task Master</h2>

        {/* Stats */}
        <div className="todo-footer">
          <p>📋 Total: {todos.length}</p>
          <p>⏳ Pending: {pendingTasks.length}</p>
          <p>✅ Completed: {completedTasks.length}</p>
        </div>

        {/* Add Task Form */}
        <form onSubmit={handleAddTodo} className="todo-form">
          <input
            type="text"
            placeholder="Enter a new task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>

        {/* Pending Tasks */}
        <h3>⏳ Pending Tasks</h3>

        {pendingTasks.length === 0 ? (
          <p className="empty-message">
            No pending tasks 🎉
          </p>
        ) : (
          <ul className="todo-list">
            {pendingTasks.map((todo) => (
              <li key={todo.id}>
                <span
                  onClick={() => toggleComplete(todo.id)}
                >
                  {todo.text}
                </span>

                <button
                  className="delete-btn"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Completed Tasks */}
        <h3 style={{ marginTop: "25px" }}>
          ✅ Completed Tasks
        </h3>

        {completedTasks.length === 0 ? (
          <p className="empty-message">
            No completed tasks yet.
          </p>
        ) : (
          <ul className="todo-list">
            {completedTasks.map((todo) => (
              <li
                key={todo.id}
                className="completed"
              >
                <span
                  onClick={() => toggleComplete(todo.id)}
                >
                  {todo.text}
                </span>

                <button
                  className="delete-btn"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Clear Completed */}
        {completedTasks.length > 0 && (
          <button
            className="delete-btn"
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "12px",
            }}
            onClick={clearCompleted}
          >
            Clear Completed Tasks
          </button>
        )}
      </div>
    </div>
  );
}

export default App;