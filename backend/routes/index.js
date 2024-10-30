const express = require("express");
const userRouter = require("./auth");
const todoRouter = require("./todolist");

const router = express.Router();

router.use("/user", userRouter);
router.use("/todos", todoRouter);

module.exports = router;