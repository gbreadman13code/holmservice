import { authStore } from '../index';

export const useAuth = () => {
  return {
    isAuth: authStore.isAuthenticated,
    isLoading: authStore.isLoading,
    error: authStore.error,
    user: authStore.user,
    login: authStore.login.bind(authStore),
    logout: authStore.logout.bind(authStore),
    sendFeedback: authStore.sendFeedback.bind(authStore),
    getFeedbacks: authStore.getFeedbacks.bind(authStore)
  };
}; 