import { Typography, Row, Col } from 'antd';
import { Container } from '@/components/Container';
import styles from './AboutPage.module.scss';
import { useEffect, useState } from 'react';

const { Title, Text, Paragraph } = Typography;

export const AboutPage = () => {
  const [houses, setHouses] = useState(0);
  const [residents, setResidents] = useState(0);
  const [years, setYears] = useState(0);

  useEffect(() => {
    const duration = 2000; // 4 секунды
    const housesTarget = 50;
    const residentsTarget = 15000;
    const yearsTarget = 13;

    const startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setHouses(Math.floor(housesTarget * progress));
      setResidents(Math.floor(residentsTarget * progress));
      setYears(Math.floor(yearsTarget * progress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, []);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <Container>
          <Title level={1}>О компании</Title>
          <Text className={styles.subtitle}>
            Управляем вашим домом и заботимся о вас
          </Text>

          <Row gutter={[32, 12]} className={styles.features}>
            <Col xs={24} md={8}>
              <div className={styles.feature}>
                <Title level={3}>{houses}+</Title>
                <Text>домов в управлении</Text>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className={styles.feature}>
                <Title level={3}>{residents}+</Title>
                <Text>довольных жителей</Text>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className={styles.feature}>
                <Title level={3}>{years} лет</Title>
                <Text>успешной работы</Text>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className={styles.content}>
        <Container>

        <div className={styles.quote}>
            <Text className={styles.quoteText}>
              "Мы не просто управляем домами — мы создаем пространство для комфортной жизни"
            </Text>
            <Text className={styles.quoteAuthor}>
              Ирина Сидорова, генеральный директор
            </Text>
          </div>
          
          <Row gutter={[48, 48]}>
            <Col xs={24} md={12}>
              <div className={styles.mainInfo}>
                <Title level={2}>Мы создаем комфорт</Title>
                <Paragraph>
                  Управляющая компания "Холмсервис" работает на рынке жилищно-коммунальных услуг с 2010 года. 
                  За это время мы накопили богатый опыт в управлении многоквартирными домами и заслужили 
                  доверие тысяч жителей Красноярска.
                </Paragraph>
                <Paragraph>
                  Наша главная цель — обеспечить комфортное и безопасное проживание в доверенных нам домах. 
                  Мы постоянно совершенствуем качество обслуживания, внедряем современные технологии и 
                  развиваем онлайн-сервисы для удобства наших жильцов.
                </Paragraph>
                <Paragraph>
                  Наша команда состоит из высококвалифицированных специалистов, каждый из которых имеет 
                  многолетний опыт работы в сфере ЖКХ. Мы регулярно проводим обучение персонала и следим 
                  за последними тенденциями в области управления недвижимостью.
                </Paragraph>
                <Paragraph>
                  Особое внимание мы уделяем экологической безопасности и энергоэффективности. В обслуживаемых 
                  нами домах внедряются современные системы учета ресурсов, устанавливается энергосберегающее 
                  оборудование и применяются экологически чистые материалы.
                </Paragraph>
                <Paragraph>
                  Мы гордимся тем, что являемся надежным партнером для наших жильцов и всегда готовы к 
                  открытому диалогу. Наша управляющая компания регулярно проводит встречи с жителями, 
                  где мы обсуждаем текущие вопросы и планы по улучшению качества обслуживания.
                </Paragraph>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className={styles.imageWrapper}>
                <img src={'https://s16.stc.yc.kpcdn.net/share/i/4/2097403/wr-750.webp'} alt="Офис компании" className={styles.image} />
              </div>
            </Col>
          </Row>

          

          
        </Container>
      </section>
    </div>
  );
}; 