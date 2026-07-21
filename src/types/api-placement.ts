/** Nested industry partner on placement list/detail payloads. */
export interface ApiPlacementPartner {
  id: string;
  name: string;
  logoUrl: string | null;
  website: string | null;
}

/** Nested course on placement list/detail payloads. */
export interface ApiPlacementCourse {
  id: string;
  title: string;
  slug: string;
}

/** Placement list item from `GET /placements`. */
export interface ApiPlacement {
  id: string;
  studentName: string;
  studentPhotoUrl: string | null;
  industryPartnerId: string;
  industryPartner: ApiPlacementPartner;
  courseId: string | null;
  course: ApiPlacementCourse | null;
  batch: string | null;
  role: string | null;
  package: string | null;
  offerLetterUrl: string | null;
  placementStory: string | null;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}
