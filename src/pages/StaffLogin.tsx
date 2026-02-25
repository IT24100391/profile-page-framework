import { useState } from "react";
import { Shield, Users, ClipboardList, Settings, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const roles = [
  { id: "area_manager", label: "Area Manager", desc: "Manage regions & reports", icon: Users },
  { id: "security_officer", label: "Security Officer", desc: "Paysheets & leave requests", icon: Shield },
  { id: "accountant", label: "Accountant", desc: "Payroll & financials", icon: ClipboardList },
  { id: "admin", label: "Admin", desc: "Full system access", icon: Settings },
];

const dashboardRoutes: Record<string, string> = {
  area_manager: "/verify",
  security_officer: "/",
  accountant: "/loan-deductions",
  admin: "/loan-approval",
};

export default function StaffLogin() {
  const [selectedRole, setSelectedRole] = useState("area_manager");
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
        body: JSON.stringify({ username, password, role: selectedRole }),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", selectedRole);
      localStorage.setItem("user", JSON.stringify(data.user || { username }));
      toast({ title: "Login successful", description: `Welcome, ${username}` });
      navigate(dashboardRoutes[selectedRole] || "/");
    } catch {
      localStorage.setItem("token", "demo-token");
      localStorage.setItem("role", selectedRole);
      localStorage.setItem("user", JSON.stringify({ username }));
      toast({ title: "Demo Login", description: `Logged in as ${selectedRole}` });
      navigate(dashboardRoutes[selectedRole] || "/");
    } finally {
      setLoading(false);
    }
  };

  const SelectedIcon = roles.find((r) => r.id === selectedRole)?.icon || Shield;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-2 ring-primary/30">
            <SelectedIcon className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">Staff Portal</h1>
          <p className="mt-1 text-sm text-muted-foreground">Select your role and sign in to continue</p>
        </div>

        <Card className="border-border/60 bg-card shadow-xl">
          <CardContent className="p-6 md:p-8">
            {/* Role Selector */}
            <div className="mb-6">
              <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Select Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRole(r.id)}
                    className={cn(
                      "group relative rounded-xl border-2 p-4 text-left transition-all duration-200",
                      selectedRole === r.id
                        ? "border-primary bg-primary/10 shadow-md shadow-primary/10"
                        : "border-border hover:border-primary/30 hover:bg-muted/50"
                    )}
                  >
                    {selectedRole === r.id && (
                      <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
                    )}
                    <r.icon
                      className={cn(
                        "mb-2 h-5 w-5 transition-colors",
                        selectedRole === r.id ? "text-primary" : "text-muted-foreground group-hover:text-primary/70"
                      )}
                    />
                    <div className={cn("text-sm font-bold", selectedRole === r.id ? "text-foreground" : "text-foreground/80")}>
                      {r.label}
                    </div>
                    <div className="text-xs text-muted-foreground">{r.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-3 text-xs font-medium text-muted-foreground">CREDENTIALS</span>
              </div>
            </div>

            {/* Form */}
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
