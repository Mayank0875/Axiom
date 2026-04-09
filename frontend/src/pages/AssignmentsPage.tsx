/* Assignments page — Frappe LMS style table */
import { Plus, Search } from "lucide-react";
import { assignments } from "@/data/mockData";
import { useState } from "react";

const AssignmentsPage = () => {
  const [search, setSearch] = useState("");

  const filtered = assignments.filter((a) =>
    !search || a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Assignments</h1>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-foreground text-background rounded-lg text-sm font-medium hover:opacity-90">
          <Plus className="w-4 h-4" /> Create
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold">{filtered.length} Assignments</p>
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

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left px-4 py-3 font-medium w-8">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="text-left px-4 py-3 font-medium">Title</th>
              <th className="text-left px-4 py-3 font-medium">Type</th>
              <th className="text-left px-4 py-3 font-medium">Due Date</th>
              <th className="text-left px-4 py-3 font-medium">Total Grade</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-left px-4 py-3 font-medium">Updated On</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3"><input type="checkbox" className="rounded" /></td>
                <td className="px-4 py-3">{a.title}</td>
                <td className="px-4 py-3">{a.type}</td>
                <td className="px-4 py-3">{a.dueDate}</td>
                <td className="px-4 py-3">{a.totalGrade}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded ${a.status === "Published" ? "bg-green-50 text-green-700" : "bg-muted text-muted-foreground"}`}>
                    {a.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{a.updatedOn}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-2 text-xs text-muted-foreground text-right border-t">
          {filtered.length} of {assignments.length}
        </div>
      </div>
    </div>
  );
};

export default AssignmentsPage;
