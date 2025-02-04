import { Typography, Skeleton, Button, message } from 'antd';
import { Container } from '@/components/Container';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { newsStore } from '@/stores/news';
import { formatDate } from '@/utils/formatDate';
import { ArrowLeftOutlined, LinkOutlined } from '@ant-design/icons';
import styles from './NewsItemPage.module.scss';

const { Title, Text, Paragraph } = Typography;

const NewsItemSkeleton = () => (
  <div className={styles.skeleton}>
    <Skeleton
      active
      title={{ width: '80%', style: { height: 48, marginBottom: 24 } }}
      paragraph={{ rows: 1, width: ['30%'] }}
    />
    <Skeleton
      active
      paragraph={{ rows: 8 }}
      className={styles.content}
    />
  </div>
);

export const NewsItemPage = observer(() => {
  const { slug } = useParams<{ slug: string }>();
  const { currentNews, loading, currentPage } = newsStore;
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      void newsStore.fetchNewsBySlug(slug);
    }
  }, [slug]);

  const handleBackClick = () => {
    if (!document.referrer.includes('/news') || currentPage === 1) {
      navigate('/news');
    } else {
      navigate(`/news?page=${currentPage}`);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    void message.success('Ссылка скопирована');
  };

  if (loading) {
    return <NewsItemSkeleton />;
  }

  if (!currentNews) {
    return (
      <Container>
        <Title level={1}>Новость не найдена</Title>
      </Container>
    );
  }

  return (
    <Container>
      <article className={styles.article}>
        <div className={styles.narrow}>
          <button 
            className={styles.backLink} 
            onClick={handleBackClick}
          >
            <ArrowLeftOutlined /> Все новости
          </button>
          
          <Title level={1} className={styles.title}>
            {currentNews.title}
          </Title>

          <div className={styles.meta}>
            <div className={styles.metaInfo}>
              <Text>{formatDate(currentNews.publishDate)}</Text>
              <span className={styles.separator}>•</span>
              <Text>{Math.ceil(currentNews.fullTextCharCount / (180 * 5))} мин</Text>
            </div>
            <Button 
              type="text" 
              icon={<LinkOutlined />}
              onClick={handleCopyLink}
            >
              Скопировать ссылку
            </Button>
          </div>
        </div>

        <div className={styles.content}>
          <img src={currentNews.imageUrl} alt={currentNews.title} className={styles.image} />
          <Paragraph className={styles.text} style={{ whiteSpace: 'pre-line' }}>
            {currentNews.fullText}
          </Paragraph>
        </div>
      </article>
    </Container>
  );
}); 