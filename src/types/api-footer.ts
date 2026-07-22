/** Quick / program link from `GET /footer`. */
export interface ApiFooterLink {
  id: string;
  label: string;
  url: string;
}

/** Social link from `GET /footer`. */
export interface ApiFooterSocialLink {
  id: string;
  platform: string;
  url: string;
}

/** Site footer payload from `GET /footer`. */
export interface ApiFooter {
  id: string;
  logo: string;
  description: string;
  quickLinks: ApiFooterLink[];
  programs: ApiFooterLink[];
  email: string;
  phone: string;
  address: string;
  socialLinks: ApiFooterSocialLink[];
  copyrightText: string;
  createdAt: string;
  updatedAt: string;
}
