import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import BookTeacherFAB from "./BookTeacherFAB";
import Footer from "./Footer";
import PageTransition from "./PageTransition";
import ScrollToTop from "./ScrollToTop";

const lessonRoutePatterns = [
  /^\/courses\/[^/]+\/[^/]+/,
  /^\/courses\/kids$/,
  /^\/courses\/stories$/,
  /^\/courses\/movies$/,
];

export default function Layout() {
  const { pathname } = useLocation();
  const isInLesson = lessonRoutePatterns.some((p) => p.test(pathname));

  if (isInLesson) {
    return <Outlet />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <PageTransition key={pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <BookTeacherFAB />
      <ScrollToTop />
      <Footer />
    </div>
  );
}
