import { UserProfile, designationLabels, roleLabels } from "@/data/mockUser";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Pencil, Eye, Calendar, FileText, Settings, LogOut, Shield } from "lucide-react";
import profileAvatar from "@/assets/profile-avatar.jpg";

interface ProfileSidebarProps {
  user: UserProfile;
}

const navItems = [
  { icon: Eye, label: "Profile Overview", active: true },
  { icon: Calendar, label: "My Schedule", active: false },
  { icon: FileText, label: "Leave Requests", active: false },
  { icon: Settings, label: "Settings", active: false },
];

const ProfileSidebar = ({ user }: ProfileSidebarProps) => {
  const designation = user.designation ? designationLabels[user.designation] : roleLabels[user.role];

  return (
    <aside className="w-64 shrink-0 flex flex-col border-r border-border bg-card">
      {/* Profile Card */}
      <div className="p-6 flex flex-col items-center border-b border-border">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary/30">
            <img
              src={profileAvatar}
              alt={user.fullName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[hsl(var(--success))] border-2 border-card" />
        </div>
        <h2 className="text-lg font-bold text-foreground">{user.fullName.split(" ")[0]} {user.fullName.split(" ").pop()}</h2>
        <span className="text-xs font-semibold tracking-wider uppercase text-primary mt-1">
          {designation}
        </span>
        <span className="text-xs text-muted-foreground mt-1">
          <Shield className="inline w-3 h-3 mr-1" />
          SL-SSO-{String(user.id).padStart(4, "0")}
        </span>

        {/* Active Status */}
        <div className="flex items-center gap-3 mt-4 w-full">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Duty Status</span>
            <span className="text-sm font-semibold text-[hsl(var(--success))]">Active</span>
          </div>
          <Switch checked={user.active} className="ml-auto data-[state=checked]:bg-[hsl(var(--success))]" />
        </div>

        <Button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
          <Pencil className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              item.active
                ? "bg-primary/10 text-foreground font-semibold"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
