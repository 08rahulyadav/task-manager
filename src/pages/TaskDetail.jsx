import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { TaskContext } from "../context/TaskContext";
import { api } from "../api/axios";

export default function TaskDetail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const { tasks, setTasks } = useContext(TaskContext);

  const task = tasks.find((t) => t.id == id);

  const [title, setTitle] = useState(task?.title || "");
  const [saving, setSaving] = useState(false);

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Task not found
      </div>
    );
  }

  const updateTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) return alert("Task title cannot be empty");

    try {

      setSaving(true);

      await api.put(`/todos/${id}`, {
        ...task,
        title,
      });

      setTasks(
        tasks.map((t) =>
          t.id == id ? { ...t, title } : t
        )
      );

      navigate("/");

    } catch (err) {
      alert("Failed to update task");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline mb-4"
        >
          ← Back
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Edit Task
        </h2>

        {/* Form */}
        <form onSubmit={updateTask}>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Task title"
          />

          <div className="flex gap-3">

            <button
              type="submit"
              disabled={saving}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex-1"
            >
              {saving ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg flex-1"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}