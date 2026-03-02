import { LoanRequest, LoanDeduction, LoanNotification, DeductionMonth } from "@/data/loanData";

// Simple in-memory store shared across components (simulates backend)
let nextLoanId = 100;
let nextNotificationId = 100;

const listeners: Set<() => void> = new Set();

function notify() {
  listeners.forEach((fn) => fn());
}

export function subscribeLoanStore(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// === LOAN REQUESTS (Security Officer submits, Executive Officer reviews) ===
let loanRequests: LoanRequest[] = [];

export function getLoanRequests(): LoanRequest[] {
  return [...loanRequests];
}

export function submitLoanRequest(data: {
  employeeName: string;
  employeeId: number;
  amount: number;
  repaymentMonths: number;
  reason: string;
}): LoanRequest {
  const loan: LoanRequest = {
    id: nextLoanId++,
    employeeId: data.employeeId,
    employeeName: data.employeeName,
    amount: data.amount,
    repaymentMonths: data.repaymentMonths,
    reason: data.reason,
    status: "PENDING",
    submittedAt: new Date().toISOString(),
  };
  loanRequests = [...loanRequests, loan];
  notify();
  return loan;
}

export function approveLoan(loanId: number, approvedBy: string) {
  loanRequests = loanRequests.map((l) =>
    l.id === loanId
      ? { ...l, status: "APPROVED" as const, approvedBy, approvedAt: new Date().toISOString() }
      : l
  );

  const loan = loanRequests.find((l) => l.id === loanId);
  if (loan) {
    // Create deduction entry
    const monthlyDeduction = Math.floor(loan.amount / loan.repaymentMonths);
    const lastMonthAmount = loan.amount - monthlyDeduction * (loan.repaymentMonths - 1);
    const schedule: DeductionMonth[] = [];
    for (let i = 0; i < loan.repaymentMonths; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() + i);
      schedule.push({
        month: date.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        amount: i === loan.repaymentMonths - 1 ? lastMonthAmount : monthlyDeduction,
        status: i === 0 ? "PENDING" : "UPCOMING",
      });
    }
    const deduction: LoanDeduction = {
      loanId: loan.id,
      employeeName: loan.employeeName,
      totalAmount: loan.amount,
      repaymentMonths: loan.repaymentMonths,
      monthlyDeduction,
      remainingMonths: loan.repaymentMonths,
      paidMonths: 0,
      remainingAmount: loan.amount,
      schedule,
    };
    approvedDeductions = [...approvedDeductions, deduction];

    // Notify security officer
    addSecurityNotification({
      loanId: loan.id,
      message: `Your loan request of LKR ${loan.amount.toLocaleString()} has been approved by ${approvedBy}.`,
      status: "APPROVED",
    });
  }
  notify();
}

export function rejectLoan(loanId: number, rejectedBy: string, reason: string) {
  loanRequests = loanRequests.map((l) =>
    l.id === loanId
      ? { ...l, status: "REJECTED" as const, approvedBy: rejectedBy, approvedAt: new Date().toISOString(), rejectReason: reason }
      : l
  );

  const loan = loanRequests.find((l) => l.id === loanId);
  if (loan) {
    addSecurityNotification({
      loanId: loan.id,
      message: `Your loan request of LKR ${loan.amount.toLocaleString()} has been rejected. Reason: ${reason}`,
      status: "REJECTED",
      rejectReason: reason,
    });
  }
  notify();
}

// === APPROVED DEDUCTIONS (Account Executive manages) ===
let approvedDeductions: LoanDeduction[] = [];

export function getApprovedDeductions(): LoanDeduction[] {
  return [...approvedDeductions];
}

export function deductMonth(loanId: number) {
  approvedDeductions = approvedDeductions.map((d) => {
    if (d.loanId !== loanId) return d;
    const pendingIndex = d.schedule.findIndex((s) => s.status === "PENDING");
    if (pendingIndex === -1) return d;

    const deductionAmount = d.schedule[pendingIndex].amount;
    const newSchedule = d.schedule.map((s, i) => {
      if (i === pendingIndex) return { ...s, status: "PAID" as const };
      if (i === pendingIndex + 1 && s.status === "UPCOMING") return { ...s, status: "PENDING" as const };
      return s;
    });

    // Notify security officer about deduction
    addSecurityNotification({
      loanId,
      message: `LKR ${deductionAmount.toLocaleString()} has been deducted from your salary for Loan #${loanId}. Remaining: LKR ${(d.remainingAmount - deductionAmount).toLocaleString()}`,
      status: "APPROVED",
    });

    return {
      ...d,
      remainingAmount: d.remainingAmount - deductionAmount,
      remainingMonths: d.remainingMonths - 1,
      paidMonths: d.paidMonths + 1,
      schedule: newSchedule,
    };
  });
  notify();
}

export function decreaseRepaymentMonth(loanId: number) {
  approvedDeductions = approvedDeductions.map((d) => {
    if (d.loanId !== loanId) return d;
    const pendingAndUpcoming = d.schedule.filter((s) => s.status !== "PAID");
    if (pendingAndUpcoming.length <= 1) return d;

    const newRemainingMonths = d.remainingMonths - 1;
    if (newRemainingMonths < 1) return d;

    const equalAmount = Math.floor(d.remainingAmount / newRemainingMonths);
    const lastMonthAmount = d.remainingAmount - equalAmount * (newRemainingMonths - 1);
    const paidSchedule = d.schedule.filter((s) => s.status === "PAID");
    const newPendingSchedule: DeductionMonth[] = [];
    for (let i = 0; i < newRemainingMonths; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() + i);
      newPendingSchedule.push({
        month: date.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        amount: i === newRemainingMonths - 1 ? lastMonthAmount : equalAmount,
        status: i === 0 ? "PENDING" : "UPCOMING",
      });
    }
    return {
      ...d,
      remainingMonths: newRemainingMonths,
      monthlyDeduction: equalAmount,
      schedule: [...paidSchedule, ...newPendingSchedule],
    };
  });
  notify();
}

// === SECURITY OFFICER NOTIFICATIONS ===
let securityNotifications: LoanNotification[] = [];

function addSecurityNotification(data: {
  loanId: number;
  message: string;
  status: LoanRequest["status"];
  rejectReason?: string;
}) {
  const notification: LoanNotification = {
    id: nextNotificationId++,
    loanId: data.loanId,
    message: data.message,
    status: data.status,
    rejectReason: data.rejectReason,
    timestamp: new Date().toISOString(),
    read: false,
  };
  securityNotifications = [notification, ...securityNotifications];
  notify();
}

export function getSecurityNotifications(): LoanNotification[] {
  return [...securityNotifications];
}

export function markNotificationRead(notifId: number) {
  securityNotifications = securityNotifications.map((n) =>
    n.id === notifId ? { ...n, read: true } : n
  );
  notify();
}

export function markAllNotificationsRead() {
  securityNotifications = securityNotifications.map((n) => ({ ...n, read: true }));
  notify();
}
