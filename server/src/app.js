const express = require("express");
const cors = require("cors");

const taskRouter = require("./routes/task.routes");

const app = express();

const DEFAULT_ORIGINS = ["http://localhost:5173"];
const allowedOrigins = (process.env.CORS_ORIGIN || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const allowlist = new Set([...(allowedOrigins.length ? allowedOrigins : DEFAULT_ORIGINS)]);

app.use(
    cors({
        origin(origin, callback) {
            if (!origin) return callback(null, true);

            if (allowlist.has(origin)) return callback(null, true);
            return callback(new Error(`Not allowed by CORS: ${origin}`));
        },
    })
);

app.use(express.json());
app.use("/tasks", taskRouter);

app.use((err, req, res, next) => {
    if (err && typeof err.message === "string" && err.message.startsWith("Not allowed by CORS")) {
        return res.status(403).json({
            error: "CORS_BLOCKED",
            message: err.message,
            hint: "Set CORS_ORIGIN env (comma-separated) to include your frontend origin.",
        });
    }
    return next(err);
});

module.exports = app;