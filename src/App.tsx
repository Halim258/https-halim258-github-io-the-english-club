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
            <Route path="/courses/:levelId" element={<Courses />} />
            <Route path="/fm" element={<FMRadio />} />
            <Route path="/practice" element={<PracticeSpeaking />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/placement-test" element={<PlacementTest />} />
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
