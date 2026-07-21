/** Course category as returned on list/detail payloads. */
export interface ApiCourseCategory {
  id: string;
  name: string;
  slug: string;
}

/** Trainer summary optionally included on course list/detail payloads. */
export interface ApiCourseTrainer {
  id: string;
  name: string;
  rating: number | null;
  photoUrl: string | null;
  designation?: string | null;
  isActive?: boolean;
}

/** Certification relation on course detail payloads. */
export interface ApiCourseCertification {
  id: string;
  name: string;
  logoUrl: string | null;
}

/** Batch relation on course detail payloads. */
export interface ApiCourseBatch {
  id: string;
  startDate: string;
  endDate: string | null;
  schedule: string | null;
  mode: string | null;
  seats: number | null;
}

/** Testimonial relation on course detail payloads. */
export interface ApiCourseTestimonial {
  id: string;
  studentName: string;
  photoUrl: string | null;
  designation: string | null;
  reviewText: string | null;
  rating: number | null;
  createdAt: string;
  isActive?: boolean;
}

/**
 * Course list/detail item from `GET /courses` and `GET /courses/slug/:slug`.
 */
export interface ApiCourse {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  shortDescription: string | null;
  syllabus: unknown;
  level: string;
  durationWeeks: number | null;
  batchTiming: string | null;
  certification: string | null;
  trainerName: string | null;
  rating: number | null;
  pricing: unknown;
  isPublished: boolean;
  isFeatured: boolean;
  brochureUrl: string | null;
  videoEmbedUrl: string | null;
  seoTitle: string | null;
  seoDesc: string | null;
  tags: string[];
  categoryId: string | null;
  category?: ApiCourseCategory | null;
  trainers?: ApiCourseTrainer[];
  batches?: ApiCourseBatch[];
  certifications?: ApiCourseCertification[];
  testimonials?: ApiCourseTestimonial[];
  createdAt: string;
  updatedAt: string;
}
