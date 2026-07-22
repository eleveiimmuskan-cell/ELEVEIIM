/** Trainer from `GET /trainers`. */
export interface ApiTrainer {
  id: string;
  name: string;
  slug: string;
  email: string | null;
  contact: string | null;
  bio: string | null;
  experience: number | null;
  photoUrl: string | null;
  designation: string | null;
  linkedinUrl: string | null;
  twitterUrl: string | null;
  rating: number | null;
  studentsMentored: number | null;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}
