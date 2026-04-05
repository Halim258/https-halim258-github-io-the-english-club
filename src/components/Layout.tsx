import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import BookTeacherFAB from "./BookTeacherFAB";
import Footer from "./Footer";

const lessonRoutePatterns = [
  /^\/courses\/[^/]+\/[^/]+/,  // /courses/:levelId/:lessonId
  /^\/courses\/kids$/,
  /^\/courses\/stories$/,
  /^\/courses\/movies$/,
];

export default function Layout() {
  const { pathname } = useLocation();
  const isInLesson = lessonRoutePatterns.some((p) => p.test(pathname));

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      {!isInLesson && <BookTeacherFAB />}
      <Footer />
    </div>
  );
}
