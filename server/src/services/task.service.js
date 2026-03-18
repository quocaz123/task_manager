let tasks = [];
let nextId = 1;

exports.createTask = ({ title }) => {
    if (!title || title.trim() === "") {
        throw new Error("Title is required");
    }

    const task = {
        id: nextId++,
        title: title.trim(),
        completed: false,
    };
    tasks.push(task);
    return task;
};

exports.getTasks = () => tasks;

exports.getTaskById = (id) => {
    return tasks.find((t) => t.id === parseInt(id));
};

exports.updateTask = (id, data) => {
    const task = tasks.find((t) => t.id === parseInt(id));
    if (!task) return null;

    if (data.title !== undefined) task.title = data.title;
    if (data.completed !== undefined) task.completed = data.completed;

    return task;
};

exports.deleteTask = (id) => {
    const index = tasks.findIndex((t) => t.id === parseInt(id));

    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
};

