export type AdvanceStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface AdvanceRequest {
  id: number;
  employeeId: number;
  employeeName: string;
  amount: number;
  forMonth: string;
  reason: string;
  status: AdvanceStatus;
  submittedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  rejectReason?: string;
}

export interface AdvanceNotification {
  id: number;
  advanceId: number;
  message: string;
  status: AdvanceStatus;
  rejectReason?: string;
  timestamp: string;
  read: boolean;
}

export interface ApprovedAdvance {
  advanceId: number;
  employeeName: string;
  amount: number;
  forMonth: string;
  approvedAt: string;
  deducted: boolean;
}
