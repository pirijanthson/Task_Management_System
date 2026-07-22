import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

interface SidebarProps {
  onLogout: () => void;
}

export default function Sidebar({ onLogout }: SidebarProps) {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <MdDashboard size={22} />,
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: <FaTasks size={20} />,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">

      <div className="text-2xl font-bold text-center py-6 border-b border-slate-700">
        Task Manager
      </div>

      <nav className="flex-1 px-4 py-6">

        {menuItems.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-3 transition
            ${
              location.pathname === item.path
                ? "bg-blue-600"
                : "hover:bg-slate-700"
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>

        ))}

      </nav>

      <div className="p-4 border-t border-slate-700">

        <button
          onClick={onLogout}
          className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg transition"
        >
          <FiLogOut />
          Logout
        </button>

      </div>

    </aside>
  );
}