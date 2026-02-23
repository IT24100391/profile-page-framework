import { useState } from "react";
import { mockApprovedDeductions, LoanDeduction } from "@/data/loanData";
import { ArrowLeft, Minus, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import ProfileNavbar from "@/components/profile/ProfileNavbar";

const LoanDeductions = () => {
  const navigate = useNavigate();
  const [deductions, setDeductions] = useState<LoanDeduction[]>(mockApprovedDeductions);
  const [expandedLoan, setExpandedLoan] = useState<number | null>(null);

  const handleDecreaseMonth = (loanId: number) => {
    setDeductions((prev) =>
      prev.map((d) => {
        if (d.loanId !== loanId || d.remainingMonths <= 1) return d;
        const newRemaining = d.remainingMonths - 1;
        const newMonthly = Math.ceil(d.remainingAmount / newRemaining);
        // Rebuild schedule: keep paid months, adjust remaining
        const paidSchedule = d.schedule.filter((s) => s.status === "PAID");
        const pendingSchedule = [];
        for (let i = 0; i < newRemaining; i++) {
          const date = new Date();
          date.setMonth(date.getMonth() + i);
          const monthStr = date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
          pendingSchedule.push({
            month: monthStr,
            amount: i === newRemaining - 1 ? d.remainingAmount - newMonthly * (newRemaining - 1) : newMonthly,
            status: i === 0 ? "PENDING" as const : "UPCOMING" as const,
          });
        }
        return {
          ...d,
          remainingMonths: newRemaining,
          monthlyDeduction: newMonthly,
          schedule: [...paidSchedule, ...pendingSchedule],
        };
      })
    );
    toast({ title: "Repayment Updated", description: "Decreased repayment period by 1 month. Monthly deduction increased." });
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
      <ProfileNavbar />
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center gap-4 mb-2">
            <Button variant="outline" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <DollarSign className="w-5 h-5 text-primary" />
              Loan Deductions — Account Executive
            </h1>
          </div>

          {deductions.map((d) => (
            <div key={d.loanId} className="bg-card rounded-xl border border-border overflow-hidden" style={{ boxShadow: "var(--card-shadow)" }}>
              {/* Summary Row */}
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

              {/* Expanded Schedule */}
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
                  <div className="p-4 border-t border-border flex justify-end">
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoanDeductions;

