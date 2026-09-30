export const ADMISSION_DOCUMENTS = [
  "2 Passport-size Photographs",
  "Aadhaar Card Copy",
  "PAN Card Copy",
  "10th Marksheet",
  "12th / Diploma Marksheet",
  "Graduation Marksheet / Degree",
  "Address Proof",
  "College ID Copy",
  "Experience Letter (if working)",
] as const;

export const ADMISSION_QUALIFICATION_ROWS = [
  "10th / Matric",
  "12th / Diploma",
  "Graduation",
  "Post Graduation",
  "Other Certification",
] as const;

export const ADMISSION_PRESENT_STATUS = [
  "School / College Student",
  "Fresher / Graduate",
  "Working Professional",
  "Freelancer",
  "Business Owner",
  "Other",
] as const;

export const ADMISSION_CAREER_OBJECTIVES = [
  "Job Placement",
  "Freelancing / Client Work",
  "Promotion / Role Change",
  "Own Business",
  "Skill Upgrade Only",
] as const;

export const ADMISSION_BATCH_TIMINGS = [
  "10:00 AM – 11:30 AM",
  "12:00 PM – 1:30 PM",
  "2:00 PM – 3:30 PM",
  "4:00 PM – 5:40 PM",
  "6:00 PM – 7:00 PM",
] as const;

export type AdmissionBatchTiming = (typeof ADMISSION_BATCH_TIMINGS)[number];

