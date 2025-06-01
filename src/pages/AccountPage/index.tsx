import { Menu, Typography } from 'antd';
import { Container } from '@/components/Container';
import { useAuth } from '@/stores/auth/hooks';
import styles from './AccountPage.module.scss';
import { useState, useEffect } from 'react';
import {
  DashboardOutlined,
  CalculatorOutlined,
  CreditCardOutlined,
  MessageOutlined,
  HomeOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { MetersSection } from './components/MetersSection';
import { ChargesSection } from './components/ChargesSection';
import { PaymentsSection } from './components/PaymentsSection';
import { FeedbackSection } from './components/FeedbackSection';
import { Navigate, useLocation } from 'react-router-dom';
import accountIllustration from '@/assets/illustrations/account-img.svg';
import Title from 'antd/es/typography/Title';
import { authStore } from '@/stores';
import { HiddenText } from '@/components/HiddenText';

const menuItems = [
  {
    key: 'meters',
    icon: <DashboardOutlined />,
    label: 'Показания счетчиков'
  },
  {
    key: 'charges',
    icon: <CalculatorOutlined />,
    label: 'Начисления'
  },
  {
    key: 'payments',
    icon: <CreditCardOutlined />,
    label: 'Мои платежи'
  },
  {
    key: 'feedback',
    icon: <MessageOutlined />,
    label: 'Обратная связь'
  },
  {
    key: 'logout',
    icon: <LogoutOutlined />,
    label: 'Выйти'
  },
];

export const AccountPage = () => {
  const { user } = useAuth();
  const [selectedMenuItem, setSelectedMenuItem] = useState('meters');
  const location = useLocation();

  useEffect(() => {
    // Проверяем наличие якоря в URL и устанавливаем соответствующий пункт меню
    if (location.hash === '#feedback') {
      setSelectedMenuItem('feedback');

      window.history.pushState(null, '', location.pathname);
    }
  }, [location]);
    
  if (!user) return null;

  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'meters':
        return <MetersSection />;
      case 'charges':
        return <ChargesSection />;
      case 'payments':
        return <PaymentsSection />;
      case 'feedback':
        return <FeedbackSection />;
      case 'logout':
        authStore.logout();
        return <Navigate to="/" />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <Container>
          <div className={styles.heroContent}>
                  <div className={styles.heroInfo}>
                    <Title level={1}>{user.name_kvartir}</Title>
                    <div className={styles.debtInfo}>
                      <HiddenText 
                        value={user.cur_balance}
                        prefix="Текущая задолженность: "
                        suffix=" рублей"
                      />
                    </div>
                    <div className={styles.addressTextWrapper}>
                      <Typography.Text strong className={styles.addressText}>
                        <HomeOutlined style={{ marginRight: 8 }} />
                        {`${user.address}`}
                      </Typography.Text>
                    </div>
                  </div>
            <div className={styles.heroImage}>
              <img src={accountIllustration} alt="Личный кабинет" />
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.content}>
        <Container>
          <div className={styles.grid}>
             <Menu
              className={styles.menu}
              selectedKeys={[selectedMenuItem]}
              items={menuItems}
              onClick={({ key }) => setSelectedMenuItem(key)}
              mode={"vertical"}
            /> 
            <div className={styles.contentArea}>
              {renderContent()}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}; 