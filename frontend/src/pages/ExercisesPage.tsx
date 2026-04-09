/* Programming Exercises page — Frappe LMS style cards */
import { useEffect, useMemo, useState } from "react";
import { Plus, Search, Code2 } from "lucide-react";
import { fetchExercises } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const ExercisesPage = () => {
  const { auth } = useAuth();
  const [programmingExercises, setProgrammingExercises] = useState<
    Array<{
      id: number;
      title: string;
      language: string;
      difficulty: string;
      course_id: number | null;
      course_title: string | null;
      updated_on: string;
    }>
  >([]);
  const [search, setSearch] = useState("");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth?.token) return;
    fetchExercises(auth.token)
      .then(setProgrammingExercises)
      .finally(() => setLoading(false));
  }, [auth?.token]);

  const languageOptions = [...new Set(programmingExercises.map((e) => e.language))];
  const courseOptions = useMemo(
    () =>
      Array.from(
        new Set(
          programmingExercises
            .map((exercise) => exercise.course_title)
            .filter((title): title is string => !!title)
        )
      ),
    [programmingExercises]
  );

  const filtered = programmingExercises.filter((e) => {
    if (search && !e.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (languageFilter !== "all" && e.language !== languageFilter) return false;
    if (difficultyFilter !== "all" && e.difficulty !== difficultyFilter) return false;
    if (courseFilter !== "all" && e.course_title !== courseFilter) return false;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Programming Exercises</h1>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-foreground text-background rounded-lg text-sm font-medium hover:opacity-90">
          <Plus className="w-4 h-4" /> Create
        </button>
      </div>

      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <p className="text-sm font-semibold">{filtered.length} Exercises</p>
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="px-3 py-1.5 border rounded-lg text-sm bg-card text-muted-foreground focus:outline-none"
          >
            <option value="all">All Courses</option>
            {courseOptions.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
          <select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            className="px-3 py-1.5 border rounded-lg text-sm bg-card text-muted-foreground focus:outline-none"
          >
            <option value="all">All Languages</option>
            {languageOptions.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="px-3 py-1.5 border rounded-lg text-sm bg-card text-muted-foreground focus:outline-none"
          >
            <option value="all">All Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
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
        <p className="text-sm text-muted-foreground">Loading exercises...</p>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Code2 className="w-7 h-7 text-muted-foreground" />
          </div>
          <h3 className="font-semibold">No exercises</h3>
          <p className="text-sm text-muted-foreground mt-1">Create coding problems to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((e) => (
            <div key={e.id} className="border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow">
              <div className="h-32 bg-muted flex items-center justify-center">
                <Code2 className="w-9 h-9 text-muted-foreground opacity-40" />
              </div>
              <div className="p-4 space-y-3">
                <h3 className="font-semibold text-sm leading-snug">{e.title}</h3>

                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <p className="col-span-2">Course: <span className="text-foreground font-medium">{e.course_title ?? "Unassigned"}</span></p>
                  <p>Language: <span className="text-foreground font-medium">{e.language}</span></p>
                  <p>
                    Difficulty:{" "}
                    <span
                      className={`font-medium ${
                        e.difficulty === "Easy"
                          ? "text-green-700"
                          : e.difficulty === "Medium"
                          ? "text-yellow-700"
                          : "text-red-700"
                      }`}
                    >
                      {e.difficulty}
                    </span>
                  </p>
                </div>

                <p className="text-xs text-muted-foreground">Updated {e.updated_on}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExercisesPage;
