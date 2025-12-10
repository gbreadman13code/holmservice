import axios from "axios";

export const api = axios.create({
  baseURL: "https://holmservis.ru/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  return config;
});

// Добавляем перехватчик ответов для отладки
api.interceptors.response.use();
