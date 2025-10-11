import { Typography, Steps, Card } from 'antd';
import { Link } from 'react-router-dom';
import { Container } from '@/components/Container';
import HeroSection from '@/components/HeroSection';
import styles from './ChooseManagementPage.module.scss';
import { 
  NotificationOutlined, 
  TeamOutlined, 
  FileTextOutlined 
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export const ChooseManagementPage = () => {
  return (
    <div className={styles.page}>
      <HeroSection 
        title="Сделать УК «Холмсервис» своей управляющей компанией" 
        subtitle="Пошаговая инструкция для смены управляющей компании в вашем доме"
      />

      <section className={styles.content}>
        <Container>
          <div className={styles.stepsWrapper}>
            <Steps
              direction="vertical"
              current={-1}
              items={[
                {
                  title: 'Инициировать собрание',
                  description: (
                    <div className={styles.stepContent}>
                      <Paragraph>
                        За 10 дней до проведения собрания необходимо уведомить жильцов о предстоящем мероприятии.
                      </Paragraph>
                      <ul className={styles.list}>
                        <li>Разнести уведомления о дате и времени проведения собрания по квартирам собственников</li>
                        <li>Разместить информацию на информационных стендах</li>
                        <li>В уведомлении указать повестку собрания</li>
                      </ul>
                      <div className={styles.important}>
                        <strong>Важно!</strong> Принимать решение на собрании собственники смогут только по вопросам, внесенным в повестку
                      </div>
                    </div>
                  ),
                  icon: <NotificationOutlined />,
                },
                {
                  title: 'Как правильно составить повестку собрания?',
                  description: (
                    <div className={styles.stepContent}>
                      <ul className={styles.list}>
                        <li>Создать инициативную группу из собственников квартир</li>
                        <li>Выбрать и утвердить состав членов совета дома (совет дома ведет диалог и контролирует управляющую компанию от имени жителей, принимает решения о проведении ремонтов, если жители наделят его этими полномочиями)</li>
                        <li>Утвердить председателя и секретаря собрания</li>
                        <li>Утвердить условия договора управления</li>
                        <li>Утвердить тариф по управлению, содержанию и текущему ремонту общего имущества, определить порядок пользования общим имуществом</li>
                        <li>Установить минимальный размер платы за пользование общим имуществом (аренды)</li>
                        <li>Определить порядок уведомления собственников о результатах собрания</li>
                        <li>Определить места хранения копии протокола и других документов общего собрания</li>
                      </ul>
                    </div>
                  ),
                  icon: <FileTextOutlined />,
                },
                {
                  title: 'Своевременно и в установленный срок провести собрание',
                  description: (
                    <div className={styles.stepContent}>
                      <Paragraph>
                        На собрании необходимо обсудить все вопросы из повестки и принять по ним решения.
                      </Paragraph>
                      <ul className={styles.list}>
                        <li>Обсудить вопросы в повестке собрания</li>
                        <li>Принять решения по всем обсуждаемым вопросам</li>
                      </ul>
                    </div>
                  ),
                  icon: <TeamOutlined />,
                },
                {
                  title: 'По итогам собрания составить протокол и передать его в УК',
                  description: (
                    <div className={styles.stepContent}>
                      <Paragraph>
                        Оформление результатов собрания — финальный и очень важный этап.
                      </Paragraph>
                      <ul className={styles.list}>
                        <li>Составить письменный протокол не позднее 10 дней после проведения собрания</li>
                        <li>В протоколе указать дату и место проведения, повестку, кворум</li>
                        <li>Подписывают протокол председатель, секретарь и остальные члены совета дома</li>
                        <li>Решение собрания разместить на информационных стендах или разнести по квартирам собственников</li>
                        <li>Копии протокола выслать в старую и новую УК</li>
                        <li>Оригинал протокола хранится там, где решат собственники. Например, у председателя или в УК</li>
                      </ul>
                    </div>
                  ),
                  icon: <FileTextOutlined />,
                },
              ]}
            />
          </div>

          <Card className={styles.contactCard}>
            <Title level={3}>Нужна помощь?</Title>
            <Paragraph>
              Если у вас возникли вопросы или вам нужна консультация по смене управляющей компании, 
              свяжитесь с нами <Link to="/contacts" className={styles.contactLink}>любым удобным способом</Link>.
            </Paragraph>
          </Card>
        </Container>
      </section>
    </div>
  );
};

