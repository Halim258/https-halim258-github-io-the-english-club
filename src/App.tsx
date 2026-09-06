import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SoundProvider from "@/components/SoundProvider";
import { Suspense } from "react";
import { lazyWithRetry } from "@/lib/lazyWithRetry";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import Library from "./pages/Library";

// Lazy-loaded pages for better performance
const Courses = lazyWithRetry(() => import("./pages/Courses"));
const LessonPage = lazyWithRetry(() => import("./pages/LessonPage"));
const CategoryDetail = lazyWithRetry(() => import("./pages/CategoryDetail"));
const FMRadio = lazyWithRetry(() => import("./pages/FMRadio"));
const SlideLesson = lazyWithRetry(() => import("./pages/SlideLesson"));
const PracticeSpeaking = lazyWithRetry(() => import("./pages/PracticeSpeaking"));
const Teachers = lazyWithRetry(() => import("./pages/Teachers"));
const Groups = lazyWithRetry(() => import("./pages/Groups"));
const PlacementTest = lazyWithRetry(() => import("./pages/PlacementTest"));
const PhonicsDiagnostic = lazyWithRetry(() => import("./pages/PhonicsDiagnostic"));
const LevelAssessment = lazyWithRetry(() => import("./pages/LevelAssessment"));

const StudentDashboard = lazyWithRetry(() => import("./pages/StudentDashboard"));
const AdminDashboard = lazyWithRetry(() => import("./pages/AdminDashboard"));
const AdminStudentProgress = lazyWithRetry(() => import("./pages/AdminStudentProgress"));
const AdminStudentActivity = lazyWithRetry(() => import("./pages/AdminStudentActivity"));
const AdminPendingApprovals = lazyWithRetry(() => import("./pages/AdminPendingApprovals"));
const AdminGrantAccess = lazyWithRetry(() => import("./pages/AdminGrantAccess"));
const TeacherDashboard = lazyWithRetry(() => import("./pages/TeacherDashboard"));
const Login = lazyWithRetry(() => import("./pages/Login"));
const Signup = lazyWithRetry(() => import("./pages/Signup"));
const ForgotPassword = lazyWithRetry(() => import("./pages/ForgotPassword"));
const ResetPassword = lazyWithRetry(() => import("./pages/ResetPassword"));
const KidsCourse = lazyWithRetry(() => import("./pages/KidsCourse"));
const StoriesCourse = lazyWithRetry(() => import("./pages/StoriesCourse"));
const MoviesCourse = lazyWithRetry(() => import("./pages/MoviesCourse"));
const KidsGameCenter = lazyWithRetry(() => import("./pages/KidsGameCenter"));
const StorySlideLesson = lazyWithRetry(() => import("./pages/StorySlideLesson"));
const MovieSlideLesson = lazyWithRetry(() => import("./pages/MovieSlideLesson"));
const Dictionary = lazyWithRetry(() => import("./pages/Dictionary"));
const Flashcards = lazyWithRetry(() => import("./pages/Flashcards"));
const AIChatTutor = lazyWithRetry(() => import("./pages/AIChatTutor"));
const Leaderboard = lazyWithRetry(() => import("./pages/Leaderboard"));
const Community = lazyWithRetry(() => import("./pages/Community"));
const DocumentaryCourse = lazyWithRetry(() => import("./pages/DocumentaryCourse"));
const DocumentarySlideLesson = lazyWithRetry(() => import("./pages/DocumentarySlideLesson"));
const PronunciationChecker = lazyWithRetry(() => import("./pages/PronunciationChecker"));
const Achievements = lazyWithRetry(() => import("./pages/Achievements"));
const VocabQuiz = lazyWithRetry(() => import("./pages/VocabQuiz"));
const WritingPractice = lazyWithRetry(() => import("./pages/WritingPractice"));
const CourseProgress = lazyWithRetry(() => import("./pages/CourseProgress"));
const NotificationCenter = lazyWithRetry(() => import("./pages/NotificationCenter"));
const ProfilePage = lazyWithRetry(() => import("./pages/ProfilePage"));
const BookmarksPage = lazyWithRetry(() => import("./pages/BookmarksPage"));
const GrammarReference = lazyWithRetry(() => import("./pages/GrammarReference"));
const IdiomsPhrasalVerbs = lazyWithRetry(() => import("./pages/IdiomsPhrasalVerbs"));
const PlatformBlog = lazyWithRetry(() => import("./pages/PlatformBlog"));
const Contact = lazyWithRetry(() => import("./pages/Contact"));
const CurriculumPlan = lazyWithRetry(() => import("./pages/CurriculumPlan"));
const Messages = lazyWithRetry(() => import("./pages/Messages"));
const CapstoneCertificate = lazyWithRetry(() => import("./pages/CapstoneCertificate"));
const PendingApproval = lazyWithRetry(() => import("./pages/PendingApproval"));
const queryClient = new QueryClient();

