import { Calendar, Edit3, Trash2, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
}

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  index?: number;
}

export default function TaskCard({ task, onEdit, onDelete, index = 0 }: Props) {
  const getPriorityStyle = () => {
    switch (task.priority) {
      case "HIGH":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/50";
      case "MEDIUM":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/50";
      default:
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50";
    }
  };

  const getStatusBadge = () => {
    switch (task.status) {
      case "COMPLETED":
        return {
          label: "Completed",
          style: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50",
          icon: <CheckCircle2 size={13} />,
        };
      case "IN_PROGRESS":
        return {
          label: "In Progress",
          style: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/50",
          icon: <Clock size={13} />,
        };
      default:
        return {
          label: "Pending",
          style: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800/50",
          icon: <AlertCircle size={13} />,
        };
    }
  };

  const statusBadge = getStatusBadge();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -3 }}
      className="bg-white dark:bg-slate-900/90 rounded-2xl p-5 shadow-sm hover:shadow-xl border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between transition-all duration-300 group"
    >
      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusBadge.style}`}>
            {statusBadge.icon}
            <span>{statusBadge.label}</span>
          </span>

          <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getPriorityStyle()}`}>
            {task.priority}
          </span>
        </div>

        {/* Task Title */}
        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
          {task.title}
        </h3>

        {/* Task Description */}
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
          {task.description || "No description provided."}
        </p>
      </div>

      {/* Footer Info & Actions */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <Calendar size={14} className="text-slate-400" />
          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(task)}
            className="p-2 rounded-xl text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Edit Task"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 rounded-xl text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Delete Task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}