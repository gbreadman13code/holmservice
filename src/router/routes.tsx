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

export const publicRoutes = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: '/holmservice/',
        element: <HomePage />
      },
      { path: 'news', element: <NewsPage /> },
      { path: 'news/:slug', element: <NewsItemPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'documents', element: <DocumentsPage /> },
      { path: 'contacts', element: <ContactsPage /> },
      { path: 'my-home', element: <MyHomePage /> },
    ]
  },
];

export const privateRoutes = [
  {
    path: '/profile',
    element: <MainLayout />,
    children: [
      { index: true, element: <AccountPage /> },
    ]
  }
]; 