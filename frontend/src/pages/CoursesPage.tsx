/* Courses page — Frappe LMS style */
import { useState } from "react";
import { BookOpen, Users, Star, Plus } from "lucide-react";
import { courses } from "@/data/mockData";

const tabs = ["Live", "New", "Upcoming", "Created", "Unpublished"] as const;

const CoursesPage = () => {
  const [activeTab, setActiveTab] = useState<string>("Live");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filtered = courses.filter((c) => {
    if (activeTab && c.status !== activeTab) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (category && c.category !== category) return false;
    return true;
  });

  const categories = [...new Set(courses.map((c) => c.category))];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Courses</h1>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-foreground text-background rounded-lg text-sm font-medium hover:opacity-90">
          <Plus className="w-4 h-4" /> Create
        </button>
      </div>

      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-base font-semibold">All Courses</h2>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Filter tabs */}
          <div className="flex border rounded-lg overflow-hidden">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeTab === t ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Search */}
          <input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-1.5 border rounded-lg text-sm bg-card w-36 focus:outline-none focus:ring-1 focus:ring-ring"
          />

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-1.5 border rounded-lg text-sm bg-card text-muted-foreground focus:outline-none"
          >
            <option value="">Category</option>
            {categories.map((c: string) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Course cards */}
      {filtered.length === 0 ? (
        <EmptyState text="No courses" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((course) => (
            <div key={course.id} className="border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow">
              <div className="h-40 bg-muted flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-muted-foreground opacity-30" />
              </div>
              <div className="flex items-center gap-4 px-4 pt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {course.lessonCount}</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {course.enrolledCount}</span>
                {course.rating > 0 && (
                  <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5" /> {course.rating.toFixed(1)}</span>
                )}
              </div>
              <div className="p-4 pt-2">
                <h3 className="font-semibold text-sm">{course.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{course.description}</p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
                    {course.instructor.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <span className="text-xs text-muted-foreground">{course.instructor}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <BookOpen className="w-7 h-7 text-muted-foreground" />
      </div>
      <h3 className="font-semibold">{text}</h3>
      <p className="text-sm text-muted-foreground mt-1">Keep an eye out, fresh learning experiences are on the way!</p>
    </div>
  );
}

export default CoursesPage;
