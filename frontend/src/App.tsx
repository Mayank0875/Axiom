/* Main App — Frappe LMS style */
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

import HomePage from "@/pages/HomePage";
import SearchPage from "@/pages/SearchPage";
import NotificationsPage from "@/pages/NotificationsPage";
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

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
              <TopBar />
              <main className="flex-1 p-6 md:p-8">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/notifications" element={<NotificationsPage />} />
                  <Route path="/courses" element={<CoursesPage />} />
                  <Route path="/programs" element={<ProgramsPage />} />
                  <Route path="/batches" element={<BatchesPage />} />
                  <Route path="/certifications" element={<CertificationsPage />} />
                  <Route path="/jobs" element={<JobsPage />} />
                  <Route path="/statistics" element={<StatisticsPage />} />
                  <Route path="/quizzes" element={<QuizzesPage />} />
                  <Route path="/assignments" element={<AssignmentsPage />} />
                  <Route path="/exercises" element={<ExercisesPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/faculty" element={<FacultyPanel />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
