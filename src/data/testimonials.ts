import type { Testimonial } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Kavya Nair",
    role: "Software Engineer",
    company: "Amazon",
    content:
      "ELEVEIIM transformed my career. The mentors, projects, and placement support helped me land my dream role within 3 months of completing the program.",
    rating: 5,
    image: "KN",
  },
  {
    id: "2",
    name: "Rohan Patel",
    role: "Data Analyst",
    company: "Google",
    content:
      "The curriculum is industry-aligned and the scholarship program made quality education accessible. Best investment I've made in my career.",
    rating: 5,
    image: "RP",
  },
  {
    id: "3",
    name: "Meera Shah",
    role: "UX Designer",
    company: "Microsoft",
    content:
      "From portfolio building to mock interviews, every step was structured. The trainers genuinely care about student success.",
    rating: 5,
    image: "MS",
  },
];

export const placementTestimonials = testimonials;
