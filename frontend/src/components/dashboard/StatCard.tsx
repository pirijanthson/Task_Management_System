import {
  ListTodo,
  Clock,
  Loader2,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: number;
  color: string;
  index?: number;
}

export default function StatCard({
  title,
  value,
  index = 0
}: StatCardProps) {
  const getConfig = () => {
    switch (title) {
      case "Total Tasks":
        return {
          icon: <ListTodo size={24} />,
          badgeBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 dark:bg-blue-500/20",
          border: "border-l-blue-500",
          accentColor: "from-blue-500/20 to-transparent",
        };
      case "Pending":
        return {
          icon: <Clock size={24} />,
          badgeBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 dark:bg-amber-500/20",
          border: "border-l-amber-500",
          accentColor: "from-amber-500/20 to-transparent",
        };
      case "In Progress":
        return {
          icon: <Loader2 size={24} className="animate-spin" />,
          badgeBg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 dark:bg-indigo-500/20",
          border: "border-l-indigo-500",
          accentColor: "from-indigo-500/20 to-transparent",
        };
      case "Completed":
        return {
          icon: <CheckCircle2 size={24} />,
          badgeBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 dark:bg-emerald-500/20",
          border: "border-l-emerald-500",
          accentColor: "from-emerald-500/20 to-transparent",
        };
      case "Overdue":
        return {
          icon: <AlertTriangle size={24} />,
          badgeBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400 dark:bg-rose-500/20",
          border: "border-l-rose-500",
          accentColor: "from-rose-500/20 to-transparent",
        };
      default:
        return {
          icon: <ListTodo size={24} />,
          badgeBg: "bg-slate-500/10 text-slate-600 dark:text-slate-400 dark:bg-slate-500/20",
          border: "border-l-slate-500",
          accentColor: "from-slate-500/20 to-transparent",
        };
    }
  };

  const config = getConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden bg-white dark:bg-slate-900/90 rounded-2xl shadow-sm hover:shadow-xl dark:shadow-slate-950/50 p-6 border-l-4 ${config.border} border-t border-r border-b border-slate-200/80 dark:border-slate-800/80 transition-all duration-300 group`}
    >
      {/* Background Subtle Gradient Glow */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${config.accentColor} rounded-bl-full pointer-events-none opacity-60 transition-opacity group-hover:opacity-100`} />

      <div className="flex justify-between items-start relative z-10">
        <div>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
            {title}
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {value}
            </h2>
          </div>
        </div>

        <div className={`p-3 rounded-xl ${config.badgeBg} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
          {config.icon}
        </div>
      </div>
    </motion.div>
  );
}