import { UserProfile, equipmentLabels, Equipment } from "@/data/mockUser";
import { Phone, Mail, MapPin, User, CreditCard, Printer, Building2, Calendar, Award, Briefcase, DollarSign, Wrench } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ProfileContentProps {
  user: UserProfile;
}

const equipmentConditions: Record<string, { label: string; color: string }> = {
  RADIO: { label: "EXCELLENT", color: "hsl(var(--badge-excellent))" },
  BATON: { label: "EXCELLENT", color: "hsl(var(--badge-excellent))" },
  VEST: { label: "GOOD", color: "hsl(var(--badge-good))" },
  FLASHLIGHT: { label: "GOOD", color: "hsl(var(--badge-good))" },
  BODY_CAMERA: { label: "EXCELLENT", color: "hsl(var(--badge-excellent))" },
};

const certStatuses = [
  { name: "First Aid / CPR", status: "VALID", color: "hsl(var(--badge-valid))" },
  { name: "Fire Safety Level 2", status: "VALID", color: "hsl(var(--badge-valid))" },
  { name: "Advance Crowd Control", status: "EXPIRING", color: "hsl(var(--badge-expiring))" },
];

const InfoField = ({ label, value, icon: Icon }: { label: string; value: string; icon?: any }) => (
  <div className="space-y-1">
    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{label}</span>
    <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
      {Icon && <Icon className="w-3.5 h-3.5 text-muted-foreground" />}
      {value}
    </p>
  </div>
);

