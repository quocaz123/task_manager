const express = require("express");
const cors = require("cors");

const taskRouter = require("./routes/task.routes");

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/tasks", taskRouter);

module.exports = app;