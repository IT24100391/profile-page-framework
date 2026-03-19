import { useState, useMemo, useRef } from "react";
import { Search, FileText, Printer, Download, DollarSign, Plus, Trash2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { employeesList } from "@/data/employeesData";
import { designationLabels, type UserProfile } from "@/data/mockUser";

interface LineItem {
  id: string;
  name: string;
  amount: number;
}

const defaultAllowances: LineItem[] = [
  { id: "ot", name: "Overtime", amount: 0 },
  { id: "bra", name: "BR Allowance", amount: 0 },
  { id: "attendance", name: "Attendance Bonus", amount: 0 },
];

const defaultDeductions: LineItem[] = [
  { id: "epf", name: "EPF (8%)", amount: 0 },
  { id: "loan", name: "Loan Deduction", amount: 0 },
  { id: "advance", name: "Advance Deduction", amount: 0 },
];

const PayrollGenerate = () => {
  const [idQuery, setIdQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<UserProfile | null>(null);
  const [searchError, setSearchError] = useState("");
  const [allowances, setAllowances] = useState<LineItem[]>(defaultAllowances);
  const [deductions, setDeductions] = useState<LineItem[]>(defaultDeductions);
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  const handleSearch = () => {
    const trimmed = idQuery.trim();
    if (!trimmed) return;
    const found = employeesList.find((e) => e.id.toString() === trimmed);
    if (found) {
      setSelectedEmployee(found);
      setSearchError("");
      setAllowances(defaultAllowances.map((a) => ({ ...a })));
      setDeductions(
        defaultDeductions.map((d) =>
          d.id === "epf" ? { ...d, amount: Math.round(found.basicSalary * 0.08) } : { ...d }
        )
      );
    } else {
      setSelectedEmployee(null);
      setSearchError("No employee found with this ID");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const updateItem = (
    setter: React.Dispatch<React.SetStateAction<LineItem[]>>,
    id: string,
    field: "name" | "amount",
    value: string | number
  ) => setter((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));

  const addItem = (setter: React.Dispatch<React.SetStateAction<LineItem[]>>) =>
    setter((prev) => [...prev, { id: `c-${Date.now()}`, name: "", amount: 0 }]);

  const removeItem = (setter: React.Dispatch<React.SetStateAction<LineItem[]>>, id: string) =>
    setter((prev) => prev.filter((item) => item.id !== id));

  const totalAllowances = allowances.reduce((s, a) => s + a.amount, 0);
  const totalDeductions = deductions.reduce((s, d) => s + d.amount, 0);
  const basic = selectedEmployee?.basicSalary ?? 0;
  const grossPay = basic + totalAllowances;
  const netPay = grossPay - totalDeductions;

  const monthLabel = useMemo(() => {
    const [y, m] = month.split("-");
    return new Date(Number(y), Number(m) - 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }, [month]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Payroll Generator</h1>
              <p className="text-xs text-muted-foreground">Generate monthly paysheet templates</p>
            </div>
          </div>
          <Input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="w-44" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 space-y-5">
        {/* ID Search Bar */}
        <Card>
          <CardContent className="p-4">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
              Employee ID
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter Employee ID (e.g. 1, 2, 3...)"
                  value={idQuery}
                  onChange={(e) => { setIdQuery(e.target.value); setSearchError(""); }}
                  onKeyDown={handleKeyDown}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleSearch}>Search</Button>
            </div>
            {searchError && <p className="text-xs text-destructive mt-2">{searchError}</p>}
          </CardContent>
        </Card>

        {/* Auto-populated Detail Bars */}
        {selectedEmployee && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Name */}
              <div className="rounded-lg border border-border bg-card p-3">
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Full Name</label>
                <p className="text-sm font-medium text-foreground mt-0.5 truncate">{selectedEmployee.fullName}</p>
              </div>
              {/* NIC */}
              <div className="rounded-lg border border-border bg-card p-3">
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">NIC Number</label>
                <p className="text-sm font-medium text-foreground mt-0.5">{selectedEmployee.nicNumber}</p>
              </div>
              {/* Designation */}
              <div className="rounded-lg border border-border bg-card p-3">
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Designation</label>
                <p className="text-sm font-medium text-foreground mt-0.5">{designationLabels[selectedEmployee.designation]}</p>
              </div>
              {/* Area */}
              <div className="rounded-lg border border-border bg-card p-3">
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Assigned Area</label>
                <p className="text-sm font-medium text-foreground mt-0.5 truncate">{selectedEmployee.assignedArea}</p>
              </div>
              {/* Company */}
              <div className="rounded-lg border border-border bg-card p-3">
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Company</label>
                <p className="text-sm font-medium text-foreground mt-0.5 truncate">{selectedEmployee.assignedCompany}</p>
              </div>
              {/* Bank Name */}
              <div className="rounded-lg border border-border bg-card p-3">
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Bank Name</label>
                <p className="text-sm font-medium text-foreground mt-0.5">{selectedEmployee.bankName}</p>
              </div>
              {/* Account No */}
              <div className="rounded-lg border border-border bg-card p-3">
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Account Number</label>
                <p className="text-sm font-medium text-foreground mt-0.5">{selectedEmployee.bankAccountNumber}</p>
              </div>
              {/* Branch */}
              <div className="rounded-lg border border-border bg-card p-3">
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Bank Branch</label>
                <p className="text-sm font-medium text-foreground mt-0.5">{selectedEmployee.bankBranch}</p>
              </div>
            </div>

            {/* ── Salary Template ── */}
            <Card className="overflow-hidden">
              {/* Template Header */}
              <div className="bg-[hsl(var(--navy))] text-[hsl(var(--gold))] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5" />
                  <div>
                    <h2 className="text-sm font-bold tracking-wide">ACE FRONTLINE SECURITY (PVT) LTD</h2>
                    <p className="text-xs opacity-80">Monthly Salary Statement — {monthLabel}</p>
                  </div>
                </div>
                <div className="flex gap-2 print:hidden">
                  <Button variant="secondary" size="sm" onClick={() => window.print()}>
                    <Printer className="w-3 h-3 mr-1" /> Print
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Download className="w-3 h-3 mr-1" /> PDF
                  </Button>
                </div>
              </div>

              <CardContent className="p-6 space-y-5">
                {/* Employee Summary Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2 text-sm border-b border-border pb-4">
                  <div><span className="text-muted-foreground">Name:</span> <span className="font-medium text-foreground ml-1">{selectedEmployee.fullName}</span></div>
                  <div><span className="text-muted-foreground">ID:</span> <span className="font-medium text-foreground ml-1">{selectedEmployee.id}</span></div>
                  <div><span className="text-muted-foreground">Designation:</span> <span className="font-medium text-foreground ml-1">{selectedEmployee.designation}</span></div>
                  <div><span className="text-muted-foreground">Month:</span> <span className="font-medium text-foreground ml-1">{monthLabel}</span></div>
                </div>

                {/* Basic Salary */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                  <span className="text-sm font-semibold text-foreground">Basic Salary</span>
                  <span className="text-sm font-bold text-foreground tabular-nums">LKR {basic.toLocaleString()}.00</span>
                </div>

                {/* Allowances */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Additions / Allowances</h4>
                    <Button variant="ghost" size="sm" onClick={() => addItem(setAllowances)} className="h-7 text-xs print:hidden">
                      <Plus className="w-3 h-3 mr-1" /> Add
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-10">#</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right w-44">Amount (LKR)</TableHead>
                        <TableHead className="w-10 print:hidden" />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allowances.map((a, i) => (
                        <TableRow key={a.id}>
                          <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                          <TableCell>
                            <Input value={a.name} onChange={(e) => updateItem(setAllowances, a.id, "name", e.target.value)} className="h-8 text-sm border-0 bg-transparent p-0 focus-visible:ring-0" placeholder="Allowance name" />
                          </TableCell>
                          <TableCell className="text-right">
                            <Input type="number" value={a.amount || ""} onChange={(e) => updateItem(setAllowances, a.id, "amount", Number(e.target.value) || 0)} className="h-8 text-sm text-right border-0 bg-transparent p-0 focus-visible:ring-0 tabular-nums" placeholder="0.00" />
                          </TableCell>
                          <TableCell className="print:hidden">
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => removeItem(setAllowances, a.id)}>
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-muted/30 font-semibold">
                        <TableCell />
                        <TableCell>Total Allowances</TableCell>
                        <TableCell className="text-right tabular-nums">LKR {totalAllowances.toLocaleString()}.00</TableCell>
                        <TableCell className="print:hidden" />
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* Gross Pay */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <span className="text-sm font-semibold text-foreground">Gross Pay</span>
                  <span className="text-sm font-bold text-foreground tabular-nums">LKR {grossPay.toLocaleString()}.00</span>
                </div>

                {/* Deductions */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Deductions</h4>
                    <Button variant="ghost" size="sm" onClick={() => addItem(setDeductions)} className="h-7 text-xs print:hidden">
                      <Plus className="w-3 h-3 mr-1" /> Add
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-10">#</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right w-44">Amount (LKR)</TableHead>
                        <TableHead className="w-10 print:hidden" />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {deductions.map((d, i) => (
                        <TableRow key={d.id}>
                          <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                          <TableCell>
                            <Input value={d.name} onChange={(e) => updateItem(setDeductions, d.id, "name", e.target.value)} className="h-8 text-sm border-0 bg-transparent p-0 focus-visible:ring-0" placeholder="Deduction name" />
                          </TableCell>
                          <TableCell className="text-right">
                            <Input type="number" value={d.amount || ""} onChange={(e) => updateItem(setDeductions, d.id, "amount", Number(e.target.value) || 0)} className="h-8 text-sm text-right border-0 bg-transparent p-0 focus-visible:ring-0 tabular-nums" placeholder="0.00" />
                          </TableCell>
                          <TableCell className="print:hidden">
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => removeItem(setDeductions, d.id)}>
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-muted/30 font-semibold">
                        <TableCell />
                        <TableCell>Total Deductions</TableCell>
                        <TableCell className="text-right tabular-nums">LKR {totalDeductions.toLocaleString()}.00</TableCell>
                        <TableCell className="print:hidden" />
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* Net Pay */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-primary/10 border border-primary/30">
                  <span className="text-lg font-bold text-foreground">Net Salary</span>
                  <span className="text-lg font-bold text-primary tabular-nums">LKR {netPay.toLocaleString()}.00</span>
                </div>

                {/* Signature area */}
                <div className="grid grid-cols-2 gap-12 pt-8 mt-4 border-t border-border">
                  <div className="text-center">
                    <div className="border-b border-border mb-1 pb-8" />
                    <p className="text-xs text-muted-foreground">Prepared By</p>
                  </div>
                  <div className="text-center">
                    <div className="border-b border-border mb-1 pb-8" />
                    <p className="text-xs text-muted-foreground">Authorized Signature</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Empty State */}
        {!selectedEmployee && !searchError && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Enter Employee ID</h3>
            <p className="text-sm text-muted-foreground">Search by employee ID to auto-populate details and generate the paysheet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayrollGenerate;
