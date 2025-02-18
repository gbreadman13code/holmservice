import {  Card, Skeleton } from 'antd';
import { Container } from '@/components/Container';
import { NewsCard } from '@/components/NewsCard';
import { Pagination } from 'antd';
import styles from './NewsGrid.module.scss';
import { useNews } from '@/stores/news/hooks';
import { observer } from 'mobx-react-lite';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import HeroSection from '@/components/HeroSection';

const SkeletonGrid = () => {
  return (
    <>
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className={styles.skeletonCard}>
          <Card>
            <div className={styles.skeletonImage} />
            <Card.Meta
              title={
                <Skeleton
                  title={{ width: '60%' }}
                  paragraph={false}
                  active
                />
              }
              description={
                <Skeleton
                  paragraph={{ rows: 2, width: ['100%', '80%'] }}
                  title={false}
                  active
                />
              }
            />
          </Card>
        </div>
      ))}
    </>
  );
};

export const NewsGrid = observer(() => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pageFromUrl = Number(searchParams.get('page')) || 1;
  
  const { news, total, loading, currentPage, setCurrentPage } = useNews();

  useEffect(() => {
    if (currentPage !== pageFromUrl) {
      setCurrentPage(pageFromUrl);
    }
  }, [pageFromUrl, currentPage, setCurrentPage]);

  const handlePageChange = (page: number) => {
    navigate(`/news?page=${page}`);
    setCurrentPage(page);
    
    // Плавный скролл к заголовку
    headerRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section className={styles.newsSection} ref={headerRef} >
        <HeroSection title="Новости" subtitle="Информация о домах, отключениях и другие новости" />

      <Container>
        <div className={styles.grid}>
          {loading ? (
            <SkeletonGrid />
          ) : (
            news.map(newsItem => (
              <NewsCard key={newsItem.id} news={newsItem} />
            ))
          )}
        </div>
        {news.length > 0 && (
          <div className={styles.pagination}>
            <Pagination
              current={currentPage}
              onChange={handlePageChange}
              total={total}
              pageSize={9}
              showSizeChanger={false}
            />
          </div>
        )}
      </Container>
    </section>
  );
}); 