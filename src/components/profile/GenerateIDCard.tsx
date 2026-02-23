import { mockUser, designationLabels } from "@/data/mockUser";
import { Shield, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileAvatar from "@/assets/profile-avatar.jpg";

const GenerateIDCard = () => {
  const designation = designationLabels[mockUser.designation];

  return (
    <div className="space-y-6">
      <h3 className="text-base font-bold text-foreground flex items-center gap-2">
        <Shield className="w-4 h-4 text-primary" />
        Employee ID Card
      </h3>
      <div className="max-w-sm mx-auto">
        {/* Card Front */}
        <div className="bg-card rounded-xl border-2 border-primary/30 overflow-hidden" style={{ boxShadow: "var(--card-shadow-lg)" }}>
          {/* Header */}
          <div className="bg-primary px-5 py-3 text-center">
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-5 h-5 text-primary-foreground" />
              <span className="font-bold text-primary-foreground text-sm tracking-wide" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                ACE FRONT LINE SECURITY
              </span>
            </div>
            <p className="text-[10px] text-primary-foreground/80 tracking-wider mt-0.5">SECURITY SOLUTIONS (PVT) LTD</p>
          </div>

          {/* Body */}
          <div className="p-5 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full overflow-hidden ring-3 ring-primary/30 mb-3">
              <img src={profileAvatar} alt={mockUser.fullName} className="w-full h-full object-cover" />
            </div>
            <h4 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{mockUser.fullName}</h4>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider mt-1">{designation}</span>
            <div className="mt-3 w-full space-y-1.5 text-xs text-left">
              <div className="flex justify-between"><span className="text-muted-foreground">ID</span><span className="font-mono font-semibold text-foreground">SL-SSO-{String(mockUser.id).padStart(4, "0")}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">NIC</span><span className="font-medium text-foreground">{mockUser.nicNumber}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Blood Group</span><span className="font-medium text-foreground">O+</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Valid Until</span><span className="font-medium text-foreground">Dec 2025</span></div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-muted/50 px-5 py-2 text-center border-t border-border">
            <p className="text-[9px] text-muted-foreground">If found, return to Ace Front Line Security office or call +94 11 234 5678</p>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Download className="w-4 h-4 mr-2" />
            Download ID Card
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GenerateIDCard;
