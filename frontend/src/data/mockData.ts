/* Mock data for Frappe-style LMS */

export interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  lessonCount: number;
  enrolledCount: number;
  rating: number;
  instructor: string;
  status: "Live" | "New" | "Upcoming" | "Created" | "Unpublished";
  category: string;
  published: boolean;
}

export interface Program {
  id: number;
  title: string;
  description: string;
  courseCount: number;
}

export interface Batch {
  id: number;
  title: string;
  status: "Upcoming" | "Archived" | "Unpublished";
  startDate: string;
  endDate: string;
  courseCount: number;
  studentCount: number;
  category: string;
}

export interface CertifiedMember {
  id: number;
  name: string;
  category: string;
  openToWork: boolean;
  hiring: boolean;
}

export interface JobOpening {
  id: number;
  title: string;
  company: string;
  country: string;
  type: "Full Time" | "Part Time" | "Internship" | "Contract";
  workMode: "Remote" | "On-site" | "Hybrid";
}

export interface Quiz {
  id: number;
  title: string;
  totalMarks: number;
  passingPercentage: number;
  maxAttempts: number;
  showAnswers: boolean;
  updatedOn: string;
}

export interface Assignment {
  id: number;
  title: string;
  type: string;
  dueDate: string;
  totalGrade: number;
  status: "Draft" | "Published";
  updatedOn: string;
}

export interface ProgrammingExercise {
  id: number;
  title: string;
  language: string;
  difficulty: "Easy" | "Medium" | "Hard";
  updatedOn: string;
}

export interface Notification {
  id: number;
  message: string;
  read: boolean;
  time: string;
  type: "info" | "success" | "warning";
}

export interface StatsData {
  courses: number;
  signups: number;
  enrollments: number;
  completions: number;
  certifications: number;
  enrollmentsPerDay: { date: string; count: number }[];
  certificationsPerDay: { date: string; count: number }[];
  completionData: { label: string; value: number; color: string }[];
}

export const courses: Course[] = [
  { id: 1, title: "A guide to Frappe Learning", description: "Learn the basics of Frappe Learning and how to get started with your very first course.", image: "", lessonCount: 5, enrolledCount: 3, rating: 4.0, instructor: "Mayank Gupta", status: "Live", category: "General", published: true },
  { id: 2, title: "Introduction to Python", description: "Master the fundamentals of Python programming with hands-on exercises and projects.", image: "", lessonCount: 12, enrolledCount: 45, rating: 4.5, instructor: "Priya Sharma", status: "Live", category: "Programming", published: true },
  { id: 3, title: "Web Development Bootcamp", description: "A comprehensive guide to building modern web applications using HTML, CSS, and JavaScript.", image: "", lessonCount: 20, enrolledCount: 78, rating: 4.8, instructor: "Rahul Verma", status: "Live", category: "Web Development", published: true },
  { id: 4, title: "Data Science Fundamentals", description: "Explore data analysis, visualization, and machine learning concepts with real-world datasets.", image: "", lessonCount: 15, enrolledCount: 32, rating: 4.2, instructor: "Anjali Patel", status: "New", category: "Data Science", published: true },
  { id: 5, title: "Advanced React Patterns", description: "Deep dive into React patterns including hooks, context, and performance optimization.", image: "", lessonCount: 8, enrolledCount: 0, rating: 0, instructor: "Mayank Gupta", status: "Upcoming", category: "Web Development", published: true },
  { id: 6, title: "Machine Learning with TensorFlow", description: "Build and deploy ML models using TensorFlow and Keras.", image: "", lessonCount: 18, enrolledCount: 0, rating: 0, instructor: "Priya Sharma", status: "Created", category: "Data Science", published: false },
];

export const programs: Program[] = [
  { id: 1, title: "Full Stack Developer Program", description: "A comprehensive program covering frontend, backend, and deployment.", courseCount: 6 },
  { id: 2, title: "Data Science Certificate", description: "Master data analysis, ML, and AI through structured courses.", courseCount: 4 },
];

export const batches: Batch[] = [
  { id: 1, title: "Batch 2026 - Spring", status: "Upcoming", startDate: "2026-05-01", endDate: "2026-08-31", courseCount: 4, studentCount: 30, category: "General" },
  { id: 2, title: "Batch 2025 - Fall", status: "Archived", startDate: "2025-09-01", endDate: "2025-12-31", courseCount: 5, studentCount: 25, category: "Programming" },
];

