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
import Groups from "./pages/Groups";
import PlacementTest from "./pages/PlacementTest";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import KidsCourse from "./pages/KidsCourse";
import StoriesCourse from "./pages/StoriesCourse";
import MoviesCourse from "./pages/MoviesCourse";
import KidsGameCenter from "./pages/KidsGameCenter";
import StorySlideLesson from "./pages/StorySlideLesson";
import MovieSlideLesson from "./pages/MovieSlideLesson";
import Dictionary from "./pages/Dictionary";
import Flashcards from "./pages/Flashcards";
import AIChatTutor from "./pages/AIChatTutor";
import Leaderboard from "./pages/Leaderboard";
import Community from "./pages/Community";
import PronunciationChecker from "./pages/PronunciationChecker";
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
            <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
            <Route path="/courses/category/:categorySlug" element={<ProtectedRoute><CategoryDetail /></ProtectedRoute>} />
            <Route path="/courses/:levelId/:lessonId/slides" element={<ProtectedRoute><SlideLesson /></ProtectedRoute>} />
            <Route path="/courses/:levelId/:lessonId" element={<ProtectedRoute><LessonPage /></ProtectedRoute>} />
            <Route path="/courses/kids" element={<ProtectedRoute><KidsCourse /></ProtectedRoute>} />
            <Route path="/courses/stories" element={<ProtectedRoute><StoriesCourse /></ProtectedRoute>} />
            <Route path="/courses/movies" element={<ProtectedRoute><MoviesCourse /></ProtectedRoute>} />
            <Route path="/kids/games" element={<ProtectedRoute><KidsGameCenter /></ProtectedRoute>} />
            <Route path="/courses/:levelId" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
            <Route path="/fm" element={<ProtectedRoute><FMRadio /></ProtectedRoute>} />
            <Route path="/practice" element={<ProtectedRoute><PracticeSpeaking /></ProtectedRoute>} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/placement-test" element={<PlacementTest />} />
            <Route path="/dictionary" element={<ProtectedRoute><Dictionary /></ProtectedRoute>} />
            <Route path="/flashcards" element={<ProtectedRoute><Flashcards /></ProtectedRoute>} />
            <Route path="/ai-tutor" element={<ProtectedRoute><AIChatTutor /></ProtectedRoute>} />
            <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
            <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
            <Route path="/pronunciation" element={<ProtectedRoute><PronunciationChecker /></ProtectedRoute>} />
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
            <Route path="/teacher-dashboard" element={
              <ProtectedRoute requiredRole="teacher">
                <TeacherDashboard />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
