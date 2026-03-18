import { useState, useEffect, useCallback } from "react";
import {
  fetchAllDeductions,
  markDeductionPaid,
  groupDeductionsByLoan,
  GroupedLoanDeduction,
} from "@/services/loanDeductionApi";
import { getApprovedDeductions, deductMonth, subscribeLoanStore } from "@/stores/loanStore";
import { getApprovedAdvances, markAdvanceDeducted, subscribeAdvanceStore } from "@/stores/advanceStore";
import { LoanDeduction } from "@/data/loanData";
import { ApprovedAdvance } from "@/data/advanceData";
import { ArrowLeft, DollarSign, CheckCircle2, Banknote, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Shield, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

// Adapter: convert in-memory LoanDeduction to GroupedLoanDeduction format
function adaptLocalDeductions(local: LoanDeduction[]): GroupedLoanDeduction[] {
  return local.map((d) => ({
    loanId: d.loanId,
    employeeName: d.employeeName,
    totalAmount: d.totalAmount,
    repaymentMonths: d.repaymentMonths,
    monthlyDeduction: d.monthlyDeduction,
    remainingMonths: d.remainingMonths,
    paidMonths: d.paidMonths,
    remainingAmount: d.remainingAmount,
    schedule: d.schedule.map((s, i) => ({
      id: -(d.loanId * 100 + i), // negative id to distinguish local
      month: s.month,
      amount: s.amount,
      status: s.status === "UPCOMING" ? "PENDING" as const : s.status,
    })),
  }));
}

const LoanDeductions = () => {
  const navigate = useNavigate();
  const [deductions, setDeductions] = useState<GroupedLoanDeduction[]>([]);
  const [advances, setAdvances] = useState<ApprovedAdvance[]>(getApprovedAdvances());
  const [expandedLoan, setExpandedLoan] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"loans" | "advances">("loans");
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState<number | null>(null);
  const [useBackend, setUseBackend] = useState(true);
  const { theme, setTheme } = useTheme();

  const loadDeductions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAllDeductions();
      setDeductions(groupDeductionsByLoan(data));
      setUseBackend(true);
    } catch {
      // Backend unreachable — fall back to in-memory store
      setUseBackend(false);
      setDeductions(adaptLocalDeductions(getApprovedDeductions()));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDeductions();
  }, [loadDeductions]);

  // Subscribe to in-memory store changes when in fallback mode
  useEffect(() => {
    if (useBackend) return;
    const unsub = subscribeLoanStore(() => {
      setDeductions(adaptLocalDeductions(getApprovedDeductions()));
    });
    return unsub;
  }, [useBackend]);

  useEffect(() => {
    const unsub = subscribeAdvanceStore(() => setAdvances(getApprovedAdvances()));
    return unsub;
  }, []);

  const handleMarkPaid = async (deductionId: number, loanId: number) => {
    if (!useBackend) {
      // Fallback: use in-memory store
      deductMonth(loanId);
      toast({ title: "Deduction Applied", description: "Monthly deduction has been deducted from salary." });
      return;
    }
    try {
      setPayingId(deductionId);
      await markDeductionPaid(deductionId);
      toast({ title: "Deduction Paid", description: "Monthly deduction marked as paid." });
      await loadDeductions();
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to mark as paid", variant: "destructive" });
    } finally {
      setPayingId(null);
    }
  };

  const handleAdvanceDeduct = (advanceId: number) => {
    markAdvanceDeducted(advanceId);
    toast({ title: "Advance Deducted", description: "Advance has been deducted from salary." });
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "PAID": return "bg-[hsl(var(--success))]/15 text-[hsl(var(--success))]";
      case "PENDING": return "bg-[hsl(var(--warning))]/15 text-[hsl(var(--warning))]";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const formatMonth = (month: string) => {
    // Handle both "2026-04" and "Apr 2026" formats
    if (month.match(/^\d{4}-\d{2}$/)) {
      const [year, m] = month.split("-");
      const date = new Date(Number(year), Number(m) - 1);
      return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    }
    return month;
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
        <span className="text-sm font-medium text-muted-foreground ml-2">Account Executive Portal</span>
        {!useBackend && (
          <Badge className="bg-[hsl(var(--warning))]/15 text-[hsl(var(--warning))] text-xs ml-2">Offline Mode</Badge>
        )}
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
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <DollarSign className="w-5 h-5 text-primary" />
              Deductions — Account Executive
            </h1>
            <Button variant="ghost" size="icon" onClick={loadDeductions} className="ml-auto" disabled={loading}>
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            <Button
              variant={activeTab === "loans" ? "default" : "outline"}
              onClick={() => setActiveTab("loans")}
              className={activeTab === "loans" ? "bg-primary text-primary-foreground" : ""}
            >
              <DollarSign className="w-4 h-4 mr-1" />
              Loan Deductions ({deductions.length})
            </Button>
            <Button
              variant={activeTab === "advances" ? "default" : "outline"}
              onClick={() => setActiveTab("advances")}
              className={activeTab === "advances" ? "bg-primary text-primary-foreground" : ""}
            >
              <Banknote className="w-4 h-4 mr-1" />
              Advance Deductions ({advances.filter(a => !a.deducted).length})
            </Button>
          </div>

          {/* Loan Deductions Tab */}
          {activeTab === "loans" && (
            <>
              {loading ? (
                <div className="bg-card rounded-xl border border-border p-12 text-center" style={{ boxShadow: "var(--card-shadow)" }}>
                  <Loader2 className="w-8 h-8 text-primary mx-auto mb-3 animate-spin" />
                  <p className="text-muted-foreground text-sm">Loading deductions...</p>
                </div>
              ) : deductions.length === 0 ? (
                <div className="bg-card rounded-xl border border-border p-12 text-center" style={{ boxShadow: "var(--card-shadow)" }}>
                  <DollarSign className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">No approved loans for deduction yet.</p>
                  <p className="text-muted-foreground text-xs mt-1">Approved loans from the Executive Officer will appear here.</p>
                </div>
              ) : (
                deductions.map((d) => (
                  <div key={d.loanId} className="bg-card rounded-xl border border-border overflow-hidden" style={{ boxShadow: "var(--card-shadow)" }}>
                    <div
                      className="p-5 cursor-pointer hover:bg-muted/30 transition-colors"
                      onClick={() => setExpandedLoan(expandedLoan === d.loanId ? null : d.loanId)}
                    >
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                          <h3 className="font-bold text-foreground">{d.employeeName}</h3>
                          <p className="text-sm text-muted-foreground">Loan #{d.loanId}</p>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                          <div className="text-center">
                            <p className="text-muted-foreground text-xs">Total</p>
                            <p className="font-bold font-mono text-foreground">LKR {d.totalAmount.toLocaleString()}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-muted-foreground text-xs">Monthly</p>
                            <p className="font-bold font-mono text-primary">LKR {d.monthlyDeduction.toLocaleString()}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-muted-foreground text-xs">Remaining</p>
                            <p className="font-bold font-mono text-foreground">{d.remainingMonths} months</p>
                          </div>
                          <div className="text-center">
                            <p className="text-muted-foreground text-xs">Balance</p>
                            <p className="font-bold font-mono text-destructive">LKR {d.remainingAmount.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {expandedLoan === d.loanId && (
                      <div className="border-t border-border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Month</TableHead>
                              <TableHead>Deduction (LKR)</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {d.schedule.map((s) => (
                              <TableRow key={s.id}>
                                <TableCell className="font-medium text-foreground">{formatMonth(s.month)}</TableCell>
                                <TableCell className="font-mono">{s.amount.toLocaleString()}</TableCell>
                                <TableCell><Badge className={statusColor(s.status)}>{s.status}</Badge></TableCell>
                                <TableCell className="text-right">
                                  {s.status === "PENDING" && (
                                    <Button
                                      size="sm"
                                      className="bg-[hsl(var(--success))] text-white hover:bg-[hsl(var(--success))]/90"
                                      onClick={(e) => { e.stopPropagation(); handleMarkPaid(s.id, d.loanId); }}
                                      disabled={payingId === s.id}
                                    >
                                      {payingId === s.id ? (
                                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                      ) : (
                                        <CheckCircle2 className="w-3 h-3 mr-1" />
                                      )}
                                      Mark Paid
                                    </Button>
                                  )}
                                  {s.status === "PAID" && (
                                    <span className="text-xs text-muted-foreground">Completed</span>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </div>
                ))
              )}
            </>
          )}

          {/* Advance Deductions Tab */}
          {activeTab === "advances" && (
            <>
              {advances.length === 0 ? (
                <div className="bg-card rounded-xl border border-border p-12 text-center" style={{ boxShadow: "var(--card-shadow)" }}>
                  <Banknote className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">No approved advances for deduction yet.</p>
                  <p className="text-muted-foreground text-xs mt-1">Approved advances from the Area Manager will appear here.</p>
                </div>
              ) : (
                <div className="bg-card rounded-xl border border-border overflow-hidden" style={{ boxShadow: "var(--card-shadow)" }}>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Amount (LKR)</TableHead>
                        <TableHead>For Month</TableHead>
                        <TableHead>Approved Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {advances.map((a) => (
                        <TableRow key={a.advanceId}>
                          <TableCell className="font-medium text-foreground">{a.employeeName}</TableCell>
                          <TableCell className="font-mono">{a.amount.toLocaleString()}</TableCell>
                          <TableCell>{a.forMonth}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {new Date(a.approvedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </TableCell>
                          <TableCell>
                            <Badge className={a.deducted ? "bg-[hsl(var(--success))]/15 text-[hsl(var(--success))]" : "bg-[hsl(var(--warning))]/15 text-[hsl(var(--warning))]"}>
                              {a.deducted ? "Deducted" : "Pending"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              className="bg-[hsl(var(--success))] text-white hover:bg-[hsl(var(--success))]/90"
                              onClick={() => handleAdvanceDeduct(a.advanceId)}
                              disabled={a.deducted}
                            >
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              {a.deducted ? "Done" : "Deduct"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanDeductions;
