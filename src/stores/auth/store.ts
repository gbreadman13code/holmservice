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

// Интерфейс для элемента начислений
export interface ChargeItem {
  ALL_VAL2: number;        // Итоговая сумма с учетом корректировок
  DET_VAL: number;         // Детальная/первоначальная сумма
  SERVICE_NAME: string;    // Название услуги
  CORRECT_VAL: number;     // Корректировочное значение
  REC_TYPE: number;        // Тип записи (0 - обычная запись, 1 - итого)
  PERIOD_ID: number;       // ID периода
  ADJ_VAL: number;         // Корректировочное значение (скидки/надбавки)
}

// Интерфейс для ответа API с начислениями
export interface ChargesData {
  nach: ChargeItem[];
}

// Интерфейс для элемента платежей 
export interface PayItem {
  PAY_STATUS_NAME: string;  // Статус платежа
  PAY_VAL_RUB: number;      // Сумма платежа
  STAMP: string;            // Дата и время платежа
  OUT_MAIN_NAME: string;    // Наименование получателя
  PAYTYPE_NAME: string;     // Тип платежа
  PAY_NUM: string;          // Номер платежа
  KASSA_NAME: string;       // Название кассы/банка
}

// Интерфейс для ответа API с платежами
export interface PaysData {
  pays: PayItem[];
}

// Интерфейс для элемента периода
export interface PeriodItem {
  PERIOD_NAME: string;      // Название периода (например, "апрель 2025")
  PERIOD_ID: number;        // ID периода (например, 202504)
}

// Интерфейс для ответа API с периодами
export interface PeriodsResponse {
  period: PeriodItem[];
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

  payments: PaysData | null = null;
  isPaymentsLoading = false;

  charges: ChargesData | null = null;
  isChargesLoading = false;

  periods: PeriodItem[] = [];
  isPeriodsLoading = false;


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

  setPeriodsLoading = action((value: boolean) => {
    this.isPeriodsLoading = value;
  });

  async getUser() {
    try {
      const response = await api.get<UserInfo>(`account/client-info/`);

      this.getPeriod()

      const modifiedResponse: UserInfo = {
        ...response.data,
        name_kvartir: response.data.name_kvartir.split(' ').slice(1).join(' '),
      }

      this.setAuth(modifiedResponse);
    } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error);
    } 
  }

  async getPeriod() {
    try {
      this.setPeriodsLoading(true);
      const response = await api.get<PeriodsResponse>(`account/period/`);
      
      runInAction(() => {
        this.periods = response.data.period;
        this.isPeriodsLoading = false;
      });
      
      return response.data.period;
    } catch (error) {
      console.error('Ошибка при получении периодов:', error);
      runInAction(() => {
        this.isPeriodsLoading = false;
      });
      return [];
    }
  }

  async getCharges(date: string) {
    try {
      this.isChargesLoading = true;
      const response = await api.get<ChargesData>(`paymant/nach/?period_id=${date}`);
      
      runInAction(() => {
        this.charges = response.data;
        this.isChargesLoading = false;
      });
    } catch (error) {
      console.error('Ошибка при получении начислений:', error);
      runInAction(() => {
        this.isChargesLoading = false;
      });
    }
  }

  async getPayments(limit: number, offset: number) {
    try {
      this.isPaymentsLoading = true;
      const response = await api.get<PaysData>(`paymant/pays/?limit=${limit}&offset=${offset}`);
      
      runInAction(() => {
        this.payments = response.data;
        this.isPaymentsLoading = false;
      });
    } catch (error) {
      console.error('Ошибка при получении платежей:', error);
      runInAction(() => {
        this.isPaymentsLoading = false;
      });
    }
  }

  async login(account: string, password: string) {
    this.setLoading(true);
    this.setError(null);

    try {
      await api.post<BaseResponse<AuthResponse>>('auth/', {
        account_num: +account,
        password: password
      });
      
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

  logout = async () => {
    try {
      // FIXME: На бэкенде нет эндпоинта для логаута!
      // Временное решение - отправка GET запроса на /auth/ с неправильными данными
      
    } catch (error) {
      console.error('Ошибка при выходе из системы:', error);
    } finally {
      // В любом случае очищаем локальное состояние
      runInAction(() => {
        this.setAuth(null);
        this.setError(null);
        this.setAccountNumber(null);
      });
    }
  };

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

  init = async () => {
    try {
      this.setLoading(true);
      
      await this.getUser();
    } catch (error) {
      console.error('Ошибка при инициализации авторизации:', error);
      this.setError('Ошибка при автоматическом входе');
    } finally {
      this.setLoading(false);
    }
  }
} 