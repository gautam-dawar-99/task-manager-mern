const Task = require('./model');

// Get all tasks
const getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

// Add a new task
const addTask = async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  console.log(req.body);
  res.json(task);
};

// Mark task as complete
const completeTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, { completed: true });
  res.json(task);
};

// Delete a task
const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
};

module.exports = { getTasks, addTask, completeTask, deleteTask };
