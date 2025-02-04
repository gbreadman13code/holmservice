export const authService = {
  getAccessToken: () => localStorage.getItem('accessToken'),
  refreshToken: async () => {
    // Здесь будет логика обновления токена
    const newToken = await fetch('/api/refresh').then(r => r.text());
    localStorage.setItem('accessToken', newToken);
    return newToken;
  },
  logout: () => {
    localStorage.removeItem('accessToken');
  }
}; 