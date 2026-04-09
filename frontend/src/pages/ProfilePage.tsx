/* Profile page — user profile with details */
import { userProfile } from "@/data/mockData";
import { User, Mail, BookOpen, Award, TrendingUp } from "lucide-react";

const ProfilePage = () => {
  const { name, email } = userProfile;
  const initials = name.split(" ").map((n) => n[0]).join("");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      {/* Profile card */}
      <div className="border rounded-lg bg-card p-6 max-w-2xl">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-2xl font-bold">
            {initials}
          </div>
          <div>
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
              <Mail className="w-3.5 h-3.5" /> {email}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Instructor · Admin</p>
          </div>
        </div>

        <div className="border-t mt-6 pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: BookOpen, label: "Courses Created", value: "6" },
            { icon: User, label: "Enrollments", value: "158" },
            { icon: Award, label: "Certifications", value: "8" },
            { icon: TrendingUp, label: "Completion Rate", value: "85%" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
              <p className="text-lg font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Account Settings */}
      <div className="border rounded-lg bg-card p-6 max-w-2xl mt-6">
        <h3 className="font-semibold mb-4">Account Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground block mb-1">Full Name</label>
            <input defaultValue={name} className="w-full px-3 py-2 border rounded-lg text-sm bg-card focus:outline-none focus:ring-1 focus:ring-ring" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-1">Email</label>
            <input defaultValue={email} className="w-full px-3 py-2 border rounded-lg text-sm bg-card focus:outline-none focus:ring-1 focus:ring-ring" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-1">Bio</label>
            <textarea rows={3} placeholder="Tell us about yourself..." className="w-full px-3 py-2 border rounded-lg text-sm bg-card focus:outline-none focus:ring-1 focus:ring-ring" />
          </div>
          <button className="px-4 py-2 bg-foreground text-background rounded-lg text-sm font-medium hover:opacity-90">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
