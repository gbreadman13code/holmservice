import { makeAutoObservable, runInAction } from 'mobx';
import { api } from '@/api/axios';
import { BaseResponse } from '@/api/types';

export interface Warning {
  id: number;
  content: string;
  status: "RED" | "YELLOW" | "GREEN";
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
      const response = await api.get<BaseResponse<Warning>>('alerts/');

      runInAction(() => {
        this.warnings = response.data.results;
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