import { Typography, Row, Col } from 'antd';
import { observer } from 'mobx-react-lite';
import { documentsStore } from '@/stores/documents';
import { DocumentCard } from '../components/DocumentCard';
import { DocumentSkeleton } from '../components/DocumentSkeleton';
import { Container } from '@/components/Container';
import styles from './RsoPage.module.scss';
import { useEffect } from 'react';

const { Title, Text } = Typography;

export const RsoPage = observer(() => {
  useEffect(() => {
    documentsStore.getRsoDocuments();
  }, []);

  const documents = documentsStore.rsoDocuments;
  const isLoading = documentsStore.isLoading;

  const renderContent = () => {
    if (isLoading) {
      return Array(4).fill(null).map((_, index) => (
        <Col key={index} xs={24} sm={12} md={8} lg={6}>
          <DocumentSkeleton />
        </Col>
      ));
    }

    return documents.map(document => (
      <Col key={document.id} xs={24} sm={12} md={8} lg={6}>
        <DocumentCard document={document} />
      </Col>
    ));
  };

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <Container>
          <Title level={1}>Договоры с ресурсоснабжающими организациями</Title>
          <Text className={styles.subtitle}>
            Договоры между управляющей компанией и поставщиками света, воды и других ресурсов и услуг
          </Text>
        </Container>
      </section>

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