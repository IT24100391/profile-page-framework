import { Shield, Lock, Users, ArrowRight, Building2, UserCog } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginPortal() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-2 ring-primary/30">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-extrabold text-foreground md:text-4xl">Welcome Back</h1>
          <p className="mt-2 text-muted-foreground">Choose your portal to continue</p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Staff Login */}
          <Link to="/staff-login" className="group">
            <Card className="h-full overflow-hidden border-border/60 bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <UserCog className="h-10 w-10 text-primary transition-colors group-hover:text-primary-foreground" />
                </div>
                <h2 className="mb-2 text-xl font-bold text-foreground">Staff Portal</h2>
                <p className="mb-6 text-sm text-muted-foreground">
                  Access dashboards, payroll, schedules, and operational tools
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  Sign In <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Client Login */}
          <Link to="/client-login" className="group">
            <Card className="h-full overflow-hidden border-border/60 bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Building2 className="h-10 w-10 text-primary transition-colors group-hover:text-primary-foreground" />
                </div>
                <h2 className="mb-2 text-xl font-bold text-foreground">Client Portal</h2>
                <p className="mb-6 text-sm text-muted-foreground">
                  View reports, invoices, security updates, and manage your account
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  Sign In <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
