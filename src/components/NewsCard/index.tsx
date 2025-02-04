import { Typography } from 'antd';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import styles from './NewsCard.module.scss';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const WORDS_PER_MINUTE = 180;
const CHARS_PER_WORD = 5; // Среднее количество символов в слове

export interface NewsItem {
  id: number;
  title: string;
  description: string;
  fullTextCharCount: number;
  imageUrl: string;
  publishDate: string; // В формате 'YYYY-MM-DD'
  slug: string;
}

interface NewsCardProps {
  news: NewsItem;
}

export const NewsCard = ({ news }: NewsCardProps) => {
  // Форматируем дату, предварительно распарсив её
  const formattedDate = format(parseISO(news.publishDate), 'd MMMM yyyy', { locale: ru });
  
  // Вычисляем время чтения на основе количества символов в полном тексте
  const readingTime = Math.ceil(news.fullTextCharCount / (WORDS_PER_MINUTE * CHARS_PER_WORD));

  return (
    <Link to={`/news/${news.slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={news.imageUrl} alt={news.title} className={styles.image} />
      </div>
      <div className={styles.content}>
        <Title level={5} className={styles.title}>{news.title}</Title>
        <Paragraph className={styles.description}>{news.description}</Paragraph>
        <div className={styles.meta}>
          <time dateTime={news.publishDate}>{formattedDate}</time>
          <span className={styles.separator}>•</span>
          <span>{readingTime} мин</span>
        </div>
      </div>
    </Link>
  );
}; 