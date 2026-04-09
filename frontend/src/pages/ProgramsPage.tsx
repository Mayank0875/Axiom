/* Programs page — Frappe LMS style */
import { Plus, Layers } from "lucide-react";
import { programs } from "@/data/mockData";

const ProgramsPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Programs</h1>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-foreground text-background rounded-lg text-sm font-medium hover:opacity-90">
          <Plus className="w-4 h-4" /> New
        </button>
      </div>

      {programs.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {programs.map((p) => (
            <div key={p.id} className="border rounded-lg p-5 bg-card hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-3">
                <Layers className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-sm">{p.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{p.description}</p>
              <p className="text-xs text-muted-foreground mt-3">{p.courseCount} courses</p>
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
