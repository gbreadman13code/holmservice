import { makeAutoObservable, action, runInAction } from 'mobx';

interface Address {
  country: string;
  city: string;
  street: string;
  house: string;
  apartment: string;
}

interface User {
  id: number;
  account: string;
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
}

const MOCK_USERS = [
  {
    id: 1,
    account: '123',
    password: '123',
    firstName: 'Иван',
    lastName: 'Иванов',
    email: 'ivanov@example.com',
    address: {
      country: 'Россия',
      city: 'Красноярск',
      street: 'Ленина',
      house: '1',
      apartment: '123'
      },
      
  },
  {
    id: 2,
    account: '987654321',
    password: 'test123',
    firstName: 'Петр',
    lastName: 'Петров',
    email: 'petrov@example.com',
    address: {
      country: 'Россия',
      city: 'Красноярск',
      street: 'Маркса',
      house: '78',
      apartment: '15'
      }

  }
];

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
  user: User | null = null;
  feedbacks: Feedback[] = [];
  isFeedbackSending = false;

  constructor() {
    makeAutoObservable(this, {}, { deep: true });
  }

  setLoading = action((value: boolean) => {
    this.isLoading = value;
  });

  setError = action((error: string | null) => {
    this.error = error;
  });

  setAuth = action((user: User | null) => {
    this.isAuthenticated = !!user;
    this.user = user;
  });

  async login(account: string, password: string) {
    this.setLoading(true);
    this.setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const user = MOCK_USERS.find(u => 
        u.account === account && u.password === password
      );

      if (!user) {
        throw new Error('Неверный номер лицевого счёта или пароль');
      }

      runInAction(() => {
        this.setAuth({
          id: user.id,
          account: user.account,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          address: user.address
        });
      });
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