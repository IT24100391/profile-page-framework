import { useState } from "react";
import { mockPendingLoans, LoanRequest } from "@/data/loanData";
import { ArrowLeft, CheckCircle, XCircle, Clock, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import ProfileNavbar from "@/components/profile/ProfileNavbar";

const LoanApproval = () => {
  const navigate = useNavigate();
  const [loans, setLoans] = useState<LoanRequest[]>(mockPendingLoans);
  const [notifications, setNotifications] = useState<string[]>([]);

  const handleAction = (id: number, action: "APPROVED" | "REJECTED") => {
    setLoans((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, status: action, approvedBy: "Executive Officer", approvedAt: new Date().toISOString() } : l
      )
    );
    const loan = loans.find((l) => l.id === id);
    const msg = `${loan?.employeeName}'s loan of LKR ${loan?.amount.toLocaleString()} has been ${action.toLowerCase()}.`;
    setNotifications((prev) => [msg, ...prev]);
    toast({
      title: action === "APPROVED" ? "Loan Approved" : "Loan Rejected",
      description: msg,
    });
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case "APPROVED": return <Badge className="bg-[hsl(var(--success))]/15 text-[hsl(var(--success))] border-[hsl(var(--success))]/30"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case "REJECTED": return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default: return <Badge variant="outline" className="text-[hsl(var(--warning))] border-[hsl(var(--warning))]/30"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <ProfileNavbar />
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center gap-4 mb-2">
            <Button variant="outline" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Loan Approval — Executive Officer
            </h1>
          </div>

          {/* Notifications */}
          {notifications.length > 0 && (
            <div className="bg-card rounded-xl border border-border p-4 space-y-2" style={{ boxShadow: "var(--card-shadow)" }}>
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2"><Bell className="w-4 h-4 text-primary" />Notifications</h3>
              {notifications.map((n, i) => (
                <div key={i} className="text-sm text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">{n}</div>
              ))}
            </div>
          )}

          {/* Loan Requests Table */}
          <div className="bg-card rounded-xl border border-border overflow-hidden" style={{ boxShadow: "var(--card-shadow)" }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Amount (LKR)</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loans.map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell className="font-medium text-foreground">{loan.employeeName}</TableCell>
                    <TableCell className="font-mono">{loan.amount.toLocaleString()}</TableCell>
                    <TableCell>{loan.repaymentMonths} months</TableCell>
                    <TableCell className="max-w-[200px] truncate text-muted-foreground">{loan.reason}</TableCell>
                    <TableCell>{statusBadge(loan.status)}</TableCell>
                    <TableCell>
                      {loan.status === "PENDING" ? (
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-[hsl(var(--success))] text-white hover:bg-[hsl(var(--success))]/90" onClick={() => handleAction(loan.id, "APPROVED")}>
                            <CheckCircle className="w-3 h-3 mr-1" />Approve
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleAction(loan.id, "REJECTED")}>
                            <XCircle className="w-3 h-3 mr-1" />Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => navigate("/loan-deductions")}>
              View Deductions (Account Executive)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanApproval;
