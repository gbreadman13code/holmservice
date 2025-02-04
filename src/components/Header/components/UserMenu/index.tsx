import { Button } from 'antd';
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { useAuthModal } from '@/stores/modals/hooks';
import { useAuth } from '@/stores/auth/hooks';
import { useNavigate } from 'react-router-dom';
import styles from './UserMenu.module.scss';
import { AuthModal } from '@/components/AuthModal';

export const UserMenu = () => {
  const { openAuthModal } = useAuthModal();
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const handleCabinetClick = () => {
    if (isAuth) {
      navigate('/account');
    } else {
      openAuthModal();
    }
  };

  return (
    <div className={styles.menu}>
      <Button 
        type="text" 
        icon={<PhoneOutlined />}
        href="tel:+78001234567"
      >
        8 (800) 123-45-67
      </Button>
      
      <Button 
        type="primary" 
        icon={<UserOutlined />}
        onClick={handleCabinetClick}
      >
        Личный кабинет
      </Button>

      <AuthModal />
    </div>
  );
}; 