import AdminNewSignups from "@/components/admin/AdminNewSignups";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function AdminPendingApprovals() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <Link
            to="/admin"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to admin
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            Pending Access Approvals
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Users waiting to join the English Club. Approve to enroll them as students, or deny to reject their request.
          </p>
        </div>
      </div>
      <AdminNewSignups />
    </div>
  );
}