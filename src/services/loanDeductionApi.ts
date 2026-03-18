import { apiClient } from "@/lib/apiClient";

export interface LoanDeductionDTO {
  id: number;
  deductionMonth: string;
  amount: number;
  status: "PENDING" | "PAID";
  processedAt: string | null;
  createdAt: string;
  loanRequest: {
    id: number;
    amount: number;
    repaymentMonths: number;
    reason: string;
    status: string;
    user: {
      id: number;
      fullName: string;
      username: string;
    };
  };
  user: {
    id: number;
    fullName: string;
    username: string;
  };
  processedBy: {
    id: number;
    fullName: string;
  } | null;
}

/** Get all deductions (Account Executive / Executive Officer) */
export async function fetchAllDeductions(): Promise<LoanDeductionDTO[]> {
  const res = await apiClient<LoanDeductionDTO[]>("/api/loan-deductions");
  return res.data;
}

/** Get all pending deductions */
export async function fetchPendingDeductions(): Promise<LoanDeductionDTO[]> {
  const res = await apiClient<LoanDeductionDTO[]>("/api/loan-deductions/pending");
  return res.data;
}

/** Get deductions for a specific loan */
export async function fetchLoanSchedule(loanId: number): Promise<LoanDeductionDTO[]> {
  const res = await apiClient<LoanDeductionDTO[]>(`/api/loan-deductions/loan/${loanId}`);
  return res.data;
}

/** Get my deductions (Security Officer) */
export async function fetchMyDeductions(): Promise<LoanDeductionDTO[]> {
  const res = await apiClient<LoanDeductionDTO[]>("/api/loan-deductions/my");
  return res.data;
}

/** Mark a single deduction as paid */
export async function markDeductionPaid(deductionId: number): Promise<LoanDeductionDTO> {
  const res = await apiClient<LoanDeductionDTO>(`/api/loan-deductions/${deductionId}/pay`, {
    method: "PATCH",
  });
  return res.data;
}

/** Generate deduction schedule for an approved loan */
export async function generateDeductionSchedule(loanId: number): Promise<LoanDeductionDTO[]> {
  const res = await apiClient<LoanDeductionDTO[]>(`/api/loan-deductions/generate/${loanId}`, {
    method: "POST",
  });
  return res.data;
}

/** Get remaining balance for a loan */
export async function fetchRemainingBalance(loanId: number): Promise<number> {
  const res = await apiClient<number>(`/api/loan-deductions/balance/${loanId}`);
  return res.data;
}

/** Get pending deductions for a specific month */
export async function fetchPendingForMonth(month: string): Promise<LoanDeductionDTO[]> {
  const res = await apiClient<LoanDeductionDTO[]>(`/api/loan-deductions/pending/${month}`);
  return res.data;
}

// === Helper: Group flat deductions by loanId for display ===
export interface GroupedLoanDeduction {
  loanId: number;
  employeeName: string;
  totalAmount: number;
  repaymentMonths: number;
  monthlyDeduction: number;
  remainingMonths: number;
  paidMonths: number;
  remainingAmount: number;
  schedule: {
    id: number;
    month: string;
    amount: number;
    status: "PAID" | "PENDING";
  }[];
}

export function groupDeductionsByLoan(deductions: LoanDeductionDTO[]): GroupedLoanDeduction[] {
  const map = new Map<number, LoanDeductionDTO[]>();
  for (const d of deductions) {
    const loanId = d.loanRequest.id;
    if (!map.has(loanId)) map.set(loanId, []);
    map.get(loanId)!.push(d);
  }

  return Array.from(map.entries()).map(([loanId, items]) => {
    const first = items[0];
    const sorted = [...items].sort((a, b) => a.deductionMonth.localeCompare(b.deductionMonth));
    const paidCount = sorted.filter((s) => s.status === "PAID").length;
    const pendingAmount = sorted.filter((s) => s.status === "PENDING").reduce((sum, s) => sum + s.amount, 0);
    const totalAmount = first.loanRequest.amount;
    const monthlyDeduction = sorted.length > 0 ? sorted[0].amount : 0;

    return {
      loanId,
      employeeName: first.user.fullName,
      totalAmount,
      repaymentMonths: first.loanRequest.repaymentMonths,
      monthlyDeduction,
      remainingMonths: sorted.length - paidCount,
      paidMonths: paidCount,
      remainingAmount: pendingAmount,
      schedule: sorted.map((s) => ({
        id: s.id,
        month: s.deductionMonth,
        amount: s.amount,
        status: s.status,
      })),
    };
  });
}
