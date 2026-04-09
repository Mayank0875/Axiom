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

// A single option inside a question
export interface QuizOption {
  key: string;       // "A", "B", "C", "D"
  text: string;
}

// A single question inside a quiz
export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
  correctKey: string;       // which option key is correct
  explanation: string;      // shown after submission
  marks: number;
}

// Full quiz detail (used on the attempt/review page)
export interface QuizDetail {
  id: number;
  title: string;
  syllabus: string;         // shown on instructions page
  scheduledFor: string;
  totalXP: number;
  questions: QuizQuestion[];
  submitted: boolean;       // true = already attempted
  userAnswers: Record<number, string>; // questionId -> chosen key (empty if not submitted)
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

// ─── Quiz Detail Data (questions, options, correct answers, explanations) ────
// submitted: true  → user already attempted, show review mode
// submitted: false → user hasn't started, show instructions then attempt
export const quizDetails: QuizDetail[] = [
  {
    id: 1,
    title: "Do you know Frappe Learning?",
    syllabus: "Frappe LMS basics, course creation, batches, and certifications",
    scheduledFor: "Apr 2, 2026 10:00 AM",
    totalXP: 40,
    submitted: true,
    userAnswers: { 1: "B", 2: "A", 3: "C", 4: "B" },
    questions: [
      {
        id: 1,
        question: "What is Frappe Learning primarily used for?",
        options: [
          { key: "A", text: "Project management" },
          { key: "B", text: "Building and managing online courses" },
          { key: "C", text: "Accounting software" },
          { key: "D", text: "HR management" },
        ],
        correctKey: "B",
        explanation: "Frappe Learning is an open-source LMS built on the Frappe framework, designed specifically for creating and managing online courses.",
        marks: 10,
      },
      {
        id: 2,
        question: "Which framework is Frappe Learning built on?",
        options: [
          { key: "A", text: "Django" },
          { key: "B", text: "Laravel" },
          { key: "C", text: "Frappe Framework" },
          { key: "D", text: "Ruby on Rails" },
        ],
        correctKey: "C",
        explanation: "Frappe Learning is built on the Frappe Framework, which is a full-stack web application framework written in Python and JavaScript.",
        marks: 10,
      },
      {
        id: 3,
        question: "What is a 'Batch' in Frappe Learning?",
        options: [
          { key: "A", text: "A group of instructors" },
          { key: "B", text: "A collection of quizzes" },
          { key: "C", text: "A cohort of students enrolled together" },
          { key: "D", text: "A set of programming exercises" },
        ],
        correctKey: "C",
        explanation: "A Batch in Frappe Learning represents a cohort of students who are enrolled and learning together within a specific time period.",
        marks: 10,
      },
      {
        id: 4,
        question: "Which of these is NOT a feature of Frappe Learning?",
        options: [
          { key: "A", text: "Certifications" },
          { key: "B", text: "Live video streaming" },
          { key: "C", text: "Quizzes" },
          { key: "D", text: "Assignments" },
        ],
        correctKey: "B",
        explanation: "Frappe Learning supports certifications, quizzes, and assignments but does not have a built-in live video streaming feature.",
        marks: 10,
      },
    ],
  },
  {
    id: 2,
    title: "Python Basics Quiz",
    syllabus: "Python syntax, data types, loops, functions, and basic OOP concepts",
    scheduledFor: "Apr 6, 2026 11:00 AM",
    totalXP: 50,
    submitted: false,
    userAnswers: {},
    questions: [
      {
        id: 1,
        question: "Which keyword is used to define a function in Python?",
        options: [
          { key: "A", text: "function" },
          { key: "B", text: "def" },
          { key: "C", text: "func" },
          { key: "D", text: "define" },
        ],
        correctKey: "B",
        explanation: "In Python, the 'def' keyword is used to define a function. For example: def my_function():",
        marks: 10,
      },
      {
        id: 2,
        question: "What is the output of: print(type([]))?",
        options: [
          { key: "A", text: "<class 'list'>" },
          { key: "B", text: "<class 'array'>" },
          { key: "C", text: "<class 'tuple'>" },
          { key: "D", text: "<class 'dict'>" },
        ],
        correctKey: "A",
        explanation: "[] creates an empty list in Python. The type() function returns the class type, which is <class 'list'>.",
        marks: 10,
      },
      {
        id: 3,
        question: "Which of these is a mutable data type in Python?",
        options: [
          { key: "A", text: "Tuple" },
          { key: "B", text: "String" },
          { key: "C", text: "List" },
          { key: "D", text: "Integer" },
        ],
        correctKey: "C",
        explanation: "Lists are mutable in Python, meaning their elements can be changed after creation. Tuples, strings, and integers are immutable.",
        marks: 10,
      },
      {
        id: 4,
        question: "What does the 'self' parameter represent in a Python class method?",
        options: [
          { key: "A", text: "The class itself" },
          { key: "B", text: "The parent class" },
          { key: "C", text: "The current instance of the class" },
          { key: "D", text: "A static reference" },
        ],
        correctKey: "C",
        explanation: "'self' refers to the current instance of the class. It allows access to the attributes and methods of the object.",
        marks: 10,
      },
      {
        id: 5,
        question: "Which loop is used when the number of iterations is unknown?",
        options: [
          { key: "A", text: "for loop" },
          { key: "B", text: "while loop" },
          { key: "C", text: "do-while loop" },
          { key: "D", text: "foreach loop" },
        ],
        correctKey: "B",
        explanation: "A while loop runs as long as a condition is true, making it ideal when the number of iterations is not known in advance.",
        marks: 10,
      },
    ],
  },
  {
    id: 3,
    title: "HTML & CSS Fundamentals",
    syllabus: "HTML tags, semantic elements, CSS selectors, box model, and flexbox",
    scheduledFor: "Apr 8, 2026 2:00 PM",
    totalXP: 30,
    submitted: false,
    userAnswers: {},
    questions: [
      {
        id: 1,
        question: "Which HTML tag is used to create a hyperlink?",
        options: [
          { key: "A", text: "<link>" },
          { key: "B", text: "<href>" },
          { key: "C", text: "<a>" },
          { key: "D", text: "<url>" },
        ],
        correctKey: "C",
        explanation: "The <a> (anchor) tag is used to create hyperlinks in HTML. The href attribute specifies the URL destination.",
        marks: 10,
      },
      {
        id: 2,
        question: "Which CSS property controls the space between the content and the border?",
        options: [
          { key: "A", text: "margin" },
          { key: "B", text: "padding" },
          { key: "C", text: "spacing" },
          { key: "D", text: "gap" },
        ],
        correctKey: "B",
        explanation: "Padding controls the space between the content and the border of an element. Margin controls the space outside the border.",
        marks: 10,
      },
      {
        id: 3,
        question: "What does CSS stand for?",
        options: [
          { key: "A", text: "Computer Style Sheets" },
          { key: "B", text: "Creative Style System" },
          { key: "C", text: "Cascading Style Sheets" },
          { key: "D", text: "Colorful Style Syntax" },
        ],
        correctKey: "C",
        explanation: "CSS stands for Cascading Style Sheets. It is used to style and layout web pages.",
        marks: 10,
      },
    ],
  },
  {
    id: 4,
    title: "JavaScript Advanced Concepts",
    syllabus: "Closures, promises, async/await, prototypes, and event loop",
    scheduledFor: "Apr 10, 2026 3:00 PM",
    totalXP: 60,
    submitted: false,
    userAnswers: {},
    questions: [
      {
        id: 1,
        question: "What is a closure in JavaScript?",
        options: [
          { key: "A", text: "A way to close the browser window" },
          { key: "B", text: "A function that remembers its outer scope even after the outer function has returned" },
          { key: "C", text: "A method to end a loop" },
          { key: "D", text: "A type of error handling" },
        ],
        correctKey: "B",
        explanation: "A closure is a function that has access to its outer function's variables even after the outer function has finished executing.",
        marks: 15,
      },
      {
        id: 2,
        question: "What does 'async/await' do in JavaScript?",
        options: [
          { key: "A", text: "Makes code run faster" },
          { key: "B", text: "Allows writing asynchronous code in a synchronous style" },
          { key: "C", text: "Creates multiple threads" },
          { key: "D", text: "Prevents errors in code" },
        ],
        correctKey: "B",
        explanation: "async/await is syntactic sugar over Promises that allows you to write asynchronous code that looks and behaves like synchronous code.",
        marks: 15,
      },
      {
        id: 3,
        question: "What is the JavaScript event loop responsible for?",
        options: [
          { key: "A", text: "Managing CSS animations" },
          { key: "B", text: "Handling DOM events only" },
          { key: "C", text: "Executing code, collecting events, and executing queued sub-tasks" },
          { key: "D", text: "Compiling JavaScript to machine code" },
        ],
        correctKey: "C",
        explanation: "The event loop continuously checks the call stack and the task queue, executing queued tasks when the call stack is empty.",
        marks: 15,
      },
      {
        id: 4,
        question: "Which method is used to create a Promise that resolves when all given promises resolve?",
        options: [
          { key: "A", text: "Promise.any()" },
          { key: "B", text: "Promise.race()" },
          { key: "C", text: "Promise.all()" },
          { key: "D", text: "Promise.resolve()" },
        ],
        correctKey: "C",
        explanation: "Promise.all() takes an array of promises and returns a new promise that resolves when all of them resolve, or rejects if any one rejects.",
        marks: 15,
      },
    ],
  },
];
