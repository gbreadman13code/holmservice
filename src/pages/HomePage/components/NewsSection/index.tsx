import { Typography, Button, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Container } from '@/components/Container';
import { NewsCard } from '@/components/NewsCard';
import styles from './NewsSection.module.scss';
import { useLatestNews } from '@/stores/news/hooks';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

const { Title, Paragraph } = Typography;

export const NewsSection = observer(() => {
  const navigate = useNavigate();
  const { news, loading } = useLatestNews();

  console.log(toJS(news))

  return (
    <section className={styles.news}>
      <Container>
        <div className={styles.header}>
          <div className={styles.headerInfo}>
            <Title level={2} className={styles.title}>ПОСЛЕДНИЕ НОВОСТИ</Title>
            <Paragraph className={styles.subtitle}>
              Информация о домах, отключениях и другие новости
            </Paragraph>
          </div>
          <Button type="default" onClick={() => navigate('/news')}>
            Все новости
          </Button>
        </div>
        <div className={styles.grid}>
          {loading ? (
            <div className={styles.loader}>
              <Spin size="large" />
            </div>
          ) : (
            news.map(newsItem => (
              <NewsCard key={newsItem.id} news={newsItem} />
            ))
          )}
        </div>
      </Container>
    </section>
  );
}); 