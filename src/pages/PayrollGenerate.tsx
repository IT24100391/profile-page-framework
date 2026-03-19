import { useState, useMemo, useRef } from "react";
import { Search, FileText, Printer, Download, User, Building2, CreditCard, DollarSign, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { employeesList } from "@/data/employeesData";
import { designationLabels, type UserProfile } from "@/data/mockUser";

interface AllowanceItem {
  id: string;
  name: string;
  amount: number;
}

interface DeductionItem {
  id: string;
  name: string;
  amount: number;
}

const defaultAllowances: AllowanceItem[] = [
  { id: "ot", name: "Overtime", amount: 0 },
  { id: "bra", name: "BR Allowance", amount: 0 },
  { id: "attendance", name: "Attendance Bonus", amount: 0 },
];

const defaultDeductions: DeductionItem[] = [
  { id: "epf", name: "EPF (8%)", amount: 0 },
  { id: "loan", name: "Loan Deduction", amount: 0 },
  { id: "advance", name: "Advance Deduction", amount: 0 },
];

const PayrollGenerate = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<UserProfile | null>(null);
  const [allowances, setAllowances] = useState<AllowanceItem[]>(defaultAllowances);
  const [deductions, setDeductions] = useState<DeductionItem[]>(defaultDeductions);
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });
  const printRef = useRef<HTMLDivElement>(null);

  const filteredEmployees = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return employeesList.filter(
      (e) =>
        e.fullName.toLowerCase().includes(q) ||
        e.nicNumber.toLowerCase().includes(q) ||
        e.designation.toLowerCase().includes(q) ||
        e.id.toString() === q
    );
  }, [searchQuery]);

  const selectEmployee = (emp: UserProfile) => {
    setSelectedEmployee(emp);
    setSearchQuery("");
    setAllowances(defaultAllowances.map((a) => ({ ...a })));
    const epfAmount = emp.basicSalary * 0.08;
    setDeductions(
      defaultDeductions.map((d) =>
        d.id === "epf" ? { ...d, amount: epfAmount } : { ...d }
      )
    );
  };

  const updateAllowance = (id: string, field: "name" | "amount", value: string | number) => {
    setAllowances((prev) =>
      prev.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );
  };

  const addAllowance = () => {
    setAllowances((prev) => [
      ...prev,
      { id: `custom-${Date.now()}`, name: "", amount: 0 },
    ]);
  };

  const removeAllowance = (id: string) => {
    setAllowances((prev) => prev.filter((a) => a.id !== id));
  };

  const updateDeduction = (id: string, field: "name" | "amount", value: string | number) => {
    setDeductions((prev) =>
      prev.map((d) => (d.id === id ? { ...d, [field]: value } : d))
    );
  };

  const addDeduction = () => {
    setDeductions((prev) => [
      ...prev,
      { id: `custom-${Date.now()}`, name: "", amount: 0 },
    ]);
  };

  const removeDeduction = (id: string) => {
    setDeductions((prev) => prev.filter((d) => d.id !== id));
  };

  const totalAllowances = allowances.reduce((s, a) => s + a.amount, 0);
  const totalDeductions = deductions.reduce((s, d) => s + d.amount, 0);
  const grossPay = (selectedEmployee?.basicSalary ?? 0) + totalAllowances;
  const netPay = grossPay - totalDeductions;

  const monthLabel = useMemo(() => {
    const [y, m] = month.split("-");
    return new Date(Number(y), Number(m) - 1).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }, [month]);

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Payroll Generator</h1>
              <p className="text-xs text-muted-foreground">Generate monthly paysheet templates</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-44"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Search Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by Employee ID, Name, NIC, or Designation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            {filteredEmployees.length > 0 && (
              <div className="mt-2 border border-border rounded-lg overflow-hidden">
                {filteredEmployees.map((emp) => (
                  <button
                    key={emp.id}
                    onClick={() => selectEmployee(emp)}
                    className="w-full flex items-center gap-4 px-4 py-3 hover:bg-muted/50 transition-colors text-left border-b border-border last:border-0"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{emp.fullName}</p>
                      <p className="text-xs text-muted-foreground">
                        ID: {emp.id} · {emp.nicNumber} · {designationLabels[emp.designation]}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {emp.designation}
                    </Badge>
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {selectedEmployee && (
          <>
            {/* Employee Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Employee</p>
                    <p className="text-sm font-semibold text-foreground truncate">{selectedEmployee.fullName}</p>
                    <p className="text-xs text-muted-foreground">{selectedEmployee.nicNumber}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Role & Area</p>
                    <p className="text-sm font-semibold text-foreground">{designationLabels[selectedEmployee.designation]}</p>
                    <p className="text-xs text-muted-foreground truncate">{selectedEmployee.assignedArea}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <CreditCard className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Bank Details</p>
                    <p className="text-sm font-semibold text-foreground">{selectedEmployee.bankName}</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedEmployee.bankAccountNumber} · {selectedEmployee.bankBranch}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payroll Template */}
            <div ref={printRef}>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-primary" />
                      Paysheet — {monthLabel}
                    </CardTitle>
                    <div className="flex gap-2 print:hidden">
                      <Button variant="outline" size="sm" onClick={handlePrint}>
                        <Printer className="w-3 h-3 mr-1" /> Print
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-3 h-3 mr-1" /> PDF
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  {/* Basic Salary */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span className="text-sm font-medium text-foreground">Basic Salary</span>
                    <span className="text-sm font-bold text-foreground">
                      LKR {selectedEmployee.basicSalary.toLocaleString()}
                    </span>
                  </div>

                  {/* Allowances Table */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                        Allowances & Additions
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={addAllowance}
                        className="h-7 text-xs print:hidden"
                      >
                        <Plus className="w-3 h-3 mr-1" /> Add
                      </Button>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right w-40">Amount (LKR)</TableHead>
                          <TableHead className="w-10 print:hidden" />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {allowances.map((a) => (
                          <TableRow key={a.id}>
                            <TableCell>
                              <Input
                                value={a.name}
                                onChange={(e) => updateAllowance(a.id, "name", e.target.value)}
                                className="h-8 text-sm border-0 bg-transparent p-0 focus-visible:ring-0"
                                placeholder="Allowance name"
                              />
                            </TableCell>
                            <TableCell className="text-right">
                              <Input
                                type="number"
                                value={a.amount || ""}
                                onChange={(e) =>
                                  updateAllowance(a.id, "amount", Number(e.target.value) || 0)
                                }
                                className="h-8 text-sm text-right border-0 bg-transparent p-0 focus-visible:ring-0"
                                placeholder="0"
                              />
                            </TableCell>
                            <TableCell className="print:hidden">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                onClick={() => removeAllowance(a.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="font-semibold">
                          <TableCell>Total Allowances</TableCell>
                          <TableCell className="text-right">
                            LKR {totalAllowances.toLocaleString()}
                          </TableCell>
                          <TableCell className="print:hidden" />
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  {/* Gross Pay */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <span className="text-sm font-semibold text-foreground">Gross Pay</span>
                    <span className="text-sm font-bold text-foreground">
                      LKR {grossPay.toLocaleString()}
                    </span>
                  </div>

                  {/* Deductions Table */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                        Deductions
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={addDeduction}
                        className="h-7 text-xs print:hidden"
                      >
                        <Plus className="w-3 h-3 mr-1" /> Add
                      </Button>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right w-40">Amount (LKR)</TableHead>
                          <TableHead className="w-10 print:hidden" />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {deductions.map((d) => (
                          <TableRow key={d.id}>
                            <TableCell>
                              <Input
                                value={d.name}
                                onChange={(e) => updateDeduction(d.id, "name", e.target.value)}
                                className="h-8 text-sm border-0 bg-transparent p-0 focus-visible:ring-0"
                                placeholder="Deduction name"
                              />
                            </TableCell>
                            <TableCell className="text-right">
                              <Input
                                type="number"
                                value={d.amount || ""}
                                onChange={(e) =>
                                  updateDeduction(d.id, "amount", Number(e.target.value) || 0)
                                }
                                className="h-8 text-sm text-right border-0 bg-transparent p-0 focus-visible:ring-0"
                                placeholder="0"
                              />
                            </TableCell>
                            <TableCell className="print:hidden">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                onClick={() => removeDeduction(d.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="font-semibold">
                          <TableCell>Total Deductions</TableCell>
                          <TableCell className="text-right">
                            LKR {totalDeductions.toLocaleString()}
                          </TableCell>
                          <TableCell className="print:hidden" />
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  {/* Net Pay */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-primary/10 border border-primary/30">
                    <span className="text-lg font-bold text-foreground">Net Pay</span>
                    <span className="text-lg font-bold text-primary">
                      LKR {netPay.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {!selectedEmployee && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Search for an Employee</h3>
            <p className="text-sm text-muted-foreground">
              Use the search bar above to find an employee by ID, name, NIC, or designation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayrollGenerate;
