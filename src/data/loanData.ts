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
  rejectReason?: string;
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
    amount: 30000,
    repaymentMonths: 4,
    reason: "Medical emergency - surgery expenses",
    status: "PENDING",
    submittedAt: "2024-01-18T10:30:00",
  },
  {
    id: 2,
    employeeId: 3,
    employeeName: "Nimal Jayasuriya",
    amount: 25000,
    repaymentMonths: 3,
    reason: "Children's school fees",
    status: "PENDING",
    submittedAt: "2024-01-19T14:15:00",
  },
];

// Mock loan notifications for security officer
export interface LoanNotification {
  id: number;
  loanId: number;
  message: string;
  status: LoanStatus;
  rejectReason?: string;
  timestamp: string;
  read: boolean;
}

export const mockLoanNotifications: LoanNotification[] = [
  {
    id: 1,
    loanId: 5,
    message: "Your loan request of LKR 20,000 has been approved.",
    status: "APPROVED",
    timestamp: "2024-01-20T09:00:00",
    read: false,
  },
  {
    id: 2,
    loanId: 6,
    message: "Your loan request of LKR 15,000 has been rejected.",
    status: "REJECTED",
    rejectReason: "Insufficient service period. Minimum 1 year required.",
    timestamp: "2024-01-19T15:30:00",
    read: false,
  },
];

// Mock approved loans for account executive deduction view (equal monthly deductions)
export const mockApprovedDeductions: LoanDeduction[] = [
  {
    loanId: 10,
    employeeName: "Sunil Fernando",
    totalAmount: 30000,
    repaymentMonths: 6,
    monthlyDeduction: 5000,
    remainingMonths: 4,
    paidMonths: 2,
    remainingAmount: 20000,
    schedule: [
      { month: "Nov 2023", amount: 5000, status: "PAID" },
      { month: "Dec 2023", amount: 5000, status: "PAID" },
      { month: "Jan 2024", amount: 5000, status: "PENDING" },
      { month: "Feb 2024", amount: 5000, status: "UPCOMING" },
      { month: "Mar 2024", amount: 5000, status: "UPCOMING" },
      { month: "Apr 2024", amount: 5000, status: "UPCOMING" },
    ],
  },
  {
    loanId: 11,
    employeeName: "Ranjith Silva",
    totalAmount: 27000,
    repaymentMonths: 3,
    monthlyDeduction: 9000,
    remainingMonths: 3,
    paidMonths: 0,
    remainingAmount: 27000,
    schedule: [
      { month: "Jan 2024", amount: 9000, status: "PENDING" },
      { month: "Feb 2024", amount: 9000, status: "UPCOMING" },
      { month: "Mar 2024", amount: 9000, status: "UPCOMING" },
    ],
  },
];
