import { Link, useLocation } from "react-router-dom";
import { Gamepad2, Search, User, LayoutDashboard, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";
import consoleLogo from "@/assets/console-logo.svg";

const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const links = [
    { to: "/", label: "Home", icon: Gamepad2 },
    { to: "/games", label: "Games", icon: Search },
    { to: "/leaderboard", label: "Leaderboard", icon: LayoutDashboard },
    { to: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-surface-1/80 backdrop-blur-xl transition-colors duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex h-9 items-center"
          >
            <img
              src={consoleLogo}
              alt="EROS CONSOLE"
              className="h-9 w-auto max-h-9 max-w-[min(220px,55vw)] object-contain object-left"
            />
          </motion.div>
        </Link>

        <div className="flex items-center gap-1">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:bg-surface-2 hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-primary/10"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <link.icon className="relative z-10 h-4 w-4" />
                <span className="relative z-10 hidden sm:inline">{link.label}</span>
              </Link>
            );
          })}

          <div className="ml-2 h-6 w-px bg-border" />

          <motion.button
            whileTap={{ scale: 0.85, rotate: 180 }}
            onClick={toggleTheme}
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
            aria-label="Toggle theme"
          >
            <motion.div
              key={theme}
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </motion.div>
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
