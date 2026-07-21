/** Nested course on testimonial list/detail payloads. */
export interface ApiTestimonialCourse {
  id: string;
  title: string;
  slug: string;
}

/** Nested industry partner on testimonial list/detail payloads. */
export interface ApiTestimonialPartner {
  id: string;
  name: string;
  logoUrl: string | null;
  website: string | null;
}

/** Testimonial list item from `GET /testimonials`. */
export interface ApiTestimonial {
  id: string;
  studentName: string;
  photoUrl: string | null;
  designation: string | null;
  reviewText: string | null;
  videoUrl: string | null;
  rating: number | null;
  type: string;
  isActive: boolean;
  isFeatured: boolean;
  displayOrder: number;
  industryPartnerId: string | null;
  industryPartner?: ApiTestimonialPartner | null;
  courseId: string | null;
  course?: ApiTestimonialCourse | null;
  createdAt: string;
  updatedAt: string;
}
