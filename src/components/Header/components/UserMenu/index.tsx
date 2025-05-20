import { Button } from 'antd';
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { useAuthModal } from '@/stores/modals/hooks';
import { useAuth } from '@/stores/auth/hooks';
import { useNavigate } from 'react-router-dom';
import styles from './UserMenu.module.scss';
import { AuthModal } from '@/components/AuthModal';
import { useMemo } from 'react';
import { useContacts } from '@/stores/contacts/hooks';

interface UserMenuProps {
  isMobile?: boolean;
}

export const UserMenu = ({ isMobile }: UserMenuProps) => {
  const { openAuthModal } = useAuthModal();
  const { contacts } = useContacts();
  
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const commonPhone = useMemo(() => {
    return contacts?.phones.find(phone => phone.is_common)?.phones[0].value;
  }, [contacts]);

  console.log(commonPhone)
  
  const handleCabinetClick = () => {
    if (isAuth) {
      navigate('/account');
    } else {
      openAuthModal();
    }
  };

  if (isMobile) {
    return (
      <div className={styles.mobileMenu}>
        <Button 
        type="text" 
        icon={<PhoneOutlined />}
        href={`tel:${commonPhone}`}
      >
        {commonPhone}
      </Button>
        
        <Button 
          type="primary" 
          block
          icon={<UserOutlined />}
          onClick={handleCabinetClick}
          className={styles.mobileButton}
        >
          Личный кабинет
        </Button>

        <AuthModal />
      </div>
    );
  }

  return (
    <div className={styles.menu}>
      <Button 
        type="text" 
        icon={<PhoneOutlined />}
        href={`tel:${commonPhone}`}
      >
        {commonPhone}
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