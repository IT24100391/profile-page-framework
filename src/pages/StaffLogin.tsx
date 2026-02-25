import { useState } from "react";
import { Shield, Users, ClipboardList, Settings, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const roles = [
  { id: "area_manager", label: "Area Manager", desc: "Manage regions, reports & schedules", icon: Users },
  { id: "security_officer", label: "Security Officer", desc: "View paysheets, request leave & uniforms", icon: Shield },
  { id: "accountant", label: "Accountant", desc: "Payroll, invoices & financial reports", icon: ClipboardList },
  { id: "admin", label: "Admin", desc: "Management & oversight", icon: Settings },
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
      // Fallback for demo without backend
      localStorage.setItem("token", "demo-token");
      localStorage.setItem("role", selectedRole);
      localStorage.setItem("user", JSON.stringify({ username }));
      toast({ title: "Demo Login", description: `Logged in as ${selectedRole}` });
      navigate(dashboardRoutes[selectedRole] || "/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[hsl(228,26%,14%)] p-4">
      <div className="w-full max-w-lg">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary">
            <Shield className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-white">Staff Login</h1>
          <p className="mt-1 text-sm text-white/60">Select your role and sign in</p>
        </div>

        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="mb-6 grid grid-cols-2 gap-3">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRole(r.id)}
                  className={cn(
                    "rounded-lg border p-4 text-left transition-all hover:border-primary/50",
                    selectedRole === r.id ? "border-primary bg-primary/5" : "border-border"
                  )}
                >
                  <r.icon className={cn("mb-2 h-5 w-5", selectedRole === r.id ? "text-primary" : "text-muted-foreground")} />
                  <div className="text-sm font-semibold">{r.label}</div>
                  <div className="text-xs text-muted-foreground">{r.desc}</div>
                </button>
              ))}
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-primary/20 focus-visible:ring-primary"
              />
              <div className="relative">
                <Input
                  type={showPw ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-primary/20 pr-10 focus-visible:ring-primary"
                />
                <button type="button" className="absolute right-3 top-2.5 text-muted-foreground" onClick={() => setShowPw(!showPw)}>
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <Button type="submit" className="w-full font-semibold" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-4 text-center">
          <Link to="/login" className="text-sm text-primary hover:underline">← Back to Login Portal</Link>
        </div>
      </div>
    </div>
  );
}
