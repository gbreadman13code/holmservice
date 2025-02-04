import { NewsItem, NewsResponse, GetNewsParams } from './types';
import { mockNews } from './mock';

const DEFAULT_PAGE_SIZE = 9;

export class NewsService {
  static async getNews({ page = 1, pageSize = DEFAULT_PAGE_SIZE }: GetNewsParams = {}): Promise<NewsResponse> {
    // Имитируем задержку запроса
    await new Promise(resolve => setTimeout(resolve, 500));

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const items = mockNews.slice(startIndex, endIndex);

    return {
      items,
      total: mockNews.length
    };
  }

  static async getLatestNews(count: number = 4): Promise<NewsItem[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockNews.slice(0, count);
  }

  static async getNewsById(id: number): Promise<NewsItem | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockNews.find(news => news.id === id) || null;
  }
} 