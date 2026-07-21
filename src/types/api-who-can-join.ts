/** Who Can Join card from `GET /homepage/who-can-join`. */
export interface ApiWhoCanJoinCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Who Can Join section payload from `GET /homepage/who-can-join`. */
export interface ApiWhoCanJoinSection {
  id: string;
  title: string;
  description: string;
  cards: ApiWhoCanJoinCard[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
