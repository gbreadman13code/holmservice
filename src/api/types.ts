export interface BaseResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Notification {
  id: number;
  content: string;
  created_at: string;
}

// Пример использования:
// type NotificationResponse = PaginatedResponse<Notification>;
