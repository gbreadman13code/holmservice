export interface NewsItem {
  id: number;
  title: string;
  description: string;
  fullTextCharCount: number;
  imageUrl: string;
  publishDate: string; // В формате 'YYYY-MM-DD'
}

export interface NewsResponse {
  items: NewsItem[];
  total: number;
}

export interface GetNewsParams {
  page?: number;
  pageSize?: number;
} 