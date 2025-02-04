import { Typography, Button } from 'antd';
import { Container } from '@/components/Container';
import phCardNews from '@/assets/gos_dom.jpg';
import styles from './GosuslugiPromoSection.module.scss';

const { Title, Paragraph } = Typography;

const features = [
  'Передавайте данные по всем счётчикам',
  'Оплачивайте все услуги ЖКХ',
  'Узнавайте о плановых работах и аварийных ситуациях в доме',
  'Направляйте обращения в управляющую организацию',
  'Участвуйте в голосованиях по общедомовым вопросам'
];

export const GosuslugiPromoSection = () => {
  return (
    <section className={styles.promo}>
      <Container>
        <div className={styles.content}>
          <div className={styles.info}>
            <Title level={2}>Решение всех вопросов ЖКХ в Госуслуги.Дом</Title>
            <Paragraph className={styles.description}>
              «Госуслуги.Дом» — приложение для собственников жилья в многоквартирных домах
            </Paragraph>
            <ul className={styles.features}>
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <Button type="primary" size="large">
              Перейти
            </Button>
          </div>
          <div className={styles.image}>
            <img src={phCardNews} alt="Госуслуги.Дом" />
          </div>
        </div>
      </Container>
    </section>
  );
}; 