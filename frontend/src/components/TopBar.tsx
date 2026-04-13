import { useState, useRef, useEffect } from "react";
import { Menu, X, BookOpen, User, LogOut, ChevronRight } from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { fetchMyProfile, ApiProfile } from "@/lib/api";

const navLinks = [
  { to: "/home", label: "Home" },
  { to: "/home/courses", label: "Courses" },
  { to: "/home/quizzes", label: "Quizzes" },
  { to: "/home/assignments", label: "Assignments" },
  { to: "/home/statistics", label: "Statistics" },
  { to: "/home/notifications", label: "Notifications" },
];

const TopBar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [profile, setProfile] = useState<ApiProfile | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const initials = auth?.user.full_name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() ?? "U";

  // Load profile once when dropdown first opens
  const handleAvatarClick = async () => {
    setShowDropdown((o) => !o);
    if (!profile && auth?.token) {
      try {
        const data = await fetchMyProfile(auth.token);
        setProfile(data);
      } catch {
        // silently fail — profile page still works
      }
    }
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    setShowDropdown(false);
    logout();
  };

  const handleViewProfile = () => {
    setShowDropdown(false);
    navigate("/home/profile");
  };

  return (
    <header className="sticky top-0 z-40 bg-card border-b px-4 md:px-6 h-14 flex items-center justify-between md:justify-end">
      {/* Mobile menu button */}
      <button className="md:hidden p-1" onClick={() => setShowMobileMenu(!showMobileMenu)}>
        {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile logo */}
      <Link to="/home" className="md:hidden flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-foreground" />
        <span className="font-bold text-sm">Axiom</span>
      </Link>

      {/* Avatar with dropdown */}
      <div ref={dropdownRef} className="relative">
        <button
          onClick={handleAvatarClick}
          className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold hover:opacity-90 transition-opacity ring-2 ring-transparent hover:ring-primary/30"
          aria-label="Open profile menu"
        >
          {initials}
        </button>

        {showDropdown && (
          <div className="absolute right-0 top-10 w-64 bg-popover border rounded-lg shadow-lg z-50 overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b bg-muted/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">
                    {profile?.full_name ?? auth?.user.full_name ?? "User"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {profile?.email ?? auth?.user.email ?? ""}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick details */}
            {profile && (
              <div className="px-4 py-2 space-y-1 border-b">
                {profile.university_name && (
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">University: </span>
                    {profile.university_name}
                  </p>
                )}
                {profile.program_title && (
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Program: </span>
                    {profile.program_title}
                  </p>
                )}
                {profile.batch_title && (
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Batch: </span>
                    {profile.batch_title}
                  </p>
                )}
                {profile.roles?.length > 0 && (
                  <div className="flex gap-1 flex-wrap pt-0.5">
                    {profile.roles.map((r) => (
                      <span
                        key={r}
                        className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium capitalize"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="py-1">
              <button
                onClick={handleViewProfile}
                className="w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-muted transition-colors"
              >
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  View & edit profile
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Log out
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile nav */}
      {showMobileMenu && (
        <div className="absolute top-14 left-0 right-0 bg-card border-b shadow-lg md:hidden z-50">
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/home"}
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
