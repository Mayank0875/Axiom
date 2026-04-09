/* Programs page — Frappe LMS style */
import { useEffect, useState } from "react";
import { Plus, Layers } from "lucide-react";
import { fetchPrograms } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const ProgramsPage = () => {
  const { auth } = useAuth();
  const [programs, setPrograms] = useState<
    Array<{ id: number; title: string; description: string; course_count: number }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth?.token) return;
    fetchPrograms(auth.token)
      .then(setPrograms)
      .finally(() => setLoading(false));
  }, [auth?.token]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Programs</h1>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-foreground text-background rounded-lg text-sm font-medium hover:opacity-90">
          <Plus className="w-4 h-4" /> New
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading programs...</p>
      ) : programs.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {programs.map((p) => (
            <div key={p.id} className="border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow">
              <div className="h-40 bg-muted flex items-center justify-center">
                <Layers className="w-10 h-10 text-muted-foreground opacity-30" />
              </div>
              <div className="p-4 pt-3">
                <h3 className="font-semibold text-sm">{p.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{p.description}</p>
                <p className="text-xs text-muted-foreground mt-3">{p.course_count} courses</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Layers className="w-7 h-7 text-muted-foreground" />
      </div>
      <h3 className="font-semibold">No programs</h3>
      <p className="text-sm text-muted-foreground mt-1">There are no programs currently. Keep an eye out, fresh learning experiences are on the way!</p>
    </div>
  );
}

export default ProgramsPage;
