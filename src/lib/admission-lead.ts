export type PublicAdmissionSummary = {
  leadId: string;
  leadCode: string | null;
  studentName: string;
  status: string;
  statusLabel: string;
  createdAt: string | null;
  counsellorName: string;
  courseTitle: string | null;
};

export type PublicLeadPrefill = {
  leadId: string;
  leadCode: string | null;
  fullName: string;
  mobile: string;
  whatsapp: string;
  alternate: string;
  email: string;
  permanentCity: string;
  programAppliedFor: string;
  courseId: string | null;
  counsellorId: string | null;
  counsellorName: string;
  dob: string;
  gender: string;
  aadhaar: string;
  permanentStreet: string;
  permanentDistrict: string;
  permanentState: string;
  permanentPin: string;
};

export type PublicLeadPreview =
  | { status: "not_found" }
  | { status: "already_created"; admission: PublicAdmissionSummary }
  | { status: "ready"; leadId: string; leadCode: string | null; prefill: PublicLeadPrefill };

export function formatAdmissionDate(value: string | null | undefined) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });
}
