import { api } from '@/api/axios';
import { BaseResponse } from '@/api/types';
import { makeAutoObservable, action, runInAction } from 'mobx';
import { AnalysisFormValues } from '@/pages/AccountPage/components/MetersSection/components/AnalysisModal/types';
import axios from 'axios';

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

export interface SendFeedbackData {
  topic: FeedbackTopic;
  email: string;
  phone: string;
  full_name: string;
  address: string;
  message: string;
}

export interface FeedbackResponse {
  id: number;
  account_id: number;
  topic: FeedbackTopic;
  email: string;
  phone: string;
  full_name: string;
  address: string;
  message: string;
  status: FeedbackStatus;
  created_at: string;
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
  total: number;
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

// Интерфейс для счетчика ИПУ
export interface IPUCounter {
  LIMIT_VALUE: number;      // Предельное значение
  REPAIR_DATE: string | null; // Дата поверки
  COUNTER_ID: number;       // ID счетчика
  COUNTER_VALUE: number;    // Текущее показание
  SERVICE_NAME: string;     // Название услуги
  PERIOD: string;           // Период
  LAST_STAMP: string;       // Последняя дата
  PLACE_NAME: string | null; // Место установки
  REC_TYPE: number;         // Тип записи
  COUNTER_TIME: string;     // Время счетчика
  REC_TYPE_STR: string;     // Тип записи (строка)
  IS_SYNC: boolean;         // Синхронизировано ли
  NDATE1: string;           // Дата начала
  NDATE2: string | null;    // Дата окончания
  FIRST_VALUE: number;      // Начальное значение
  SERIYA: string | null;    // Серийный номер
}

// Интерфейс для ответа API с ИПУ
export interface IPUResponse {
  counters: IPUCounter[];
}

// Интерфейс для элемента истории ИПУ
export interface IPUHistoryItem {
  DATE1: string;            // Дата показания в формате "DD.MM.YYYY HH:MM:SS"
  NUMBER_CYCLE: number;     // Номер цикла
  DATA_SOURCE_NAME: string; // Источник данных (например, "Сайт", "Личное обращение")
  COUNTER_VALUE: number;    // Значение счетчика
  ENABLED: number;          // Статус активности (0 или 1)
  VOLUME: number;           // Объем потребления
  COUNTER_DATA_ID: number;  // ID записи данных счетчика
}

// Интерфейс для ответа API с историей ИПУ
export interface IPUHistoryResponse {
  dolg: IPUHistoryItem[];
}

const MISTRAL_API_KEY = 'x0IzyZVwJtLVnOcHs3ORdfhDvsAOXsHI'

interface AuthResponse {
  account_num: number;
  password: string;
}

export enum FeedbackStatus {
  SENT = 'sent',
  DELIVERED = 'delivered',
}

export enum FeedbackTopic {
  RECALCULATION = 'recalculation',
  METERS = 'meters',
  MAINTENANCE = 'maintenance',
  REPAIR = 'repair',
  OTHER = 'other'
}

export interface Feedback {
  id: number;
  topic: FeedbackTopic;
  email: string;
  phone: string;
  fullName: string;
  address: string;
  message: string;
  status: FeedbackStatus;
  createdAt: string;
}

type AnalysisData = Record<number, {
  response: string;
  loading: boolean;
}>;

export class AuthStore {
  isAuthenticated = false;
  isLoading = false;
  error: string | null = null;
  user: UserInfo | null = null;
  feedbacks: FeedbackResponse[] = [];
  isFeedbackSending = false;
  accountNumber: number | null = null;

  payments: PaysData | null = null;
  isPaymentsLoading = false;

  charges: ChargesData | null = null;
  isChargesLoading = false;

  periods: PeriodItem[] = [];
  isPeriodsLoading = false;

  ipuData: IPUResponse | null = null;
  isIPULoading = false;

  ipuHistory: IPUHistoryItem[] = [];
  isIPUHistoryLoading = false;


  analysisData: AnalysisData = {};


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

  setIPULoading = action((value: boolean) => {
    this.isIPULoading = value;
  });

