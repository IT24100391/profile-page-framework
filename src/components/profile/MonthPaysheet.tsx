import { DollarSign, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockUser } from "@/data/mockUser";

const MonthPaysheet = () => {
  const basic = mockUser.basicSalary;
  const ot = 5000;
  const bra = 2500;
  const grossPay = basic + ot + bra;
  const epf = basic * 0.08;
  const tax = 0;
  const totalDeductions = epf + tax;
  const netPay = grossPay - totalDeductions;

  return (
    <div className="max-w-2xl bg-card rounded-xl border border-border p-6" style={{ boxShadow: "var(--card-shadow)" }}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-primary" />
          Paysheet — January 2024
        </h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Printer className="w-3 h-3 mr-1" />Print</Button>
          <Button variant="outline" size="sm"><Download className="w-3 h-3 mr-1" />PDF</Button>
        </div>
      </div>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between text-muted-foreground border-b border-border pb-2">
          <span>Employee</span>
          <span className="font-medium text-foreground">{mockUser.fullName}</span>
        </div>
        <div className="flex justify-between text-muted-foreground border-b border-border pb-2">
          <span>Designation</span>
          <span className="font-medium text-foreground">Senior Security Officer</span>
        </div>

        {/* Earnings */}
        <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold pt-2">Earnings</h4>
        <div className="space-y-1.5 pl-2">
          <div className="flex justify-between"><span className="text-muted-foreground">Basic Salary</span><span className="text-foreground">LKR {basic.toLocaleString()}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Overtime</span><span className="text-foreground">LKR {ot.toLocaleString()}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">BR Allowance</span><span className="text-foreground">LKR {bra.toLocaleString()}</span></div>
          <div className="flex justify-between font-semibold border-t border-border pt-1.5"><span>Gross Pay</span><span>LKR {grossPay.toLocaleString()}</span></div>
        </div>

        {/* Deductions */}
        <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold pt-2">Deductions</h4>
        <div className="space-y-1.5 pl-2">
          <div className="flex justify-between"><span className="text-muted-foreground">EPF (8%)</span><span className="text-foreground">LKR {epf.toLocaleString()}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span className="text-foreground">LKR {tax.toLocaleString()}</span></div>
          <div className="flex justify-between font-semibold border-t border-border pt-1.5"><span>Total Deductions</span><span>LKR {totalDeductions.toLocaleString()}</span></div>
        </div>

        {/* Net */}
        <div className="flex justify-between text-lg font-bold bg-primary/10 rounded-lg p-3 mt-2">
          <span>Net Pay</span>
          <span className="text-primary">LKR {netPay.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default MonthPaysheet;
