"use client";

import { useMemo, useRef, useState } from "react";
import { BrandImage } from "@/components/common/brand-image";
import {
  ADMISSION_BRANCH,
  ADMISSION_COUNSELLOR,
  ADMISSION_SESSION,
  CAREER_OBJECTIVES,
  COURSE_GROUPS,
  DOCUMENTS,
  HEAR_ABOUT,
  PIN_LOCATION_OPTIONS,
  PRESENT_STATUS,
  TERMS,
} from "@/data/admission-application";
import { cn } from "@/lib/utils";
import {
  BoxInput,
  BoxSelect,
  Choice,
  DocumentTick,
  Field,
  SectionBar,
} from "@/components/admission-application/form-ui";
import {
  ADMISSION_BATCH_TIMINGS,
  ADMISSION_QUALIFICATION_ROWS,
  admissionProfileErrors,
  emptyAdmissionProfile,
  firstAdmissionErrorMessage,
  sanitizeAdmissionProfile,
  streamRequiredForQualification,
  STUDENT_PHOTO_DOC,
  type AdmissionFilePayload,
} from "@/lib/admission-profile";
import { submitAdmissionApplication } from "@/services/admission-apply.service";

type LocalFile = {
  name: string;
  url: string;
  type: string;
  blob: File;
};

function ageFromDob(value: string) {
  if (!value) return "";
  const dob = new Date(value);
  if (Number.isNaN(dob.getTime())) return "";
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const month = now.getMonth() - dob.getMonth();
  if (month < 0 || (month === 0 && now.getDate() < dob.getDate())) age -= 1;
  return age > 0 && age < 120 ? String(age) : "";
}

function toggleValue(list: string[], value: string, limit?: number) {
  if (list.includes(value)) return list.filter((item) => item !== value);
  if (limit && list.length >= limit) return list;
  return [...list, value];
}

function fileToPayload(file: LocalFile, name: string): Promise<AdmissionFilePayload> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      resolve({
        name,
        filename: file.name,
        mimeType: file.type || file.blob.type || "application/octet-stream",
        data: String(reader.result || ""),
      });
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file.blob);
  });
}

function toLocalFile(file: File): LocalFile {
  return {
    name: file.name,
    url: URL.createObjectURL(file),
    type: file.type,
    blob: file,
  };
}

function revokeFile(file?: LocalFile | null) {
  if (file?.url) URL.revokeObjectURL(file.url);
}

function FileAction({
  children,
  onClick,
  tone = "default",
}: {
  children: string;
  onClick: () => void;
  tone?: "default" | "danger";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        tone === "danger"
          ? "h-7 rounded-sm border border-red-200 bg-red-50 px-2 text-[11px] font-semibold text-red-700 hover:bg-red-100"
          : "h-7 rounded-sm border border-slate-300 bg-white px-2 text-[11px] font-semibold text-slate-700 hover:bg-slate-50"
      }
    >
      {children}
    </button>
  );
}

