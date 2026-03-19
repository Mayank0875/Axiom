import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import NotFound from "./pages/NotFound";
import CpClub from "./pages/Clubs/CpClub";
import DevClub from "./pages/Clubs/DevClub";
import RoboticsClub from "./pages/Clubs/RoboticsClub";
import AcademicsFaculty from "../src/components/AcademicsFaculty"
import Gdg from "./pages/Clubs/Gdg";
import TechTrek from "./components/TechTrek";
import TravelFunds from "./pages/TravelFunds";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));
const Clubs = lazy(() => import("./pages/Clubs"));
const Academics = lazy(() => import("./pages/Academics"));
const Campus = lazy(() => import("./pages/Campus"));
const Fests = lazy(() => import("./pages/Fests"));
const Events = lazy(() => import("./pages/Events"));
const Mentors = lazy(() => import("./pages/Mentors"));
const Startups = lazy(() => import("./pages/Startups"));
const Internships = lazy(() => import("./pages/Internships"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/campus" element={<Campus />} />
            <Route path="/fests" element={<Fests />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/startups" element={<Startups />} />
            <Route path="/events" element={<Events />} />
            <Route path="/internships" element={<Internships />} />
            <Route path="/cp" element={<CpClub />} />
            <Route path="/dev" element={<DevClub />} />
            <Route path="/robotics" element={<RoboticsClub />} />
            <Route path="/gdg" element={<Gdg />} />
            <Route path="/academics/faculty" element={<AcademicsFaculty />} />
            <Route path="/academics/faculty" element={<AcademicsFaculty/>} /> 
            <Route path="/techtrek" element={<TechTrek />} />
            <Route path="/travelfunds" element={<TravelFunds />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
