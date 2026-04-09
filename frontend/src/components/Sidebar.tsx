/* Sidebar — Frappe LMS style */
import { NavLink } from "react-router-dom";
import {
  Home, Search, Bell, BookOpen, Layers, Users2,
  Award, Briefcase, TrendingUp, CircleHelp,
  FileEdit, Code2, ChevronDown, User, GraduationCap,
} from "lucide-react";

const mainNav = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/search", icon: Search, label: "Search" },
  { to: "/notifications", icon: Bell, label: "Notifications" },
];

const contentNav = [
  { to: "/courses", icon: BookOpen, label: "Courses" },
  { to: "/programs", icon: Layers, label: "Programs" },
  { to: "/batches", icon: Users2, label: "Batches" },
  { to: "/certifications", icon: Award, label: "Certifications" },
  { to: "/jobs", icon: Briefcase, label: "Jobs" },
  { to: "/statistics", icon: TrendingUp, label: "Statistics" },
];

const assessmentNav = [
  { to: "/quizzes", icon: CircleHelp, label: "Quizzes" },
  { to: "/assignments", icon: FileEdit, label: "Assignments" },
  { to: "/exercises", icon: Code2, label: "Programming Exercises" },
];

const bottomNav = [
  { to: "/faculty", icon: GraduationCap, label: "Faculty Panel" },
  { to: "/profile", icon: User, label: "Profile" },
];

function SidebarLink({ to, icon: Icon, label }: { to: string; icon: any; label: string }) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
          isActive
            ? "bg-muted font-semibold text-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`
      }
    >
      <Icon className="w-4 h-4 shrink-0" />
      {label}
    </NavLink>
  );
}

const Sidebar = () => (
  <aside className="hidden md:flex flex-col w-56 border-r bg-card min-h-screen">
    {/* Brand */}
    <div className="p-4 border-b flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-primary-foreground" />
        </div>
        <div>
          <p className="text-sm font-bold leading-none">Learning</p>
          <p className="text-xs text-muted-foreground">Mayank Gupta</p>
        </div>
      </div>
      <ChevronDown className="w-4 h-4 text-muted-foreground" />
    </div>

    <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
      {mainNav.map((item) => (
        <SidebarLink key={item.to} {...item} />
      ))}

      <div className="border-t my-3" />

      {contentNav.map((item) => (
        <SidebarLink key={item.to} {...item} />
      ))}

      <div className="border-t my-3" />

      {assessmentNav.map((item) => (
        <SidebarLink key={item.to} {...item} />
      ))}

      <div className="border-t my-3" />

      {bottomNav.map((item) => (
        <SidebarLink key={item.to} {...item} />
      ))}
    </nav>

    {/* Bottom getting started */}
    <div className="p-3 border-t">
      <div className="bg-muted rounded-lg p-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Layers className="w-4 h-4" />
          Getting started
        </div>
        <p className="text-xs text-muted-foreground mt-1">0/8 steps</p>
        <button className="mt-2 text-xs text-primary font-medium flex items-center gap-1">
          ≫ Start now
        </button>
      </div>
    </div>
  </aside>
);

export default Sidebar;
