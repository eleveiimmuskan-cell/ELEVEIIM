/** Blog category nested on blog list/detail payloads. */
export interface ApiBlogCategory {
  id: string;
  name: string;
  slug: string;
}

/** Author trainer nested on blog list/detail payloads. */
export interface ApiBlogAuthor {
  id: string;
  name: string;
  designation: string | null;
  photoUrl: string | null;
  slug: string;
  isActive?: boolean;
}

/** Blog post from `GET /blog`. */
export interface ApiBlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  isPublished: boolean;
  publishedAt: string | null;
  seoTitle: string | null;
  seoDesc: string | null;
  tags: string[];
  categoryId: string | null;
  category: ApiBlogCategory | null;
  authorId: string | null;
  author: ApiBlogAuthor | null;
  createdAt: string;
  updatedAt: string;
}

/** Blog category from `GET /blog-categories`. */
export interface ApiBlogCategoryListItem {
  id: string;
  name: string;
  slug: string;
  postCount?: number;
}
