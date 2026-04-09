/* Statistics page — Frappe LMS style with charts */
import { statsData } from "@/data/mockData";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";

const StatisticsPage = () => {
  const { courses, signups, enrollments, completions, certifications, enrollmentsPerDay, certificationsPerDay, completionData } = statsData;
  const totalCompletion = completionData.reduce((a, b) => a + b.value, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Statistics</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {[
          { label: "Courses", value: courses },
          { label: "Signups", value: signups },
          { label: "Enrollments", value: enrollments },
          { label: "Completions", value: completions },
          { label: "Certifications", value: certifications },
        ].map((s) => (
          <div key={s.label} className="border rounded-lg p-4 bg-card">
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="text-2xl font-bold mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollments chart */}
        <div className="border rounded-lg p-5 bg-card">
          <h3 className="font-semibold mb-1">Enrollments</h3>
          <p className="text-xs text-muted-foreground mb-4">Enrollments per day</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={enrollmentsPerDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={{ r: 3 }} name="Enrollments" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Certifications chart */}
        <div className="border rounded-lg p-5 bg-card">
          <h3 className="font-semibold mb-1">Certifications</h3>
          <p className="text-xs text-muted-foreground mb-4">Certifications per day</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={certificationsPerDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={{ r: 3 }} name="Certifications" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Completions donut */}
        <div className="border rounded-lg p-5 bg-card">
          <h3 className="font-semibold mb-1">Completions</h3>
          <p className="text-xs text-muted-foreground mb-4">Course Completion</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={completionData} dataKey="value" nameKey="label" cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2}>
                {completionData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                formatter={(value: string) => {
                  const item = completionData.find((d) => d.label === value);
                  const pct = item ? Math.round((item.value / totalCompletion) * 100) : 0;
                  return `${value} (${pct}%)`;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
