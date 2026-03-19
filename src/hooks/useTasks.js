import { useEffect, useState } from "react";
import { api } from "../api/axios";

export const useTasks = () => {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {

      setLoading(true);

      const res = await api.get("/todos?_limit=20");

      setTasks(res.data);

      localStorage.setItem("tasks", JSON.stringify(res.data));

    } catch (err) {

      setError("Failed to fetch tasks");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchTasks();

  }, []);

  return { tasks, setTasks, loading, error };

};