const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.createTask = async (req, res) => {
  const { title, description, priority } = req.body;

  try {
    const task = new Task({
      title,
      description,
      priority,
      userId: req.user.id,
    });

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.updateTask = async (req, res) => {
  const { status, priority } = req.body;

  try {
    let task = await Task.findById(req.params.id);

    if (!task || task.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = status || task.status;
    task.priority = priority || task.priority;

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.deleteTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task || task.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.remove();
    res.json({ message: "Task removed" });
  } catch (err) {
    res.status(500).send("Server error");
  }
};
