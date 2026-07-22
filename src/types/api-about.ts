/** About hero from `GET /about/hero`. */
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

/** About mission & vision from `GET /about/mission-vision`. */
export interface ApiAboutMissionVision {
  id: string;
  mission: string;
  vision: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/** About statistics from `GET /about/statistics`. */
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

/** Value card inside `GET /about/values`. */
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

/** About values section from `GET /about/values`. */
export interface ApiAboutValues {
  id: string;
  title: string;
  values: ApiAboutValueItem[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