function batchTimingKey(value: string) {
  return value
    .toLowerCase()
    .replace(/[–—−]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

const BATCH_TIMING_ALIASES: Record<string, AdmissionBatchTiming> = {
  morning: "10:00 AM – 11:30 AM",
  afternoon: "2:00 PM – 3:30 PM",
  evening: "6:00 PM – 7:00 PM",
  weekend: "10:00 AM – 11:30 AM",
  "10:00 - 11:30": "10:00 AM – 11:30 AM",
  "10:00 am - 11:30 am": "10:00 AM – 11:30 AM",
  "12:00 - 1:30": "12:00 PM – 1:30 PM",
  "12:00 pm - 1:30 pm": "12:00 PM – 1:30 PM",
  "2:00 - 3:30": "2:00 PM – 3:30 PM",
  "2:00 pm - 3:30 pm": "2:00 PM – 3:30 PM",
  "4:00 - 5:30": "4:00 PM – 5:40 PM",
  "4:00 - 5:40": "4:00 PM – 5:40 PM",
  "4:00 pm - 5:30 pm": "4:00 PM – 5:40 PM",
  "4:00 pm - 5:40 pm": "4:00 PM – 5:40 PM",
  "5:40 - 7:10": "6:00 PM – 7:00 PM",
  "5:40 pm - 7:10 pm": "6:00 PM – 7:00 PM",
  "6:00 - 7:30": "6:00 PM – 7:00 PM",
  "6:00 - 7:00": "6:00 PM – 7:00 PM",
  "6:00 pm - 7:30 pm": "6:00 PM – 7:00 PM",
  "6:00 pm - 7:00 pm": "6:00 PM – 7:00 PM",
  "mon-fri 10:00-12:00": "10:00 AM – 11:30 AM",
  "mon-fri 12:00-14:00": "12:00 PM – 1:30 PM",
  "mon-fri 16:00-18:00": "4:00 PM – 5:40 PM",
  "mon-fri 18:00-20:00": "6:00 PM – 7:00 PM",
  "sat-sun 10:00-13:00": "10:00 AM – 11:30 AM",
  "sat-sun 14:00-17:00": "2:00 PM – 3:30 PM",
};

/** Canonical single batch schedule, or empty if unknown. */
export function normalizeBatchTiming(raw: unknown): string {
  if (Array.isArray(raw)) {
    for (const item of raw) {
      const next = normalizeBatchTiming(item);
      if (next) return next;
    }
    return "";
  }
  const text = String(raw ?? "").trim();
  if (!text) return "";
  const exact = ADMISSION_BATCH_TIMINGS.find((slot) => slot === text);
  if (exact) return exact;
  const key = batchTimingKey(text);
  return (
    BATCH_TIMING_ALIASES[key] ??
    ADMISSION_BATCH_TIMINGS.find((slot) => batchTimingKey(slot) === key) ??
    ""
  );
}

export function normalizeBatchTimings(raw: unknown): string[] {
  const slot = normalizeBatchTiming(raw);
  return slot ? [slot] : [];
}

export function isAdmissionBatchTiming(value: unknown): boolean {
  return Boolean(normalizeBatchTiming(value));
}

export const ADMISSION_HEAR_ABOUT = [
  "Instagram / Facebook",
  "YouTube",
  "Google / Website",
  "Friend / Relative",
  "College Seminar",
  "Pamphlet",
  "Walk-in",
  "Student Referral",
] as const;

export const STUDENT_PHOTO_DOC = "Student Photo";
export const AADHAAR_DOC = "Aadhaar Card Copy";

export type AdmissionDocumentName =
  | typeof STUDENT_PHOTO_DOC
  | (typeof ADMISSION_DOCUMENTS)[number];

export interface AdmissionQualification {
  row: string;
  board: string;
  school: string;
  stream: string;
  year: string;
  score: string;
}

function qualificationHasDetails(item?: Partial<AdmissionQualification> | null) {
  if (!item) return false;
  return [item.board, item.school, item.stream, item.year, item.score].some(
    (value) => String(value ?? "").trim()
  );
}

export function normalizeHighestQualification(value: unknown) {
  const text = String(value ?? "").trim();
  if (!text) return "";
  const exact = ADMISSION_QUALIFICATION_ROWS.find((row) => row === text);
  if (exact) return exact;
  const key = text.toLowerCase();
  if (key.includes("post")) return "Post Graduation";
  if (key.includes("10") || key.includes("matric")) return "10th / Matric";
  if (key.includes("12") || key.includes("diploma")) return "12th / Diploma";
  if (key.includes("graduat") || key.includes("degree")) return "Graduation";
  return "Other Certification";
}

export function hydrateHighestQualificationFields(
  row: Partial<AdmissionProfile>
) {
  let highestQualification = normalizeHighestQualification(
    row.highestQualification
  );
  let schoolCollegeName = String(row.schoolCollegeName ?? "").trim();
  let stream = String(row.stream ?? "").trim();
  let yearOfPassing = String(row.yearOfPassing ?? "").trim();
  let percentageOrCGPA = String(row.percentageOrCGPA ?? "").trim();
  const list = Array.isArray(row.qualifications) ? row.qualifications : [];
  const needsLegacy =
    !schoolCollegeName && !stream && !yearOfPassing && !percentageOrCGPA;
  if (needsLegacy && list.length) {
    const match =
      (highestQualification
        ? list.find(
            (item) =>
              item.row === highestQualification && qualificationHasDetails(item)
          )
        : undefined) ||
      [...list].reverse().find((item) => qualificationHasDetails(item));
    if (match) {
      if (!highestQualification) {
        highestQualification = normalizeHighestQualification(match.row);
      }
      schoolCollegeName = String(match.school ?? "").trim();
      stream = String(match.stream ?? "").trim();
      yearOfPassing = String(match.year ?? "").trim();
      percentageOrCGPA = String(match.score ?? "").trim();
    }
  }
  return {
    highestQualification,
    schoolCollegeName,
    stream,
    yearOfPassing,
    percentageOrCGPA,
  };
}

export function singleQualificationRecord(profile: {
  highestQualification: string;
  schoolCollegeName: string;
  stream: string;
  yearOfPassing: string;
  percentageOrCGPA: string;
}): AdmissionQualification[] {
  if (
    !profile.highestQualification &&
    !profile.schoolCollegeName &&
    !profile.stream &&
    !profile.yearOfPassing &&
    !profile.percentageOrCGPA
  ) {
    return [];
  }
  return [
    {
      row: profile.highestQualification,
      board: "",
      school: profile.schoolCollegeName,
      stream: profile.stream,
      year: profile.yearOfPassing,
      score: profile.percentageOrCGPA,
    },
  ];
}

export function streamRequiredForQualification(highest: string) {
  const text = highest.toLowerCase();
  return !text.includes("10") && !text.includes("matric");
}

export function isValidPassingYear(value: string) {
  const year = Number(digits(value).slice(0, 4));
  const max = new Date().getFullYear() + 1;
  return year >= 1970 && year <= max;
}

export function isValidPercentageOrCgpa(value: string) {
  const raw = String(value ?? "")
    .trim()
    .replace(/%/g, "")
    .replace(/,/g, "");
  if (!raw) return false;
  const amount = Number(raw);
  if (!Number.isFinite(amount)) return false;
  if (amount <= 10) return amount >= 0;
  return amount >= 0 && amount <= 100;
}

export interface AdmissionProfile {
  programAppliedFor: string;
  courseId: string | null;
  counsellorName: string;
  counsellorId: string | null;
  counsellorRole: string | null;
  admittedByName: string;
  admittedByRole: string | null;
  photoUrl: string | null;
  fullName: string;
  dob: string;
  age: string;
  gender: string;
  bloodGroup: string;
  aadhaar: string;
  nationality: string;
  languages: string;
  mobile: string;
  whatsapp: string;
  alternate: string;
  email: string;
  permanentStreet: string;
  permanentCity: string;
  permanentDistrict: string;
  permanentState: string;
  permanentPin: string;
  pinLocation: string;
  sameAddress: string;
  correspondenceStreet: string;
  correspondenceCity: string;
  correspondenceState: string;
  correspondencePin: string;
  residingAs: string;
  fatherName: string;
  fatherMobile: string;
  motherName: string;
  motherMobile: string;
  guardianName: string;
  guardianRelation: string;
  guardianMobile: string;
  emergencyName: string;
  emergencyRelation: string;
  emergencyMobile: string;
  qualifications: AdmissionQualification[];
  highestQualification: string;
  schoolCollegeName: string;
  stream: string;
  yearOfPassing: string;
  percentageOrCGPA: string;
  currentlyStudying: string;
  currentCollege: string;
  presentStatus: string;
  companyName: string;
  designation: string;
  experienceYears: string;
  computer: string;
  english: string;
  laptop: string;
  careerObjectives: string[];
  batchTimings: string[];
  hearAbout: string[];
  applicantDeclaration: boolean;
  parentDeclaration: boolean;
  origin: "CRM" | "PUBLIC";
}

export interface AdmissionFilePayload {
  name: string;
  filename: string;
  mimeType: string;
  data: string;
}

export interface AdmissionSaveInput {
  profile: AdmissionProfile;
  counsellorId?: string | null;
  courseId?: string | null;
  photo?: AdmissionFilePayload | null;
  documents?: AdmissionFilePayload[];
}

export type AdmissionFieldError = Partial<Record<string, string>>;

function blank(value: unknown) {
  return String(value ?? "").trim() === "";
}

function digits(value: unknown) {
  return String(value ?? "").replace(/\D/g, "");
}

export function emptyAdmissionProfile(
  seed?: Partial<AdmissionProfile>
): AdmissionProfile {
  return {
    programAppliedFor: "",
    courseId: null,
    counsellorName: "",
    counsellorId: null,
    counsellorRole: null,
    admittedByName: "",
    admittedByRole: null,
    photoUrl: null,
    fullName: "",
    dob: "",
    age: "",
    gender: "",
    bloodGroup: "",
    aadhaar: "",
    nationality: "Indian",
    languages: "",
    mobile: "",
    whatsapp: "",
    alternate: "",
    email: "",
    permanentStreet: "",
    permanentCity: "",
    permanentDistrict: "",
    permanentState: "",
    permanentPin: "",
    pinLocation: "",
    sameAddress: "",
    correspondenceStreet: "",
    correspondenceCity: "",
    correspondenceState: "",
    correspondencePin: "",
    residingAs: "",
    fatherName: "",
    fatherMobile: "",
    motherName: "",
    motherMobile: "",
    guardianName: "",
    guardianRelation: "",
    guardianMobile: "",
    emergencyName: "",
    emergencyRelation: "",
    emergencyMobile: "",
    qualifications: [],
    highestQualification: "",
    schoolCollegeName: "",
    stream: "",
    yearOfPassing: "",
    percentageOrCGPA: "",
    currentlyStudying: "",
    currentCollege: "",
    presentStatus: "",
    companyName: "",
    designation: "",
    experienceYears: "",
    computer: "",
    english: "",
    laptop: "",
    careerObjectives: [],
    batchTimings: [],
    hearAbout: [],
    applicantDeclaration: false,
    parentDeclaration: false,
    origin: "CRM",
    ...seed,
  };
}

export function parseAdmissionProfile(value: unknown): AdmissionProfile | null {
  if (!value) return null;
  let raw = value;
  if (typeof raw === "string") {
    try {
      raw = JSON.parse(raw);
    } catch {
      return null;
    }
  }
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Partial<AdmissionProfile>;
  const highest = hydrateHighestQualificationFields(row);
  return emptyAdmissionProfile({
    ...row,
    ...highest,
    careerObjectives: Array.isArray(row.careerObjectives)
      ? row.careerObjectives.map(String)
      : [],
    batchTimings: normalizeBatchTimings(
      Array.isArray(row.batchTimings) ? row.batchTimings : row.batchTimings
    ),
    hearAbout: Array.isArray(row.hearAbout) ? row.hearAbout.map(String) : [],
    qualifications: singleQualificationRecord(highest),
    applicantDeclaration: Boolean(row.applicantDeclaration),
    parentDeclaration: Boolean(row.parentDeclaration),
    origin: row.origin === "PUBLIC" ? "PUBLIC" : "CRM",
  });
}

export function requiredMarksheetName(highest: string) {
  const text = highest.toLowerCase();
  if (text.includes("10")) return "10th Marksheet";
  if (text.includes("12") || text.includes("diploma")) {
    return "12th / Diploma Marksheet";
  }
  if (text.includes("post") || text.includes("graduation") || text.includes("degree")) {
    return "Graduation Marksheet / Degree";
  }
  return null;
}

export function hasRequiredMarksheet(
  highest: string,
  uploaded: Iterable<string>
) {
  const names = new Set(
    [...uploaded].map((item) => item.trim()).filter(Boolean)
  );
  const specific = requiredMarksheetName(highest);
  if (specific) return names.has(specific);
  return (
    names.has("10th Marksheet") ||
    names.has("12th / Diploma Marksheet") ||
    names.has("Graduation Marksheet / Degree")
  );
}

export function sanitizeAdmissionProfile(
  input: Partial<AdmissionProfile> | null | undefined
): AdmissionProfile {
  const profile = emptyAdmissionProfile(input ?? undefined);
  const trimKeys: (keyof AdmissionProfile)[] = [
    "programAppliedFor",
    "counsellorName",
    "admittedByName",
    "fullName",
    "dob",
    "age",
    "gender",
    "bloodGroup",
    "aadhaar",
    "nationality",
    "languages",
    "mobile",
    "whatsapp",
    "alternate",
    "email",
    "permanentStreet",
    "permanentCity",
    "permanentDistrict",
    "permanentState",
    "permanentPin",
    "pinLocation",
    "sameAddress",
    "correspondenceStreet",
    "correspondenceCity",
    "correspondenceState",
    "correspondencePin",
    "residingAs",
    "fatherName",
    "fatherMobile",
    "motherName",
    "motherMobile",
    "guardianName",
    "guardianRelation",
    "guardianMobile",
    "emergencyName",
    "emergencyRelation",
    "emergencyMobile",
    "highestQualification",
    "schoolCollegeName",
    "stream",
    "yearOfPassing",
    "percentageOrCGPA",
    "currentlyStudying",
    "currentCollege",
    "presentStatus",
    "companyName",
    "designation",
    "experienceYears",
    "computer",
    "english",
    "laptop",
  ];
  for (const key of trimKeys) {
    const value = profile[key];
    if (typeof value === "string") {
      (profile[key] as string) = value.trim();
    }
  }
  profile.email = profile.email.toLowerCase();
  profile.aadhaar = digits(profile.aadhaar).slice(0, 12);
  profile.permanentPin = digits(profile.permanentPin).slice(0, 6);
  profile.correspondencePin = digits(profile.correspondencePin).slice(0, 6);
  if (profile.sameAddress === "Yes") {
    profile.correspondenceStreet = profile.permanentStreet;
    profile.correspondenceCity = profile.permanentCity;
    profile.correspondenceState = profile.permanentState;
    profile.correspondencePin = profile.permanentPin;
  }
  profile.batchTimings = normalizeBatchTimings(profile.batchTimings);
  const highest = hydrateHighestQualificationFields(profile);
  profile.highestQualification = highest.highestQualification;
  profile.schoolCollegeName = highest.schoolCollegeName;
  profile.stream = highest.stream;
  profile.yearOfPassing = digits(highest.yearOfPassing).slice(0, 4);
  profile.percentageOrCGPA = highest.percentageOrCGPA;
  profile.qualifications = singleQualificationRecord(profile);
  delete (profile as unknown as Record<string, unknown>).fatherOccupation;
  delete (profile as unknown as Record<string, unknown>).motherOccupation;
  return profile;
}

export function admissionProfileErrors(
  profile: AdmissionProfile,
  options?: {
    requireCatalogCourse?: boolean;
    uploadedDocuments?: Iterable<string>;
    hasPhoto?: boolean;
  }
): AdmissionFieldError {
  const errors: AdmissionFieldError = {};

  if (options?.requireCatalogCourse !== false && blank(profile.courseId)) {
    errors.programAppliedFor = "Select a course from the catalog.";
  } else if (blank(profile.programAppliedFor) && blank(profile.courseId)) {
    errors.programAppliedFor = "Select the program applied for.";
  }
  if (blank(profile.fullName)) errors.fullName = "Full name is required.";
  if (blank(profile.dob)) errors.dob = "Date of birth is required.";
  if (blank(profile.gender)) errors.gender = "Select gender.";
  if (digits(profile.aadhaar).length !== 12) {
    errors.aadhaar = "Enter a 12-digit Aadhaar number.";
  }
  if (blank(profile.mobile)) errors.mobile = "Mobile number is required.";
  if (blank(profile.whatsapp)) errors.whatsapp = "WhatsApp number is required.";
  if (blank(profile.email) || !profile.email.includes("@")) {
    errors.email = "Enter a valid email.";
  }
  if (blank(profile.permanentStreet)) {
    errors.permanentStreet = "Permanent address is required.";
  }
  if (blank(profile.permanentCity)) errors.permanentCity = "City is required.";
  if (blank(profile.permanentDistrict)) {
    errors.permanentDistrict = "District is required.";
  }
  if (blank(profile.permanentState)) errors.permanentState = "State is required.";
  if (digits(profile.permanentPin).length !== 6) {
    errors.permanentPin = "Enter a 6-digit PIN code.";
  }
  if (profile.sameAddress === "No") {
    if (blank(profile.correspondenceStreet)) {
      errors.correspondenceStreet = "Correspondence address is required.";
    }
    if (blank(profile.correspondenceCity)) {
      errors.correspondenceCity = "City is required.";
    }
    if (blank(profile.correspondenceState)) {
      errors.correspondenceState = "State is required.";
    }
    if (digits(profile.correspondencePin).length !== 6) {
      errors.correspondencePin = "Enter a 6-digit PIN code.";
    }
  }
  if (blank(profile.fatherName)) errors.fatherName = "Father’s name is required.";
  if (blank(profile.fatherMobile)) {
    errors.fatherMobile = "Father’s mobile is required.";
  }
  if (blank(profile.motherName)) errors.motherName = "Mother’s name is required.";
  if (blank(profile.motherMobile)) {
    errors.motherMobile = "Mother’s mobile is required.";
  }
  if (
    !ADMISSION_QUALIFICATION_ROWS.includes(
      profile.highestQualification as (typeof ADMISSION_QUALIFICATION_ROWS)[number]
    )
  ) {
    errors.highestQualification = "Select the highest qualification.";
  }
  if (blank(profile.schoolCollegeName)) {
    errors.schoolCollegeName = "School / college name is required.";
  }
  if (
    streamRequiredForQualification(profile.highestQualification) &&
    blank(profile.stream)
  ) {
    errors.stream = "Stream / specialization is required.";
  }
  if (!isValidPassingYear(profile.yearOfPassing)) {
    errors.yearOfPassing = "Enter a valid year of passing.";
  }
  if (!isValidPercentageOrCgpa(profile.percentageOrCGPA)) {
    errors.percentageOrCGPA = "Enter a valid percentage or CGPA.";
  }
  if (blank(profile.presentStatus)) {
    errors.presentStatus = "Select present status.";
  }
  if (!profile.careerObjectives.length) {
    errors.careerObjectives = "Select up to two career objectives.";
  }
  if (!isAdmissionBatchTiming(profile.batchTimings[0])) {
    errors.batchTimings = "Select one batch schedule.";
  }
  if (!profile.applicantDeclaration) {
    errors.applicantDeclaration = "Applicant declaration is required.";
  }
  if (!profile.parentDeclaration) {
    errors.parentDeclaration = "Parent / guardian declaration is required.";
  }
  return errors;
}

export function firstAdmissionErrorMessage(errors: AdmissionFieldError) {
  const values = Object.values(errors).filter(Boolean);
  return values[0] || null;
}

export function ageFromDob(value: string) {
  if (!value) return "";
  const dob = new Date(value);
  if (Number.isNaN(dob.getTime())) return "";
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const month = now.getMonth() - dob.getMonth();
  if (month < 0 || (month === 0 && now.getDate() < dob.getDate())) age -= 1;
  return age > 0 && age < 120 ? String(age) : "";
}

export function leadSourceFromHearAbout(hearAbout: string[]) {
  const joined = hearAbout.join(" ").toLowerCase();
  if (joined.includes("instagram") || joined.includes("facebook")) return "INSTAGRAM";
  if (joined.includes("youtube")) return "WEBSITE";
  if (joined.includes("google") || joined.includes("website")) return "WEBSITE";
  if (joined.includes("college")) return "COLLEGE";
  if (joined.includes("walk")) return "WALK_IN";
  if (joined.includes("referral") || joined.includes("friend")) return "REFERRAL";
  return "WEBSITE";
}
