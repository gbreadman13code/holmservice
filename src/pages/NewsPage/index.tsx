import { NewsHero } from './components/NewsHero';
import { NewsGrid } from './components/NewsGrid';
import styles from './NewsPage.module.scss';

export const NewsPage = () => {
  return (
    <div className={styles.news}>
      <NewsHero />
      <NewsGrid />
    </div>
  );
}; 