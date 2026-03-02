import { AdvanceRequest, AdvanceNotification, ApprovedAdvance } from "@/data/advanceData";

let nextAdvanceId = 200;
let nextNotifId = 200;

const listeners: Set<() => void> = new Set();
function notify() { listeners.forEach((fn) => fn()); }

export function subscribeAdvanceStore(fn: () => void) {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}

// === ADVANCE REQUESTS ===
let advanceRequests: AdvanceRequest[] = [];

export function getAdvanceRequests(): AdvanceRequest[] {
  return [...advanceRequests];
}

export function submitAdvanceRequest(data: {
  employeeName: string;
  employeeId: number;
  amount: number;
  forMonth: string;
  reason: string;
}): AdvanceRequest {
  const advance: AdvanceRequest = {
    id: nextAdvanceId++,
    employeeId: data.employeeId,
    employeeName: data.employeeName,
    amount: data.amount,
    forMonth: data.forMonth,
    reason: data.reason,
    status: "PENDING",
    submittedAt: new Date().toISOString(),
  };
  advanceRequests = [...advanceRequests, advance];
  notify();
  return advance;
}

export function approveAdvance(advanceId: number, approvedBy: string) {
  advanceRequests = advanceRequests.map((a) =>
    a.id === advanceId
      ? { ...a, status: "APPROVED" as const, approvedBy, approvedAt: new Date().toISOString() }
      : a
  );

  const advance = advanceRequests.find((a) => a.id === advanceId);
  if (advance) {
    const approved: ApprovedAdvance = {
      advanceId: advance.id,
      employeeName: advance.employeeName,
      amount: advance.amount,
      forMonth: advance.forMonth,
      approvedAt: new Date().toISOString(),
      deducted: false,
    };
    approvedAdvances = [...approvedAdvances, approved];

    addAdvanceNotification({
      advanceId: advance.id,
      message: `Your advance request of LKR ${advance.amount.toLocaleString()} for ${advance.forMonth} has been approved by ${approvedBy}.`,
      status: "APPROVED",
    });
  }
  notify();
}

export function rejectAdvance(advanceId: number, rejectedBy: string, reason: string) {
  advanceRequests = advanceRequests.map((a) =>
    a.id === advanceId
      ? { ...a, status: "REJECTED" as const, approvedBy: rejectedBy, approvedAt: new Date().toISOString(), rejectReason: reason }
      : a
  );

  const advance = advanceRequests.find((a) => a.id === advanceId);
  if (advance) {
    addAdvanceNotification({
      advanceId: advance.id,
      message: `Your advance request of LKR ${advance.amount.toLocaleString()} for ${advance.forMonth} has been rejected. Reason: ${reason}`,
      status: "REJECTED",
      rejectReason: reason,
    });
  }
  notify();
}

// === APPROVED ADVANCES (Account Executive) ===
let approvedAdvances: ApprovedAdvance[] = [];

export function getApprovedAdvances(): ApprovedAdvance[] {
  return [...approvedAdvances];
}

export function markAdvanceDeducted(advanceId: number) {
  approvedAdvances = approvedAdvances.map((a) =>
    a.advanceId === advanceId ? { ...a, deducted: true } : a
  );

  const advance = approvedAdvances.find((a) => a.advanceId === advanceId);
  if (advance) {
    addAdvanceNotification({
      advanceId,
      message: `LKR ${advance.amount.toLocaleString()} advance for ${advance.forMonth} has been deducted from your salary.`,
      status: "APPROVED",
    });
  }
  notify();
}

// === SECURITY OFFICER NOTIFICATIONS ===
let advanceNotifications: AdvanceNotification[] = [];

function addAdvanceNotification(data: {
  advanceId: number;
  message: string;
  status: AdvanceRequest["status"];
  rejectReason?: string;
}) {
  const notification: AdvanceNotification = {
    id: nextNotifId++,
    advanceId: data.advanceId,
    message: data.message,
    status: data.status,
    rejectReason: data.rejectReason,
    timestamp: new Date().toISOString(),
    read: false,
  };
  advanceNotifications = [notification, ...advanceNotifications];
  notify();
}

export function getAdvanceNotifications(): AdvanceNotification[] {
  return [...advanceNotifications];
}

export function markAdvanceNotificationRead(notifId: number) {
  advanceNotifications = advanceNotifications.map((n) =>
    n.id === notifId ? { ...n, read: true } : n
  );
  notify();
}

export function markAllAdvanceNotificationsRead() {
  advanceNotifications = advanceNotifications.map((n) => ({ ...n, read: true }));
  notify();
}
