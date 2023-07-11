import React, { useState, useEffect } from 'react';
import { fetchTodos } from './api';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filterCompleted, setFilterCompleted] = useState(false);

  useEffect(() => {
    const getTodos = async () => {
      const data = await fetchTodos();
      setTodos(data);
    };
    getTodos();
  }, []);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        title: newTask,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setNewTask('');
    }
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const editTask = (id, newTitle) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTask = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const filteredTodos = filterCompleted
    ? todos.filter((todo) => todo.completed)
    : todos;

  return (
    <div>
      <h1>Todo App</h1>

      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add</button>

      <div>
        <input
          type="checkbox"
          checked={filterCompleted}
          onChange={() => setFilterCompleted(!filterCompleted)}
        />
        Show completed tasks
      </div>

      <ul>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => toggleComplete(todo.id)}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.title}
            <button onClick={() => deleteTask(todo.id)}>Delete</button>
            <button onClick={() => editTask(todo.id, prompt('Enter new task name'))}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
