export const authMock = {
  login: async (username: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (username === 'test' && password === 'test') {
      return { success: true };
    }
    throw new Error('Неверные учетные данные');
  },
  logout: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  }
}; 