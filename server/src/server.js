const app = require("./app");
const port = Number(process.env.PORT) || 3000;

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

server.on("error", (err) => {
    if (err && err.code === "EADDRINUSE") {
        console.error(`Port ${port} is already in use. Try a different PORT (e.g. PORT=3001 npm start).`);
        process.exit(1);
    }
    throw err;
});