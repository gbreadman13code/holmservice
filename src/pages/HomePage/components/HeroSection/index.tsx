import { Typography } from 'antd';
import { Container } from '@/components/Container';
import { EmergencyPhones } from '../EmergencyPhones';
import styles from './HeroSection.module.scss';
import { LoginForm } from '@/components/LoginForm';
import teamWorkIllustration from '@/assets/illustrations/team-work.svg';
import { authStore } from '@/stores';
import { observer } from 'mobx-react-lite';

const { Title, Text } = Typography;

export const HeroSection = observer(() => {
  return (
    <div className={styles.hero}>
      <section className={styles.mainHero}>
        <Container>
          <div className={styles.content}>
            <div className={styles.info}>
              <Title level={1}>Управляющая компания «Холмсервис»</Title>
              <Text className={styles.slogan}>
              С заботой о вашем доме
              </Text>
            </div>

            <div className={styles.illustration}>
              <img src={teamWorkIllustration} alt="Команда профессионалов" />
            </div>

            {!authStore.isAuthenticated && <div className={styles.loginCard}>
              <LoginForm />
            </div>
            }
          </div>
        </Container>
      </section>
      <EmergencyPhones />
    </div>
  );
}); 