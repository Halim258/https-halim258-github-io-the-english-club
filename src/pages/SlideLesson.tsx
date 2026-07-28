import { useParams, useNavigate, Navigate } from "react-router-dom";
import { lessons } from "@/data/lessons";
import { generateSlides } from "@/data/slide-types";
import { generateArabicLessonSlides } from "@/data/arabic-lesson-slide-generator";
import { generateArabicDrawingSlides } from "@/data/arabic-drawing-slide-generator";
import { generateArabicTherapySlides } from "@/data/arabic-therapy-slide-generator";
import SlideViewer from "@/components/SlideViewer";
import DrawingSubmissionPanel from "@/components/DrawingSubmissionPanel";
import { useAuth } from "@/hooks/useAuth";
import { useStudyTimer } from "@/lib/study-time";

/**
 * Levels that intentionally use the slide-deck player.
 * Everything else (standard CEFR language courses) uses the tabbed LessonPage,
 * so the same lesson never renders in two different layouts.
 */
function usesSlidePlayer(levelId?: string) {
  if (typeof levelId !== "string") return false;
  return levelId.startsWith("ar-") || levelId === "kids";
}

export default function SlideLesson() {
  const { levelId, lessonId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  useStudyTimer(user?.id, levelId);

  const key = `${levelId}-${lessonId}`;
  const lesson = lessons[key];

  if (!usesSlidePlayer(levelId)) {
    return <Navigate to={`/courses/${levelId}/${lessonId}`} replace />;
  }

  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
        <span className="text-5xl mb-4">📭</span>
        <h1 className="text-xl font-bold font-display mb-2">Lesson Not Found</h1>
        <p className="text-muted-foreground text-sm mb-6">
          The lesson "{key}" doesn't exist yet.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-primary hover:underline font-medium"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  const isMusicCourse = typeof levelId === "string" && levelId.startsWith("ar-mus");
  const isDrawingCourse = typeof levelId === "string" && levelId.startsWith("ar-draw");
  const isTherapyCourse = typeof levelId === "string" && (levelId.startsWith("ar-th") || levelId.startsWith("ar-sp"));
  const slides = isDrawingCourse
    ? generateArabicDrawingSlides(lesson)
    : isTherapyCourse
    ? generateArabicTherapySlides(lesson)
    : isMusicCourse
    ? generateArabicLessonSlides(lesson)
    : generateSlides(lesson);

  return (
    <>
      <SlideViewer
        slides={slides}
        onBack={() => navigate(`/courses/${levelId}`)}
        lessonKey={key}
      />
      {isDrawingCourse && (
        <DrawingSubmissionPanel
          levelId={levelId!}
          lessonNumber={lesson.lessonNumber}
          lessonTitle={lesson.title}
        />
      )}
    </>
  );
}