  setIPUHistoryLoading = action((value: boolean) => {
    this.isIPUHistoryLoading = value;
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
      
      // Сбрасываем флаг логаута при успешном входе
      localStorage.removeItem('user_logged_out');
      
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

 

  async getIPU() {
    try {
      this.setIPULoading(true);
      const response = await api.get<IPUResponse>(`meter-readings/get-counter/`);
      
      runInAction(() => {
        this.ipuData = response.data;
        this.isIPULoading = false;
      });
      
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении данных ИПУ:', error);
      runInAction(() => {
        this.isIPULoading = false;
      });
      return null;
    }
  }

  async getIPUHistory(counterId: number) {
    try {
      this.setIPUHistoryLoading(true);
      const response = await api.get<IPUHistoryResponse>(`meter-readings/get-counter-data/?counter_id=${counterId}`);
      
      runInAction(() => {
        this.ipuHistory = response.data.dolg || [];
        this.isIPUHistoryLoading = false;
      });
      
      return response.data.dolg || [];
    } catch (error) {
      console.error('Ошибка при получении истории показаний ИПУ:', error);
      runInAction(() => {
        this.ipuHistory = [];
        this.isIPUHistoryLoading = false;
      });
      return [];
    }
  }

  async analysisIPU(counterId: number, data: AnalysisFormValues) {
    const counterName = this.ipuData?.counters.find(counter => counter.COUNTER_ID === counterId)?.SERVICE_NAME;

    this.analysisData[counterId] = {
      response: '',
      loading: true
    };
    

    // Получаем историю показаний, если еще не загружена
    if (this.ipuHistory.length === 0) {
      await this.getIPUHistory(counterId);
    }
    
    // Форматируем данные для отправки в Mistral API
    const historyData = this.ipuHistory.map(item => ({
      date: item.DATE1,
      value: item.COUNTER_VALUE
    }));
    
    // Формируем запрос
    try {
      const mistralResponse = await axios.post('https://api.mistral.ai/v1/chat/completions', 
        {
          model: "mistral-large-latest",
          messages: [
            {
              role: "user",
              content: `
                Проведи детальный анализ расходов по счетчику "${counterName}" за текущий (2025) и предыдущий (2024) год. Используй следующие данные:
      
                **История показаний счетчика:**
                ${JSON.stringify(historyData)}
      
                **Дополнительная информация:**
                ${JSON.stringify(data)}
      
                **Требования к анализу:**
                1. Рассчитай помесячное потребление (в куб.м для воды или кВт·ч для электричества) за 2024 и 2025 годы.
                2. Сравни потребление по месяцам между годами в процентах (например, январь 2025 - январь 2024: -10%").
                3. Выяви аномалии: месяцы, где потребление отклоняется от среднего за год более чем на 20%.
                4. Укажи общий тренд за каждый год (рост или снижение).
                5. Оцени примерную стоимость потребления, используя тариф: 50 руб/куб.м для воды или 5 руб/кВт·ч для электричества.
      
                **Формат ответа:**
                - Ответ должен использовать Markdown разметку для лучшей читаемости.
                - Не используй таблицы. Все данные представляй в виде простого текста, разделённого абзацами.
                - Ответ должен быть пригоден для встраивания в HTML (чистый текст, разбитый на абзацы).
                - Не используй ненумерованные списки.
                - Каждый раздел (анализ, сравнение, аномалии, прогноз, рекомендации) должен начинаться с заголовка, выделенного словом в верхнем регистре (например, "АНАЛИЗ ПОТРЕБЛЕНИЯ").
                - Используй заголовки второго уровня ## для разделов (анализ, сравнение, аномалии, прогноз, рекомендации).
                - Можешь использовать таблицы, списки, выделение жирным или курсивом для важных данных.
                - Для каждого месяца указыва потребление, процентное изменение и стоимость в одном предложении.
                - Описание графика замени на текстовое описание трендов (например, "Потребление в 2025 году стабильно ниже, чем в 2024").
                - Рекомендации должны быть конкретными, учитывать количество жильцов, наличие детей и тип сантехники.
      
                **Контекст:**
                - Нормы потребления: горячая вода ~4 куб.м/чел, холодная вода ~6 куб.м/чел, электричество ~100 кВт·ч/чел в месяц.
                - Ответ должен быть лаконичным, на русском языке, без общих фраз, с акцентом на цифры и факты.
                - Учитывай российские реалии (тарифы, нормы потребления, праздничные дни, сезонность).
                - Потребители анализа - жители Красноярска.
              `
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${MISTRAL_API_KEY}`
          }
        }
      );
      
      console.log('Результат анализа от Mistral AI:');
      console.log(mistralResponse.data.choices[0].message.content);
      
      // Сохраняем результат анализа
      runInAction(() => {
        this.analysisData[counterId].response = mistralResponse.data.choices[0].message.content;
        this.analysisData[counterId].loading = false;
      });
      
      return mistralResponse.data.choices[0].message.content;
    } catch (error) {
      console.error('Ошибка при запросе к Mistral API:', error);
      
      // Устанавливаем сообщение об ошибке
      runInAction(() => {
        this.analysisData[counterId].response = 'Не удалось выполнить анализ данных. Пожалуйста, попробуйте позже.';
      });
      
      return 'Не удалось выполнить анализ данных. Пожалуйста, попробуйте позже.';
    } finally {
      runInAction(() => {
        this.analysisData[counterId].loading = false;
      });
    }
  }

  logout = async () => {
    try {
      await api.post('logout/');

      // Устанавливаем флаг в localStorage, что пользователь разлогинился
      localStorage.setItem('user_logged_out', 'true');
      
      runInAction(() => {
        this.setAuth(null);
        this.setError(null);
        this.setAccountNumber(null);
      });
    } catch (error) {
      console.error('Ошибка при выходе из системы:', error);
    }
  };

  setFeedbackSending = action((value: boolean) => {
    this.isFeedbackSending = value;
  });

  get feedbacksList() {
    return this.feedbacks;
  }

  async sendFeedback(data: SendFeedbackData) {
    this.setFeedbackSending(true);
    
    try {
      await api.post('feedback/', data as SendFeedbackData);
  
      this.getFeedbacks();
    } catch (error: unknown) {
      console.error(error);
      throw new Error('Ошибка при отправке обращения');
    } finally {
      this.setFeedbackSending(false);
    }
  }

  async getFeedbacks() {
    try {
      const response = await api.get<FeedbackResponse[]>('feedback/');
      this.feedbacks = response.data;
    } catch (error) {
      console.error('Ошибка при получении обращений:', error);
    }
  }

  init = async () => {
    try {
      this.setLoading(true);
      
      // Проверяем флаг логаута в localStorage
      const loggedOut = localStorage.getItem('user_logged_out') === 'true';
      
      // Если пользователь разлогинился ранее, не делаем автоматическую авторизацию
      if (loggedOut) {
        console.log('Пользователь ранее разлогинился, отменяем автоматическую авторизацию');
        return;
      }
      
      await this.getUser();
    } catch (error) {
      console.error('Ошибка при инициализации авторизации:', error);
      this.setError('Ошибка при автоматическом входе');
    } finally {
      this.setLoading(false);
    }
  }
} 