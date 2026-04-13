import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import { AuthProvider } from "@/context/AuthContext";
import { SemesterProvider } from "@/context/SemesterContext";
import ProtectedLayout from "@/components/ProtectedLayout";
import RoleProtectedRoute from "@/components/RoleProtectedRoute";

import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";

import HomePage from "@/pages/HomePage";
import SearchPage from "@/pages/SearchPage";
import NotificationsPage from "@/pages/NotificationsPage";
import NotificationDetailPage from "@/pages/NotificationDetailPage";
import CoursesPage from "@/pages/CoursesPage";
import ProgramsPage from "@/pages/ProgramsPage";
import BatchesPage from "@/pages/BatchesPage";
import CertificationsPage from "@/pages/CertificationsPage";
import JobsPage from "@/pages/JobsPage";
import StatisticsPage from "@/pages/StatisticsPage";
import QuizzesPage from "@/pages/QuizzesPage";
import AssignmentsPage from "@/pages/AssignmentsPage";
import ExercisesPage from "@/pages/ExercisesPage";
import ProfilePage from "@/pages/ProfilePage";
import FacultyPanel from "@/pages/FacultyPanel";
import NotFound from "@/pages/NotFound";
import QuizInstructionsPage from "@/pages/QuizInstructionsPage";
import QuizAttemptPage from "@/pages/QuizAttemptPage";
import QuizReviewPage from "@/pages/QuizReviewPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <SemesterProvider>
              <Routes>
                {/* Public landing page */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* Protected portal — all under /home */}
                <Route path="/home" element={<ProtectedLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="search" element={<SearchPage />} />
                  <Route path="notifications" element={<NotificationsPage />} />
                  <Route path="notifications/:id" element={<NotificationDetailPage />} />
                  <Route path="courses" element={<CoursesPage />} />
                  <Route path="programs" element={<ProgramsPage />} />
                  <Route path="batches" element={<BatchesPage />} />
                  <Route path="certifications" element={<CertificationsPage />} />
                  <Route path="jobs" element={<JobsPage />} />
                  <Route path="statistics" element={<StatisticsPage />} />
                  <Route path="quizzes" element={<QuizzesPage />} />
                  <Route path="quizzes/:id/instructions" element={<QuizInstructionsPage />} />
                  <Route path="quizzes/:id/attempt" element={<QuizAttemptPage />} />
                  <Route path="quizzes/:id/review" element={<QuizReviewPage />} />
                  <Route path="assignments" element={<AssignmentsPage />} />
                  <Route path="exercises" element={<ExercisesPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route
                    path="faculty"
                    element={
                      <RoleProtectedRoute allowedRoles={["admin", "faculty"]}>
                        <FacultyPanel />
                      </RoleProtectedRoute>
                    }
                  />
                </Route>

                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </SemesterProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
