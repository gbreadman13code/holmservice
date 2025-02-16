import { Typography, Button, Space } from 'antd';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
import { Container } from '@/components/Container';
import phCardNews from '@/assets/placeholders/ph-card-news.png';
import styles from './PromoSection.module.scss';
import mobileLoginIllustration from '@/assets/illustrations/mobile-login.svg';

const { Title, Paragraph } = Typography;

export const PromoSection = () => {
  return (
    <section className={styles.promo}>
      <Container>
        <div className={styles.content}>
          <div className={styles.info}>
            <Title level={2}>ХолмСервис в вашем мобильном телефоне</Title>
            <Paragraph className={styles.description}>
              Платите за коммунальные услуги и передавайте показания счетчиков легко - в мобильном приложении УК "ХолмСервис"
            </Paragraph>
            <Space size="middle">
              <Button type="primary" icon={<AppleOutlined />} size="large">
                Скачать для iOS
              </Button>
              <Button type="primary" icon={<AndroidOutlined />} size="large">
                Скачать для Android
              </Button>
            </Space>
          </div>
          <div className={styles.image}>
            <img src={mobileLoginIllustration} alt="Мобильное приложение" />
          </div>
        </div>
      </Container>
    </section>
  );
}; 