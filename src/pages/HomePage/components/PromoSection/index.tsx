import { Typography, Button, Space } from 'antd';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
import { Container } from '@/components/Container';
import styles from './PromoSection.module.scss';
import mobileLoginIllustration from '@/assets/illustrations/mobile-login.svg';

const { Title, Paragraph } = Typography;

export const PromoSection = () => {

  const handleAppDownload = (platform: 'ios' | 'android') => {
    if (platform === 'ios') {
      window.open('https://apps.apple.com/ru/app/%D1%83%D0%BA-%D1%85%D0%BE%D0%BB%D0%BC%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81/id1506237113', '_blank');
    } else {
      window.open('https://play.google.com/store/apps/details?id=ru.krasabs.holmservice&pli=1', '_blank');
    }
  };

  return (
    <section className={styles.promo}>
      <Container>
        <div className={styles.content}>
          <div className={styles.info}>
            <Title level={2}>Холмсервис <br /> в вашем мобильном телефоне</Title>
            <Paragraph className={styles.description}>
              Платите за коммунальные услуги и передавайте показания счетчиков легко - в мобильном приложении УК «Холмсервис»
            </Paragraph>
            <Space size="middle">
              <Button type="primary" icon={<AppleOutlined />} size="large" onClick={() => handleAppDownload('ios')}>
                Скачать для iOS
              </Button>
              <Button type="primary" icon={<AndroidOutlined />} size="large" onClick={() => handleAppDownload('android')}>
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