/* Jobs page — Frappe LMS style */
import { useEffect, useState } from "react";
import { Briefcase, Plus, Search } from "lucide-react";
import { fetchJobs } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const JobsPage = () => {
  const { auth } = useAuth();
  const [jobOpenings, setJobOpenings] = useState<
    Array<{
      id: number;
      title: string;
      company: string;
      country: string;
      type: string;
      work_mode: string;
    }>
  >([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth?.token) return;
    fetchJobs(auth.token)
      .then(setJobOpenings)
      .finally(() => setLoading(false));
  }, [auth?.token]);

  const filtered = jobOpenings.filter((j) =>
    !search || j.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Jobs</h1>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-foreground text-background rounded-lg text-sm font-medium hover:opacity-90">
          <Plus className="w-4 h-4" /> New Job
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <h2 className="text-base font-semibold">{filtered.length} Open Jobs</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-3 py-1.5 border rounded-lg text-sm bg-card w-40 focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <select className="px-3 py-1.5 border rounded-lg text-sm bg-card text-muted-foreground focus:outline-none">
          <option value="">Country</option>
        </select>
        <select className="px-3 py-1.5 border rounded-lg text-sm bg-card text-muted-foreground focus:outline-none">
          <option value="">Type</option>
        </select>
        <select className="px-3 py-1.5 border rounded-lg text-sm bg-card text-muted-foreground focus:outline-none">
          <option value="">Work Mode</option>
        </select>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading jobs...</p>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Briefcase className="w-7 h-7 text-muted-foreground" />
          </div>
          <h3 className="font-semibold">No job openings</h3>
          <p className="text-sm text-muted-foreground mt-1">There are no job openings currently. Keep an eye out, fresh learning experiences are on the way!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((job) => (
            <div key={job.id} className="border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow">
              <div className="h-40 bg-muted flex items-center justify-center">
                <Briefcase className="w-10 h-10 text-muted-foreground opacity-30" />
              </div>
              <div className="p-4 pt-3">
                <h3 className="text-sm font-semibold">{job.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{job.company} · {job.country}</p>
                <div className="flex gap-2 mt-3">
                  <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">{job.type}</span>
                  <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">{job.work_mode}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsPage;
