import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  const addTask = () => {
    axios.post('http://localhost:5000/tasks', { title: newTask })
      .then(res => setTasks([...tasks, res.data]))
      .catch(err => console.error(err));
    setNewTask('');  // Clear the input after adding
  };

  const completeTask = (id) => {
    axios.put(`http://localhost:5000/tasks/${id}`)
      .then(res => setTasks(tasks.map(task => task._id === id ? res.data : task)))
      .catch(err => console.error(err));
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Task Manager</h1>

        <div className="flex mb-4">
          <input 
            type="text" 
            value={newTask} 
            onChange={(e) => setNewTask(e.target.value)} 
            className="w-full px-6 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter new task"
          />
          <button 
            onClick={addTask} 
            className="bg-indigo-500 text-white px-4 py-2 rounded-r-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Task
          </button>
        </div>

        <ul className="space-y-2">
          {tasks.map(task => (
            <li key={task._id} className={`p-4 border rounded-md flex justify-between items-center ${task.completed ? 'bg-green-100' : 'bg-gray-50'}`}>
              <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {task.title}
              </span>
              <div className="flex space-x-2">
                <button 
                  onClick={() => completeTask(task._id)} 
                  className={`px-3 py-1 rounded text-white ${task.completed ? 'bg-green-500' : 'bg-blue-500'} hover:bg-opacity-80`}
                >
                  {task.completed ? 'Completed' : 'Complete'}
                </button>
                <button 
                  onClick={() => deleteTask(task._id)} 
                  className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
