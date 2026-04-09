/* Courses page — backend powered */
import { FormEvent, useEffect, useMemo, useState } from "react";
import { BookOpen, Plus } from "lucide-react";
import { ApiCourse, createCourse, fetchCourses } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const CoursesPage = () => {
  const { auth } = useAuth();
  const canCreate = useMemo(
    () => !!auth?.roles?.some((role) => role === "admin" || role === "faculty"),
    [auth?.roles]
  );

  const [courses, setCourses] = useState<ApiCourse[]>([]);
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth?.token) return;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchCourses(auth.token);
        setCourses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load courses");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [auth?.token]);

  const filtered = courses.filter((course) =>
    !search || course.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateCourse = async (event: FormEvent) => {
    event.preventDefault();
    if (!auth?.token || !auth?.user?.university_id) return;
    try {
      const created = await createCourse(
        {
          universityId: Number(auth.user.university_id),
          title,
          courseCode,
          description,
        },
        auth.token
      );
      setCourses((prev) => [created, ...prev]);
      setIsCreateOpen(false);
      setTitle("");
      setCourseCode("");
      setDescription("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create course");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Courses</h1>
        {canCreate && (
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-foreground text-background rounded-lg text-sm font-medium hover:opacity-90"
          >
            <Plus className="w-4 h-4" /> Create
          </button>
        )}
      </div>

      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-base font-semibold">All Courses</h2>
        <div className="flex items-center gap-3 flex-wrap">
          <input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-1.5 border rounded-lg text-sm bg-card w-36 focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading courses...</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : filtered.length === 0 ? (
        <EmptyState text="No courses" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((course) => (
            <div key={course.id} className="border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow">
              <div className="h-40 bg-muted flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-muted-foreground opacity-30" />
              </div>
              <div className="p-4 pt-3">
                <h3 className="font-semibold text-sm">{course.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {course.description || "No description"}
                </p>
                <p className="text-xs text-muted-foreground mt-3">
                  Code: <span className="font-medium text-foreground">{course.course_code}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateCourse}
            className="w-full max-w-lg bg-card border rounded-xl p-5 space-y-4"
          >
            <h3 className="text-lg font-semibold">Create Course</h3>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Course title"
              className="w-full px-3 py-2 border rounded-lg text-sm"
              required
            />
            <input
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              placeholder="Course code"
              className="w-full px-3 py-2 border rounded-lg text-sm"
              required
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full px-3 py-2 border rounded-lg text-sm min-h-24"
              required
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="px-3 py-2 border rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-foreground text-background rounded-lg text-sm font-semibold"
              >
                Create
              </button>
            </div>
          </form>
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
