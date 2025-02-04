import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { authStore } from '@/stores/index';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = observer(({ children }: ProtectedRouteProps) => {
  if (!authStore.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}); 