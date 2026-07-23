import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Plus, Search, Filter, Calendar, LayoutGrid, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import ConfirmModal from "../components/common/ConfirmModal";
import Loader from "../components/common/Loader";
import Layout from "../components/layout/Layout";
import TaskTable from "../components/task/TaskTable";
import TaskForm from "../components/task/TaskForm";
import TaskCard from "../components/task/TaskCard";

import { getTasks, deleteTask } from "../services/task.service";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [sort, setSort] = useState("");

  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks(search, status, priority, sort);
      setTasks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [search, status, priority, sort]);

  const handleDelete = (id: number) => {
    setDeleteTaskId(id);
  };

  const confirmDelete = async () => {
    if (deleteTaskId === null) return;

    try {
      await deleteTask(deleteTaskId);
      toast.success("Task deleted successfully");
      setDeleteTaskId(null);
      loadTasks();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete task");
    }
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setShowForm(true);
  };

  return (
    <Layout>
      {/* Header section with Action Button & View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Task Center
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Filter, search, and manage your workplace task tickets
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View mode toggle button (desktop) */}
          <div className="hidden sm:flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "table"
                  ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
              title="Table View"
            >
              <List size={18} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
              title="Grid View"
            >
              <LayoutGrid size={18} />
            </button>
          </div>

          <button
            onClick={() => {
              setSelectedTask(null);
              setShowForm(true);
            }}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-3 rounded-2xl font-semibold text-sm shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-200 active:scale-95"
          >
            <Plus size={18} />
            <span>Create Task</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white dark:bg-slate-900/90 rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/80 dark:border-slate-800/80 mb-6 transition-colors duration-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Search bar */}
          <div className="relative">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          {/* Status filter */}
          <div className="relative">
            <Filter size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          {/* Priority filter */}
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer"
          >
            <option value="">All Priorities</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>

          {/* Sort order */}
          <div className="relative">
            <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer"
            >
              <option value="">Sort: Newest</option>
              <option value="oldest">Sort: Oldest</option>
              <option value="dueDate">Sort: Due Date</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Render */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Loader />
        </div>
      ) : tasks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-8 shadow-sm"
        >
          <div className="w-16 h-16 bg-blue-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-4">
            <Search size={30} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">No tasks found</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria or create a new task ticket.
          </p>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          {viewMode === "table" ? (
            <motion.div
              key="table-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="hidden md:block"
            >
              <TaskTable tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
            </motion.div>
          ) : null}

          {/* Grid View or Mobile Cards */}
          <motion.div
            key="grid-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ${
              viewMode === "table" ? "md:hidden" : ""
            }`}
          >
            {tasks.map((task, idx) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
                index={idx}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Task Form Modal */}
      {showForm && (
        <TaskForm
          task={selectedTask}
          onClose={() => {
            setShowForm(false);
            setSelectedTask(null);
          }}
          onSuccess={loadTasks}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteTaskId !== null && (
        <ConfirmModal
          title="Delete Task"
          message="Are you sure you want to delete this task? This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTaskId(null)}
        />
      )}
    </Layout>
  );
}