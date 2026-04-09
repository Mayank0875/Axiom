export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api/v1";
const API_BASE_URLS = (() => {
  const configured = (import.meta.env.VITE_API_BASE_URLS as string | undefined)
    ?.split(",")
    .map((url) => url.trim())
    .filter(Boolean);

  const urls = configured?.length ? configured : [API_BASE_URL];
  const first = urls[0];

  // Helpful local fallback: if one local port is stale, try common ports.
  if (first.includes("localhost")) {
    const byPort = [8080, 8081, 8082].map((port) =>
      first.replace(/localhost:\d+/, `localhost:${port}`)
    );
    return Array.from(new Set([...urls, ...byPort]));
  }

  return urls;
})();

export type AuthUser = {
  id: number | string;
  university_id: number | string;
  full_name: string;
  email: string;
};

export type AuthResponse = {
  token: string;
  user: AuthUser;
  roles: string[];
};

type ApiResponse<T> = {
  message: string;
  data: T;
};

const request = async <T>(
  path: string,
  options: RequestInit = {},
  token?: string
) => {
  const headers = new Headers(options.headers ?? {});
  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let lastError: Error | null = null;

  for (const baseUrl of API_BASE_URLS) {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        ...options,
        headers,
      });

      const raw = await response.text();
      let payload: ApiResponse<T> | { message?: string } | null = null;
      let isJson = true;

      try {
        payload = raw
          ? (JSON.parse(raw) as ApiResponse<T> | { message?: string })
          : null;
      } catch {
        isJson = false;
      }

      // If endpoint missing on one backend instance, try next base URL.
      if (!isJson && response.status === 404) {
        continue;
      }

      if (!isJson) {
        throw new Error(
          "Service is temporarily unavailable. Please verify backend is running."
        );
      }

      if (!response.ok) {
        const message =
          (payload && "message" in payload && payload.message) ||
          "Request failed. Please try again.";
        throw new Error(message);
      }

      if (!payload || !("data" in payload)) {
        throw new Error("Unexpected server response.");
      }

      return payload.data;
    } catch (error) {
      lastError =
        error instanceof Error
          ? error
          : new Error("Unable to reach backend. Please try again.");
    }
  }

  throw (
    lastError ??
    new Error("Unable to connect to backend. Please check server status.")
  );
};

export const registerUser = async (input: {
  universityId: number;
  fullName: string;
  email: string;
  password: string;
}) => {
  return request<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
};

export const loginUser = async (input: { email: string; password: string }) => {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
};

export type ApiNotification = {
  id: number | string;
  title?: string;
  message: string;
  created_at: string;
  read_at: string | null;
};

export const fetchUserNotifications = async (userId: number, token: string) => {
  return request<ApiNotification[]>(`/notifications/user/${userId}`, {}, token);
};

export type ApiCourse = {
  id: number | string;
  university_id: number | string;
  title: string;
  course_code: string;
  description: string;
  created_at?: string;
};

export const fetchCourses = async (token: string) => {
  return request<ApiCourse[]>("/courses", {}, token);
};

export const createCourse = async (
  input: {
    universityId: number;
    title: string;
    courseCode: string;
    description: string;
  },
  token: string
) => {
  return request<ApiCourse>(
    "/courses",
    { method: "POST", body: JSON.stringify(input) },
    token
  );
};

export type ApiAssignment = {
  id: number | string;
  course_id: number | string;
  title: string;
  description: string;
  deadline: string;
  max_marks: number;
  assignment_type: "file" | "mcq" | "coding";
  created_at?: string;
};

export const fetchAssignments = async (token: string) => {
  return request<ApiAssignment[]>("/assignments", {}, token);
};

export const createAssignment = async (
  input: {
    courseId: number;
    title: string;
    description: string;
    deadline: string;
    maxMarks: number;
    assignmentType: "file" | "mcq" | "coding";
  },
  token: string
) => {
  return request<ApiAssignment>(
    "/assignments",
    { method: "POST", body: JSON.stringify(input) },
    token
  );
};

export type ApiQuiz = {
  id: number | string;
  course_id: number | string;
  title: string;
  description: string;
  max_attempts: number;
  total_marks: number;
  created_at?: string;
};

export const fetchQuizzes = async (token: string) => {
  return request<ApiQuiz[]>("/quizzes", {}, token);
};

export type ApiQuizQuestion = {
  id: number;
  question: string;
  options: Array<{ key: string; text: string }>;
  correctKey: string | null;
  explanation: string;
  marks: number;
};

export type ApiQuizDetail = {
  id: number | string;
  title: string;
  description: string;
  total_marks: number;
  max_attempts: number;
  questions: ApiQuizQuestion[];
};

export const fetchQuizDetail = async (quizId: number, token: string) => {
  return request<ApiQuizDetail>(`/quizzes/${quizId}`, {}, token);
};

export const submitQuiz = async (
  quizId: number,
  input: { studentId: number; answers: Record<string, string> },
  token: string
) => {
  return request<{ id: number }>(
    `/quizzes/${quizId}/submit`,
    { method: "POST", body: JSON.stringify(input) },
    token
  );
};

export type ApiQuizReview = {
  id: number;
  quiz_id: number;
  title: string;
  score: number;
  questions: Array<{
    id: number;
    question: string;
    options: Array<{ key: string; text: string }>;
    correctKey: string | null;
    explanation: string;
    selectedKey: string | null;
    isCorrect: boolean;
    marks: number;
  }>;
};

export const fetchQuizReview = async (attemptId: number, token: string) => {
  return request<ApiQuizReview>(`/quizzes/attempts/${attemptId}/review`, {}, token);
};

export const createQuiz = async (
  input: {
    courseId: number;
    title: string;
    description: string;
    maxAttempts: number;
    totalMarks: number;
    createdBy: number;
  },
  token: string
) => {
  return request<ApiQuiz>(
    "/quizzes",
    { method: "POST", body: JSON.stringify(input) },
    token
  );
};

export const fetchPrograms = async (token: string) =>
  request<Array<{ id: number; title: string; description: string; course_count: number }>>(
    "/catalog/programs",
    {},
    token
  );

export const fetchBatches = async (token: string) =>
  request<
    Array<{
      id: number;
      title: string;
      status: string;
      start_date: string;
      end_date: string;
      course_count: number;
      student_count: number;
      category: string;
    }>
  >("/catalog/batches", {}, token);

export const fetchCertifications = async (token: string) =>
  request<
    Array<{
      id: number;
      name: string;
      category: string;
      open_to_work: boolean;
      hiring: boolean;
    }>
  >("/catalog/certifications", {}, token);

export const fetchJobs = async (token: string) =>
  request<
    Array<{
      id: number;
      title: string;
      company: string;
      country: string;
      type: string;
      work_mode: string;
    }>
  >("/catalog/jobs", {}, token);

export const fetchExercises = async (token: string) =>
  request<
    Array<{
      id: number;
      title: string;
      language: string;
      difficulty: string;
      course_id: number | null;
      course_title: string | null;
      updated_on: string;
    }>
  >("/catalog/exercises", {}, token);

export const fetchStatistics = async (token: string) =>
  request<{
    courses: number;
    signups: number;
    enrollments: number;
    completions: number;
    certifications: number;
  }>("/catalog/statistics", {}, token);

