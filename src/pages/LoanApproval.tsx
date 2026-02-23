import { useState } from "react";
import { mockPendingLoans, LoanRequest } from "@/data/loanData";
import { ArrowLeft, CheckCircle, XCircle, Clock, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Shield, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const LoanApproval = () => {
  const navigate = useNavigate();
  const [loans, setLoans] = useState<LoanRequest[]>(mockPendingLoans);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectingLoanId, setRejectingLoanId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const { theme, setTheme } = useTheme();

  const handleApprove = (id: number) => {
    setLoans((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, status: "APPROVED", approvedBy: "Executive Officer", approvedAt: new Date().toISOString() } : l
      )
    );
    const loan = loans.find((l) => l.id === id);
    const msg = `${loan?.employeeName}'s loan of LKR ${loan?.amount.toLocaleString()} has been approved.`;
    setNotifications((prev) => [msg, ...prev]);
    toast({ title: "Loan Approved", description: msg });
  };

  const openRejectDialog = (id: number) => {
    setRejectingLoanId(id);
    setRejectReason("");
    setRejectDialogOpen(true);
  };

  const handleRejectConfirm = () => {
    if (!rejectingLoanId || !rejectReason.trim()) {
      toast({ title: "Reason Required", description: "Please provide a reason for rejection.", variant: "destructive" });
      return;
    }
    setLoans((prev) =>
      prev.map((l) =>
        l.id === rejectingLoanId
          ? { ...l, status: "REJECTED", approvedBy: "Executive Officer", approvedAt: new Date().toISOString(), rejectReason: rejectReason.trim() }
          : l
      )
    );
    const loan = loans.find((l) => l.id === rejectingLoanId);
    const msg = `${loan?.employeeName}'s loan of LKR ${loan?.amount.toLocaleString()} has been rejected. Reason: ${rejectReason.trim()}`;
    setNotifications((prev) => [msg, ...prev]);
    toast({ title: "Loan Rejected", description: msg });
    setRejectDialogOpen(false);
    setRejectingLoanId(null);
    setRejectReason("");
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
      <header className="h-14 border-b border-border bg-card flex items-center px-6 gap-4 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Shield className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-foreground text-base tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Ace Frontline
          </span>
        </div>
        <span className="text-sm font-medium text-muted-foreground ml-2">Executive Officer Portal</span>
        <div className="ml-auto">
          <button className="p-2 rounded-lg hover:bg-muted transition-colors" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="w-4 h-4 text-muted-foreground" /> : <Moon className="w-4 h-4 text-muted-foreground" />}
          </button>
        </div>
      </header>
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

          {notifications.length > 0 && (
            <div className="bg-card rounded-xl border border-border p-4 space-y-2" style={{ boxShadow: "var(--card-shadow)" }}>
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2"><Bell className="w-4 h-4 text-primary" />Notifications</h3>
              {notifications.map((n, i) => (
                <div key={i} className="text-sm text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">{n}</div>
              ))}
            </div>
          )}

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
                    <TableCell>
                      <div className="space-y-1">
                        {statusBadge(loan.status)}
                        {loan.status === "REJECTED" && loan.rejectReason && (
                          <p className="text-xs text-destructive mt-1">Reason: {loan.rejectReason}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {loan.status === "PENDING" ? (
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-[hsl(var(--success))] text-white hover:bg-[hsl(var(--success))]/90" onClick={() => handleApprove(loan.id)}>
                            <CheckCircle className="w-3 h-3 mr-1" />Approve
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => openRejectDialog(loan.id)}>
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

      {/* Reject Reason Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center gap-2">
              <XCircle className="w-5 h-5 text-destructive" />
              Reject Loan Request
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Label>Reason for Rejection</Label>
            <Textarea
              placeholder="Please provide a reason for rejecting this loan request..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleRejectConfirm}>
              <XCircle className="w-3 h-3 mr-1" />Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoanApproval;
