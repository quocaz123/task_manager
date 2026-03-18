import React, { useState, useEffect } from "react";

const API = "http://localhost:8080/tasks";

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState("");
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const res = await fetch(API);
            const data = await res.json();
            setTasks(data);
        } catch {
            setError("Cannot connect to server. Make sure backend is running on port 3000.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const createTask = async () => {
        if (!input.trim()) return;
        try {
            await fetch(API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: input }),
            });
            setInput("");
            fetchTasks();
        } catch {
            setError("Failed to create task.");
        }
    };

    const toggleTask = async (task) => {
        await fetch(`${API}/${task.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: !task.completed }),
        });
        fetchTasks();
    };

    const deleteTask = async (id) => {
        await fetch(`${API}/${id}`, { method: "DELETE" });
        fetchTasks();
    };

    const startEdit = (task) => {
        setEditId(task.id);
        setEditTitle(task.title);
    };

    const saveEdit = async (id) => {
        if (!editTitle.trim()) return;
        await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: editTitle }),
        });
        setEditId(null);
        fetchTasks();
    };

    const cancelEdit = () => setEditId(null);

    const done = tasks.filter((t) => t.completed).length;
    const total = tasks.length;

    return (
        <div className="min-h-screen bg-slate-100 flex items-start justify-center px-4 py-12">
            <div className="w-full max-w-lg">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-800">Task Manager</h1>
                    <p className="text-slate-500 mt-1 text-sm">
                        {total === 0 ? "No tasks yet" : `${done} of ${total} completed`}
                    </p>
                    {total > 0 && (
                        <div className="mt-3 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                style={{ width: `${(done / total) * 100}%` }}
                            />
                        </div>
                    )}
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
                        ⚠️ {error}
                    </div>
                )}

                {/* Input */}
                <div className="flex gap-2 mb-6">
                    <input
                        className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                        placeholder="Add a new task..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && createTask()}
                    />
                    <button
                        onClick={createTask}
                        className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white text-sm font-semibold rounded-xl transition-all"
                    >
                        + Add
                    </button>
                </div>

                {/* Task List */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    {loading ? (
                        <p className="text-center text-slate-400 py-10 text-sm">Loading...</p>
                    ) : tasks.length === 0 ? (
                        <p className="text-center text-slate-400 py-10 text-sm">
                            No tasks yet. Add one above!
                        </p>
                    ) : (
                        <ul className="divide-y divide-slate-100">
                            {tasks.map((task) => (
                                <li key={task.id} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleTask(task)}
                                        className="w-4 h-4 accent-blue-500 cursor-pointer flex-shrink-0"
                                    />
                                    {editId === task.id ? (
                                        <input
                                            className="flex-1 px-2 py-1 text-sm border border-blue-400 rounded-lg outline-none focus:ring-2 focus:ring-blue-100"
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") saveEdit(task.id);
                                                if (e.key === "Escape") cancelEdit();
                                            }}
                                            autoFocus
                                        />
                                    ) : (
                                        <span className={`flex-1 text-sm ${task.completed ? "line-through text-slate-400" : "text-slate-700"}`}>
                                            {task.title}
                                        </span>
                                    )}
                                    <div className="flex gap-1.5 flex-shrink-0">
                                        {editId === task.id ? (
                                            <>
                                                <button onClick={() => saveEdit(task.id)} className="px-3 py-1 text-xs font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition">Save</button>
                                                <button onClick={cancelEdit} className="px-3 py-1 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition">Cancel</button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => startEdit(task)} className="px-3 py-1 text-xs font-medium border border-slate-200 hover:border-blue-300 hover:text-blue-500 text-slate-500 rounded-lg transition">Edit</button>
                                                <button onClick={() => deleteTask(task.id)} className="px-3 py-1 text-xs font-medium border border-slate-200 hover:border-red-300 hover:text-red-500 text-slate-500 rounded-lg transition">Delete</button>
                                            </>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {total > 0 && (
                    <p className="text-center text-xs text-slate-400 mt-4">
                        {total - done} task{total - done !== 1 ? "s" : ""} remaining
                    </p>
                )}
            </div>
        </div>
    );
}