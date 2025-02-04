import { Typography, Button, Menu } from 'antd';
import { Container } from '@/components/Container';
import { useAuth } from '@/stores/auth/hooks';
import styles from './AccountPage.module.scss';
import { useState } from 'react';
import {
  DashboardOutlined,
  CalculatorOutlined,
  CreditCardOutlined,
  MessageOutlined
} from '@ant-design/icons';
import { MetersSection } from './components/MetersSection';
import { ChargesSection } from './components/ChargesSection';
import { PaymentsSection } from './components/PaymentsSection';
import { FeedbackSection } from './components/FeedbackSection';

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
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [selectedMenuItem, setSelectedMenuItem] = useState('meters');

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
          <Title level={1}>{user.firstName} {user.lastName}</Title>
          <div className={styles.addressButtons}>
            {user.addresses.map((address, index) => (
              <Button
                key={index}
                type={selectedAddressIndex === index ? 'primary' : 'default'}
                onClick={() => setSelectedAddressIndex(index)}
              >
                {`${address.street}, ${address.house}, кв. ${address.apartment}`}
              </Button>
            ))}
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