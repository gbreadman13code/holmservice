import { useEffect } from 'react';
import { newsStore } from './index';

export const useNews = () => {
  useEffect(() => {
    void newsStore.fetchNews();
  }, []);

  return {
    news: newsStore.news,
    total: newsStore.total,
    loading: newsStore.loading,
    currentPage: newsStore.currentPage,
    setCurrentPage: newsStore.setCurrentPage.bind(newsStore)
  };
};

export const useLatestNews = () => {
  useEffect(() => {
    void newsStore.fetchLatestNews();
  }, []);

  return {
    news: newsStore.news,
    loading: newsStore.loading
  };
}; 