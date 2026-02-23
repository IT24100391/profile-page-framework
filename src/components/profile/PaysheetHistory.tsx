import { Download, FileText } from "lucide-react";

const mockPaysheets = [
  { month: "January 2024", basic: 45000, ot: 5000, deductions: 3500, net: 46500, status: "Paid" },
  { month: "December 2023", basic: 45000, ot: 3000, deductions: 3500, net: 44500, status: "Paid" },
  { month: "November 2023", basic: 45000, ot: 7500, deductions: 3500, net: 49000, status: "Paid" },
  { month: "October 2023", basic: 45000, ot: 4000, deductions: 3500, net: 45500, status: "Paid" },
  { month: "September 2023", basic: 45000, ot: 2000, deductions: 3500, net: 43500, status: "Paid" },
];

const PaysheetHistory = () => (
  <div className="bg-card rounded-xl border border-border p-6" style={{ boxShadow: "var(--card-shadow)" }}>
    <h3 className="text-base font-bold text-foreground mb-5 flex items-center gap-2">
      <FileText className="w-4 h-4 text-primary" />
      Paysheet History
    </h3>
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50">
            <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Month</th>
            <th className="text-right px-4 py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Basic</th>
            <th className="text-right px-4 py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">OT</th>
            <th className="text-right px-4 py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Deductions</th>
            <th className="text-right px-4 py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Net Pay</th>
            <th className="text-center px-4 py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Status</th>
            <th className="px-4 py-2.5"></th>
          </tr>
        </thead>
        <tbody>
          {mockPaysheets.map((ps, idx) => (
            <tr key={ps.month} className={idx % 2 === 1 ? "bg-muted/20" : ""}>
              <td className="px-4 py-3 font-medium text-foreground">{ps.month}</td>
              <td className="px-4 py-3 text-right text-muted-foreground">LKR {ps.basic.toLocaleString()}</td>
              <td className="px-4 py-3 text-right text-muted-foreground">LKR {ps.ot.toLocaleString()}</td>
              <td className="px-4 py-3 text-right text-muted-foreground">LKR {ps.deductions.toLocaleString()}</td>
              <td className="px-4 py-3 text-right font-semibold text-foreground">LKR {ps.net.toLocaleString()}</td>
              <td className="px-4 py-3 text-center">
                <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded text-[hsl(var(--badge-valid))]" style={{ backgroundColor: "hsl(var(--badge-valid) / 0.1)" }}>
                  {ps.status.toUpperCase()}
                </span>
              </td>
              <td className="px-4 py-3">
                <button className="text-primary hover:text-primary/70"><Download className="w-4 h-4" /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default PaysheetHistory;
