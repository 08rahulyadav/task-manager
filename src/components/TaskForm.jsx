import { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { api } from "../api/axios";

export default function TaskForm() {
  const { tasks, setTasks } = useContext(TaskContext);

  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Task title is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const newTask = {
        title,
        completed: false,
        userId: 1,
      };

      await api.post("/todos", newTask);

      // update local state
      setTasks([{ id: Date.now(), ...newTask }, ...tasks]);

      setTitle("");
    } catch (err) {
      setError("Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 border rounded-xl p-4 mb-6 shadow-sm"
    >
      <div className="flex gap-3">

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add new task..."
          className="flex-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400"
        >
          {loading ? "Adding..." : "Add"}
        </button>

      </div>

      {error && (
        <p className="text-red-500 text-sm mt-2">
          {error}
        </p>
      )}
    </form>
  );
}