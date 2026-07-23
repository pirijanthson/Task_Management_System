import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, AlertCircle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import Layout from "../components/layout/Layout";
import StatCard from "../components/dashboard/StatCard";
import Loader from "../components/common/Loader";
import { getDashboardStats } from "../services/task.service";

interface Stats {
  totalTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  completedTasks: number;
  overdueTasks: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
    completedTasks: 0,
    overdueTasks: 0,
  });

  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const completionRate =
    stats.totalTasks > 0
      ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
      : 0;

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-blue-500/10 border border-blue-500/20"
      >
        <div>
          <div className="flex items-center gap-2 text-blue-200 dark:text-blue-400 text-xs font-semibold uppercase tracking-widest mb-1">
            <TrendingUp size={16} /> Performance Metrics
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-blue-100 dark:text-slate-300 text-sm mt-1 max-w-xl">
            Monitor your daily task statistics, progress, and pending deadlines
            in real time.
          </p>
        </div>

        <Link
          to="/tasks"
          className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 hover:bg-blue-50 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-500 px-5 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 shadow-md hover:scale-105 active:scale-95 flex-shrink-0"
        >
          <span>Manage Tasks</span>
          <ArrowRight size={18} />
        </Link>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Loader />
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
              title="Total Tasks"
              value={stats.totalTasks}
              color="border-blue-500"
              index={0}
            />
            <StatCard
              title="Pending"
              value={stats.pendingTasks}
              color="border-yellow-500"
              index={1}
            />
            <StatCard
              title="In Progress"
              value={stats.inProgressTasks}
              color="border-indigo-500"
              index={2}
            />
            <StatCard
              title="Completed"
              value={stats.completedTasks}
              color="border-emerald-500"
              index={3}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Task Completion Rate
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Overall progress calculated from completed vs total tasks
                    </p>
                  </div>
                  <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
                    {completionRate}%
                  </span>
                </div>

                <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700/50">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${completionRate}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 rounded-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-xs text-slate-400 font-medium">Pending</p>
                  <p className="text-lg font-bold text-amber-600 dark:text-amber-400">
                    {stats.pendingTasks}
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-xs text-slate-400 font-medium">Active</p>
                  <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                    {stats.inProgressTasks}
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-xs text-slate-400 font-medium">Done</p>
                  <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    {stats.completedTasks}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400 mb-2">
                  <AlertCircle size={22} />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Attention Required
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                  Tasks past their due date that need immediate priority.
                </p>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50">
                  <div>
                    <span className="text-xs font-semibold text-rose-700 dark:text-rose-300 uppercase tracking-wider">
                      Overdue Tasks
                    </span>
                    <h2 className="text-3xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">
                      {stats.overdueTasks}
                    </h2>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-600 text-white shadow-lg shadow-rose-600/30">
                    <AlertCircle size={24} />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <ShieldCheck size={16} className="text-emerald-500" />
                <span>Keep your task pipeline updated daily</span>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </Layout>
  );
}
