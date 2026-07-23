import { Edit3, Trash2, Calendar, CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
}

interface TaskTableProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export default function TaskTable({ tasks, onEdit, onDelete }: TaskTableProps) {
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/50";
      case "MEDIUM":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/50";
      default:
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
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

  return (
    <div className="bg-white dark:bg-slate-900/90 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-800/80 overflow-hidden transition-colors duration-300">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <th className="px-6 py-4">Task Details</th>
              <th className="px-6 py-4">Priority</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-sm">
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-slate-500 dark:text-slate-400">
                  No tasks available.
                </td>
              </tr>
            ) : (
              tasks.map((task) => {
                const statusBadge = getStatusBadge(task.status);
                return (
                  <tr
                    key={task.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {task.title}
                      </div>
                      {task.description && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 max-w-xs truncate">
                          {task.description}
                        </p>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getPriorityStyle(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusBadge.style}`}>
                        {statusBadge.icon}
                        <span>{statusBadge.label}</span>
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-1.5 text-xs font-medium">
                        <Calendar size={14} className="text-slate-400" />
                        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-1">
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
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}