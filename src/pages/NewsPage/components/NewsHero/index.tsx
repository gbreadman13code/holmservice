import { Typography, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { Container } from '@/components/Container';
import { formatDate } from '@/utils/formatDate';
import styles from './NewsHero.module.scss';
import { useLatestNews } from '@/stores/news/hooks';
import { observer } from 'mobx-react-lite';

const { Title, Text } = Typography;

const HeroSkeleton = () => (
  <section className={styles.hero}>
    <Container>
      <div className={styles.content}>
        <Text className={styles.label}>Последняя новость</Text>
        <Skeleton
          title={{ width: '80%', style: { height: 48, marginBottom: 24 } }}
          paragraph={{ rows: 0 }}
          active
        />
        <div className={styles.meta}>
          <Skeleton.Button
            active
            size="small"
            style={{ width: 120, marginRight: 8 }}
          />
          <span className={styles.separator}>•</span>
          <Skeleton.Button
            active
            size="small"
            style={{ width: 60 }}
          />
        </div>
      </div>
    </Container>
  </section>
);

export const NewsHero = observer(() => {
  const { news, loading } = useLatestNews();
  const latestNews = news[0];

  if (loading) return <HeroSkeleton />;
  if (!latestNews) return null;

  return (
    <Link to={`/news/${latestNews.id}`} className={styles.hero}>
      <Container>
        <div className={styles.content}>
          <Text className={styles.label}>Последняя новость</Text>
          <Title level={1} className={styles.title}>
            {latestNews.title}
          </Title>
          <div className={styles.meta}>
            <Text className={styles.date}>{formatDate(latestNews.created_at)}</Text>
            <span className={styles.separator}>•</span>
            <Text className={styles.readingTime}>{Math.ceil(latestNews.content.length / (180 * 5))} мин</Text>
          </div>
        </div>
      </Container>
    </Link>
  );
}); 