/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ComplianceTask {
  id: string;
  title: string;
  category: "Tax" | "HR" | "License" | "Corporate";
  deadline: string;
  status: "pending" | "completed" | "delayed";
  severity: "high" | "medium" | "low";
  assignedTo: string;
  description: string;
}

export interface EmployeeRecord {
  id: string;
  name: string;
  emiratesId: string;
  visaExpiry: string;
  workPermitStatus: "Active" | "Pending Action" | "Grace Period";
  wpsStatus: "Paid" | "Discrepancy" | "Missing";
  salary: number;
  department: string;
}

export interface ComplianceNotice {
  id: string;
  sender: "Federal Tax Authority" | "Dubai DET" | "MoHRE" | "DHA Insurance";
  subject: string;
  date: string;
  status: "unread" | "read" | "resolved";
  body: string;
  actionRequired: string;
  requiresDocument: boolean;
  documentUploaded?: string;
  aiSuggestedDraft?: string;
}

export interface DocumentRecord {
  id: string;
  name: string;
  type: "License" | "Tax" | "HR" | "Ejari" | "UBO";
  uploadedAt: string;
  status: "compliant" | "action_required" | "scanning" | "expired";
  expiryDate?: string;
  auditIssues?: Array<{ severity: string; message: string; remedy: string }>;
  extractedFields?: Record<string, string>;
  daysRemaining?: number;
}
