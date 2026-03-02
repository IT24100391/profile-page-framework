import { useState, useEffect } from "react";
import { getApprovedDeductions, deductMonth, decreaseRepaymentMonth, subscribeLoanStore } from "@/stores/loanStore";
import { getApprovedAdvances, markAdvanceDeducted, subscribeAdvanceStore } from "@/stores/advanceStore";
import { LoanDeduction } from "@/data/loanData";
import { ApprovedAdvance } from "@/data/advanceData";
import { ArrowLeft, Minus, DollarSign, CheckCircle2, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Shield, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const LoanDeductions = () => {
  const navigate = useNavigate();
  const [deductions, setDeductions] = useState<LoanDeduction[]>(getApprovedDeductions());
  const [advances, setAdvances] = useState<ApprovedAdvance[]>(getApprovedAdvances());
  const [expandedLoan, setExpandedLoan] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"loans" | "advances">("loans");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const unsub1 = subscribeLoanStore(() => setDeductions(getApprovedDeductions()));
    const unsub2 = subscribeAdvanceStore(() => setAdvances(getApprovedAdvances()));
    return () => { unsub1(); unsub2(); };
  }, []);

  const handleDeductMonth = (loanId: number) => {
    deductMonth(loanId);
    toast({ title: "Deduction Applied", description: "Monthly deduction has been deducted from salary. Notification sent to employee." });
  };

  const handleDecreaseMonth = (loanId: number) => {
    decreaseRepaymentMonth(loanId);
    toast({ title: "Repayment Updated", description: "Decreased repayment period by 1 month. Monthly deduction increased equally." });
  };

  const handleAdvanceDeduct = (advanceId: number) => {
    markAdvanceDeducted(advanceId);
    toast({ title: "Advance Deducted", description: "Advance has been deducted from salary. Notification sent to employee." });
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "PAID": return "bg-[hsl(var(--success))]/15 text-[hsl(var(--success))]";
      case "PENDING": return "bg-[hsl(var(--warning))]/15 text-[hsl(var(--warning))]";
      default: return "bg-muted text-muted-foreground";
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
        <span className="text-sm font-medium text-muted-foreground ml-2">Account Executive Portal</span>
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
          ) : (
            deductions.map((d) => (
              <div key={d.loanId} className="bg-card rounded-xl border border-border overflow-hidden" style={{ boxShadow: "var(--card-shadow)" }}>
                <div
                  className="p-5 cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => setExpandedLoan(expandedLoan === d.loanId ? null : d.loanId)}
                >
                  <div className="flex items-center justify-between">
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
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {d.schedule.map((s, i) => (
                          <TableRow key={i}>
                            <TableCell className="font-medium text-foreground">{s.month}</TableCell>
                            <TableCell className="font-mono">{s.amount.toLocaleString()}</TableCell>
                            <TableCell><Badge className={statusColor(s.status)}>{s.status}</Badge></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="p-4 border-t border-border flex justify-end gap-2">
                      <Button
                        size="sm"
                        className="bg-[hsl(var(--success))] text-white hover:bg-[hsl(var(--success))]/90"
                        onClick={() => handleDeductMonth(d.loanId)}
                        disabled={!d.schedule.some((s) => s.status === "PENDING")}
                      >
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Deduct This Month
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDecreaseMonth(d.loanId)}
                        disabled={d.remainingMonths <= 1}
                      >
                        <Minus className="w-3 h-3 mr-1" />
                        Decrease Repayment Month
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanDeductions;
