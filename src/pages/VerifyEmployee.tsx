import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Shield, UserCheck, UserX } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const VerifyEmployee = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const id = searchParams.get("id");

  const [isActive, setIsActive] = useState(true);

  if (!name || !id) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
          <div className="bg-[hsl(42,100%,50%)] px-6 py-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-6 h-6 text-[hsl(220,20%,14%)]" />
              <span className="font-bold text-[hsl(220,20%,14%)] text-lg tracking-wide">ACE FRONT LINE SECURITY</span>
            </div>
          </div>
          <div className="p-8 text-center">
            <UserX className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground">Invalid QR Code</h2>
            <p className="text-sm text-muted-foreground mt-2">This QR code is not valid.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
        <div className="bg-[hsl(42,100%,50%)] px-6 py-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Shield className="w-6 h-6 text-[hsl(220,20%,14%)]" />
            <span className="font-bold text-[hsl(220,20%,14%)] text-lg tracking-wide">ACE FRONT LINE SECURITY</span>
          </div>
          <p className="text-[10px] text-[hsl(220,20%,14%)]/80 tracking-wider mt-0.5">DUTY STATUS CONTROL</p>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${isActive ? "bg-green-100" : "bg-red-100"}`}>
              {isActive ? <UserCheck className="w-7 h-7 text-green-600" /> : <UserX className="w-7 h-7 text-red-500" />}
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">{name}</h2>
              <p className="text-sm text-muted-foreground font-mono">SL-SSO-{String(id).padStart(4, "0")}</p>
            </div>
          </div>

          <div className="bg-muted/50 rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Duty Status</p>
              <p className={`text-lg font-bold mt-1 ${isActive ? "text-green-600" : "text-red-500"}`}>
                {isActive ? "Active" : "Inactive"}
              </p>
            </div>
            <Switch
              checked={isActive}
              onCheckedChange={setIsActive}
              className={isActive ? "data-[state=checked]:bg-green-500" : ""}
            />
          </div>
        </div>

        <div className="bg-muted px-6 py-3 text-center border-t border-border">
          <p className="text-xs text-muted-foreground">Ace Front Line Security Solutions (Pvt) Ltd</p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmployee;
