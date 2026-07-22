/** Footer CTA section from `GET /homepage/footer-cta`. */
export interface ApiFooterCtaSection {
  id: string;
  title: string;
  description: string;
  button1Text: string;
  button1Url: string;
  button2Text: string;
  button2Url: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
