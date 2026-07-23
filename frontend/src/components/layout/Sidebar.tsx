import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, CheckSquare, LogOut, X } from "lucide-react";
import { motion } from "framer-motion";

interface SidebarProps {
  onLogout: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({
  onLogout,
  isOpen = false,
  onClose,
}: SidebarProps) {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: <CheckSquare size={20} />,
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-xl text-white border-r border-slate-800">
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
            TM
          </div>
          <div>
            <h2 className="font-bold text-lg leading-tight tracking-wide bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              TaskFlow
            </h2>
            <p className="text-[11px] text-slate-400 font-medium">Workspace</p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Navigation
        </p>

        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group font-medium text-sm ${
                isActive
                  ? "text-white bg-blue-600/90 shadow-lg shadow-blue-600/30 font-semibold"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
              }`}
            >
              <span
                className={`transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
              >
                {item.icon}
              </span>
              <span>{item.name}</span>

              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute right-2 w-1.5 h-5 bg-white rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800/80">
        <button
          onClick={onLogout}
          className="flex items-center justify-center gap-2.5 w-full bg-slate-800/80 hover:bg-red-600/90 hover:text-white text-slate-300 py-2.5 px-4 rounded-xl transition-all duration-300 font-medium text-sm border border-slate-700/50 hover:border-red-500/50 group shadow-sm hover:shadow-red-500/20"
        >
          <LogOut
            size={18}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block w-64 min-h-screen flex-shrink-0">
        {sidebarContent}
      </aside>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative z-10 w-72 h-full max-w-[80vw]"
          >
            {sidebarContent}
          </motion.aside>
        </div>
      )}
    </>
  );
}
