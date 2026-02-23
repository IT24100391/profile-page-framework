import { useState } from "react";
import { mockUser, UserProfile } from "@/data/mockUser";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import ProfileNavbar from "@/components/profile/ProfileNavbar";

const EditProfile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<UserProfile>>({ ...mockUser });

  const handleChange = (field: keyof UserProfile, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    toast({ title: "Profile Updated", description: "Your profile information has been saved." });
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <ProfileNavbar />
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-4 mb-2">
            <Button variant="outline" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <User className="w-5 h-5 text-primary" />
              Edit Profile
            </h1>
          </div>

          {/* Username */}
          <div className="bg-card rounded-xl border border-border p-6" style={{ boxShadow: "var(--card-shadow)" }}>
            <h3 className="text-base font-bold text-foreground mb-4">Account</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Username</Label>
                <Input value={form.username || ""} onChange={(e) => handleChange("username", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={form.email || ""} onChange={(e) => handleChange("email", e.target.value)} />
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="bg-card rounded-xl border border-border p-6" style={{ boxShadow: "var(--card-shadow)" }}>
            <h3 className="text-base font-bold text-foreground mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={form.fullName || ""} onChange={(e) => handleChange("fullName", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>NIC Number</Label>
                <Input value={form.nicNumber || ""} onChange={(e) => handleChange("nicNumber", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Input type="date" value={form.dateOfBirth || ""} onChange={(e) => handleChange("dateOfBirth", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Sex</Label>
                <Select value={form.sex || "MALE"} onValueChange={(v) => handleChange("sex", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Mobile Number</Label>
                <Input value={form.mobileNumber || ""} onChange={(e) => handleChange("mobileNumber", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Emergency Contact</Label>
                <Input value={form.emergencyContact || ""} onChange={(e) => handleChange("emergencyContact", e.target.value)} />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Residential Address</Label>
                <Textarea value={form.residentialAddress || ""} onChange={(e) => handleChange("residentialAddress", e.target.value)} />
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="bg-card rounded-xl border border-border p-6" style={{ boxShadow: "var(--card-shadow)" }}>
            <h3 className="text-base font-bold text-foreground mb-4">Bank Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Bank Name</Label>
                <Input value={form.bankName || ""} onChange={(e) => handleChange("bankName", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Account Number</Label>
                <Input value={form.bankAccountNumber || ""} onChange={(e) => handleChange("bankAccountNumber", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Branch</Label>
                <Input value={form.bankBranch || ""} onChange={(e) => handleChange("bankBranch", e.target.value)} />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => navigate("/")}>Cancel</Button>
            <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