function PageLoader() {
  return (
    <div
      className="container mx-auto px-4 py-10"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Loading page…</span>
      <div className="h-3 w-24 shimmer rounded-full" />
      <div className="mt-4 h-8 w-2/3 max-w-md shimmer rounded-md" />
      <div className="mt-3 h-4 w-full max-w-xl shimmer rounded-md" />
      <div className="mt-2 h-4 w-4/5 max-w-lg shimmer rounded-md" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border p-4">
            <div className="h-28 w-full shimmer rounded-lg" />
            <div className="mt-3 h-4 w-3/4 shimmer rounded" />
            <div className="mt-2 h-3 w-1/2 shimmer rounded" />
          </div>
        ))}
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
        <SoundProvider />
        <Suspense fallback={<PageLoader />}>

          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<ProtectedRoute requireMember><Courses /></ProtectedRoute>} />
              <Route path="/courses/category/:categorySlug" element={<ProtectedRoute requireMember><CategoryDetail /></ProtectedRoute>} />
              <Route path="/curriculum/:categorySlug/:courseIndex" element={<ProtectedRoute requireMember><CurriculumPlan /></ProtectedRoute>} />
              <Route path="/courses/customer-service/certificate" element={<ProtectedRoute requireMember><CapstoneCertificate /></ProtectedRoute>} />
              <Route path="/courses/customer-service/:lessonId/slides" element={<ProtectedRoute requireMember minimumLevel="a2"><SlideLesson /></ProtectedRoute>} />
              <Route path="/courses/customer-service/:lessonId" element={<ProtectedRoute requireMember minimumLevel="a2"><LessonPage /></ProtectedRoute>} />
              <Route path="/courses/hospitality/certificate" element={<ProtectedRoute requireMember><CapstoneCertificate /></ProtectedRoute>} />
              <Route path="/courses/hospitality/:lessonId/slides" element={<ProtectedRoute requireMember minimumLevel="a2"><SlideLesson /></ProtectedRoute>} />
              <Route path="/courses/hospitality/:lessonId" element={<ProtectedRoute requireMember minimumLevel="a2"><LessonPage /></ProtectedRoute>} />
              <Route path="/courses/healthcare/certificate" element={<ProtectedRoute requireMember><CapstoneCertificate /></ProtectedRoute>} />
              <Route path="/courses/healthcare/:lessonId/slides" element={<ProtectedRoute requireMember minimumLevel="b1"><SlideLesson /></ProtectedRoute>} />
              <Route path="/courses/healthcare/:lessonId" element={<ProtectedRoute requireMember minimumLevel="b1"><LessonPage /></ProtectedRoute>} />
              <Route path="/courses/it-english/certificate" element={<ProtectedRoute requireMember><CapstoneCertificate /></ProtectedRoute>} />
              <Route path="/courses/it-english/:lessonId/slides" element={<ProtectedRoute requireMember minimumLevel="b1"><SlideLesson /></ProtectedRoute>} />
              <Route path="/courses/it-english/:lessonId" element={<ProtectedRoute requireMember minimumLevel="b1"><LessonPage /></ProtectedRoute>} />
              <Route path="/courses/:levelId/:lessonId/slides" element={<ProtectedRoute requireMember><SlideLesson /></ProtectedRoute>} />
              <Route path="/courses/:levelId/test" element={<ProtectedRoute requireMember><LevelAssessment /></ProtectedRoute>} />
              <Route path="/courses/:levelId/certificate" element={<ProtectedRoute requireMember><CapstoneCertificate /></ProtectedRoute>} />
              <Route path="/courses/:levelId/:lessonId" element={<ProtectedRoute requireMember><LessonPage /></ProtectedRoute>} />
              <Route path="/courses/kids" element={<ProtectedRoute requireMember><KidsCourse /></ProtectedRoute>} />
              <Route path="/courses/stories" element={<ProtectedRoute requireMember><StoriesCourse /></ProtectedRoute>} />
              <Route path="/courses/stories/:lessonId/slides" element={<ProtectedRoute requireMember><StorySlideLesson /></ProtectedRoute>} />
              <Route path="/courses/movies" element={<ProtectedRoute requireMember><MoviesCourse /></ProtectedRoute>} />
              <Route path="/courses/movies/:lessonId/slides" element={<ProtectedRoute requireMember><MovieSlideLesson /></ProtectedRoute>} />
              <Route path="/courses/documentary" element={<ProtectedRoute requireMember><DocumentaryCourse /></ProtectedRoute>} />
              <Route path="/courses/documentary/:lessonId/slides" element={<ProtectedRoute requireMember><DocumentarySlideLesson /></ProtectedRoute>} />
              <Route path="/kids/games" element={<ProtectedRoute requireMember><KidsGameCenter /></ProtectedRoute>} />
              <Route path="/courses/:levelId" element={<ProtectedRoute requireMember><Courses /></ProtectedRoute>} />
              <Route path="/pending-approval" element={<ProtectedRoute><PendingApproval /></ProtectedRoute>} />
              <Route path="/fm" element={<ProtectedRoute><FMRadio /></ProtectedRoute>} />
              <Route path="/practice" element={<ProtectedRoute><PracticeSpeaking /></ProtectedRoute>} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/placement-test" element={<PlacementTest />} />
              <Route path="/phonics-test" element={<ProtectedRoute requireMember><PhonicsDiagnostic /></ProtectedRoute>} />

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
              <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
              <Route path="/messages/:conversationId" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/bookmarks" element={<ProtectedRoute><BookmarksPage /></ProtectedRoute>} />
              <Route path="/grammar" element={<ProtectedRoute><GrammarReference /></ProtectedRoute>} />
              <Route path="/idioms" element={<ProtectedRoute><IdiomsPhrasalVerbs /></ProtectedRoute>} />
              <Route path="/blog" element={<PlatformBlog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
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
              <Route path="/admin/students/:userId/progress" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminStudentProgress />
                </ProtectedRoute>
              } />
              <Route path="/admin/student-activity" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminStudentActivity />
                </ProtectedRoute>
              } />
              <Route path="/admin/pending-approvals" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminPendingApprovals />
                </ProtectedRoute>
              } />
              <Route path="/admin/grant-access" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminGrantAccess />
                </ProtectedRoute>
              } />
              <Route path="/teacher-dashboard" element={
                <ProtectedRoute requiredRole="teacher">
                  <TeacherDashboard />
                </ProtectedRoute>
              } />
              <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
              <Route path="/signup" element={<PublicOnlyRoute><Signup /></PublicOnlyRoute>} />
              <Route path="/forgot-password" element={<PublicOnlyRoute><ForgotPassword /></PublicOnlyRoute>} />
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
