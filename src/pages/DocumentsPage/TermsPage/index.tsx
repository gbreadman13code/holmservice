import { Skeleton } from 'antd';
import { observer } from 'mobx-react-lite';
import { documentsStore } from '@/stores/documents';
import { Container } from '@/components/Container';
import styles from './TermsPage.module.scss';
import { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';

export const TermsPage = observer(() => {
  useEffect(() => {
    documentsStore.getTermsContent();
  }, []);

  const content = documentsStore.termsContent?.content;
  const isLoading = documentsStore.isLoading;

  return (
    <div className={styles.page}>
      <HeroSection title="Условия и соглашения" subtitle="" />

      <section className={styles.content}>
        <Container>
          <div className={styles.terms}>
            {isLoading ? (
              <Skeleton active paragraph={{ rows: 15 }} />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: content || '' }} />
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}); 