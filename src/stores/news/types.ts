export interface NewsItem {
  id: number;
  cover: string | null;
  title: string;
  content: string;
  created_at: string;
  slug: string;
  photos: AdditionalImage[];
  vk_video_link?: string;
} 

export interface AdditionalImage {
  id: number;
  photo: string;
  news: number;
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