import { Typography } from 'antd';
import { PictureOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import styles from './NewsCard.module.scss';
import { Link } from 'react-router-dom';
import { NewsItem } from '@/stores/news/types';
import { HtmlContent } from '@/components/HtmlContent';
const { Title } = Typography;

const WORDS_PER_MINUTE = 180;
const CHARS_PER_WORD = 5; // Среднее количество символов в слове

interface NewsCardProps {
  news: NewsItem;
}

// Мини-компонент для заглушки изображения
const ImagePlaceholder = ({ title }: { title: string }) => (
  <div className={styles.imagePlaceholder}>
    <div className={styles.placeholderTitleWrapper}>
    <Title level={5} className={styles.placeholderTitle}>{title}</Title>
    </div>
  </div>
);

export const NewsCard = ({ news }: NewsCardProps) => {
  // Форматируем дату, предварительно распарсив её
  const formattedDate = format(parseISO(news.created_at), 'd MMMM yyyy', { locale: ru });
  
  // Вычисляем время чтения на основе количества символов в полном тексте
  const readingTime = Math.ceil(news.content.length / (WORDS_PER_MINUTE * CHARS_PER_WORD));

  // Проверяем наличие медиа-контента
  const hasPhotos = news.photos && news.photos.length > 0;
  const hasVideo = !!news.vk_video_link;
  const hasMedia = hasPhotos || hasVideo;

  return (
    <Link to={`/news/${news.slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {news.cover ? (
          <img src={news.cover} alt={news.title} className={styles.image} />
        ) : (
          <ImagePlaceholder title={news.title} />
        )}
      </div>
      <div className={styles.content}>
        <Title level={5} className={styles.title}>{news.title}</Title>
        <HtmlContent content={news.content} hideUrls className={styles.description} maxLines={4} />
        <div className={styles.meta}>
          <time dateTime={news.created_at}>{formattedDate}</time>
          <span className={styles.separator}>•</span>
          <span>{readingTime} мин</span>
          
          {hasMedia && (
            <>
              <span className={styles.separator}>•</span>
              <div className={styles.mediaIcons}>
                {hasPhotos && (
                  <span className={styles.mediaItem}>
                    <PictureOutlined />
                    <span>{news.photos.length}</span>
                  </span>
                )}
                {hasVideo && (
                  <span className={styles.mediaItem}>
                    <VideoCameraOutlined />
                    <span>1</span>
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}; 