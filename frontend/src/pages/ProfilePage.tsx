import { useState, useEffect } from "react";
import {
  Mail, Phone, Building2, GraduationCap, BookOpen,
  Users2, Calendar, BadgeCheck, Pencil, X, Save, Loader2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { fetchMyProfile, updateMyProfile, ApiProfile } from "@/lib/api";

// ── helpers ───────────────────────────────────────────────────────────────────

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b last:border-0">
      <Icon className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-0.5">{label}</p>
        <p className="text-sm font-medium break-words">
          {value ?? <span className="text-muted-foreground italic font-normal">Not set</span>}
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs text-muted-foreground block mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded-md text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring"
      />
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border rounded-xl bg-card overflow-hidden h-full">
      <div className="px-5 py-3 border-b bg-muted/30">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </h2>
      </div>
      <div className="px-5 py-1">{children}</div>
    </div>
  );
}

// ── main ──────────────────────────────────────────────────────────────────────

const ProfilePage = () => {
  const { auth } = useAuth();
  const [profile, setProfile] = useState<ApiProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    fullName: "", email: "", phone: "",
    rollNumber: "", department: "", year: "", cgpa: "",
  });

  useEffect(() => {
    if (!auth?.token) return;
    setLoading(true);
    fetchMyProfile(auth.token)
      .then((data) => {
        setProfile(data);
        setForm({
          fullName: data.full_name ?? "",
          email: data.email ?? "",
          phone: data.phone ?? "",
          rollNumber: data.roll_number ?? "",
          department: data.department ?? "",
          year: data.study_year?.toString() ?? "",
          cgpa: data.cgpa?.toString() ?? "",
        });
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load profile."))
      .finally(() => setLoading(false));
  }, [auth?.token]);

  const handleSave = async () => {
    if (!auth?.token || !profile) return;
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const updated = await updateMyProfile(
        {
          fullName: form.fullName || undefined,
          email: form.email || undefined,
          phone: form.phone || undefined,
          universityId: profile.university_id,
          rollNumber: form.rollNumber || undefined,
          department: form.department || undefined,
          year: form.year ? Number(form.year) : undefined,
          cgpa: form.cgpa ? Number(form.cgpa) : undefined,
        },
        auth.token
      );
      if (updated) {
        setProfile(updated);
        setSuccess("Profile updated successfully.");
        setEditing(false);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Update failed.");
    } finally {
      setSaving(false);
    }
  };

  const name = profile?.full_name ?? auth?.user?.full_name ?? "User";
  const initials = name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
  const isStudent = profile?.roles?.includes("student");

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    // Full-width — no max-w constraint, uses all available space from ProtectedLayout
    <div className="w-full space-y-6">

      {/* ══ HERO — full width dotted banner + centered avatar ══ */}
      <div className="w-full border rounded-xl bg-card overflow-hidden">

        {/* Dotted band — full width */}
        <div
          className="relative w-full h-36"
          style={{
            backgroundImage: `radial-gradient(circle, hsl(var(--border)) 1.5px, transparent 1.5px)`,
            backgroundSize: "22px 22px",
            backgroundColor: "hsl(var(--muted)/0.6)",
          }}
        >
          {/* Faint gradient overlay so dots fade at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card/80" />

          {/* Circle avatar — centered, half-overlapping */}
          <div className="absolute -bottom-11 left-1/2 -translate-x-1/2 z-10">
            <div className="w-[88px] h-[88px] rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold ring-[5px] ring-card shadow-lg select-none">
              {initials}
            </div>
          </div>
        </div>

        {/* Identity block — centered */}
        <div className="pt-16 pb-6 px-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-xl font-bold tracking-tight">{name}</h1>
            {profile?.is_verified && (
              <BadgeCheck className="w-5 h-5 text-primary shrink-0" title="Verified" />
            )}
          </div>

          <p className="text-sm text-muted-foreground mt-1">
            {profile?.email ?? auth?.user?.email}
          </p>

          {/* Role chips */}
          {profile?.roles && profile.roles.length > 0 && (
            <div className="flex gap-2 justify-center flex-wrap mt-3">
              {profile.roles.map((r) => (
                <span
                  key={r}
                  className="text-xs px-3 py-0.5 rounded-full bg-primary/10 text-primary font-medium capitalize border border-primary/20"
                >
                  {r}
                </span>
              ))}
            </div>
          )}

          {/* University + program quick line */}
          <div className="flex items-center justify-center gap-4 mt-3 flex-wrap">
            {profile?.university_name && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                {profile.university_name}
              </span>
            )}
            {profile?.program_title && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <GraduationCap className="w-3 h-3" />
                {profile.program_title}
              </span>
            )}
            {profile?.batch_title && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Users2 className="w-3 h-3" />
                {profile.batch_title}
              </span>
            )}
          </div>

          {/* Edit toggle */}
          <button
            onClick={() => { setEditing((e) => !e); setError(""); setSuccess(""); }}
            className="mt-5 inline-flex items-center gap-1.5 text-sm px-5 py-2 border rounded-lg hover:bg-muted transition-colors font-medium"
          >
            {editing ? <X className="w-3.5 h-3.5" /> : <Pencil className="w-3.5 h-3.5" />}
            {editing ? "Cancel editing" : "Edit profile"}
          </button>
        </div>
      </div>

      {/* ── Feedback ── */}
      {error && (
        <p className="text-sm text-destructive bg-destructive/10 px-4 py-2.5 rounded-lg border border-destructive/20">
          {error}
        </p>
      )}
      {success && (
        <p className="text-sm text-green-700 bg-green-50 dark:bg-green-950/30 dark:text-green-400 px-4 py-2.5 rounded-lg">
          {success}
        </p>
      )}

      {/* ══ CONTENT GRID — 2 columns on md+, full width ══ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* ── Personal info ── */}
        <SectionCard title="Personal Information">
          {editing ? (
            <div className="space-y-3 py-3">
              <Field
                label="Full Name"
                value={form.fullName}
                onChange={(v) => setForm((f) => ({ ...f, fullName: v }))}
              />
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
              />
              <Field
                label="Phone"
                type="tel"
                value={form.phone}
                placeholder="+91 XXXXX XXXXX"
                onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
              />
            </div>
          ) : (
            <>
              <InfoRow icon={Mail} label="Email" value={profile?.email} />
              <InfoRow icon={Phone} label="Phone" value={profile?.phone} />
              <InfoRow
                icon={Calendar}
                label="Member since"
                value={
                  profile?.created_at
                    ? new Date(profile.created_at).toLocaleDateString("en-IN", {
                        year: "numeric", month: "long", day: "numeric",
                      })
                    : null
                }
              />
            </>
          )}
        </SectionCard>

        {/* ── University & Program ── */}
        <SectionCard title="University & Program">
          <InfoRow icon={Building2} label="University" value={profile?.university_name} />
          <InfoRow icon={GraduationCap} label="Program" value={profile?.program_title} />
          <InfoRow icon={Users2} label="Batch" value={profile?.batch_title} />
          <InfoRow icon={BookOpen} label="Batch Status" value={profile?.batch_status} />
          {(profile?.batch_start_date || profile?.batch_end_date) && (
            <InfoRow
              icon={Calendar}
              label="Batch Period"
              value={[
                profile.batch_start_date
                  ? new Date(profile.batch_start_date).toLocaleDateString("en-IN", {
                      month: "short", year: "numeric",
                    })
                  : null,
                profile.batch_end_date
                  ? new Date(profile.batch_end_date).toLocaleDateString("en-IN", {
                      month: "short", year: "numeric",
                    })
                  : "Ongoing",
              ]
                .filter(Boolean)
                .join(" – ")}
            />
          )}
        </SectionCard>

        {/* ── Academic details ── */}
        {(isStudent || editing) && (
          <SectionCard title="Academic Details">
            {editing ? (
              <div className="space-y-3 py-3">
                <Field
                  label="Roll Number"
                  value={form.rollNumber}
                  placeholder="e.g. CS2024001"
                  onChange={(v) => setForm((f) => ({ ...f, rollNumber: v }))}
                />
                <Field
                  label="Department"
                  value={form.department}
                  placeholder="e.g. Computer Science"
                  onChange={(v) => setForm((f) => ({ ...f, department: v }))}
                />
                <Field
                  label="Current Year"
                  type="number"
                  value={form.year}
                  placeholder="1 – 4"
                  onChange={(v) => setForm((f) => ({ ...f, year: v }))}
                />
                <Field
                  label="CGPA"
                  type="number"
                  value={form.cgpa}
                  placeholder="e.g. 8.5"
                  onChange={(v) => setForm((f) => ({ ...f, cgpa: v }))}
                />
              </div>
            ) : (
              <>
                <InfoRow icon={BookOpen} label="Roll Number" value={profile?.roll_number} />
                <InfoRow icon={GraduationCap} label="Department" value={profile?.department} />
                <InfoRow
                  icon={Calendar}
                  label="Current Year"
                  value={profile?.study_year ? `Year ${profile.study_year}` : null}
                />
                <InfoRow icon={BadgeCheck} label="CGPA" value={profile?.cgpa} />
              </>
            )}
          </SectionCard>
        )}

        {/* ── Account ── */}
        <SectionCard title="Account">
          <InfoRow
            icon={BadgeCheck}
            label="Status"
            value={
              <span
                className={`inline-flex text-xs font-medium px-2.5 py-0.5 rounded-full ${
                  profile?.is_active
                    ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {profile?.is_active ? "Active" : "Inactive"}
              </span>
            }
          />
          <InfoRow
            icon={BadgeCheck}
            label="Verification"
            value={
              <span
                className={`inline-flex text-xs font-medium px-2.5 py-0.5 rounded-full ${
                  profile?.is_verified
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {profile?.is_verified ? "Verified" : "Not verified"}
              </span>
            }
          />
          {profile?.last_login_at && (
            <InfoRow
              icon={Calendar}
              label="Last Login"
              value={new Date(profile.last_login_at).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            />
          )}
        </SectionCard>
      </div>

      {/* ── Save button ── */}
      {editing && (
        <div className="flex justify-end pb-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-60 transition-opacity"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
