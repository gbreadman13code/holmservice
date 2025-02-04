export interface NewsItem {
  id: number;
  title: string;
  description: string;
  fullTextCharCount: number;
  fullText?: string;
  imageUrl: string;
  publishDate: string; // В формате 'YYYY-MM-DD'
  slug: string;
}

export interface NewsResponse {
  items: NewsItem[];
  total: number;
}

export interface GetNewsParams {
  offset: number;
  limit: number;
}

export interface CurrentNews extends NewsItem {
  fullText: string;
} 