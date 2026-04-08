import { useParams, useNavigate } from "react-router-dom";
import { storiesCourse } from "@/data/stories-course";
import { generateStorySlides } from "@/data/story-slide-generator";
import SlideViewer from "@/components/SlideViewer";

export default function StorySlideLesson() {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const index = parseInt(lessonId || "1", 10) - 1;
  const story = storiesCourse[index];

  if (!story) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
        <span className="text-5xl mb-4">📭</span>
        <h1 className="text-xl font-bold font-display mb-2">Story Not Found</h1>
        <p className="text-muted-foreground text-sm mb-6">
          Story #{lessonId} doesn't exist yet.
        </p>
        <button
          onClick={() => navigate("/courses/stories")}
          className="text-sm text-primary hover:underline font-medium"
        >
          ← Back to Stories
        </button>
      </div>
    );
  }

  const slides = generateStorySlides(story, index);

  return (
    <SlideViewer
      slides={slides}
      onBack={() => navigate("/courses/stories")}
    />
  );
}
