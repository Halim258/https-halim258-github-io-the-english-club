import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageTransition from "./PageTransition";
import ScrollToTop from "./ScrollToTop";
import ScrollToTopOnNavigate from "./ScrollToTopOnNavigate";
import Breadcrumbs from "./Breadcrumbs";
import GlobalSearch from "./GlobalSearch";
import MobileBottomNav from "./MobileBottomNav";

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
    return (
      <>
        <ScrollToTopOnNavigate />
        <Outlet />
      </>
    );
  }

  const showBreadcrumbs = pathname !== "/" && pathname !== "/login" && pathname !== "/signup";

  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollToTopOnNavigate />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <GlobalSearch />
      {showBreadcrumbs && <Breadcrumbs />}
      <main id="main-content" className="flex-1 pb-mobile-nav md:pb-0">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <ScrollToTop />
      <Footer />
      <MobileBottomNav />
    </div>
  );
}

