import { Typography } from 'antd';
import { Container } from '@/components/Container';
import styles from './DocumentsPage.module.scss';

const { Title, Text } = Typography;

export const DocumentsPage = () => {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <Container>
          <Title level={1}>Документы</Title>
          <Text className={styles.subtitle}>
            Нормативные документы, договоры и другая документация
          </Text>
        </Container>
      </section>
    </div>
  );
}; 