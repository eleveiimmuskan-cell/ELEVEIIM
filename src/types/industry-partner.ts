/** Industry partner as returned by `GET /industry-partners`. */
export interface IndustryPartner {
  id: string;
  name: string;
  website: string | null;
  logoUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
