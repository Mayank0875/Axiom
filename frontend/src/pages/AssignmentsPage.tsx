/* Assignments page — backend powered */
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Plus, Search, FileEdit } from "lucide-react";
import { ApiAssignment, ApiCourse, createAssignment, fetchAssignments, fetchCourses } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const AssignmentsPage = () => {
  const { auth } = useAuth();
  const canCreate = useMemo(
    () => !!auth?.roles?.includes("faculty"),
    [auth?.roles]
  );

  const [assignments, setAssignments] = useState<ApiAssignment[]>([]);
  const [courses, setCourses] = useState<ApiCourse[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [maxMarks, setMaxMarks] = useState(100);
  const [assignmentType, setAssignmentType] = useState<"file" | "mcq" | "coding">("coding");
  const [selectedCourseId, setSelectedCourseId] = useState("");

  useEffect(() => {
    if (!auth?.token) return;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const [assignmentData, courseData] = await Promise.all([
          fetchAssignments(auth.token),
          fetchCourses(auth.token),
        ]);
        setAssignments(assignmentData);
        setCourses(courseData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load assignments");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [auth?.token]);

  const typeOptions = [...new Set(assignments.map((a) => a.assignment_type))];
  const courseOptions = courses;
  const getCourseTitle = (courseId: number | string) =>
    courses.find((course) => Number(course.id) === Number(courseId))?.title ?? "Unknown";

  const filtered = assignments.filter((a) => {
    if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter !== "all" && a.assignment_type !== typeFilter) return false;
    if (courseFilter !== "all" && Number(a.course_id) !== Number(courseFilter)) return false;
    return true;
  });

  const handleCreate = async (event: FormEvent) => {
    event.preventDefault();
    if (!auth?.token) return;
    try {
      const created = await createAssignment(
        {
          courseId: Number(selectedCourseId),
          title,
          description,
          deadline: new Date(deadline).toISOString(),
          maxMarks,
          assignmentType,
        },
        auth.token
      );
      setAssignments((prev) => [created, ...prev]);
      setIsCreateOpen(false);
      setTitle("");
      setDescription("");
      setDeadline("");
      setMaxMarks(100);
      setSelectedCourseId("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create assignment");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Assignments</h1>
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
        <p className="text-sm font-semibold">{filtered.length} Assignments</p>
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
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-1.5 border rounded-lg text-sm bg-card text-muted-foreground focus:outline-none"
          >
            <option value="all">All Types</option>
            {typeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
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
        <p className="text-sm text-muted-foreground">Loading assignments...</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <FileEdit className="w-7 h-7 text-muted-foreground" />
          </div>
          <h3 className="font-semibold">No assignments</h3>
          <p className="text-sm text-muted-foreground mt-1">Create or publish an assignment to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((a) => (
            <div key={a.id} className="border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow">
              <div className="h-32 bg-muted flex items-center justify-center">
                <FileEdit className="w-9 h-9 text-muted-foreground opacity-40" />
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-sm leading-snug">{a.title}</h3>
                  <span className="text-[11px] px-2 py-0.5 rounded-full font-medium border bg-muted text-muted-foreground border-border">
                    Active
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <p className="col-span-2">Course: <span className="text-foreground font-medium">{getCourseTitle(a.course_id)}</span></p>
                  <p>Type: <span className="text-foreground font-medium">{a.assignment_type}</span></p>
                  <p>Grade: <span className="text-foreground font-medium">{a.max_marks}</span></p>
                  <p className="col-span-2">Due: <span className="text-foreground font-medium">{new Date(a.deadline).toLocaleString()}</span></p>
                </div>

                <p className="text-xs text-muted-foreground">Created {a.created_at ? new Date(a.created_at).toLocaleDateString() : "-"}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreate}
            className="w-full max-w-lg bg-card border rounded-xl p-5 space-y-4"
          >
            <h3 className="text-lg font-semibold">Create Assignment</h3>
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
              placeholder="Title"
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
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm"
                required
              />
              <input
                type="number"
                value={maxMarks}
                onChange={(e) => setMaxMarks(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg text-sm"
                min={1}
                required
              />
            </div>
            <select
              value={assignmentType}
              onChange={(e) => setAssignmentType(e.target.value as "file" | "mcq" | "coding")}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            >
              <option value="file">file</option>
              <option value="mcq">mcq</option>
              <option value="coding">coding</option>
            </select>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setIsCreateOpen(false)} className="px-3 py-2 border rounded-lg text-sm">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-foreground text-background rounded-lg text-sm font-semibold">
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AssignmentsPage;
