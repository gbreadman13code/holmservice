import { makeAutoObservable, runInAction } from 'mobx';
import { NewsItem, CurrentNews } from './types';
import { mockNews } from './mock';

export class NewsStore {
  news: NewsItem[] = [];
  currentNews: CurrentNews | null = null;
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
      // Имитируем запрос с limit/offset
      await new Promise(resolve => setTimeout(resolve, 500));
      const response = {
        items: mockNews.slice(offset, offset + this.pageSize),
        total: mockNews.length
      };

      runInAction(() => {
        this.news = response.items;
        this.total = response.total;
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
      await new Promise(resolve => setTimeout(resolve, 500));
      
      runInAction(() => {
        this.news = mockNews.slice(0, count);
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async fetchNewsById(id: number): Promise<NewsItem | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockNews.find(news => news.id === id) || null;
  }

  async fetchNewsBySlug(slug: string) {
    this.loading = true;
    this.currentNews = null;

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const news = mockNews.find(news => news.slug === slug);
      
      if (news) {
        runInAction(() => {
          this.currentNews = {
            ...news,
            fullText: `Система водоснабжения крупных городов давно нуждается в модернизации. Новая программа, представленная Министерством ЖКХ, 
направлена на обновление инфраструктуры водопровода, включая замену устаревших труб, установку современных систем фильтрации и внедрение цифровых технологий 
для контроля качества воды.

По словам представителей министерства, проект будет реализован поэтапно: сначала в мегаполисах с наиболее изношенной инфраструктурой, таких как Москва, Санкт-Петербург и Екатеринбург. 
Далее модернизация будет распространяться на города с населением более 1 миллиона человек.

Ожидается, что реализация программы приведет к значительному снижению потерь воды в системе, улучшению качества подачи и сокращению числа аварий. 
Также важной частью программы является повышение экологической безопасности, так как будут внедрены новые технологии очистки сточных вод.

Программа рассчитана на пять лет, а общий объем финансирования составит более 200 миллиардов рублей. Финансирование будет осуществляться как из федерального бюджета, так и за счет частных инвестиций. 

Министерство также призвало население к активному участию в обсуждении проекта, чтобы сделать его максимально эффективным и отвечающим потребностям жителей.`
          };
        });
      }
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

export const newsStore = new NewsStore(); 