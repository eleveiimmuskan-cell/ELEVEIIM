import type {
  OfferLetter,
  PlacementCompany,
  PlacementStat,
  PlacementStory,
  SalaryPackage,
} from "@/types";

export const placementCompanies: PlacementCompany[] = [
  { id: "1", name: "Google", logo: "G" },
  { id: "2", name: "Amazon", logo: "A" },
  { id: "3", name: "Microsoft", logo: "M" },
  { id: "4", name: "Flipkart", logo: "F" },
  { id: "5", name: "Paytm", logo: "P" },
  { id: "6", name: "Zomato", logo: "Z" },
  { id: "7", name: "Swiggy", logo: "S" },
  { id: "8", name: "PhonePe", logo: "Ph" },
];

export const placementStats: PlacementStat[] = [
  { id: "1", label: "Students Placed", value: "12,500+" },
  { id: "2", label: "Highest Package", value: "₹28 LPA" },
  { id: "3", label: "Average Package", value: "₹6.5 LPA" },
  { id: "4", label: "Partner Companies", value: "500+" },
];

export const salaryPackages: SalaryPackage[] = [
  { id: "1", role: "Full Stack Developer", range: "₹8 – 18 LPA", company: "Product Companies" },
  { id: "2", role: "Data Scientist", range: "₹10 – 22 LPA", company: "Tech & Analytics" },
  { id: "3", role: "Cloud Engineer", range: "₹9 – 20 LPA", company: "Enterprise IT" },
  { id: "4", role: "UI/UX Designer", range: "₹6 – 14 LPA", company: "Startups & Agencies" },
];

export const offerLetters: OfferLetter[] = [
  { id: "1", studentName: "Kavya N.", company: "Amazon", role: "SDE-I", package: "₹18 LPA" },
  { id: "2", studentName: "Rohan P.", company: "Google", role: "Data Analyst", package: "₹22 LPA" },
  { id: "3", studentName: "Meera S.", company: "Microsoft", role: "Cloud Engineer", package: "₹16 LPA" },
];

export const placementStories: PlacementStory[] = [
  {
    id: "1",
    slug: "kavya-nair-amazon-sde",
    studentName: "Kavya Nair",
    course: "Full Stack Web Development",
    company: "Amazon",
    role: "SDE-I",
    package: "₹18 LPA",
    batch: "Jan 2025",
    summary: "Career switch from non-tech to Amazon SDE in 6 months.",
    story:
      "Kavya joined ELEVEIIM with no prior coding experience. Through structured modules, daily mentorship, and 12 capstone projects, she built a portfolio that stood out in Amazon's hiring loop.",
    image: "KN",
  },
  {
    id: "2",
    slug: "rohan-patel-google-data-analyst",
    studentName: "Rohan Patel",
    course: "Data Science & AI",
    company: "Google",
    role: "Data Analyst",
    package: "₹22 LPA",
    batch: "Sep 2024",
    summary: "From analytics intern to Google data analyst with scholarship support.",
    story:
      "Rohan received a 75% scholarship and completed the Data Science program while working part-time. His capstone on predictive analytics led to a direct referral from our Google hiring partner.",
    image: "RP",
  },
  {
    id: "3",
    slug: "meera-shah-microsoft-cloud",
    studentName: "Meera Shah",
    course: "Cloud & DevOps Engineering",
    company: "Microsoft",
    role: "Cloud Engineer",
    package: "₹16 LPA",
    batch: "Mar 2025",
    summary: "Azure-certified cloud engineer placed at Microsoft.",
    story:
      "Meera leveraged ELEVEIIM's AWS and Azure labs to earn certifications before graduation. Placement prep sessions were critical for her Microsoft interview success.",
    image: "MS",
  },
  {
    id: "4",
    slug: "aditya-kumar-flipkart-fullstack",
    studentName: "Aditya Kumar",
    course: "Full Stack Web Development",
    company: "Flipkart",
    role: "Full Stack Developer",
    package: "₹14 LPA",
    batch: "Nov 2024",
    summary: "Fresh graduate placed at Flipkart with strong React portfolio.",
    story:
      "Aditya focused on React and Node.js projects throughout the program. His hackathon win caught Flipkart recruiters' attention during our campus drive.",
    image: "AK",
  },
];
