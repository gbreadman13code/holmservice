import { makeAutoObservable, runInAction } from 'mobx';
import { NewsItem } from './types';
import { BaseResponse } from '@/api/types';
import { api } from '@/api/axios';
import { mapNewsItem } from './mapping';

export class NewsStore {
  news: NewsItem[] = [];
  currentNews: NewsItem | null = null;
  total: number = 0;
  loading: boolean = false;
  currentPage: number = 1;
  readonly pageSize = 9;

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
    void this.fetchNews();
  }

  async fetchNews() {
    this.loading = true;

    try {
      const offset = (this.currentPage - 1) * this.pageSize;
      const response = await api.get<BaseResponse<NewsItem>>('news/', {
        params: {
          limit: this.pageSize,
          offset,
        },
      });

      runInAction(() => {
        this.news = response.data.results;
        this.total = response.data.count;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async fetchLatestNews(count: number = 4) {
    this.loading = true;

    try {
      const response = await api.get<BaseResponse<NewsItem>>('news/', {
        params: {
          limit: count,
          offset: 0,
        },
      });

      runInAction(() => {
        this.news = response.data.results;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async fetchNewsBySlug(slug: string) {
    this.loading = true;
    this.currentNews = null;

    try {
      const response = await api.get<NewsItem>(`news/${slug}/`);
      this.currentNews = mapNewsItem(response.data);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

export const newsStore = new NewsStore();
