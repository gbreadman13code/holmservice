import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { publicRoutes, privateRoutes } from './routes.tsx';

const router = createBrowserRouter([
  ...publicRoutes,
  {
    element: <PrivateRoute />,
    children: privateRoutes,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
}; 