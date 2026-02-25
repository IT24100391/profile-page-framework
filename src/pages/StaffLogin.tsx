import { useState } from "react";
import { Shield, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Maps backend Role enum to dashboard routes
const dashboardRoutes: Record<string, string> = {
  AREA_MANAGER: "/verify",
  SECURITY_OFFICER: "/profile",
  ACCOUNT_EXECUTIVE: "/loan-deductions",
  OPERATION_MANAGER: "/loan-approval",
  DIRECTOR: "/loan-approval",
  CHAIRMAN: "/loan-approval",
  EXECUTIVE_OFFICER: "/loan-approval",
  ADMIN: "/loan-approval",
  SUPER_ADMIN: "/loan-approval",
};

export default function StaffLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast({ title: "Error", description: "Please fill all fields", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const apiResponse = await res.json();

      if (!res.ok || !apiResponse.success) {
        throw new Error(apiResponse.message || "Invalid credentials");
      }

      const loginData = apiResponse.data;

      // Store auth data
      localStorage.setItem("token", loginData.token);
      localStorage.setItem("refreshToken", loginData.refreshToken);
      localStorage.setItem("role", loginData.role);
      localStorage.setItem("userId", String(loginData.userId));
      localStorage.setItem("user", JSON.stringify({
        userId: loginData.userId,
        username: loginData.username,
        fullName: loginData.fullName,
        role: loginData.role,
        firstLogin: loginData.firstLogin,
      }));

      toast({ title: "Login successful", description: `Welcome, ${loginData.fullName}` });

      if (loginData.firstLogin) {
        navigate("/profile");
      } else {
        navigate(dashboardRoutes[loginData.role] || "/profile");
      }
    } catch (err: any) {
      toast({ title: "Login Failed", description: err.message || "Unable to connect to server", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-2 ring-primary/30">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">Staff Portal</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in with your credentials</p>
        </div>

        <Card className="border-border/60 bg-card shadow-xl">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Username</label>
                <Input
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-11 border-border bg-muted/30 focus-visible:ring-primary"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Password</label>
                <div className="relative">
                  <Input
                    type={showPw ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 border-border bg-muted/30 pr-10 focus-visible:ring-primary"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => setShowPw(!showPw)}
                  >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="h-11 w-full bg-primary text-primary-foreground font-bold text-base hover:bg-primary/90 transition-all"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="h-4 w-4" /> Sign In
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link to="/login" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Login Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
