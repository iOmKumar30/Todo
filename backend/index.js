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
const _dirname = path.dirname("");
const buildpath = path.join(__dirname, "../frontend/dist");
app.use(express.static(buildpath));
app.use(
  cors({
    origin: "*", // Allow only this origin
    credentials: true, // Allow cookies to be sent
  })
);
app.options("*", cors()); // Enable preflight for all routes

app.use("/api/v1", router);
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
