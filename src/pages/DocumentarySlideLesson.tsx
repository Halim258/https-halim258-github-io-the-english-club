import { useParams, useNavigate } from "react-router-dom";
import { documentaryCourse } from "@/data/documentary-course";
import { generateDocumentarySlides } from "@/data/documentary-slide-generator";
import SlideViewer from "@/components/SlideViewer";

export default function DocumentarySlideLesson() {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const doc = documentaryCourse.find((d) => String(d.id) === lessonId);

  if (!doc) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
        <span className="text-5xl mb-4">📭</span>
        <h1 className="text-xl font-bold font-display mb-2">Lesson Not Found</h1>
        <p className="text-muted-foreground text-sm mb-6">
          Documentary lesson "{lessonId}" doesn't exist yet.
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

  const slides = generateDocumentarySlides(doc);

  return (
    <SlideViewer
      slides={slides}
      onBack={() => navigate("/courses/documentary")}
    />
  );
}
