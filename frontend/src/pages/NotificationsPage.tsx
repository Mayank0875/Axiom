import { useEffect, useMemo, useState } from "react";
import { Bell, Users, User, Clock, CheckCircle2, Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchUserNotifications, fetchAllNotifications, ApiAdminNotification } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const READ_STORAGE_KEY = "notifications_read_ids";

const getStoredReadIds = (): number[] => {
  try {
    const parsed = JSON.parse(sessionStorage.getItem(READ_STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
};

const persistReadIds = (ids: number[]) =>
  sessionStorage.setItem(READ_STORAGE_KEY, JSON.stringify(ids));

type UiNotification = {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

// ── Student view ──────────────────────────────────────────────────────────────

const StudentNotifications = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<UiNotification[]>([]);
  const [tab, setTab] = useState<"Unread" | "Read">("Unread");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = useMemo(() => Number(auth?.user.id ?? 0), [auth?.user.id]);
  const filtered = notifications.filter((n) => (tab === "Unread" ? !n.read : n.read));
  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (!auth?.token || !userId) return;
    setLoading(true);
    fetchUserNotifications(userId, auth.token)
      .then((data) => {
        const storedReadIds = new Set(getStoredReadIds());
        setNotifications(data.map((item) => ({
          id: Number(item.id),
          title: item.title ?? "",
          message: item.message ?? "",
          time: item.created_at ? new Date(item.created_at).toLocaleString() : "Recently",
          read: !!item.read_at || storedReadIds.has(Number(item.id)),
        })));
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, [auth?.token, userId]);

  const markAsRead = (id: number) => {
    setNotifications((prev) => {
      const updated = prev.map((n) => n.id === id ? { ...n, read: true } : n);
      persistReadIds(updated.filter((n) => n.read).map((n) => n.id));
      return updated;
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <div className="flex border rounded-lg overflow-hidden">
          {(["Unread", "Read"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-1.5 text-sm font-medium transition-colors ${tab === t ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted"}`}
            >
              {t} ({t === "Unread" ? unreadCount : notifications.length - unreadCount})
            </button>
          ))}
        </div>
      </div>

      {loading ? <p className="text-sm text-muted-foreground">Loading…</p>
        : error ? <p className="text-sm text-destructive">{error}</p>
        : filtered.length === 0 ? <p className="text-sm text-muted-foreground">Nothing here.</p>
        : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((n) => (
              <div key={n.id} onClick={() => navigate(`/home/notifications/${n.id}`)}
                role="button" tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && navigate(`/home/notifications/${n.id}`)}
                className={`border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow cursor-pointer ${n.read ? "border-border" : "border-primary/40"}`}
              >
                <div className="h-40 bg-muted flex items-center justify-center">
                  <Bell className="w-10 h-10 text-muted-foreground opacity-30" />
                </div>
                <div className="p-4 pt-3 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold line-clamp-1">{n.title}</p>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full border shrink-0 ${n.read ? "bg-muted text-muted-foreground border-border" : "bg-primary/10 text-primary border-primary/20"}`}>
                      {n.read ? "Read" : "Unread"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{n.message}</p>
                  <p className="text-xs text-muted-foreground">{n.time}</p>
                  <div className="flex items-center justify-between pt-1">
                    {!n.read ? (
                      <button onClick={(e) => { e.stopPropagation(); markAsRead(n.id); }}
                        className="text-xs text-primary hover:underline">Mark as read</button>
                    ) : (
                      <span className="text-xs text-muted-foreground">Read</span>
                    )}
                    <button onClick={(e) => { e.stopPropagation(); navigate(`/home/notifications/${n.id}`); }}
                      className="px-3 py-1 border rounded-md text-xs font-medium hover:bg-muted transition-colors">
                      Open
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

// ── Admin / Faculty view ──────────────────────────────────────────────────────

const AdminNotifications = () => {
  const { auth } = useAuth();
  const [notifications, setNotifications] = useState<ApiAdminNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [readFilter, setReadFilter] = useState("all");
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    if (!auth?.token) return;
    fetchAllNotifications(auth.token)
      .then(setNotifications)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, [auth?.token]);

  const filtered = notifications.filter((n) => {
    if (search) {
      const q = search.toLowerCase();
      if (!n.title.toLowerCase().includes(q) &&
          !n.message.toLowerCase().includes(q) &&
          !n.recipient_name.toLowerCase().includes(q)) return false;
    }
    if (roleFilter !== "all" && !n.recipient_roles?.includes(roleFilter)) return false;
    if (readFilter === "read" && !n.read_at) return false;
    if (readFilter === "unread" && n.read_at) return false;
    return true;
  });

  const totalCount = notifications.length;
  const readCount = notifications.filter((n) => n.read_at).length;
  const unreadCount = totalCount - readCount;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">All Notifications</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {totalCount} total · {unreadCount} unread · {readCount} read
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <input
          placeholder="Search by title, message or recipient…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-1.5 border rounded-lg text-sm bg-card w-64 focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}
          className="px-3 py-1.5 border rounded-lg text-sm bg-card focus:outline-none">
          <option value="all">All Roles</option>
          <option value="student">Students</option>
          <option value="faculty">Faculty</option>
          <option value="admin">Admin</option>
        </select>
        <select value={readFilter} onChange={(e) => setReadFilter(e.target.value)}
          className="px-3 py-1.5 border rounded-lg text-sm bg-card focus:outline-none">
          <option value="all">All Status</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
        </select>
        <span className="text-xs text-muted-foreground ml-auto">{filtered.length} results</span>
      </div>

      {loading ? <p className="text-sm text-muted-foreground">Loading…</p>
        : error ? <p className="text-sm text-destructive">{error}</p>
        : filtered.length === 0 ? <p className="text-sm text-muted-foreground">No notifications match.</p>
        : (
          <div className="border rounded-xl overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[2fr_3fr_1.5fr_1fr_1fr] gap-4 px-4 py-2.5 bg-muted/40 border-b text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              <span>Title</span>
              <span>Message</span>
              <span className="flex items-center gap-1"><User className="w-3 h-3" /> Recipient</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Sent</span>
              <span>Status</span>
            </div>

            {/* Rows */}
            <div className="divide-y">
              {filtered.map((n) => {
                const isExpanded = expanded === n.id;
                return (
                  <div key={n.id} className="hover:bg-muted/30 transition-colors">
                    <div
                      className="grid grid-cols-[2fr_3fr_1.5fr_1fr_1fr] gap-4 px-4 py-3 cursor-pointer items-start"
                      onClick={() => setExpanded(isExpanded ? null : n.id)}
                    >
                      {/* Title */}
                      <p className="text-sm font-medium line-clamp-1">{n.title}</p>

                      {/* Message preview */}
                      <p className="text-sm text-muted-foreground line-clamp-1">{n.message}</p>

                      {/* Recipient */}
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{n.recipient_name}</p>
                        <div className="flex gap-1 flex-wrap mt-0.5">
                          {n.recipient_roles?.map((r) => (
                            <span key={r} className="text-[10px] px-1.5 py-0 rounded-full bg-primary/10 text-primary capitalize">
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Time */}
                      <p className="text-xs text-muted-foreground">
                        {new Date(n.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </p>

                      {/* Status */}
                      <div className="flex items-center gap-1">
                        {n.read_at
                          ? <><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /><span className="text-xs text-emerald-600">Read</span></>
                          : <><Circle className="w-3.5 h-3.5 text-primary" /><span className="text-xs text-primary">Unread</span></>
                        }
                      </div>
                    </div>

                    {/* Expanded detail */}
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-0 bg-muted/20 border-t">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Full Message</p>
                            <p className="text-sm leading-relaxed">{n.message}</p>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-xs text-muted-foreground">Recipient: </span>
                              <span className="font-medium">{n.recipient_name}</span>
                              <span className="text-muted-foreground"> ({n.recipient_email})</span>
                            </div>
                            <div>
                              <span className="text-xs text-muted-foreground">Sent: </span>
                              <span>{new Date(n.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span>
                            </div>
                            {n.read_at && (
                              <div>
                                <span className="text-xs text-muted-foreground">Read at: </span>
                                <span>{new Date(n.read_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
    </div>
  );
};

// ── Root — role-based switch ──────────────────────────────────────────────────

const NotificationsPage = () => {
  const { auth } = useAuth();
  const roles = auth?.roles ?? [];
  const isAdminOrFaculty = roles.includes("admin") || roles.includes("faculty");

  // Admin/Faculty get a tab switcher between their own + all
  const [view, setView] = useState<"mine" | "all">("all");

  if (!isAdminOrFaculty) return <StudentNotifications />;

  return (
    <div>
      {/* View switcher for admin/faculty */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex border rounded-lg overflow-hidden">
          <button onClick={() => setView("all")}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium transition-colors ${view === "all" ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted"}`}
          >
            <Users className="w-3.5 h-3.5" /> All Notifications
          </button>
          <button onClick={() => setView("mine")}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium transition-colors ${view === "mine" ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted"}`}
          >
            <Bell className="w-3.5 h-3.5" /> My Notifications
          </button>
        </div>
      </div>

      {view === "all" ? <AdminNotifications /> : <StudentNotifications />}
    </div>
  );
};

export default NotificationsPage;
