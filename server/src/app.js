const express = require("express");
const cors = require("cors");

const taskRouter = require("./routes/task.routes");

const app = express();

const DEFAULT_ORIGINS = ["http://localhost:5173", "http://localhost:5174"];
const corsOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const allowlist = new Set([...(corsOrigins.length ? corsOrigins : DEFAULT_ORIGINS)]);

app.use(
  cors({
    origin(origin, callback) {
      // allow non-browser clients (curl, Postman) with no Origin header
      if (!origin) return callback(null, true);
      if (allowlist.has(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
  })
);
app.use(express.json());

app.use("/tasks", taskRouter);

module.exports = app;