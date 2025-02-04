import { ConfigProvider } from 'antd';
import { PropsWithChildren } from 'react';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#027333',
          fontFamily: 'Gogh, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          fontSize: 14,
          borderRadius: 4,
        }
      }}
    >
      {children}
    </ConfigProvider>
  );
}; 