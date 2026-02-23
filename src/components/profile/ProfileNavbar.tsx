import { useState } from "react";
import { Bell, Moon, Sun, Search, Shield, CheckCircle, XCircle } from "lucide-react";
import profileAvatar from "@/assets/profile-avatar.jpg";
import { useTheme } from "@/components/ThemeProvider";
import { mockLoanNotifications, LoanNotification } from "@/data/loanData";
import { Badge } from "@/components/ui/badge";

const navLinks = ["Details"];

const ProfileNavbar = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<LoanNotification[]>(mockLoanNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleToggleNotifications = () => {
    setShowNotifications((prev) => !prev);
    // Mark all as read when opening
    if (!showNotifications) {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }
  };

  return (
    <header className="h-14 border-b border-border bg-card flex items-center px-6 gap-6 shrink-0 relative">
      {/* Brand */}
      <div className="flex items-center gap-2 mr-4">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <Shield className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-bold text-foreground text-base tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Ace Frontline
        </span>
      </div>

      {/* Nav Links */}
      <nav className="flex items-center gap-1">
        {navLinks.map((link) => (
          <button
            key={link}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              link === "Personnel"
                ? "text-foreground border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {link}
          </button>
        ))}
      </nav>

      {/* Search */}
      <div className="flex-1 max-w-md ml-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            placeholder="Search profiles..."
            className="w-full h-9 pl-9 pr-4 rounded-lg border border-border bg-muted/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          className="relative p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={handleToggleNotifications}
        >
          <Bell className="w-4 h-4 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-destructive text-[10px] text-white flex items-center justify-center font-bold">
              {unreadCount}
            </span>
          )}
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">Arjun</span>
          <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-border">
            <img src={profileAvatar} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
        <button className="p-2 rounded-lg hover:bg-muted transition-colors" onClick={toggleTheme} title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}>
          {theme === "dark" ? <Sun className="w-4 h-4 text-muted-foreground" /> : <Moon className="w-4 h-4 text-muted-foreground" />}
        </button>
      </div>

      {/* Notification Dropdown */}
      {showNotifications && (
        <div className="absolute top-14 right-20 w-96 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="p-3 border-b border-border">
            <h3 className="text-sm font-bold text-foreground">Loan Notifications</h3>
          </div>
          <div className="max-h-80 overflow-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">No notifications</div>
            ) : (
              notifications.map((n) => (
                <div key={n.id} className="p-3 border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start gap-2">
                    {n.status === "APPROVED" ? (
                      <CheckCircle className="w-4 h-4 text-[hsl(var(--success))] mt-0.5 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{n.message}</p>
                      {n.status === "REJECTED" && n.rejectReason && (
                        <div className="mt-1 p-2 bg-destructive/10 rounded-md">
                          <p className="text-xs text-destructive font-medium">Reason: {n.rejectReason}</p>
                        </div>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={n.status === "APPROVED" ? "bg-[hsl(var(--success))]/15 text-[hsl(var(--success))]" : "bg-destructive/15 text-destructive"}>
                          {n.status}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(n.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default ProfileNavbar;
