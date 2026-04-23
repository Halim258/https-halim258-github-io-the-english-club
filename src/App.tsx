import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy-loaded pages for better performance
const Courses = lazy(() => import("./pages/Courses"));
const LessonPage = lazy(() => import("./pages/LessonPage"));
const CategoryDetail = lazy(() => import("./pages/CategoryDetail"));
const FMRadio = lazy(() => import("./pages/FMRadio"));
const SlideLesson = lazy(() => import("./pages/SlideLesson"));
const PracticeSpeaking = lazy(() => import("./pages/PracticeSpeaking"));
const Teachers = lazy(() => import("./pages/Teachers"));
const Groups = lazy(() => import("./pages/Groups"));
const PlacementTest = lazy(() => import("./pages/PlacementTest"));
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const TeacherDashboard = lazy(() => import("./pages/TeacherDashboard"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const KidsCourse = lazy(() => import("./pages/KidsCourse"));
const StoriesCourse = lazy(() => import("./pages/StoriesCourse"));
const MoviesCourse = lazy(() => import("./pages/MoviesCourse"));
const KidsGameCenter = lazy(() => import("./pages/KidsGameCenter"));
const StorySlideLesson = lazy(() => import("./pages/StorySlideLesson"));
const MovieSlideLesson = lazy(() => import("./pages/MovieSlideLesson"));
const Dictionary = lazy(() => import("./pages/Dictionary"));
const Flashcards = lazy(() => import("./pages/Flashcards"));
const AIChatTutor = lazy(() => import("./pages/AIChatTutor"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const Community = lazy(() => import("./pages/Community"));
const DocumentaryCourse = lazy(() => import("./pages/DocumentaryCourse"));
const DocumentarySlideLesson = lazy(() => import("./pages/DocumentarySlideLesson"));
const PronunciationChecker = lazy(() => import("./pages/PronunciationChecker"));
const Achievements = lazy(() => import("./pages/Achievements"));
const VocabQuiz = lazy(() => import("./pages/VocabQuiz"));
const WritingPractice = lazy(() => import("./pages/WritingPractice"));
const CourseProgress = lazy(() => import("./pages/CourseProgress"));
const NotificationCenter = lazy(() => import("./pages/NotificationCenter"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const BookmarksPage = lazy(() => import("./pages/BookmarksPage"));
const GrammarReference = lazy(() => import("./pages/GrammarReference"));
const IdiomsPhrasalVerbs = lazy(() => import("./pages/IdiomsPhrasalVerbs"));
const PlatformBlog = lazy(() => import("./pages/PlatformBlog"));

const queryClient = new QueryClient();

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-muted border-t-primary" />
          <div className="absolute inset-0 h-10 w-10 animate-ping rounded-full border border-primary/20" />
        </div>
        <div className="space-y-1 text-center">
          <p className="text-sm text-foreground font-semibold">Loading</p>
          <p className="text-xs text-muted-foreground animate-pulse">Preparing your content...</p>
        </div>
      </div>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
              <Route path="/courses/category/:categorySlug" element={<ProtectedRoute><CategoryDetail /></ProtectedRoute>} />
              <Route path="/courses/:levelId/:lessonId/slides" element={<ProtectedRoute><SlideLesson /></ProtectedRoute>} />
              <Route path="/courses/:levelId/:lessonId" element={<ProtectedRoute><LessonPage /></ProtectedRoute>} />
              <Route path="/courses/kids" element={<ProtectedRoute><KidsCourse /></ProtectedRoute>} />
              <Route path="/courses/stories" element={<ProtectedRoute><StoriesCourse /></ProtectedRoute>} />
              <Route path="/courses/stories/:lessonId/slides" element={<ProtectedRoute><StorySlideLesson /></ProtectedRoute>} />
              <Route path="/courses/movies" element={<ProtectedRoute><MoviesCourse /></ProtectedRoute>} />
              <Route path="/courses/movies/:lessonId/slides" element={<ProtectedRoute><MovieSlideLesson /></ProtectedRoute>} />
              <Route path="/courses/documentary" element={<ProtectedRoute><DocumentaryCourse /></ProtectedRoute>} />
              <Route path="/courses/documentary/:lessonId/slides" element={<ProtectedRoute><DocumentarySlideLesson /></ProtectedRoute>} />
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
              <Route path="/achievements" element={<ProtectedRoute><Achievements /></ProtectedRoute>} />
              <Route path="/vocab-quiz" element={<ProtectedRoute><VocabQuiz /></ProtectedRoute>} />
              <Route path="/writing" element={<ProtectedRoute><WritingPractice /></ProtectedRoute>} />
              <Route path="/progress" element={<ProtectedRoute><CourseProgress /></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><NotificationCenter /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/bookmarks" element={<ProtectedRoute><BookmarksPage /></ProtectedRoute>} />
              <Route path="/grammar" element={<ProtectedRoute><GrammarReference /></ProtectedRoute>} />
              <Route path="/idioms" element={<ProtectedRoute><IdiomsPhrasalVerbs /></ProtectedRoute>} />
              <Route path="/blog" element={<PlatformBlog />} />
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
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
