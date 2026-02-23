import { useSearchParams } from "react-router-dom";
import { Shield, CheckCircle, XCircle } from "lucide-react";

const VerifyEmployee = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const id = searchParams.get("id");
  const nic = searchParams.get("nic");
  const designation = searchParams.get("designation");
  const serial = searchParams.get("serial");

  const isValid = name && id && nic && serial;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
        <div className="bg-primary px-6 py-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Shield className="w-6 h-6 text-primary-foreground" />
            <span className="font-bold text-primary-foreground text-lg tracking-wide">
              ACE FRONT LINE SECURITY
            </span>
          </div>
          <p className="text-xs text-primary-foreground/80 tracking-wider mt-1">EMPLOYEE VERIFICATION</p>
        </div>

        <div className="p-6 text-center">
          {isValid ? (
            <>
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-foreground mb-1">Verified Employee</h2>
              <p className="text-sm text-muted-foreground mb-6">This ID card is authentic</p>
              <div className="space-y-3 text-left text-sm">
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-semibold text-foreground">{name}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Employee ID</span>
                  <span className="font-mono font-semibold text-foreground">SL-SSO-{String(id).padStart(4, "0")}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">NIC</span>
                  <span className="font-medium text-foreground">{nic}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Designation</span>
                  <span className="font-medium text-foreground capitalize">{designation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Serial No.</span>
                  <span className="font-mono font-bold text-foreground tracking-wider">{serial}</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
              <h2 className="text-xl font-bold text-foreground mb-1">Invalid ID Card</h2>
              <p className="text-sm text-muted-foreground">This QR code could not be verified.</p>
            </>
          )}
        </div>

        <div className="bg-muted px-6 py-3 text-center border-t border-border">
          <p className="text-xs text-muted-foreground">Ace Front Line Security Solutions (Pvt) Ltd · +94 11 234 5678</p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmployee;
