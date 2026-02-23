export type LoanStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface LoanRequest {
  id: number;
  employeeId: number;
  employeeName: string;
  amount: number;
  repaymentMonths: number;
  reason: string;
  status: LoanStatus;
  submittedAt: string;
  approvedBy?: string;
  approvedAt?: string;
}

export interface LoanDeduction {
  loanId: number;
  employeeName: string;
  totalAmount: number;
  repaymentMonths: number;
  monthlyDeduction: number;
  remainingMonths: number;
  paidMonths: number;
  remainingAmount: number;
  schedule: DeductionMonth[];
}

export interface DeductionMonth {
  month: string;
  amount: number;
  status: "PAID" | "PENDING" | "UPCOMING";
}

// Mock pending loans for executive officer
export const mockPendingLoans: LoanRequest[] = [
  {
    id: 1,
    employeeId: 2,
    employeeName: "Kamal Wickramasinghe",
    amount: 50000,
    repaymentMonths: 4,
    reason: "Medical emergency - surgery expenses",
    status: "PENDING",
    submittedAt: "2024-01-18T10:30:00",
  },
  {
    id: 2,
    employeeId: 3,
    employeeName: "Nimal Jayasuriya",
    amount: 35000,
    repaymentMonths: 3,
    reason: "Children's school fees",
    status: "PENDING",
    submittedAt: "2024-01-19T14:15:00",
  },
];

// Mock approved loans for account executive deduction view
export const mockApprovedDeductions: LoanDeduction[] = [
  {
    loanId: 10,
    employeeName: "Sunil Fernando",
    totalAmount: 60000,
    repaymentMonths: 6,
    monthlyDeduction: 10000,
    remainingMonths: 4,
    paidMonths: 2,
    remainingAmount: 40000,
    schedule: [
      { month: "Nov 2023", amount: 10000, status: "PAID" },
      { month: "Dec 2023", amount: 10000, status: "PAID" },
      { month: "Jan 2024", amount: 10000, status: "PENDING" },
      { month: "Feb 2024", amount: 10000, status: "UPCOMING" },
      { month: "Mar 2024", amount: 10000, status: "UPCOMING" },
      { month: "Apr 2024", amount: 10000, status: "UPCOMING" },
    ],
  },
  {
    loanId: 11,
    employeeName: "Ranjith Silva",
    totalAmount: 45000,
    repaymentMonths: 5,
    monthlyDeduction: 9000,
    remainingMonths: 3,
    paidMonths: 2,
    remainingAmount: 27000,
    schedule: [
      { month: "Dec 2023", amount: 9000, status: "PAID" },
      { month: "Jan 2024", amount: 9000, status: "PAID" },
      { month: "Feb 2024", amount: 9000, status: "PENDING" },
      { month: "Mar 2024", amount: 9000, status: "UPCOMING" },
      { month: "Apr 2024", amount: 9000, status: "UPCOMING" },
    ],
  },
];
