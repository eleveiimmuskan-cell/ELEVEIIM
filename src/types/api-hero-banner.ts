/** Hero banner item from `GET /homepage/hero-banner`. */
export interface ApiHeroBannerItem {
  id: string;
  mainHeading: string;
  subHeading: string;
  description: string;
  scholarshipText: string;
  buttonText: string;
  buttonUrl: string;
  backgroundImage: string;
  /** Absent on banners saved before alt text was added. */
  imageAlt?: string;
  liveCourseCount: number;
  studentRating: number;
  successRate: number;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Hero banner section from `GET /homepage/hero-banner`. */
export interface ApiHeroBannerSection {
  id: string;
  banners: ApiHeroBannerItem[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Public homepage hero view model (left-column fields). */
export interface HeroBannerData {
  scholarshipText: string;
  mainHeading: string;
  subHeading: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  backgroundImage: string;
  liveCourseCount: number;
  studentRating: number;
  successRate: number;
}

/** Photographic campaign slide. The primary left-column banner is excluded. */
export interface HeroCampaignSlide {
  id: string;
  eyebrow: string;
  heading: string;
  subHeading: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
  buttonUrl: string;
}

export interface HeroHomepageContent {
  primary: HeroBannerData | null;
  campaigns: HeroCampaignSlide[];
}
