import { makeAutoObservable, runInAction } from 'mobx';
import { warningsMock } from './warnings.mock';

export interface Warning {
  id: number;
  title: string;
  description: string;
  date: string;
}

class WarningsStore {
  warnings: Warning[] = [];
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchWarnings() {
    this.isLoading = true;
    this.error = null;
    
    try {
      // Имитируем задержку сети
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      runInAction(() => {
        this.warnings = warningsMock;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Ошибка при загрузке предупреждений';
        this.isLoading = false;
        console.error(error);
      });
    }
  }
}

export const warningsStore = new WarningsStore(); 