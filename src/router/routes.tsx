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
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { FeedbackPage } from '@/pages/FeedbackPage';

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
      { path: 'feedback', element: <FeedbackPage /> },
      { 
        path: 'account', 
        element: <ProtectedRoute><AccountPage /></ProtectedRoute> 
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