import { Shield, Lock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function LoginPortal() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[hsl(228,26%,14%)] p-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <h1 className="mb-2 text-3xl font-bold text-white">Welcome Back</h1>
        <p className="mb-8 text-sm text-white/60">Select your login type to continue</p>

        <div className="mx-auto max-w-sm space-y-3">
          <Link to="/staff-login">
            <Button className="w-full py-6 text-base font-semibold" size="lg">
              <Lock className="mr-2 h-5 w-5" /> Staff Login
            </Button>
          </Link>
          <Link to="/client-login">
            <Button variant="outline" className="w-full border-white/20 py-6 text-base font-semibold text-white hover:bg-white/10" size="lg">
              <Users className="mr-2 h-5 w-5" /> Client Login
            </Button>
          </Link>
        </div>

        <Link to="/" className="mt-6 inline-block text-sm text-primary hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
