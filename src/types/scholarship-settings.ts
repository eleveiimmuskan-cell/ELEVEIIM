/** Raw values saved from the admin panel (API payload shape). */
export interface ScholarshipAdminSettings {
  /** ISO date `YYYY-MM-DD` — last day to apply (end of day IST). */
  lastDateToApply: string;
  seatsMessage: string;
  closedMessage: string;
  isActive: boolean;
}

/** Resolved settings used by the public site. */
export interface ScholarshipSettings extends ScholarshipAdminSettings {
  headline: string;
  deadlineMs: number;
}
