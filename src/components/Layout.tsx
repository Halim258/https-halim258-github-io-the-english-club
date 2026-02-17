import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import BookTeacherFAB from "./BookTeacherFAB";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <BookTeacherFAB />
      <footer className="border-t bg-card py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2026 Arabiyya. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
