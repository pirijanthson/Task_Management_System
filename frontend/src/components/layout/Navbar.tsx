import { Sun, Moon, Menu, Calendar } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

interface NavbarProps {
  onToggleMobileMenu?: () => void;
}

export default function Navbar({ onToggleMobileMenu }: NavbarProps) {
  const { darkMode, toggleTheme } = useTheme();

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  let user = {
    name: "User",
    email: "",
  };

  try {
    user = JSON.parse(localStorage.getItem("user") || "{}");
  } catch (error) {
    console.error("User parsing error", error);
  }

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between transition-colors duration-300">
      <div className="flex items-center gap-3 sm:gap-4">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Mobile Navigation"
          >
            <Menu size={22} />
          </button>
        )}

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Task Management
            </h1>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50">
              Pro Workspace
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            <span>
              Welcome back,{" "}
              <strong className="text-slate-700 dark:text-slate-200">
                {user.name || "User"}
              </strong>
            </span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:flex items-center gap-1">
              <Calendar size={13} className="text-slate-400" />
              {today}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="relative group p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          {darkMode ? (
            <Sun
              className="text-amber-400 transition-transform duration-300 group-hover:rotate-45"
              size={19}
            />
          ) : (
            <Moon
              className="text-slate-700 transition-transform duration-300 group-hover:-rotate-12"
              size={19}
            />
          )}
        </button>

        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200 dark:border-slate-800">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-blue-500/20 ring-2 ring-white dark:ring-slate-800">
            {getInitials(user.name)}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-tight">
              {user.name || "User"}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[130px] truncate">
              {user.email || "user@workspace.com"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
