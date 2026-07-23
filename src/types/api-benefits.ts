/** Benefit feature from `GET /homepage/benefits`. */
export interface ApiBenefitFeature {
  id: string;
  title: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Benefit statistic from `GET /homepage/benefits` (not used on public UI yet). */
export interface ApiBenefitStatistic {
  id: string;
  count: string;
  label: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

/** Benefit certificate from `GET /homepage/benefits`. */
export interface ApiBenefitCertificate {
  id: string;
  imageUrl: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

/** Benefits section payload from `GET /homepage/benefits`. */
export interface ApiBenefitsSection {
  id: string;
  heading: string;
  description: string;
  features: ApiBenefitFeature[];
  statistics: ApiBenefitStatistic[];
  certificates: ApiBenefitCertificate[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Public homepage Benefits view model (statistics omitted). */
export interface BenefitsSectionData {
  heading: string;
  description: string;
  features: { id: string; title: string }[];
  certificates: { id: string; imageUrl: string; alt: string }[];
}
