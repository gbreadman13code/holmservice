import { api } from '@/api/axios';
import { BaseResponse } from '@/api/types';
import { makeAutoObservable, action, runInAction } from 'mobx';

interface UserInfo {
  name_kvartir: string; // Номер квартиры
  house_id: string; // ID дома
  is_year: string; // Год
  address: string; // Адрес
  main_email: string; // Основной email
  cur_peny: string; // Текущие пени
  cur_balance: string; // Текущий баланс
  main_name: string; // Основное имя
}

interface AuthResponse {
  account_num: number;
  password: string;
}

export enum FeedbackStatus {
  SENT = 'SENT',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED'
}

export enum FeedbackTopic {
  RECALCULATION = 'RECALCULATION',
  METERS = 'METERS',
  MAINTENANCE = 'MAINTENANCE',
  REPAIR = 'REPAIR',
  OTHER = 'OTHER'
}

export interface Feedback {
  id: number;
  topic: FeedbackTopic;
  email: string;
  message: string;
  status: FeedbackStatus;
  createdAt: string;
}

export class AuthStore {
  isAuthenticated = false;
  isLoading = false;
  error: string | null = null;
  user: UserInfo | null = null;
  feedbacks: Feedback[] = [];
  isFeedbackSending = false;
  accountNumber: number | null = null;

  constructor() {
    makeAutoObservable(this, {}, { deep: true });
  }

  setLoading = action((value: boolean) => {
    this.isLoading = value;
  });

  setError = action((error: string | null) => {
    this.error = error;
  });

  setAuth = action((user: UserInfo | null) => {
    this.isAuthenticated = !!user;
    this.user = user;
  });

  setAccountNumber = action((accountNum: number | null) => {
    this.accountNumber = accountNum;
  });

  async getUser() {
    try {
      const response = await api.get<BaseResponse<UserInfo>>(`account/client-info/`, {
        withCredentials: true
      });

      console.log('Ответ от API:', response);
    } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error);
    } 
  }

  async login(account: string, password: string) {
    this.setLoading(true);
    this.setError(null);

    console.log(account, password)

    try {
      // Используем withCredentials для сохранения кук
      const response = await api.post<BaseResponse<AuthResponse>>('auth/', {
        account_num: +account,
        password: password
      }, { withCredentials: true });
      
      this.setAccountNumber(+account);
       
      await this.getUser();
    } catch (error) {
      runInAction(() => {
        this.setError(error instanceof Error ? error.message : 'Ошибка при входе');
      });
      throw error;
    } finally {
      runInAction(() => {
        this.setLoading(false);
      });
    }
  }

  logout = action(() => {
    this.setAuth(null);
    this.setError(null);
    this.setAccountNumber(null);
  });

  setFeedbackSending = action((value: boolean) => {
    this.isFeedbackSending = value;
  });

  get feedbacksList() {
    return this.feedbacks;
  }

  async sendFeedback(data: Omit<Feedback, 'id' | 'status' | 'createdAt'>) {
    this.setFeedbackSending(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newFeedback = {
        ...data,
        id: this.feedbacks.length + 1,
        status: FeedbackStatus.SENT,
        createdAt: new Date().toISOString()
      };

      runInAction(() => {
        this.feedbacks = [newFeedback, ...this.feedbacks];
      });
    } catch (error: unknown) {
      console.error(error);
      throw new Error('Ошибка при отправке обращения');
    } finally {
      this.setFeedbackSending(false);
    }
  }
} 