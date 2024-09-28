const express = require('express');
const { getTasks, addTask, completeTask, deleteTask } = require('./controllers');
const router = express.Router();

router.get('/', getTasks);
router.post('/', addTask);
router.put('/:id', completeTask);
router.delete('/:id', deleteTask);

module.exports = router;
