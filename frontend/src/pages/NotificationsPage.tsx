/* Notifications page — Frappe LMS style */
import { useState } from "react";
import { initialNotifications } from "@/data/mockData";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [tab, setTab] = useState<"Unread" | "Read">("Unread");

  const filtered = notifications.filter((n) => (tab === "Unread" ? !n.read : n.read));

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
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
              {t}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nothing to see here.</p>
      ) : (
        <div className="space-y-2">
          {filtered.map((n) => (
            <div
              key={n.id}
              className="flex items-start justify-between p-3 border rounded-lg bg-card"
            >
              <div>
                <p className="text-sm">{n.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
              </div>
              {!n.read && (
                <button
                  onClick={() => markAsRead(n.id)}
                  className="text-xs text-primary hover:underline shrink-0 ml-4"
                >
                  Mark read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
