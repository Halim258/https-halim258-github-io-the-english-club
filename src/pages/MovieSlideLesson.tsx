import { useParams, useNavigate } from "react-router-dom";
import { moviesCourse } from "@/data/movies-course";
import { generateMovieSlides } from "@/data/movie-slide-generator";
import SlideViewer from "@/components/SlideViewer";

export default function MovieSlideLesson() {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const id = parseInt(lessonId || "1", 10);
  const movie = moviesCourse.find((m) => m.id === id);

  if (!movie) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
        <span className="text-5xl mb-4">📭</span>
        <h1 className="text-xl font-bold font-display mb-2">Movie Lesson Not Found</h1>
        <p className="text-muted-foreground text-sm mb-6">
          Movie lesson #{lessonId} doesn't exist yet.
        </p>
        <button
          onClick={() => navigate("/courses/movies")}
          className="text-sm text-primary hover:underline font-medium"
        >
          ← Back to Movies
        </button>
      </div>
    );
  }

  const slides = generateMovieSlides(movie);

  return (
    <SlideViewer
      slides={slides}
      onBack={() => navigate("/courses/movies")}
    />
  );
}
