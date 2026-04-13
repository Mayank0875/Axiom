/* Sidebar — Axiom LMS */
import { useMemo, useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Home, Search, Bell, BookOpen, Layers, Users2,
  Award, Briefcase, TrendingUp, CircleHelp,
  FileEdit, Code2, ChevronDown, GraduationCap,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useSemester } from "@/context/SemesterContext";

const mainNav = [
  { to: "/home", icon: Home, label: "Home" },
  { to: "/home/search", icon: Search, label: "Search" },
  { to: "/home/notifications", icon: Bell, label: "Notifications" },
];

const contentNav = [
  { to: "/home/courses", icon: BookOpen, label: "Courses" },
  { to: "/home/programs", icon: Layers, label: "Programs" },
  { to: "/home/batches", icon: Users2, label: "Batches" },
  { to: "/home/certifications", icon: Award, label: "Certifications" },
  { to: "/home/jobs", icon: Briefcase, label: "Jobs" },
  { to: "/home/statistics", icon: TrendingUp, label: "Statistics" },
];

const assessmentNav = [
  { to: "/home/quizzes", icon: CircleHelp, label: "Quizzes" },
  { to: "/home/assignments", icon: FileEdit, label: "Assignments" },
  { to: "/home/exercises", icon: Code2, label: "Programming Exercises" },
];

function SidebarLink({ to, icon: Icon, label }: { to: string; icon: any; label: string }) {
  return (
    <NavLink
      to={to}
      end={to === "/home"}
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

/** Semester dropdown in the top-left of the sidebar */
function SemesterSelector() {
  const { semesters, selected, setSelected } = useSemester();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative p-3 border-b">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-md bg-muted hover:bg-muted/80 transition-colors text-sm font-medium"
      >
        <div className="flex items-center gap-2 min-w-0">
          <GraduationCap className="w-4 h-4 shrink-0 text-primary" />
          <span className="truncate">{selected.label}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-3 right-3 top-full mt-1 z-50 bg-popover border rounded-md shadow-md py-1">
          {/* Group by year */}
          {[1, 2, 3, 4].map((year) => {
            const yearSems = semesters.filter((s) => s.year === year);
            if (!yearSems.length) return null;
            return (
              <div key={year}>
                <p className="px-3 pt-2 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Year {year}
                </p>
                {yearSems.map((sem) => (
                  <button
                    key={sem.number}
                    onClick={() => { setSelected(sem); setOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 text-sm transition-colors hover:bg-muted ${
                      selected.number === sem.number
                        ? "bg-muted font-semibold text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {sem.label}
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const Sidebar = () => {
  const { auth } = useAuth();
  const roles = auth?.roles ?? [];
  const showFacultyPanel = useMemo(
    () => roles.includes("faculty") || roles.includes("admin"),
    [roles]
  );

  return (
    <aside className="hidden md:flex flex-col w-56 border-r bg-card h-screen sticky top-0">
      {/* Semester selector replaces the old brand block */}
      <SemesterSelector />

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

        {showFacultyPanel && (
          <SidebarLink to="/home/faculty" icon={GraduationCap} label="Faculty Panel" />
        )}


      </nav>
    </aside>
  );
};

export default Sidebar;
