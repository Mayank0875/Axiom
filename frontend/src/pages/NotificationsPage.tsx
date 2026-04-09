/* Notifications page — backend powered */
import { useEffect, useMemo, useState } from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchUserNotifications } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const READ_STORAGE_KEY = "notifications_read_ids";

const getStoredReadIds = (): number[] => {
  const raw = sessionStorage.getItem(READ_STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const persistReadIds = (ids: number[]) => {
  sessionStorage.setItem(READ_STORAGE_KEY, JSON.stringify(ids));
};

type UiNotification = {
  id: number;
  message: string;
  time: string;
  read: boolean;
};

const NotificationsPage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<UiNotification[]>([]);
  const [tab, setTab] = useState<"Unread" | "Read">("Unread");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const userId = useMemo(() => Number(auth?.user.id ?? 0), [auth?.user.id]);

  const filtered = notifications.filter((n) => (tab === "Unread" ? !n.read : n.read));
  const unreadCount = notifications.filter((n) => !n.read).length;
  const readCount = notifications.length - unreadCount;

  useEffect(() => {
    if (!auth?.token || !userId) return;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const apiNotifications = await fetchUserNotifications(userId, auth.token);
        const storedReadIds = new Set(getStoredReadIds());
        const mapped: UiNotification[] = apiNotifications.map((item) => ({
          id: Number(item.id),
          message: item.message || item.title || "",
          time: item.created_at
            ? new Date(item.created_at).toLocaleString()
            : "Recently",
          read: !!item.read_at || storedReadIds.has(Number(item.id)),
        }));
        setNotifications(mapped);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load notifications");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [auth?.token, userId]);

  const markAsRead = (id: number) => {
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, read: true } : n));
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
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                tab === t ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {t} ({t === "Unread" ? unreadCount : readCount})
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading notifications...</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nothing to see here.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((n) => (
            <div
              key={n.id}
              onClick={() => navigate(`/notifications/${n.id}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  navigate(`/notifications/${n.id}`);
                }
              }}
              role="button"
              tabIndex={0}
              className={`border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow ${
                n.read ? "border-border" : "border-primary/40"
              } cursor-pointer focus:outline-none focus:ring-1 focus:ring-ring`}
            >
              <div className="h-40 bg-muted flex items-center justify-center">
                <Bell className="w-10 h-10 text-muted-foreground opacity-30" />
              </div>
              <div className="p-4 pt-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm line-clamp-3">{n.message}</p>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full border shrink-0 ${
                      n.read
                        ? "bg-muted text-muted-foreground border-border"
                        : "bg-emerald-50 text-emerald-700 border-emerald-200"
                    }`}
                  >
                    {n.read ? "Read" : "Unread"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-3">{n.time}</p>
                <div className="mt-3 flex items-center justify-between">
                  {!n.read ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(n.id);
                      }}
                      className="text-xs text-primary hover:underline"
                    >
                      Mark as read
                    </button>
                  ) : (
                    <span className="text-xs text-muted-foreground">Already read</span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/notifications/${n.id}`);
                    }}
                    className="px-3 py-1.5 border rounded-md text-xs font-medium hover:bg-muted transition-colors"
                  >
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

export default NotificationsPage;
