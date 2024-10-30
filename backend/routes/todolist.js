const router = require("express").Router();
const User = require("../DB/user");
const Todo = require("../DB/todo");
const authMiddleware = require("../authMiddleware");

router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    const user = await User.findOne({ _id: req.userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newTodo = new Todo({
      title,
      description,
      user: user._id,
    });

    await newTodo.save();

    user.todos.push(newTodo);
    await user.save();

    res.status(201).json({ message: "Todo created successfully", newTodo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { title, description, completed },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo updated successfully", todo });
  } catch (err) {
    console.error(err);
  }
});

router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    const user = await User.findOne({ _id: req.userId });
    if (user) {
      user.todos.pull(req.params.id);
      await user.save();
    }
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error(err);
  }
});

router.get("/alltodos", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const todos = await Todo.find({ user: req.userId }).sort({ createdAt: -1 }); // sort based on a particular field of mongoose schema in descending order
    if (!todos) {
      return res.status(404).json({ message: "Todos not found" });
    }
    if (todos.length === 0) {
      return res.status(404).json({ message: "No todos found" });
    }
    res.status(200).json({ todos });
  } catch (err) {
    console.error(err);
  }
});

router.put("/toggle/:id", authMiddleware, async (req, res) => {
  try {
    const todoId = req.params.id;
    const todo = await Todo.findOneAndUpdate(
      { _id: todoId },
      { completed: req.body.completed },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo comlpetion toggled", todo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
