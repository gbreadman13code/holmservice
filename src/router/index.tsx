import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout/MainLayout';
import { HomePage } from '@/pages/HomePage';
import { NewsPage } from '@/pages/NewsPage';
import { NewsItemPage } from '@/pages/NewsItemPage';
import { DocumentsPage } from '@/pages/DocumentsPage';
import { RsoPage } from '@/pages/DocumentsPage/RsoPage';
import { TemplatesPage } from '@/pages/DocumentsPage/TemplatesPage';
import { TermsPage } from '@/pages/DocumentsPage/TermsPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactsPage } from '@/pages/ContactsPage';
import { MyHomePage } from '@/pages/MyHomePage';
import { AccountPage } from '@/pages/AccountPage';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'news', element: <NewsPage /> },
      { path: 'news/:slug', element: <NewsItemPage /> },
      { path: 'documents', element: <DocumentsPage /> },
      { path: 'documents/rso', element: <RsoPage /> },
      { path: 'documents/templates', element: <TemplatesPage /> },
      { path: 'documents/terms', element: <TermsPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contacts', element: <ContactsPage /> },
      { path: 'my-home', element: <MyHomePage /> },
      {
        path: 'account',
        element: (
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        )
      }
    ]
  }
]); 