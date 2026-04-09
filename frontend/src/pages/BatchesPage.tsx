/* Batches page — Frappe LMS style */
import { useState } from "react";
import { useEffect } from "react";
import { Plus, Users2 } from "lucide-react";
import { fetchBatches } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const tabs = ["All", "Upcoming", "Archived", "Unpublished"] as const;

const BatchesPage = () => {
  const { auth } = useAuth();
  const [batches, setBatches] = useState<
    Array<{
      id: number;
      title: string;
      status: string;
      start_date: string;
      end_date: string;
      course_count: number;
      student_count: number;
      category: string;
    }>
  >([]);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth?.token) return;
    fetchBatches(auth.token)
      .then(setBatches)
      .finally(() => setLoading(false));
  }, [auth?.token]);

  const filtered = batches.filter((b) => {
    if (activeTab !== "All" && b.status.toLowerCase() !== activeTab.toLowerCase()) return false;
    if (search && !b.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Batches</h1>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-foreground text-background rounded-lg text-sm font-medium hover:opacity-90">
          <Plus className="w-4 h-4" /> Create
        </button>
      </div>

      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-base font-semibold">All Batches</h2>
        <div className="flex items-center gap-3 flex-wrap">
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
          <input
            placeholder="Search by Title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-1.5 border rounded-lg text-sm bg-card w-36 focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <select className="px-3 py-1.5 border rounded-lg text-sm bg-card text-muted-foreground focus:outline-none">
            <option value="">Category</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading batches...</p>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Users2 className="w-7 h-7 text-muted-foreground" />
          </div>
          <h3 className="font-semibold">No batches</h3>
          <p className="text-sm text-muted-foreground mt-1">There are no batches currently. Keep an eye out, fresh learning experiences are on the way!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((b) => (
            <div key={b.id} className="border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow">
              <div className="h-40 bg-muted flex items-center justify-center">
                <Users2 className="w-10 h-10 text-muted-foreground opacity-30" />
              </div>
              <div className="p-4 pt-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm">{b.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${b.status === "Upcoming" ? "bg-blue-50 text-blue-600" : "bg-muted text-muted-foreground"}`}>
                    {b.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{b.start_date} — {b.end_date}</p>
                <p className="text-xs text-muted-foreground mt-1">{b.course_count} courses · {b.student_count} students</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BatchesPage;
