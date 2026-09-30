export const ADMISSION_SESSION = "Academic Session 2026–27 • Classroom Programs";

export const ADMISSION_BRANCH = "Mohali (Sector 82)";

export const ADMISSION_COUNSELLOR = "Eleveiim Team";

export { ADMISSION_QUALIFICATION_ROWS as QUALIFICATION_ROWS } from "@/lib/admission-profile";

export const PRESENT_STATUS = [
  "School / College Student",
  "Fresher / Graduate",
  "Working Professional",
  "Freelancer",
  "Business Owner",
  "Other",
] as const;

export const CAREER_OBJECTIVES = [
  "Job Placement",
  "Freelancing / Client Work",
  "Promotion / Role Change",
  "Own Business",
  "Skill Upgrade Only",
] as const;

export const DOCUMENTS = [
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

export const HEAR_ABOUT = [
  "Instagram / Facebook",
  "YouTube",
  "Google / Website",
  "Friend / Relative",
  "College Seminar",
  "Pamphlet",
  "Walk-in",
  "Student Referral",
] as const;

export const PAYMENT_MODES = [
  "Cash",
  "UPI",
  "Debit / Credit Card",
  "Bank Transfer",
  "Cheque",
  "EMI / Instalments",
] as const;

export { ADMISSION_BATCH_TIMINGS as BATCH_TIMINGS } from "@/lib/admission-profile";

export const PIN_LOCATION_OPTIONS = [
  "Sector 82, Mohali",
  "Sector 80, Mohali",
  "Kharar",
  "Chandigarh",
  "Other",
] as const;

export const COURSE_GROUPS = [
  {
    title: "AI-Driven Flagship Programs",
    accent: true,
    items: [
      { name: "Generative AI & LLM Engineering", duration: "6 Months" },
      { name: "AI Automation & AI Agents", duration: "6 Months" },
      { name: "Data Science with AI & ML", duration: "6 Months" },
      { name: "Data Analytics", duration: "4 Months" },
      { name: "Computer Vision & Robotics AI", duration: "1 Year" },
      { name: "Full Stack Web Development", duration: "6 Months" },
      { name: "Mobile App Development", duration: "6 Months" },
      { name: "Digital Marketing", duration: "6 Months" },
      { name: "Graphic Designing", duration: "3 Months" },
    ],
  },
  {
    title: "Technology & AI Courses",
    accent: false,
    items: [
      { name: "AI for Everyone", duration: "45 Days" },
      { name: "Prompt Engineering Course", duration: "45 Days" },
      {
        name: "ChatGPT & Generative AI Certification Program",
        duration: "45 Days",
      },
      {
        name: "AI Tools for Students, Professionals & Businesses",
        duration: "45 Days",
      },
      { name: "PHP Web Development with MySQL Course", duration: "45 Days" },
      { name: "Node.js API & Backend Development Training", duration: "45 Days" },
      { name: "React JS Professional Developer Program", duration: "45 Days" },
      {
        name: "Next.js Modern Full Stack Developer Course",
        duration: "45 Days",
      },
      { name: "Flutter App Development Boot Camp", duration: "45 Days" },
      {
        name: "Full Stack MERN Web Developer Course with AI",
        duration: "180 Days",
      },
    ],
  },
  {
    title: "Graphic Design & Creative Courses",
    accent: false,
    items: [
      { name: "Basic Graphic Design Course", duration: "45 Days" },
      { name: "Advance Graphic Design Course", duration: "120 Days" },
      {
        name: "Graphic Design & Creative Branding Course",
        duration: "Enquire",
      },
      {
        name: "Website Design, UI/UX & Development Course",
        duration: "Enquire",
      },
    ],
  },
  {
    title: "Digital Marketing Courses",
    accent: false,
    items: [
      { name: "SEO Expert Certification Course", duration: "45 Days" },
      {
        name: "Google Ads, PPC & Performance Marketing Course",
        duration: "45 Days",
      },
      {
        name: "E-Commerce Growth & Marketplace Marketing Course",
        duration: "45 Days",
      },
      {
        name: "Social Media Marketing & Content Strategy Course",
        duration: "45 Days",
      },
      {
        name: "Advanced Digital Marketing & AI Marketing Course",
        duration: "120 Days",
      },
    ],
  },
  {
    title: "Professional Programs",
    accent: false,
    items: [
      {
        name: "Certified Real Estate Professional (CREP)",
        duration: "45 Days",
      },
      {
        name: "Elevate X — Personality Transformation Program",
        duration: "45 Days",
      },
      {
        name: "Elevate Elite — Executive Presence & Success Program",
        duration: "90 Days",
      },
    ],
  },
] as const;

export const ALL_COURSES = COURSE_GROUPS.flatMap((group) =>
  group.items.map((item) => ({
    group: group.title,
    name: item.name,
    duration: item.duration,
  }))
);

export const TERMS = [
  "Admission is confirmed only after this form is submitted, documents are verified and the registration or first instalment is paid, subject to seat availability in the batch.",
  "The registration fee is non-refundable. Once the batch begins, the course fee is neither refundable nor transferable to another person.",
  "Instalments must be paid on or before the due dates given at admission. Continued delay may lead to suspension of classes until dues are cleared.",
  "The fee covers classroom training, study material, lab access and the ELEVEIIM certificate. External or third-party exam fees are not included unless stated in writing.",
  "A minimum of 75% attendance is mandatory for certification, internship recommendation and placement assistance.",
  "The certificate is issued after all modules and projects are completed, the final assessment is cleared and the fee is paid in full.",
  "ELEVEIIM provides placement assistance, interview preparation and freelance guidance. Employment is not guaranteed, as hiring decisions rest with employers and clients.",
  "Scholarships apply to the tuition fee only and may be withdrawn for poor attendance, indiscipline or false information given in this form.",
  "Batch timings, faculty and schedules may be revised with prior notice. Ragging, harassment, damage to equipment or misuse of lab facilities will end the admission without refund.",
  "Course material and project briefs are the property of ELEVEIIM and must not be copied, recorded or shared. Student photographs and project work may be used for institutional promotion. All disputes are subject to the courts at Mohali (SAS Nagar), Punjab.",
] as const;