export const certifiedMembers: CertifiedMember[] = [
  { id: 1, name: "Amit Kumar", category: "Web Development", openToWork: true, hiring: false },
  { id: 2, name: "Sneha Reddy", category: "Data Science", openToWork: false, hiring: true },
  { id: 3, name: "Ravi Teja", category: "Programming", openToWork: true, hiring: false },
];

export const jobOpenings: JobOpening[] = [
  { id: 1, title: "Frontend Developer", company: "TechCorp", country: "India", type: "Full Time", workMode: "Remote" },
  { id: 2, title: "Data Analyst", company: "DataWorks", country: "USA", type: "Internship", workMode: "Hybrid" },
  { id: 3, title: "Backend Engineer", company: "CloudBase", country: "India", type: "Full Time", workMode: "On-site" },
];

export const quizzes: Quiz[] = [
  { id: 1, title: "Do you know Frappe Learning?", totalMarks: 40, passingPercentage: 70, maxAttempts: 0, showAnswers: true, updatedOn: "a minute" },
  { id: 2, title: "Python Basics Quiz", totalMarks: 50, passingPercentage: 60, maxAttempts: 3, showAnswers: true, updatedOn: "2 hours" },
  { id: 3, title: "HTML & CSS Fundamentals", totalMarks: 30, passingPercentage: 65, maxAttempts: 2, showAnswers: false, updatedOn: "1 day" },
  { id: 4, title: "JavaScript Advanced Concepts", totalMarks: 60, passingPercentage: 75, maxAttempts: 1, showAnswers: true, updatedOn: "3 days" },
];

export const assignments: Assignment[] = [
  { id: 1, title: "Build a Portfolio Website", type: "Project", dueDate: "2026-04-20", totalGrade: 100, status: "Published", updatedOn: "2 hours" },
  { id: 2, title: "Python Data Analysis Report", type: "Report", dueDate: "2026-04-25", totalGrade: 50, status: "Published", updatedOn: "1 day" },
  { id: 3, title: "React Component Library", type: "Project", dueDate: "2026-05-01", totalGrade: 80, status: "Draft", updatedOn: "5 days" },
];

export const programmingExercises: ProgrammingExercise[] = [
  { id: 1, title: "Two Sum", language: "Python", difficulty: "Easy", updatedOn: "1 hour" },
  { id: 2, title: "Reverse Linked List", language: "Python", difficulty: "Medium", updatedOn: "3 hours" },
  { id: 3, title: "Binary Search Tree", language: "JavaScript", difficulty: "Medium", updatedOn: "1 day" },
  { id: 4, title: "Dynamic Programming - Knapsack", language: "Python", difficulty: "Hard", updatedOn: "2 days" },
];

export const initialNotifications: Notification[] = [
  { id: 1, message: "New enrollment in 'Introduction to Python'", read: false, time: "5 min ago", type: "info" },
  { id: 2, message: "Assignment 'Build a Portfolio Website' submitted by Amit Kumar", read: false, time: "1 hour ago", type: "success" },
  { id: 3, message: "Quiz deadline approaching: Python Basics Quiz", read: false, time: "2 hours ago", type: "warning" },
  { id: 4, message: "Course 'Web Development Bootcamp' reached 75 enrollments", read: true, time: "1 day ago", type: "info" },
  { id: 5, message: "New review on 'A guide to Frappe Learning' - 4 stars", read: true, time: "2 days ago", type: "info" },
];

export const statsData: StatsData = {
  courses: 6,
  signups: 48,
  enrollments: 158,
  completions: 23,
  certifications: 8,
  enrollmentsPerDay: [
    { date: "Mar 10", count: 2 }, { date: "Mar 13", count: 1 }, { date: "Mar 17", count: 3 },
    { date: "Mar 21", count: 0 }, { date: "Mar 25", count: 5 }, { date: "Mar 29", count: 2 },
    { date: "Apr 1", count: 4 }, { date: "Apr 5", count: 6 }, { date: "Apr 9", count: 3 },
  ],
  certificationsPerDay: [
    { date: "Mar 10", count: 0 }, { date: "Mar 13", count: 1 }, { date: "Mar 17", count: 0 },
    { date: "Mar 21", count: 0 }, { date: "Mar 25", count: 2 }, { date: "Mar 29", count: 0 },
    { date: "Apr 1", count: 1 }, { date: "Apr 5", count: 3 }, { date: "Apr 9", count: 1 },
  ],
  completionData: [
    { label: "In Progress", value: 135, color: "hsl(200, 80%, 55%)" },
    { label: "Completed", value: 23, color: "hsl(45, 90%, 55%)" },
  ],
};

export const userProfile = {
  name: "Mayank Gupta",
  email: "mayank@example.com",
};
