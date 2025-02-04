import { Typography } from 'antd';
import { Container } from '@/components/Container';
import styles from './MyHomePage.module.scss';

const { Title } = Typography;

export const MyHomePage = () => {
  return (
    <section className={styles.page}>
      <Container>
        <Title level={1}>Мой дом</Title>
      </Container>
    </section>
  );
}; 