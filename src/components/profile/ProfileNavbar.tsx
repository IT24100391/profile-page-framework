import { Bell, Moon, Search, Shield } from "lucide-react";
import profileAvatar from "@/assets/profile-avatar.jpg";

const navLinks = ["Dashboard", "Personnel", "Reports"];

const ProfileNavbar = () => {
  return (
    <header className="h-14 border-b border-border bg-card flex items-center px-6 gap-6 shrink-0">
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
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">Arjun</span>
          <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-border">
            <img src={profileAvatar} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
        <button className="p-2 rounded-lg hover:bg-muted transition-colors">
          <Moon className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
};

export default ProfileNavbar;
