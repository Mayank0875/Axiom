/* Quizzes page — backend powered */
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Plus, Search, ClipboardList, CircleHelp } from "lucide-react";
import { ApiCourse, ApiQuiz, createQuiz, fetchCourses, fetchQuizzes } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const QuizzesPage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const canCreate = useMemo(
    () => !!auth?.roles?.some((role) => role === "admin" || role === "faculty"),
    [auth?.roles]
  );

  const [quizzes, setQuizzes] = useState<ApiQuiz[]>([]);
  const [courses, setCourses] = useState<ApiCourse[]>([]);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [maxAttempts, setMaxAttempts] = useState(1);
  const [totalMarks, setTotalMarks] = useState(100);
  const [selectedCourseId, setSelectedCourseId] = useState("");

  const courseOptions = courses;
  const getCourseTitle = (courseId: number | string) =>
    courses.find((course) => Number(course.id) === Number(courseId))?.title ?? "Unknown";

  useEffect(() => {
    if (!auth?.token) return;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const [quizData, courseData] = await Promise.all([
          fetchQuizzes(auth.token),
          fetchCourses(auth.token),
        ]);
        setQuizzes(quizData);
        setCourses(courseData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load quizzes");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [auth?.token]);

  const filtered = quizzes.filter((q) => {
    if (search && !q.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (courseFilter !== "all" && Number(q.course_id) !== Number(courseFilter)) return false;
    return true;
  });

  const handleCreateQuiz = async (event: FormEvent) => {
    event.preventDefault();
    if (!auth?.token || !auth?.user?.id) return;
    try {
      const created = await createQuiz(
        {
          courseId: Number(selectedCourseId),
          title,
          description,
          maxAttempts,
          totalMarks,
          createdBy: Number(auth.user.id),
        },
        auth.token
      );
      setQuizzes((prev) => [created, ...prev]);
      setIsCreateOpen(false);
      setTitle("");
      setDescription("");
      setSelectedCourseId("");
      setMaxAttempts(1);
      setTotalMarks(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create quiz");
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Quizzes</h1>
        {canCreate && (
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-foreground text-background rounded-lg text-sm font-medium hover:opacity-90"
          >
            <Plus className="w-4 h-4" /> Create
          </button>
        )}
      </div>

      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <p className="text-sm font-semibold">{filtered.length} Quizzes</p>
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="px-3 py-1.5 border rounded-lg text-sm bg-card text-muted-foreground focus:outline-none"
          >
            <option value="all">All Courses</option>
            {courseOptions.map((course) => (
              <option key={course.id} value={String(course.id)}>
                {course.title}
              </option>
            ))}
          </select>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-1.5 border rounded-lg text-sm bg-card w-48 focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading quizzes...</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <CircleHelp className="w-7 h-7 text-muted-foreground" />
          </div>
          <h3 className="font-semibold">No quizzes</h3>
          <p className="text-sm text-muted-foreground mt-1">Create or publish a quiz to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((q) => {
            return (
              <div
                key={q.id}
                onClick={() => navigate(`/quizzes/${q.id}/instructions`)}
                className="text-left border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow"
              >
                <div className="h-32 bg-muted flex items-center justify-center">
                  <ClipboardList className="w-9 h-9 text-muted-foreground opacity-40" />
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-sm leading-snug">{q.title}</h3>
                    <span className="text-[11px] px-2 py-0.5 rounded-full font-medium border bg-muted text-muted-foreground border-border">
                      Active
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <p className="col-span-2">
                      Course: <span className="text-foreground font-medium">{getCourseTitle(q.course_id)}</span>
                    </p>
                    <p>Total Marks: <span className="text-foreground font-medium">{q.total_marks}</span></p>
                    <p>Attempts: <span className="text-foreground font-medium">{q.max_attempts}</span></p>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Created {q.created_at ? new Date(q.created_at).toLocaleDateString() : "-"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateQuiz}
            className="w-full max-w-lg bg-card rounded-xl border shadow-xl p-5 space-y-4"
          >
            <h2 className="text-lg font-semibold">Create Quiz</h2>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
              required
            >
              <option value="">Select course</option>
              {courses.map((course) => (
                <option key={course.id} value={String(course.id)}>
                  {course.title}
                </option>
              ))}
            </select>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Quiz title"
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
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                min={1}
                value={maxAttempts}
                onChange={(e) => setMaxAttempts(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg text-sm"
                placeholder="Max attempts"
                required
              />
              <input
                type="number"
                min={1}
                value={totalMarks}
                onChange={(e) => setTotalMarks(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg text-sm"
                placeholder="Total marks"
                required
              />
            </div>
            <div className="px-1 pt-1 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="px-3 py-2 border rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-foreground text-background rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
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

export default QuizzesPage;
