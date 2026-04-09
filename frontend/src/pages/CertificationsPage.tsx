/* Certifications page — Frappe LMS style */
import { Award } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchCertifications } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const CertificationsPage = () => {
  const { auth } = useAuth();
  const [certifiedMembers, setCertifiedMembers] = useState<
    Array<{
      id: number;
      name: string;
      category: string;
      open_to_work: boolean;
      hiring: boolean;
    }>
  >([]);
  const [search, setSearch] = useState("");
  const [openToWork, setOpenToWork] = useState(false);
  const [hiring, setHiring] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth?.token) return;
    fetchCertifications(auth.token)
      .then(setCertifiedMembers)
      .finally(() => setLoading(false));
  }, [auth?.token]);

  const filtered = certifiedMembers.filter((m) => {
    if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (openToWork && !m.open_to_work) return false;
    if (hiring && !m.hiring) return false;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Certified Members</h1>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-foreground text-background rounded-lg text-sm font-medium hover:opacity-90">
          <Award className="w-4 h-4" /> Get Certified
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <h2 className="text-base font-semibold">{filtered.length} Certified Members</h2>
        <input
          placeholder="Search by Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-1.5 border rounded-lg text-sm bg-card w-40 focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <select className="px-3 py-1.5 border rounded-lg text-sm bg-card text-muted-foreground focus:outline-none">
          <option value="">Category</option>
        </select>
        <label className="flex items-center gap-2 text-sm">
          Open to Work
          <input type="checkbox" checked={openToWork} onChange={() => setOpenToWork(!openToWork)} className="rounded" />
        </label>
        <label className="flex items-center gap-2 text-sm">
          Hiring
          <input type="checkbox" checked={hiring} onChange={() => setHiring(!hiring)} className="rounded" />
        </label>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading certified members...</p>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Award className="w-7 h-7 text-muted-foreground" />
          </div>
          <h3 className="font-semibold">No certified members</h3>
          <p className="text-sm text-muted-foreground mt-1">There are no certified members currently. Keep an eye out, fresh learning experiences are on the way!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((m) => (
            <div key={m.id} className="border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow">
              <div className="h-40 bg-muted flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-card border flex items-center justify-center text-base font-bold text-muted-foreground">
                  {m.name.split(" ").map((n) => n[0]).join("")}
                </div>
              </div>
              <div className="p-4 pt-3">
                <p className="text-sm font-semibold">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.category}</p>
                <div className="flex gap-2 mt-2">
                  {m.open_to_work && <span className="text-[10px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded">Open to Work</span>}
                  {m.hiring && <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">Hiring</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificationsPage;
