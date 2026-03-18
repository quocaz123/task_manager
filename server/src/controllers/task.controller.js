const taskService = require("../services/task.service");

exports.createTask = (req, res) => {
    try {
        const task = taskService.createTask(req.body);
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getTasks = (req, res) => {
    res.json(taskService.getTasks());
};

exports.getTaskById = (req, res) => {
    const task = taskService.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
};

exports.updateTask = (req, res) => {
    const task = taskService.updateTask(req.params.id, req.body);
    if (!task) return res.status(404).json({ message: "Not found" });
    res.json(task);
  };
  
  exports.deleteTask = (req, res) => {
    const success = taskService.deleteTask(req.params.id);
    if (!success) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  };