import { Typography, Menu } from 'antd';
import { Container } from '@/components/Container';
import { useAuth } from '@/stores/auth/hooks';
import styles from './AccountPage.module.scss';
import { useState, useEffect } from 'react';
import {
  DashboardOutlined,
  CalculatorOutlined,
  CreditCardOutlined,
  MessageOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { MetersSection } from './components/MetersSection';
import { ChargesSection } from './components/ChargesSection';
import { PaymentsSection } from './components/PaymentsSection';
import { FeedbackSection } from './components/FeedbackSection';
import { useLocation } from 'react-router-dom';
import accountIllustration from '@/assets/illustrations/account-img.svg';

const { Title } = Typography;

const menuItems = [
  {
    key: 'meters',
    icon: <DashboardOutlined />,
    label: 'Передать показания счетчиков'
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
  }
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
              <Title level={1}>{user.firstName} {user.lastName}</Title>
              <div className={styles.addressTextWrapper}>
                <Typography.Text strong className={styles.addressText}>
                  <HomeOutlined style={{ marginRight: 8 }} />
                  {`${user.address.street}, ${user.address.house}, кв. ${user.address.apartment}`}
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