import { useState } from "react";
import { UserProfile, designationLabels, roleLabels } from "@/data/mockUser";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Pencil, Eye, Calendar, FileText, LogOut, Shield, DollarSign, CreditCard, BadgeDollarSign, IdCard } from "lucide-react";
import profileAvatar from "@/assets/profile-avatar.jpg";
import { useNavigate } from "react-router-dom";

interface ProfileSidebarProps {
  user: UserProfile;
  activeView: string;
  onViewChange: (view: string) => void;
  avatarPreview: string | null;
  onAvatarChange: (file: File) => void;
}

const navItems = [
  { icon: Eye, label: "Profile Overview", value: "overview" },
  { icon: Calendar, label: "My Schedule", value: "schedule" },
  { icon: FileText, label: "Paysheet History", value: "paysheet-history" },
  { icon: DollarSign, label: "Month Paysheet", value: "month-paysheet" },
  { icon: CreditCard, label: "Advance Request", value: "advance-request" },
  { icon: BadgeDollarSign, label: "Loan Request", value: "loan-request" },
  { icon: IdCard, label: "Generate ID Card", value: "id-card" },
];

const ProfileSidebar = ({ user, activeView, onViewChange, avatarPreview, onAvatarChange }: ProfileSidebarProps) => {
  const navigate = useNavigate();
  const designation = user.designation ? designationLabels[user.designation] : roleLabels[user.role];
  const [isActive, setIsActive] = useState(user.active);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onAvatarChange(file);
    }
  };

  return (
    <aside className="w-64 shrink-0 flex flex-col border-r border-border bg-card">
      {/* Profile Card */}
      <div className="p-6 flex flex-col items-center border-b border-border">
        <div className="relative mb-4 group cursor-pointer">
          <label className="cursor-pointer">
            <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary/30 relative">
              <img
                src={avatarPreview || profileAvatar}
                alt={user.fullName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-[10px] font-semibold">Change Photo</span>
              </div>
            </div>
            <input type="file" accept="image/jpeg,image/png,image/jpg" className="hidden" onChange={handleAvatarUpload} />
          </label>
          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-card ${isActive ? "bg-[hsl(var(--success))]" : "bg-muted-foreground"}`} />
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
            <span className={`text-sm font-semibold ${isActive ? "text-[hsl(var(--success))]" : "text-muted-foreground"}`}>
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>
          {user.role === "AREA_MANAGER" && (
            <Switch
              checked={isActive}
              onCheckedChange={setIsActive}
              className={`ml-auto ${isActive ? "data-[state=checked]:bg-[hsl(var(--success))]" : ""}`}
            />
          )}
        </div>

        <Button
          className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          onClick={() => navigate("/edit-profile")}
        >
          <Pencil className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-auto">
        {navItems.map((item) => (
          <button
            key={item.value}
            onClick={() => onViewChange(item.value)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeView === item.value
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