export function AdmissionApplicationForm() {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<LocalFile | null>(null);
  const [docFiles, setDocFiles] = useState<Partial<Record<string, LocalFile>>>(
    {}
  );
  const [preview, setPreview] = useState<LocalFile | null>(null);
  const [dob, setDob] = useState("");
  const [sameAddress, setSameAddress] = useState<"Yes" | "No" | "">("");
  const [highestQualification, setHighestQualification] = useState("");
  const [presentStatus, setPresentStatus] = useState("");
  const [careerGoals, setCareerGoals] = useState<string[]>([]);
  const [hearAbout, setHearAbout] = useState<string[]>([]);
  const [timing, setTiming] = useState("");
  const [pinSearch, setPinSearch] = useState("");
  const [radios, setRadios] = useState<Record<string, string>>({});
  const [applicantDeclaration, setApplicantDeclaration] = useState(false);
  const [parentDeclaration, setParentDeclaration] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitOk, setSubmitOk] = useState<string | null>(null);
  const [formLoadedAt] = useState(() => Date.now());
  const pinReady = pinSearch.replace(/\D/g, "").length === 6;
  const age = useMemo(() => ageFromDob(dob), [dob]);
  const setRadio = (name: string, value: string) =>
    setRadios((prev) => ({ ...prev, [name]: value }));

  const replacePhoto = (file?: File) => {
    setPhoto((current) => {
      revokeFile(current);
      return file ? toLocalFile(file) : null;
    });
  };

  const replaceDocument = (item: string, file?: File) => {
    setDocFiles((current) => {
      revokeFile(current[item]);
      if (!file) {
        const next = { ...current };
        delete next[item];
        return next;
      }
      return { ...current, [item]: toLocalFile(file) };
    });
  };

  const openPreview = (file: LocalFile) => {
    if (file.type.startsWith("image/") || file.type === "application/pdf") {
      setPreview(file);
      return;
    }
    window.open(file.url, "_blank", "noopener,noreferrer");
  };

  const onDocumentFile = (item: string, file?: File) => {
    if (!file) return;
    replaceDocument(item, file);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);
    const formEl = event.currentTarget;
    const data = new FormData(formEl);
    const get = (name: string) => String(data.get(name) ?? "").trim();
    const profile = sanitizeAdmissionProfile(
      emptyAdmissionProfile({
        programAppliedFor: get("programAppliedFor"),
        counsellorName: ADMISSION_COUNSELLOR,
        fullName: get("fullName"),
        dob,
        age,
        gender: radios.gender || "",
        bloodGroup: get("bloodGroup"),
        aadhaar: get("aadhaar"),
        nationality: get("nationality") || "Indian",
        languages: get("languages"),
        mobile: get("mobile"),
        whatsapp: get("whatsapp"),
        alternate: get("alternate"),
        email: get("email"),
        permanentStreet: get("permanentStreet"),
        permanentCity: get("permanentCity"),
        permanentDistrict: get("permanentDistrict"),
        permanentState: get("permanentState"),
        permanentPin: get("permanentPin"),
        pinLocation: get("pinLocation"),
        sameAddress,
        correspondenceStreet: get("correspondenceStreet"),
        correspondenceCity: get("correspondenceCity"),
        correspondenceState: get("correspondenceState"),
        correspondencePin: get("correspondencePin"),
        residingAs: radios.residingAs || "",
        fatherName: get("fatherName"),
        fatherMobile: get("fatherMobile"),
        motherName: get("motherName"),
        motherMobile: get("motherMobile"),
        guardianName: get("guardianName"),
        guardianRelation: get("guardianRelation"),
        guardianMobile: get("guardianMobile"),
        emergencyName: get("emergencyName"),
        emergencyRelation: get("emergencyRelation"),
        emergencyMobile: get("emergencyMobile"),
        highestQualification,
        schoolCollegeName: get("schoolCollegeName"),
        stream: get("stream"),
        yearOfPassing: get("yearOfPassing"),
        percentageOrCGPA: get("percentageOrCGPA"),
        currentlyStudying: get("currentlyStudying"),
        currentCollege: get("currentCollege"),
        presentStatus,
        companyName: get("companyName"),
        designation: get("designation"),
        experienceYears: get("experienceYears"),
        computer: radios.computer || "",
        english: radios.english || "",
        laptop: radios.laptop || "",
        careerObjectives: careerGoals,
        batchTimings: timing ? [timing] : [],
        hearAbout,
        applicantDeclaration,
        parentDeclaration,
        origin: "PUBLIC",
      })
    );
    const errors = admissionProfileErrors(profile, {
      requireCatalogCourse: false,
      uploadedDocuments: [
        ...(photo ? [STUDENT_PHOTO_DOC] : []),
        ...Object.keys(docFiles),
      ],
      hasPhoto: Boolean(photo),
    });
    const first = firstAdmissionErrorMessage(errors);
    if (first) {
      setSubmitError(first);
      return;
    }
    setSubmitting(true);
    try {
      const documents: AdmissionFilePayload[] = [];
      for (const [name, file] of Object.entries(docFiles)) {
        if (file) documents.push(await fileToPayload(file, name));
      }
      const result = await submitAdmissionApplication({
        profile,
        photo: photo ? await fileToPayload(photo, STUDENT_PHOTO_DOC) : null,
        documents,
        hp: get("website"),
        formLoadedAt,
      });
      setSubmitOk(result.message);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to submit application."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      className="mx-auto w-full max-w-[1100px] overflow-hidden rounded-sm border border-slate-300 bg-white shadow-sm"
      onSubmit={(event) => void onSubmit(event)}
      noValidate
    >
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />
      <header className="grid gap-4 border-b border-slate-300 px-4 py-5 sm:px-6 md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <BrandImage size="lg" href="/" />
        </div>
        <div className="text-left md:text-right">
          <p className="text-lg font-bold uppercase tracking-wide text-[#1e4ba8] sm:text-xl">
            Admission Application Form
          </p>
          <p className="mt-1 text-xs font-medium text-slate-600">
            {ADMISSION_SESSION}
          </p>
        </div>
      </header>

      <p className="border-b border-slate-200 bg-slate-50 px-4 py-2 text-[11px] leading-relaxed text-slate-600 sm:px-6 sm:text-xs">
        Instructions: Fill the form in CAPITAL LETTERS. Attach one passport-size
        photograph, a copy of Aadhaar and the last qualification marksheet.
        Fields marked * are mandatory. Incomplete forms will not be processed.
      </p>

      <div className="grid gap-4 px-4 py-5 sm:px-6 md:grid-cols-[minmax(0,1fr)_160px]">
        <div className="grid gap-3">
          <Field label="Program Applied For" htmlFor="program" required>
            <BoxSelect id="program" name="programAppliedFor" defaultValue="">
              <option value="">Select course</option>
              {COURSE_GROUPS.map((group) => (
                <optgroup key={group.title} label={group.title}>
                  {group.items.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name} ({item.duration})
                    </option>
                  ))}
                </optgroup>
              ))}
            </BoxSelect>
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Branch / Centre">
              <BoxInput value={ADMISSION_BRANCH} readOnly />
            </Field>
            <Field label="Counsellor Name" htmlFor="counsellor">
              <BoxInput
                id="counsellor"
                name="counsellorName"
                value={ADMISSION_COUNSELLOR}
                readOnly
                className="normal-case"
              />
            </Field>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="relative flex aspect-[35/45] min-h-[9.5rem] flex-col items-center justify-center overflow-hidden rounded-sm border border-dashed border-slate-400 bg-slate-50 p-2 text-center">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo.url}
                alt="Applicant photo preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <>
                <span className="text-[11px] font-bold uppercase tracking-wide text-slate-700">
                  Affix Photo
                </span>
                <span className="mt-1 text-[10px] leading-snug text-slate-500">
                  Passport size 35 × 45 mm
                  <br />
                  (paste, do not staple)
                </span>
              </>
            )}
          </div>
          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(event) => {
              replacePhoto(event.target.files?.[0]);
              event.target.value = "";
            }}
          />
          <div className="flex flex-wrap gap-1">
            <FileAction onClick={() => photoInputRef.current?.click()}>
              {photo ? "Replace" : "Upload"}
            </FileAction>
            {photo ? (
              <>
                <FileAction onClick={() => openPreview(photo)}>View</FileAction>
                <FileAction tone="danger" onClick={() => replacePhoto()}>
                  Delete
                </FileAction>
              </>
            ) : null}
          </div>
          {photo ? (
            <span className="max-w-full truncate text-[10px] text-slate-500">
              {photo.name}
            </span>
          ) : null}
        </div>
      </div>

      <SectionBar id="section-a" title="Section A — Student’s Personal Details" />
      <div className="grid gap-3 px-4 py-4 sm:px-6">
        <Field label="Full Name of Applicant (as per Aadhaar / Certificate)" htmlFor="fullName" required>
          <BoxInput id="fullName" name="fullName" className="uppercase" />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Date of Birth" htmlFor="dob" required>
            <BoxInput
              id="dob"
              type="date"
              value={dob}
              onChange={(event) => setDob(event.target.value)}
              className="normal-case"
            />
          </Field>
          <Field label="Age" htmlFor="age">
            <BoxInput id="age" value={age} readOnly className="normal-case" />
          </Field>
          <fieldset className="min-w-0">
            <legend className="mb-1 text-[11px] font-semibold text-slate-700 sm:text-xs">
              Gender <span className="text-red-600">*</span>
            </legend>
            <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
              {["Male", "Female", "Other"].map((item) => (
                <Choice
                  key={item}
                  type="radio"
                  name="gender"
                  value={item}
                  checked={radios.gender === item}
                  onChange={() => setRadio("gender", item)}
                >
                  {item}
                </Choice>
              ))}
            </div>
          </fieldset>
          <Field label="Blood Group" htmlFor="bloodGroup">
            <BoxInput id="bloodGroup" name="bloodGroup" className="uppercase" />
          </Field>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Aadhaar Number" htmlFor="aadhaar" required>
            <BoxInput id="aadhaar" name="aadhaar" inputMode="numeric" className="normal-case" />
          </Field>
          <Field label="Nationality">
            <BoxInput name="nationality" defaultValue="Indian" className="uppercase" />
          </Field>
          <Field label="Languages Known" htmlFor="languages">
            <BoxInput id="languages" name="languages" className="uppercase" />
          </Field>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Mobile Number" htmlFor="mobile" required>
            <BoxInput id="mobile" name="mobile" inputMode="tel" placeholder="+91" className="normal-case" />
          </Field>
          <Field label="WhatsApp Number" htmlFor="whatsapp" required>
            <BoxInput id="whatsapp" name="whatsapp" inputMode="tel" placeholder="+91" className="normal-case" />
          </Field>
          <Field label="Alternate Number" htmlFor="alternate">
            <BoxInput id="alternate" name="alternate" inputMode="tel" placeholder="+91" className="normal-case" />
          </Field>
        </div>
        <Field label="Email ID" htmlFor="email" required>
          <BoxInput id="email" name="email" type="email" className="normal-case lowercase" />
        </Field>
      </div>

      <SectionBar id="section-b" title="Section B — Address Details" />
      <div className="space-y-4 px-4 py-4 sm:px-6">
        <p className="text-[11px] font-bold uppercase tracking-wide text-[#c2410c]">
          Permanent Address
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="House / Flat No., Street, Locality" htmlFor="permStreet" required>
            <BoxInput id="permStreet" name="permanentStreet" className="uppercase" />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Pincode Search" htmlFor="pinSearch">
              <BoxInput
                id="pinSearch"
                name="pincodeSearch"
                inputMode="numeric"
                maxLength={6}
                value={pinSearch}
                onChange={(event) =>
                  setPinSearch(event.target.value.replace(/\D/g, "").slice(0, 6))
                }
                className="normal-case"
              />
            </Field>
            <Field label="Select Location" htmlFor="pinLocation">
              <BoxSelect id="pinLocation" name="pinLocation" disabled={!pinReady} defaultValue="">
                <option value="">{pinReady ? "Select location" : "Enter 6-digit PIN"}</option>
                {PIN_LOCATION_OPTIONS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </BoxSelect>
            </Field>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="City / Town / Village" htmlFor="permCity" required>
            <BoxInput id="permCity" name="permanentCity" className="uppercase" />
          </Field>
          <Field label="District" htmlFor="permDistrict" required>
            <BoxInput id="permDistrict" name="permanentDistrict" className="uppercase" />
          </Field>
          <Field label="State" htmlFor="permState" required>
            <BoxInput id="permState" name="permanentState" className="uppercase" />
          </Field>
          <Field label="PIN Code" htmlFor="permPin" required>
            <BoxInput id="permPin" name="permanentPin" inputMode="numeric" className="normal-case" />
          </Field>
        </div>

        <fieldset>
          <legend className="text-[11px] font-bold uppercase tracking-wide text-[#c2410c]">
            Present / Correspondence Address — Same as permanent address?
          </legend>
          <div className="mt-2 flex gap-5">
            {(["Yes", "No"] as const).map((item) => (
              <Choice
                key={item}
                type="radio"
                name="sameAddress"
                value={item}
                checked={sameAddress === item}
                onChange={() => setSameAddress(item)}
              >
                {item}
                {item === "No" ? " (if No, fill below)" : ""}
              </Choice>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-3">
          <Field label="House / Flat No., Street, Locality" htmlFor="corrStreet">
            <BoxInput
              id="corrStreet"
              name="correspondenceStreet"
              className="uppercase"
              disabled={sameAddress === "Yes"}
            />
          </Field>
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="City / Town" htmlFor="corrCity">
              <BoxInput
                id="corrCity"
                name="correspondenceCity"
                className="uppercase"
                disabled={sameAddress === "Yes"}
              />
            </Field>
            <Field label="State" htmlFor="corrState">
              <BoxInput
                id="corrState"
                name="correspondenceState"
                className="uppercase"
                disabled={sameAddress === "Yes"}
              />
            </Field>
            <Field label="PIN Code" htmlFor="corrPin">
              <BoxInput
                id="corrPin"
                name="correspondencePin"
                inputMode="numeric"
                className="normal-case"
                disabled={sameAddress === "Yes"}
              />
            </Field>
          </div>
        </div>

        <fieldset>
          <legend className="mb-2 text-[11px] font-semibold text-slate-700 sm:text-xs">
            Residing As
          </legend>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {["With Family", "Hostel / PG", "Rented"].map((item) => (
              <Choice
                key={item}
                type="radio"
                name="residingAs"
                value={item}
                checked={radios.residingAs === item}
                onChange={() => setRadio("residingAs", item)}
              >
                {item}
              </Choice>
            ))}
          </div>
        </fieldset>
      </div>

      <SectionBar id="section-c" title="Section C — Parents’ / Guardian’s Details" />
      <div className="space-y-4 px-4 py-4 sm:px-6">
        <p className="text-[11px] font-bold uppercase tracking-wide text-slate-800">
          Father’s Details
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Father’s Full Name" htmlFor="fatherName" required>
            <BoxInput id="fatherName" name="fatherName" className="uppercase" />
          </Field>
          <Field label="Mobile Number" htmlFor="fatherMobile" required>
            <BoxInput id="fatherMobile" name="fatherMobile" inputMode="tel" placeholder="+91" className="normal-case" />
          </Field>
        </div>
        <p className="text-[11px] font-bold uppercase tracking-wide text-[#c2410c]">
          Mother’s Details
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Mother’s Full Name" htmlFor="motherName" required>
            <BoxInput id="motherName" name="motherName" className="uppercase" />
          </Field>
          <Field label="Mobile Number" htmlFor="motherMobile" required>
            <BoxInput id="motherMobile" name="motherMobile" inputMode="tel" placeholder="+91" className="normal-case" />
          </Field>
        </div>
        <p className="text-[11px] font-bold uppercase tracking-wide text-[#c2410c]">
          Guardian (if applicable) &amp; Emergency Contact
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Guardian’s Name" htmlFor="guardianName">
            <BoxInput id="guardianName" name="guardianName" className="uppercase" />
          </Field>
          <Field label="Relation with Applicant" htmlFor="guardianRelation">
            <BoxInput id="guardianRelation" name="guardianRelation" className="uppercase" />
          </Field>
          <Field label="Guardian’s Mobile" htmlFor="guardianMobile">
            <BoxInput id="guardianMobile" name="guardianMobile" inputMode="tel" placeholder="+91" className="normal-case" />
          </Field>
          <Field label="Emergency Contact Person" htmlFor="emergencyName">
            <BoxInput id="emergencyName" name="emergencyName" className="uppercase" />
          </Field>
          <Field label="Relation" htmlFor="emergencyRelation">
            <BoxInput id="emergencyRelation" name="emergencyRelation" className="uppercase" />
          </Field>
          <Field label="Emergency Mobile" htmlFor="emergencyMobile">
            <BoxInput id="emergencyMobile" name="emergencyMobile" inputMode="tel" placeholder="+91" className="normal-case" />
          </Field>
        </div>
      </div>

      <SectionBar
        id="section-d"
        title="Section D — Highest Qualification Only"
        hint="Enter details for the highest qualification completed"
      />
      <div className="space-y-4 px-4 py-4 sm:px-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Highest Qualification" htmlFor="highestQual" required>
            <BoxSelect
              id="highestQual"
              name="highestQualification"
              value={highestQualification}
              onChange={(event) => setHighestQualification(event.target.value)}
            >
              <option value="">Select highest qualification</option>
              {ADMISSION_QUALIFICATION_ROWS.map((row) => (
                <option key={row} value={row}>
                  {row}
                </option>
              ))}
            </BoxSelect>
          </Field>
          <Field label="School / College Name" htmlFor="schoolCollegeName" required>
            <BoxInput id="schoolCollegeName" name="schoolCollegeName" className="uppercase" />
          </Field>
          <Field
            label="Stream / Specialization"
            htmlFor="qualStream"
            required={
              Boolean(highestQualification) &&
              streamRequiredForQualification(highestQualification)
            }
          >
            <BoxInput
              id="qualStream"
              name="stream"
              className="uppercase"
              placeholder={
                !highestQualification ||
                streamRequiredForQualification(highestQualification)
                  ? "e.g. Science, Commerce, Computer Science"
                  : "Optional for 10th / Matric"
              }
            />
          </Field>
          <Field label="Year of Passing" htmlFor="yearOfPassing" required>
            <BoxInput
              id="yearOfPassing"
              name="yearOfPassing"
              inputMode="numeric"
              maxLength={4}
              placeholder="YYYY"
              className="normal-case"
            />
          </Field>
          <Field label="Percentage / CGPA" htmlFor="percentageOrCGPA" required>
            <BoxInput
              id="percentageOrCGPA"
              name="percentageOrCGPA"
              inputMode="decimal"
              placeholder="e.g. 78.5 or 8.2"
              className="normal-case"
            />
          </Field>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Currently Studying In (Course & Year)" htmlFor="currentStudy">
            <BoxInput id="currentStudy" name="currentlyStudying" className="uppercase" />
          </Field>
          <Field label="Name of Current College / Institute" htmlFor="currentCollege">
            <BoxInput id="currentCollege" name="currentCollege" className="uppercase" />
          </Field>
        </div>
      </div>

      <SectionBar id="section-e" title="Section E — Present Status & Career Objective" />
      <div className="space-y-4 px-4 py-4 sm:px-6">
        <fieldset>
          <legend className="mb-2 text-[11px] font-semibold text-slate-700 sm:text-xs">
            Present Status <span className="text-red-600">*</span>
          </legend>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {PRESENT_STATUS.map((item) => (
              <Choice
                key={item}
                type="radio"
                name="presentStatus"
                value={item}
                checked={presentStatus === item}
                onChange={() => setPresentStatus(item)}
              >
                {item}
              </Choice>
            ))}
          </div>
        </fieldset>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="If Working — Company Name" htmlFor="company">
            <BoxInput id="company" name="companyName" className="uppercase" />
          </Field>
          <Field label="Designation" htmlFor="designation">
            <BoxInput id="designation" name="designation" className="uppercase" />
          </Field>
          <Field label="Experience (Yrs)" htmlFor="experience">
            <BoxInput id="experience" name="experienceYears" className="normal-case" />
          </Field>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <fieldset>
            <legend className="mb-2 text-[11px] font-semibold text-slate-700 sm:text-xs">
              Computer / Laptop Proficiency
            </legend>
            <div className="flex flex-wrap gap-4">
              {["Basic", "Intermediate", "Advanced"].map((item) => (
                <Choice
                  key={item}
                  type="radio"
                  name="computer"
                  value={item}
                  checked={radios.computer === item}
                  onChange={() => setRadio("computer", item)}
                >
                  {item}
                </Choice>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-2 text-[11px] font-semibold text-slate-700 sm:text-xs">
              English Communication Level
            </legend>
            <div className="flex flex-wrap gap-4">
              {["Basic", "Intermediate", "Fluent"].map((item) => (
                <Choice
                  key={item}
                  type="radio"
                  name="english"
                  value={item}
                  checked={radios.english === item}
                  onChange={() => setRadio("english", item)}
                >
                  {item}
                </Choice>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-2 text-[11px] font-semibold text-slate-700 sm:text-xs">
              Own Laptop Available
            </legend>
            <div className="flex gap-4">
              {["Yes", "No"].map((item) => (
                <Choice
                  key={item}
                  type="radio"
                  name="laptop"
                  value={item}
                  checked={radios.laptop === item}
                  onChange={() => setRadio("laptop", item)}
                >
                  {item}
                </Choice>
              ))}
            </div>
          </fieldset>
        </div>
        <fieldset>
          <legend className="mb-2 text-[11px] font-semibold text-slate-700 sm:text-xs">
            Primary Career Objective (tick up to two) <span className="text-red-600">*</span>
          </legend>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {CAREER_OBJECTIVES.map((item) => (
              <Choice
                key={item}
                type="checkbox"
                name="careerObjective"
                value={item}
                checked={careerGoals.includes(item)}
                onChange={() => setCareerGoals(toggleValue(careerGoals, item, 2))}
              >
                {item}
              </Choice>
            ))}
          </div>
        </fieldset>
      </div>

      <SectionBar id="section-f" title="Section F — Documents Submitted" />
      <div className="px-4 py-4 sm:px-6">
        <div className="grid gap-2 sm:grid-cols-2">
          {DOCUMENTS.map((item) => {
            const file = docFiles[item];
            const completed = Boolean(file);
            return (
              <div
                key={item}
                className={cn(
                  "flex flex-col gap-2 rounded-sm border px-3 py-2 sm:flex-row sm:items-center sm:justify-between",
                  completed
                    ? "border-[#1e4ba8]/40 bg-[#1e4ba8]/5"
                    : "border-slate-200 bg-white"
                )}
              >
                <div className="flex min-w-0 items-start gap-2">
                  <DocumentTick checked={completed} />
                  <input
                    type="checkbox"
                    name="documents"
                    value={item}
                    checked={completed}
                    onChange={() => undefined}
                    tabIndex={-1}
                    className="sr-only"
                  />
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-slate-800">{item}</p>
                    {file ? (
                      <p className="mt-0.5 truncate text-[10px] text-slate-500">{file.name}</p>
                    ) : (
                      <p className="mt-0.5 text-[10px] text-slate-400">Not uploaded</p>
                    )}
                  </div>
                </div>
                <div className="flex min-w-0 flex-wrap items-center gap-1">
                  {file?.type.startsWith("image/") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={file.url}
                      alt=""
                      className="size-8 rounded-sm border border-slate-200 object-cover"
                    />
                  ) : null}
                  {file ? (
                    <>
                      <FileAction onClick={() => openPreview(file)}>Preview</FileAction>
                      <label className="inline-flex">
                        <span className="h-7 cursor-pointer rounded-sm border border-slate-300 bg-white px-2 text-[11px] font-semibold leading-7 text-slate-700 hover:bg-slate-50">
                          Replace
                        </span>
                        <input
                          type="file"
                          accept="image/*,.pdf,application/pdf"
                          className="sr-only"
                          onChange={(event) => {
                            onDocumentFile(item, event.target.files?.[0]);
                            event.target.value = "";
                          }}
                        />
                      </label>
                      <FileAction tone="danger" onClick={() => replaceDocument(item)}>
                        Delete
                      </FileAction>
                    </>
                  ) : (
                    <label className="inline-flex">
                      <span className="h-7 cursor-pointer rounded-sm border border-slate-300 bg-white px-2 text-[11px] font-semibold leading-7 text-slate-700 hover:bg-slate-50">
                        Upload
                      </span>
                      <input
                        type="file"
                        accept="image/*,.pdf,application/pdf"
                        className="sr-only"
                        onChange={(event) => {
                          onDocumentFile(item, event.target.files?.[0]);
                          event.target.value = "";
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <SectionBar id="section-h" title="Section H — Preferred Batch Timing" />
      <div className="px-4 py-4 sm:px-6">
        <Field label="Batch Schedule" htmlFor="batchSchedule" required>
          <BoxSelect
            id="batchSchedule"
            name="batchSchedule"
            required
            value={timing}
            onChange={(event) => setTiming(event.target.value)}
          >
            <option value="">Select one time slot</option>
            {ADMISSION_BATCH_TIMINGS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </BoxSelect>
        </Field>
      </div>

      <SectionBar id="section-i" title="Section I — Source of Enquiry" />
      <div className="px-4 py-4 sm:px-6">
        <fieldset>
          <legend className="mb-2 text-[11px] font-semibold text-slate-700 sm:text-xs">
            How did you hear about ELEVEIIM?
          </legend>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {HEAR_ABOUT.map((item) => (
              <Choice
                key={item}
                type="checkbox"
                name="hearAbout"
                value={item}
                checked={hearAbout.includes(item)}
                onChange={() => setHearAbout(toggleValue(hearAbout, item))}
              >
                {item}
              </Choice>
            ))}
          </div>
        </fieldset>
      </div>

      <SectionBar id="section-k" title="Section K — Terms & Conditions" />
      <div className="px-4 py-4 sm:px-6">
        <p className="mb-3 text-[11px] font-semibold text-slate-600">Please read before signing</p>
        <ol className="space-y-2 text-[12px] leading-relaxed text-slate-700 sm:text-[13px]">
          {TERMS.map((term, index) => (
            <li key={term} className="flex gap-2">
              <span className="w-5 shrink-0 font-semibold">{index + 1}.</span>
              <span>{term}</span>
            </li>
          ))}
        </ol>
      </div>

      <SectionBar id="section-l" title="Section L — Declaration" />
      <div className="space-y-4 px-4 py-4 sm:px-6">
        <label className="flex items-start gap-2 text-[12px] leading-relaxed text-slate-700 sm:text-[13px]">
          <input
            type="checkbox"
            className="mt-1"
            checked={applicantDeclaration}
            onChange={(event) => setApplicantDeclaration(event.target.checked)}
          />
          <span>
            <strong>Declaration by the Applicant:</strong> I declare that all information given in this
            application is true and correct to the best of my knowledge. I have read and understood the
            Terms &amp; Conditions and agree to abide by all the rules, discipline, attendance and fee
            policy of ELEVEIIM.
          </span>
        </label>
        <label className="flex items-start gap-2 text-[12px] leading-relaxed text-slate-700 sm:text-[13px]">
          <input
            type="checkbox"
            className="mt-1"
            checked={parentDeclaration}
            onChange={(event) => setParentDeclaration(event.target.checked)}
          />
          <span>
            <strong>Declaration by the Parent / Guardian:</strong> I confirm the details given by the
            applicant and consent to their enrolment at ELEVEIIM. I have read the Terms &amp; Conditions,
            including the fee and refund policy, and take responsibility for timely payment of the fees.
          </span>
        </label>
        {submitError ? (
          <p className="text-sm font-medium text-red-700">{submitError}</p>
        ) : null}
        {submitOk ? (
          <p className="rounded-sm border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
            {submitOk}
          </p>
        ) : (
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="h-10 rounded-sm bg-[#1e4ba8] px-6 text-sm font-semibold text-white hover:bg-[#173f91] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit application"}
            </button>
          </div>
        )}
      </div>

      <footer className="border-t border-slate-300 bg-slate-50 px-4 py-3 text-center text-[10px] leading-relaxed text-slate-600 sm:px-6 sm:text-[11px]">
        ELEVEIIM — Educate to Elevate
        <br />
        Plot No. 1230, 1st Floor, JLPL Industrial Area, Sector 82, SAS Nagar, Mohali - 140306, Punjab
        (India)
        <br />
        Phone / WhatsApp: +91 90563 63535 | Email: careers@eleveiim.com | Website: www.eleveiim.com
      </footer>

      {preview ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setPreview(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-sm bg-white p-3"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="truncate text-sm font-medium text-slate-800">{preview.name}</p>
              <FileAction onClick={() => setPreview(null)}>Close</FileAction>
            </div>
            {preview.type === "application/pdf" ? (
              <iframe
                src={preview.url}
                title={preview.name}
                className="h-[75vh] w-full rounded-sm border border-slate-200"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview.url}
                alt={preview.name}
                className="mx-auto max-h-[75vh] w-auto max-w-full"
              />
            )}
          </div>
        </div>
      ) : null}
    </form>
  );
}
