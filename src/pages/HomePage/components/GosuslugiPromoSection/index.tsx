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

  const handleGosuslugiDom = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isApple = /safari|macintosh|iphone|ipad|ipod/.test(userAgent) || 
                   /mac os x/.test(userAgent) || 
                   /webkit/.test(userAgent);
    
    console.log(isApple ? 'айфон' : 'андроид');

    if (isApple) {
      window.open('https://apps.apple.com/ru/app/%D0%B3%D0%BE%D1%81%D1%83%D1%81%D0%BB%D1%83%D0%B3%D0%B8-%D0%B4%D0%BE%D0%BC/id1616550510', '_blank');
    } else {
      window.open('https://play.google.com/store/apps/details?id=ru.sigma.gisgkh&hl=ru&gl=US', '_blank');
    }
  };

  return (
    <section className={styles.promo}>
      <Container>
        <div className={styles.content}>
          <div className={styles.info}>
            <Title level={2}>Решение всех вопросов ЖКХ <br /> в Госуслуги.Дом</Title>
            <Paragraph className={styles.description}>
              «Госуслуги.Дом» — приложение для собственников жилья <br /> в многоквартирных домах
            </Paragraph>
            <ul className={styles.features}>
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <Button type="primary" size="large" onClick={handleGosuslugiDom}>
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