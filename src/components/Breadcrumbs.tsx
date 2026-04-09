import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface Crumb {
  label: string;
  to?: string;
}

function buildCrumbs(pathname: string): Crumb[] {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs: Crumb[] = [];

  if (segments[0] === "courses") {
    crumbs.push({ label: "Courses", to: "/courses" });

    if (segments[1] === "category" && segments[2]) {
      crumbs.push({ label: decodeURIComponent(segments[2]).replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()) });
    } else if (segments[1] === "kids") {
      crumbs.push({ label: "Kids Course" });
    } else if (segments[1] === "stories") {
      crumbs.push({ label: "Stories" });
      if (segments[2]) crumbs.push({ label: `Story ${segments[2]}` });
    } else if (segments[1] === "movies") {
      crumbs.push({ label: "Movies" });
      if (segments[2]) crumbs.push({ label: `Movie ${segments[2]}` });
    } else if (segments[1]) {
      crumbs.push({ label: segments[1].toUpperCase(), to: `/courses/${segments[1]}` });
      if (segments[2]) {
        const lessonLabel = segments[3] === "slides" ? `Lesson ${segments[2]}` : `Lesson ${segments[2]}`;
        crumbs.push({ label: lessonLabel });
      }
    }
  } else if (segments[0] === "dashboard") {
    crumbs.push({ label: "Dashboard" });
  } else if (segments[0]) {
    crumbs.push({ label: segments[0].replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()) });
  }

  return crumbs;
}

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const crumbs = buildCrumbs(pathname);

  if (crumbs.length === 0 || pathname === "/") return null;

  return (
    <nav aria-label="Breadcrumb" className="container mx-auto px-4 pt-4 pb-1">
      <ol className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
        <li>
          <Link to="/" className="hover:text-foreground transition-colors flex items-center gap-1">
            <Home className="h-3 w-3" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {crumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
            {crumb.to && i < crumbs.length - 1 ? (
              <Link to={crumb.to} className="hover:text-foreground transition-colors capitalize">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium capitalize">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
