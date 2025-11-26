import { Typography, Row, Col, Button } from "antd";
import { Container } from "@/components/Container";
import styles from "./AboutPage.module.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Photo from "@/assets/ivanova.jpg";

const { Title, Text, Paragraph } = Typography;

export const AboutPage = () => {
  const navigate = useNavigate();
  const [houses, setHouses] = useState(0);
  const [residents, setResidents] = useState(0);
  const [years, setYears] = useState(0);

  useEffect(() => {
    const startDate = new Date("2005-12-05");
    const duration = 2000; // 4 секунды
    const housesTarget = 119;
    const residentsTarget = 40000;
    const yearsTarget = new Date().getFullYear() - startDate.getFullYear();

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

  const handleChooseManagementClick = () => {
    navigate("/choose-management");
  };

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
                <Title level={3}>{houses}</Title>
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
          <Row justify="center" style={{ marginTop: "70px" }}>
            <Button
              type="primary"
              size="large"
              onClick={handleChooseManagementClick}
            >
              Сделать своей УК
            </Button>
          </Row>
        </Container>
      </section>

      <section className={styles.content}>
        <Container>
          <div className={styles.quote}>
            <Row gutter={[48, 24]} align="middle">
              <Col xs={24} lg={2}>
                <div className={styles.quoteMark}>&quot;</div>
              </Col>
              <Col xs={24} lg={14}>
                <div className={styles.quoteContent}>
                  <Text className={styles.quoteText}>
                    Усилия нашей компании в первую очередь направлены на
                    создание безопасной и комфортной среды для каждого жителя.
                    Также особую роль для нас играет создание благоустроенного
                    пространства - где много зелени, соседи рады общаться друг с
                    другом, а дети играют вместе.
                  </Text>
                  <Text className={styles.quoteText}>
                    За 20 лет работы мы заработали уникальный для Красноярска
                    опыт, сформировали команду профессионалов и оптимизировали
                    процессы обслуживания многоквартирных домов, где за каждый
                    этап работы отвечает конкретный специалист.
                  </Text>
                  <Text className={styles.quoteAuthor}>
                    - Иванова Ирина Ивановна,
                    <br /> генеральный директор УК «Холмсервис»
                  </Text>
                </div>
              </Col>
              <Col xs={24} lg={8}>
                <div className={styles.quoteImage}>
                  <img src={Photo} alt="Иванова Ирина Ивановна" />
                </div>
              </Col>
            </Row>
          </div>

          <Row gutter={[48, 48]}>
            <Col xs={24} md={12}>
              <div className={styles.mainInfo}>
                <Title level={2}>Мы создаем комфорт</Title>
                <Paragraph>
                  Управляющая компания «Холмсервис» работает на рынке
                  жилищно-коммунальных услуг с 2005 года. За это время мы
                  накопили богатый опыт в управлении многоквартирными домами и
                  заслужили доверие тысяч жителей Красноярска.
                </Paragraph>
                <Paragraph>
                  Наша главная цель — обеспечить комфортное и безопасное
                  проживание в доверенных нам домах. Мы постоянно совершенствуем
                  качество обслуживания, внедряем современные технологии и
                  развиваем онлайн-сервисы для удобства наших жильцов.
                </Paragraph>
                <Paragraph>
                  Наша команда состоит из высококвалифицированных специалистов,
                  каждый из которых имеет многолетний опыт работы в сфере ЖКХ.
                  Мы регулярно проводим обучение персонала и следим за
                  последними тенденциями в области управления недвижимостью.
                </Paragraph>
                <Paragraph>
                  Особое внимание мы уделяем экологической безопасности и
                  энергоэффективности. В обслуживаемых нами домах внедряются
                  современные системы учета ресурсов, устанавливается
                  энергосберегающее оборудование и применяются экологически
                  чистые материалы.
                </Paragraph>
                <Paragraph>
                  Мы гордимся тем, что являемся надежным партнером для наших
                  жильцов и всегда готовы к открытому диалогу. Наша управляющая
                  компания регулярно проводит встречи с жителями, где мы
                  обсуждаем текущие вопросы и планы по улучшению качества
                  обслуживания.
                </Paragraph>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className={styles.imageWrapper}>
                <img
                  src={
                    "https://s16.stc.yc.kpcdn.net/share/i/4/2097403/wr-750.webp"
                  }
                  alt="Офис компании"
                  className={styles.image}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};
