import { Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import { useAuthModal } from '@/stores/modals/hooks';
import { LoginForm } from '../LoginForm';
import { useAuth } from '@/stores/auth';
import { useEffect } from 'react';

export const AuthModal = observer(() => {
  const { isOpen, closeAuthModal } = useAuthModal();

  const { isAuth } = useAuth();

  useEffect(() => {
    if (isAuth) {
      closeAuthModal();
    }
  }, [isAuth, closeAuthModal]);

  return (
    <Modal open={isOpen} onCancel={closeAuthModal} footer={null}>
      <LoginForm />
    </Modal>
  );
}); 