import { Typography, Row, Col } from 'antd';
import { observer } from 'mobx-react-lite';
import { Document, documentsStore } from '@/stores/documents';
import { DocumentCard } from '../components/DocumentCard';
import { Container } from '@/components/Container';
import styles from './TemplatesPage.module.scss';
import { useEffect, useState } from 'react';
import { toJS } from 'mobx';

const { Title, Text } = Typography;

export const TemplatesPage = observer(() => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    (async () => {
      const documents = await documentsStore.getTemplateDocuments();

      console.log(toJS(documents));
      setDocuments(documents);
    })();
  }, []);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <Container>
          <Title level={1}>Шаблоны документов</Title>
          <Text className={styles.subtitle}>
            Скачивайте шаблоны заявлений, бланков, жалоб и предложений в один клик
          </Text>
        </Container>
      </section>

      <section className={styles.content}>
        <Container>
          <Row gutter={[24, 24]} className={styles.documents}>
            {documents.map((document, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <DocumentCard document={document} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
}); 