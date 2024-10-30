const express = require("express");
const router = require("./routes/index");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 5000;
const path = require("path");

const connectDB = require("./DB/connection");
connectDB();
app.use(express.json());

// Serve static files
app.use(express.static(path.resolve(__dirname, "frontend", "dist")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.options("*", cors());

app.use("/api/v1", router);

// Catch-all handler for all other routes (for SPA)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
