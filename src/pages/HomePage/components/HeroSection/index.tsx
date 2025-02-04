import { Typography } from 'antd';
import { Container } from '@/components/Container';
import { EmergencyPhones } from '../EmergencyPhones';
import styles from './HeroSection.module.scss';
import { LoginForm } from '@/components/LoginForm';

const { Title, Text } = Typography;

export const HeroSection = () => {

  return (
    <div className={styles.hero}>
      <section className={styles.mainHero}>
        <Container>
          <div className={styles.content}>
            <div className={styles.info}>
              <Title level={1}>Управляющая компания холмсервис</Title>
              <Text className={styles.slogan}>
                Профессиональное управление многоквартирными домами
              </Text>
            </div>

            <div className={styles.loginCard}>
            <LoginForm />
            </div>
          </div>
        </Container>
      </section>
      <EmergencyPhones />
    </div>
  );
}; 