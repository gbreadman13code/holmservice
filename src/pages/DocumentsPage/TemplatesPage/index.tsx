import { Row, Col } from 'antd';
import { observer } from 'mobx-react-lite';
import { Document, documentsStore } from '@/stores/documents';
import { DocumentCard } from '../components/DocumentCard';
import { DocumentSkeleton } from '../components/DocumentSkeleton';
import { Container } from '@/components/Container';
import styles from './TemplatesPage.module.scss';
import { useEffect, useState } from 'react';
import HeroSection from '@/components/HeroSection';

export const TemplatesPage = observer(() => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    (async () => {
      const documents = await documentsStore.getTemplateDocuments();
      setDocuments(documents);
    })();
  }, []);

  const renderContent = () => {
    if (documentsStore.isLoading) {
      return Array(4).fill(null).map((_, index) => (
        <Col key={index} xs={12} sm={12} md={8} lg={6}>
          <DocumentSkeleton />
        </Col>
      ));
    }

    return documents.map((document, index) => (
      <Col key={index} xs={12} sm={12} md={8} lg={6}>
        <DocumentCard document={document} />
      </Col>
    ));
  };

  return (
    <div className={styles.page}>
      <HeroSection title="Шаблоны документов" subtitle="Скачивайте шаблоны заявлений, бланков, жалоб и предложений в один клик" />

      <section className={styles.content}>
        <Container>
          <Row gutter={[24, 24]} className={styles.documents}>
            {renderContent()}
          </Row>
        </Container>
      </section>
    </div>
  );
}); 