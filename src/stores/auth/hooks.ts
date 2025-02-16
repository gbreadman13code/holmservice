import { authStore } from '../index';

export const useAuth = () => {
  return {
    isAuth: authStore.isAuthenticated,
    isLoading: authStore.isLoading,
    isFeedbackSending: authStore.isFeedbackSending,
    error: authStore.error,
    user: authStore.user,
    feedbacks: authStore.feedbacksList,
    login: authStore.login.bind(authStore),
    logout: authStore.logout.bind(authStore),
    sendFeedback: authStore.sendFeedback.bind(authStore),
  };
}; 