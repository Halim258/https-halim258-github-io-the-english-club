import { useParams, useNavigate } from "react-router-dom";
import { lessons } from "@/data/lessons";
import { generateSlides } from "@/data/slide-types";
import SlideViewer from "@/components/SlideViewer";

export default function SlideLesson() {
  const { levelId, lessonId } = useParams();
  const navigate = useNavigate();

  const key = `${levelId}-${lessonId}`;
  const lesson = lessons[key];

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

  const slides = generateSlides(lesson);

  return (
    <SlideViewer
      slides={slides}
      onBack={() => navigate(`/courses/${levelId}`)}
    />
  );
}
