/* Top bar — minimal Frappe style */
import { useState } from "react";
import { Menu, X, BookOpen } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/quizzes", label: "Quizzes" },
  { to: "/assignments", label: "Assignments" },
  { to: "/statistics", label: "Statistics" },
  { to: "/notifications", label: "Notifications" },
];

const TopBar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { auth, logout } = useAuth();
  const initials = auth?.user.full_name
    ?.split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-40 bg-card border-b px-4 md:px-6 h-14 flex items-center justify-between md:justify-end">
      {/* Mobile menu button */}
      <button className="md:hidden p-1" onClick={() => setShowMobileMenu(!showMobileMenu)}>
        {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile logo */}
      <Link to="/" className="md:hidden flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-foreground" />
        <span className="font-bold text-sm">Learning</span>
      </Link>

      <div className="flex items-center gap-2">
        <button
          onClick={logout}
          className="text-xs border rounded-md px-2 py-1 text-muted-foreground hover:bg-muted"
        >
          Logout
        </button>
        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
          {initials || "U"}
        </div>
      </div>

      {/* Mobile nav */}
      {showMobileMenu && (
        <div className="absolute top-14 left-0 right-0 bg-card border-b shadow-lg md:hidden z-50">
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setShowMobileMenu(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default TopBar;
