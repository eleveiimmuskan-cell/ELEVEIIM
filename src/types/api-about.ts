/** About hero from `GET /about` (or `/about/hero`). */
export interface ApiAboutHero {
  id: string;
  title: string;
  heading: string;
  subtitle: string;
  backgroundImage: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/** About mission & vision from `GET /about` (or `/about/mission-vision`). */
export interface ApiAboutMissionVision {
  id: string;
  mission: string;
  vision: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/** About statistics from `GET /about` (or `/about/statistics`). */
export interface ApiAboutStatistics {
  id: string;
  studentsTrained: number;
  placementPartners: number;
  placementRate: number;
  expertTrainers: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Value card inside the About values section. */
export interface ApiAboutValueItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/** About values section from `GET /about` (or `/about/values`). */
export interface ApiAboutValues {
  id: string;
  title: string;
  values: ApiAboutValueItem[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Aggregate About page payload from `GET /about`. Inactive sections are null. */
export interface ApiAboutPage {
  hero: ApiAboutHero | null;
  missionVision: ApiAboutMissionVision | null;
  statistics: ApiAboutStatistics | null;
  values: ApiAboutValues | null;
}
