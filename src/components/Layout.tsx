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
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground space-y-2">
          <p>© {new Date().getFullYear()} The English Club Language School — Alexandria, Egypt. All rights reserved.</p>
          <a
            href="https://api.whatsapp.com/send?phone=%2B201554901390"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            📱 WhatsApp: +20 155 490 1390
          </a>
        </div>
      </footer>
      </footer>
    </div>
  );
}
