import { MainLayout } from '@/layouts/MainLayout/MainLayout';
import { LoginPage } from '@/pages/LoginPage';
import { HomePage } from '@/pages/HomePage';
import { NewsPage } from '@/pages/NewsPage';
import { NewsItemPage } from '@/pages/NewsItemPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactsPage } from '@/pages/ContactsPage';
import { DocumentsPage } from '@/pages/DocumentsPage';
import { MyHomePage } from '@/pages/MyHomePage';
import { AccountPage } from '@/pages/AccountPage';
import { PrivateRoute } from '@/components/PrivateRoute';

// Все маршруты в одном layout
export const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'news', element: <NewsPage /> },
      { path: 'news/:slug', element: <NewsItemPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'documents', element: <DocumentsPage /> },
      { path: 'contacts', element: <ContactsPage /> },
      { path: 'my-home', element: <MyHomePage /> },
      { path: 'login', element: <LoginPage /> },
      { 
        path: 'account', 
        element: <PrivateRoute><AccountPage /></PrivateRoute> 
      }
    ]
  }
];

// Публичные маршруты (доступны всем)
export const publicRoutes = routes;

// Приватные маршруты (требуют авторизации)
export const privateRoutes = [
  { path: '/account', element: <AccountPage /> }
]; 