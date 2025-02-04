import { Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import { useAuthModal } from '@/stores/modals/hooks';
import { LoginForm } from '../LoginForm';

export const AuthModal = observer(() => {
  const { isOpen, closeAuthModal } = useAuthModal();

  return (
    <Modal open={isOpen} onCancel={closeAuthModal} footer={null}>
      <LoginForm />
    </Modal>
  );
}); 