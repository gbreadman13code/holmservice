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
import { TermsPage } from '@/pages/DocumentsPage/TermsPage';
import { TemplatesPage } from '@/pages/DocumentsPage/TemplatesPage';
import { DetailsPage } from '@/pages/DocumentsPage/DetailsPage';
import { PaidServicesPage } from '@/pages/DocumentsPage/PaidServicesPage';
import { ChooseManagementPage } from '@/pages/ChooseManagementPage';

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
      { path: 'documents/templates', element: <TemplatesPage /> },
      { path: 'documents/terms', element: <TermsPage /> },
      { path: 'documents/details', element: <DetailsPage /> },
      { path: 'documents/paid-services', element: <PaidServicesPage /> },
      { path: 'contacts', element: <ContactsPage /> },
      { path: 'my-home', element: <MyHomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'feedback', element: <FeedbackPage /> },
      { path: 'choose-management', element: <ChooseManagementPage /> },
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