const ProfileContent = ({ user }: ProfileContentProps) => {
  return (
    <div className="flex-1 overflow-auto p-6 space-y-6">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="bg-muted/50 border border-border">
          <TabsTrigger value="personal" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">Personal Info</TabsTrigger>
          <TabsTrigger value="professional" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">Professional</TabsTrigger>
          <TabsTrigger value="bank" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">Bank Details</TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-6 space-y-6">
          {/* Contact Details & Emergency */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6" style={{ boxShadow: "var(--card-shadow)" }}>
              <h3 className="text-base font-bold text-foreground mb-5 flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Contact Details
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                <InfoField label="Full Name" value={user.fullName} />
                <InfoField label="NIC Number" value={user.nicNumber} icon={CreditCard} />
                <div className="col-span-2">
                  <InfoField label="Residential Address" value={user.residentialAddress} icon={MapPin} />
                </div>
                <InfoField label="Mobile Number" value={user.mobileNumber} icon={Phone} />
                <InfoField label="Email" value={user.email} icon={Mail} />
                <InfoField label="Date of Birth" value={new Date(user.dateOfBirth).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} icon={Calendar} />
                <InfoField label="Sex" value={user.sex === "MALE" ? "Male" : "Female"} />
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-6" style={{ boxShadow: "var(--card-shadow)" }}>
              <h3 className="text-base font-bold text-foreground mb-5 flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                Emergency Contacts
              </h3>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">Nimini Perera</p>
                      <p className="text-xs text-muted-foreground">Wife / Primary Contact</p>
                    </div>
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-primary font-medium mt-1">{user.emergencyContact}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">Sunil Perera</p>
                      <p className="text-xs text-muted-foreground">Brother / Secondary Contact</p>
                    </div>
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-primary font-medium mt-1">+94 71 555 1234</p>
                </div>
              </div>
            </div>
          </div>

          {/* Assigned Equipment */}
          <div className="bg-card rounded-xl border border-border p-6" style={{ boxShadow: "var(--card-shadow)" }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Wrench className="w-4 h-4 text-primary" />
                Assigned Equipment
              </h3>
              <button className="text-xs text-primary hover:underline flex items-center gap-1 font-medium">
                <Printer className="w-3 h-3" />
                Print Inventory
              </button>
            </div>
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Item Name</th>
                    <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Serial / ID</th>
                    <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Issued Date</th>
                    <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Condition</th>
                  </tr>
                </thead>
                <tbody>
                  {user.handoverEquipment.map((eq, idx) => {
                    const cond = equipmentConditions[eq] || { label: "GOOD", color: "hsl(var(--badge-good))" };
                    return (
                      <tr key={eq} className={idx % 2 === 1 ? "bg-muted/20" : ""}>
                        <td className="px-4 py-3 font-medium text-foreground">{equipmentLabels[eq]}</td>
                        <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{`EQ-${String(idx + 1).padStart(3, "0")}-${eq.slice(0, 3)}`}</td>
                        <td className="px-4 py-3 text-muted-foreground">Jan 12, 2024</td>
                        <td className="px-4 py-3">
                          <span
                            className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded"
                            style={{ color: cond.color, backgroundColor: `${cond.color}15` }}
                          >
                            {cond.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card rounded-xl border border-border p-5" style={{ boxShadow: "var(--card-shadow)" }}>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-primary" />
                Active Certs
              </h4>
              <div className="space-y-2">
                {certStatuses.map((cert) => (
                  <div key={cert.name} className="flex items-center justify-between">
                    <span className="text-xs text-foreground">{cert.name}</span>
                    <span
                      className="text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded"
                      style={{ color: cert.color, backgroundColor: `${cert.color}15` }}
                    >
                      {cert.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-5" style={{ boxShadow: "var(--card-shadow)" }}>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                Monthly Attendance
              </h4>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-extrabold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  98.2%
                </span>
                <span className="text-xs text-muted-foreground mb-1">Punctuality Score</span>
              </div>
              <div className="flex items-end gap-1 mt-3 h-8">
                {[60, 80, 45, 90, 70, 100, 85].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-primary/80"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-5" style={{ boxShadow: "var(--card-shadow)" }}>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-primary" />
                Current Post
              </h4>
              <p className="text-sm font-bold text-foreground">{user.assignedArea}</p>
              <p className="text-xs text-muted-foreground mt-1">Shift: 08:00 - 16:00</p>
              <span className="inline-block mt-2 text-[10px] font-bold tracking-wider px-2 py-0.5 rounded text-[hsl(var(--badge-good))]" style={{ backgroundColor: "hsl(var(--badge-good) / 0.1)" }}>
                ACTIVE DUTY
              </span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="professional" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl border border-border p-6" style={{ boxShadow: "var(--card-shadow)" }}>
              <h3 className="text-base font-bold text-foreground mb-5 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-primary" />
                Professional Details
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                <InfoField label="Assigned Area" value={user.assignedArea} icon={MapPin} />
                <InfoField label="Assigned Company" value={user.assignedCompany} icon={Building2} />
                <InfoField label="Join Date" value={new Date(user.joinDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} icon={Calendar} />
                <InfoField label="Basic Salary" value={`LKR ${user.basicSalary?.toLocaleString()}`} icon={DollarSign} />
              </div>
            </div>
            <div className="bg-card rounded-xl border border-border p-6" style={{ boxShadow: "var(--card-shadow)" }}>
              <h3 className="text-base font-bold text-foreground mb-5 flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" />
                Skills & Certifications
              </h3>
              <div className="space-y-4">
                <InfoField label="Professional Certificates" value={user.professionalCertificate} />
                <InfoField label="Special Skills" value={user.specialSkills} />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bank" className="mt-6">
          <div className="max-w-lg bg-card rounded-xl border border-border p-6" style={{ boxShadow: "var(--card-shadow)" }}>
            <h3 className="text-base font-bold text-foreground mb-5 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" />
              Bank Details
            </h3>
            <div className="space-y-5">
              <InfoField label="Bank Name" value={user.bankName} icon={Building2} />
              <InfoField label="Account Number" value={user.bankAccountNumber} />
              <InfoField label="Branch" value={user.bankBranch} icon={MapPin} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <div className="bg-card rounded-xl border border-border p-12 text-center" style={{ boxShadow: "var(--card-shadow)" }}>
            <p className="text-muted-foreground text-sm">No documents uploaded yet.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileContent;
