import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createTask, updateTask } from "../../services/task.service";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
}

interface TaskFormProps {
  task?: Task | null;

  onClose: () => void;

  onSuccess: () => void;
}

export default function TaskForm({
  task,

  onClose,

  onSuccess,
}: TaskFormProps) {
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [priority, setPriority] = useState("MEDIUM");

  const [status, setStatus] = useState("PENDING");

  const [dueDate, setDueDate] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);

      setDescription(task.description || "");

      setPriority(task.priority);

      setStatus(task.status);

      setDueDate(task.dueDate.split("T")[0]);
    } else {
      setTitle("");

      setDescription("");

      setPriority("MEDIUM");

      setStatus("PENDING");

      setDueDate("");
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      toast.error("Title is required");

      return;
    }

    if (!dueDate) {
      toast.error("Due date is required");

      return;
    }

    try {
      setLoading(true);

      const data = {
        title,

        description,

        priority,

        status,

        dueDate,
      };

      if (task) {
        await updateTask(task.id, data);

        toast.success("Task updated successfully");
      } else {
        await createTask(data);

        toast.success("Task created successfully");
      }

      onSuccess();

      onClose();
    } catch (error) {
      console.log(error);

      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto transition-colors duration-300">
        <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">
          {task ? "Update Task" : "Create Task"}
        </h2>

        <input 
          className="w-full border rounded-lg p-3 mb-4 bg-white dark:bg-slate-700 text-slate-800 dark:text-white border-gray-300 dark:border-slate-600 outline-none focus:ring-2focus:ring-blue-500" 
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea 
          className="w-full border rounded-lg p-3 mb-4 bg-white dark:bg-slate-700 text-slate-800 dark:text-white border-gray-300 dark:border-slate-600 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Task description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select 
          className="w-full border rounded-lg p-3 mb-4 bg-white dark:bg-slate-700 text-slate-800 dark:text-white border-gray-300 dark:border-slate-600"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="LOW">LOW</option>

          <option value="MEDIUM">MEDIUM</option>

          <option value="HIGH">HIGH</option>

        </select>

        <select 
          className="w-full border rounded-lg p-3 mb-4 bg-white dark:bg-slate-700 text-slate-800 dark:text-white border-gray-300 dark:border-slate-600"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="PENDING">PENDING</option>

          <option value="IN_PROGRESS">IN_PROGRESS</option>

          <option value="COMPLETED">COMPLETED</option>

        </select>

        <input 
          type="date" 
          className="w-full border rounded-lg p-3 mb-6 bg-white dark:bg-slate-700 text-slate-800 dark:text-white border-gray-300 dark:border-slate-600"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 dark:bg-slate-600 dark:text-white px-5 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-slate-500 transition"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : task ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
