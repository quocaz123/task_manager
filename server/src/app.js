const express = require("express");
const cors = require("cors");

const taskRouter = require("./routes/task.routes");

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error("Not allowed by CORS"));
        },
    })
);

app.use(express.json());
app.use("/tasks", taskRouter);

module.exports = app;