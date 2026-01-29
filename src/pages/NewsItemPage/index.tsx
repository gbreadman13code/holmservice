import { Typography, Skeleton, Button, message, Carousel, Image } from 'antd';
import { Container } from '@/components/Container';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { newsStore } from '@/stores/news';
import { formatDate } from '@/utils/formatDate';
import { ArrowLeftOutlined, LinkOutlined } from '@ant-design/icons';
import { HtmlContent } from '@/components/HtmlContent';
import styles from './NewsItemPage.module.scss';
const { Title, Text } = Typography;

const NewsItemSkeleton = () => (
  <div className={styles.skeleton}>
    <Skeleton
      active
      title={{ width: '80%', style: { height: 48, marginBottom: 24 } }}
      paragraph={{ rows: 1, width: ['30%'] }}
    />
    <Skeleton active paragraph={{ rows: 8 }} className={styles.content} />
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

  const images = [currentNews.cover, ...currentNews.photos.map((photo) => photo.photo)].filter(Boolean) as string[];

  return (
    <Container>
      <article className={styles.article}>
        <div className={styles.narrow}>
          <button className={styles.backLink} onClick={handleBackClick}>
            <ArrowLeftOutlined /> Все новости
          </button>

          <Title level={1} className={styles.title}>
            {currentNews.title}
          </Title>

          <div className={styles.meta}>
            <div className={styles.metaInfo}>
              <Text>{formatDate(currentNews.created_at)}</Text>
              <span className={styles.separator}>•</span>
              <Text>{Math.ceil(currentNews.content.length / (180 * 5))} мин</Text>
            </div>
            <Button type="text" icon={<LinkOutlined />} onClick={handleCopyLink} className={styles.copyLink}>
              Скопировать ссылку
            </Button>
          </div>
        </div>

        <div className={styles.content}>
          {images.length && (
            <div className={styles.videoSlider}>
              <Carousel autoplay={false} dots={true}>
                {images.map((image, index) => (
                  <div key={index} className={styles.imageWrapper}>
                    <Image src={image} alt={currentNews.title} />
                  </div>
                ))}
              </Carousel>
            </div>
          )}

          {currentNews.vk_video_link && (
            <div className={styles.videoSlider}>
              <iframe
                src={currentNews.vk_video_link}
                width="100%"
                height="500"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"></iframe>
            </div>
          )}
          <HtmlContent content={currentNews.content} className={styles.text} />
        </div>
      </article>
    </Container>
  );
});
