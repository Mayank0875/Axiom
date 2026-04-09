/* Home page — Frappe LMS style */
import { BookOpen, Users, Star } from "lucide-react";
import { courses } from "@/data/mockData";

const HomePage = () => {
  const myCourses = courses.filter((c) => c.instructor === "Mayank Gupta");

  return (
    <div>
      <h1 className="text-2xl font-bold">Hey, Mayank Gupta 👋</h1>
      <p className="text-muted-foreground mt-1">Manage your courses and batches at a glance</p>

      {/* Courses Created */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Courses Created</h2>
          <button className="text-sm text-muted-foreground hover:text-foreground">See all →</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {myCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

function CourseCard({ course }: { course: typeof courses[0] }) {
  return (
    <div className="border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow">
      {/* Placeholder image */}
      <div className="h-40 bg-muted flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <BookOpen className="w-10 h-10 mx-auto mb-1 opacity-40" />
          <span className="text-xs opacity-40">Course Image</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4 px-4 pt-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5" /> {course.lessonCount}
        </span>
        <span className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5" /> {course.enrolledCount}
        </span>
        {course.rating > 0 && (
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5" /> {course.rating.toFixed(1)}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 pt-2">
        <h3 className="font-semibold text-sm">{course.title}</h3>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{course.description}</p>
        <div className="flex items-center gap-2 mt-3">
          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
            {course.instructor.split(" ").map((n) => n[0]).join("")}
          </div>
          <span className="text-xs text-muted-foreground">{course.instructor}</span>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
