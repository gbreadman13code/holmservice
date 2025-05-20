import { Skeleton } from 'antd';
import { observer } from 'mobx-react-lite';
import { documentsStore } from '@/stores/documents';
import { Container } from '@/components/Container';
import styles from './TermsPage.module.scss';
import { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import { HtmlContent } from '@/components/HtmlContent';
export const TermsPage = observer(() => {
  useEffect(() => {
    documentsStore.getTermsContent();
  }, []);

  const isLoading = documentsStore.isLoading;

  return (
    <div className={styles.page}>
      <HeroSection title={documentsStore.termsContent?.name || ''} subtitle="" />

      <section className={styles.content}>
        <Container>
          <div className={styles.terms}>
            {isLoading ? (
              <Skeleton active paragraph={{ rows: 15 }} />
            ) : (
              <HtmlContent content={documentsStore.termsContent?.content || ''} />
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}); 