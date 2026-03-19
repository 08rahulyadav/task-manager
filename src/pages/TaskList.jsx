import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";

import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import SearchFilter from "../components/SearchFilter";
import Loader from "../components/Loader";

export default function TaskList() {

  const { tasks, loading, error } = useContext(TaskContext);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">
        {error}
      </div>
    );

  // 🔎 Search filter
  let filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  // 🎯 Status filter
  if (filter === "completed") {
    filteredTasks = filteredTasks.filter((t) => t.completed);
  }

  if (filter === "pending") {
    filteredTasks = filteredTasks.filter((t) => !t.completed);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">

      <div className="w-full max-w-2xl bg-white shadow-xl rounded-xl p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold text-gray-800">
            Task Manager
          </h1>

          <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            {filteredTasks.length} Tasks
          </span>

        </div>

        {/* Add Task */}
        <TaskForm />

        {/* Search + Filter */}
        <SearchFilter
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />

        {/* Task List */}
        <div className="mt-4">

          {filteredTasks.length === 0 ? (

            <div className="text-center text-gray-500 py-10">
              <p className="text-lg">No tasks found</p>
              <p className="text-sm">Try changing search or filter</p>
            </div>

          ) : (

            filteredTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))

          )}

        </div>

      </div>

    </div>
  );
}