/* Notification detail page — clean single-scroll reading view */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Bell } from "lucide-react";
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

type DetailNotification = {
  id: number;
  message: string;
  time: string;
};

const NotificationDetailPage = () => {
  const { auth } = useAuth();
  const { id } = useParams();
  const notificationId = Number(id);
  const [notification, setNotification] = useState<DetailNotification | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const isRead = getStoredReadIds().includes(notificationId);

  useEffect(() => {
    if (!auth?.token || !auth.user.id) return;
    const loadNotification = async () => {
      setLoading(true);
      setError("");
      try {
        const apiNotifications = await fetchUserNotifications(
          Number(auth.user.id),
          auth.token
        );
        const found = apiNotifications.find((item) => Number(item.id) === notificationId);
        if (found) {
          setNotification({
            id: Number(found.id),
            message: found.message || found.title,
            time: found.created_at
              ? new Date(found.created_at).toLocaleString()
              : "Recently",
          });
        } else {
          setNotification(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load notification");
      } finally {
        setLoading(false);
      }
    };

    loadNotification();
  }, [auth?.token, auth?.user.id, notificationId]);

  useEffect(() => {
    if (!notification) return;
    const current = new Set(getStoredReadIds());
    current.add(notification.id);
    persistReadIds(Array.from(current));
  }, [notification]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Loading notification...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-600">
        {error}
      </div>
    );
  }

  if (!notification) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Notification not found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        to="/notifications"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Notifications
      </Link>

      <article className="border rounded-xl bg-card p-6 md:p-8">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
              <Bell className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold">LMS Notification</p>
              <p className="text-xs text-muted-foreground">{notification.time}</p>
            </div>
          </div>
          <span
            className={`text-[11px] px-2 py-0.5 rounded-full border ${
              isRead
                ? "bg-muted text-muted-foreground border-border"
                : "bg-emerald-50 text-emerald-700 border-emerald-200"
            }`}
          >
            {isRead ? "Read" : "Unread"}
          </span>
        </div>

        <div className="prose prose-sm max-w-none text-foreground leading-7">
          <p>{notification.message}</p>
        </div>
      </article>
    </div>
  );
};

export default NotificationDetailPage;
