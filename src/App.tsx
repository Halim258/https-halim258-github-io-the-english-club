import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import LessonPage from "./pages/LessonPage";
import CategoryDetail from "./pages/CategoryDetail";
import FMRadio from "./pages/FMRadio";
import SlideLesson from "./pages/SlideLesson";
import PracticeSpeaking from "./pages/PracticeSpeaking";
import Teachers from "./pages/Teachers";
import PlacementTest from "./pages/PlacementTest";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import KidsCourse from "./pages/KidsCourse";
import StoriesCourse from "./pages/StoriesCourse";
import MoviesCourse from "./pages/MoviesCourse";
import KidsGameCenter from "./pages/KidsGameCenter";
import Dictionary from "./pages/Dictionary";
import Flashcards from "./pages/Flashcards";
import AIChatTutor from "./pages/AIChatTutor";
import Leaderboard from "./pages/Leaderboard";
import Community from "./pages/Community";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/category/:categorySlug" element={<CategoryDetail />} />
            <Route path="/courses/:levelId/:lessonId/slides" element={<SlideLesson />} />
            <Route path="/courses/:levelId/:lessonId" element={<LessonPage />} />
            <Route path="/courses/kids" element={<KidsCourse />} />
            <Route path="/courses/stories" element={<StoriesCourse />} />
            <Route path="/courses/movies" element={<MoviesCourse />} />
            <Route path="/kids/games" element={<KidsGameCenter />} />
            <Route path="/courses/:levelId" element={<Courses />} />
            <Route path="/fm" element={<FMRadio />} />
            <Route path="/practice" element={<PracticeSpeaking />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/placement-test" element={<PlacementTest />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/ai-tutor" element={<AIChatTutor />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/community" element={<Community />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
