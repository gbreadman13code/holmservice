import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useAuth } from '@/stores/auth';
import { PropsWithChildren } from 'react';

export const PrivateRoute = observer(({ children }: PropsWithChildren) => {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}); 