import { ConfigProvider } from 'antd';
import { RouterProvider } from 'react-router-dom';
import ruRU from 'antd/locale/ru_RU';
import './styles/global.scss';
import { ThemeProvider } from './providers/ThemeProvider';
import { router } from './router';

export const App = () => {
  return (
    <ThemeProvider>
      <ConfigProvider locale={ruRU}>
          <RouterProvider router={router} />
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default App;
