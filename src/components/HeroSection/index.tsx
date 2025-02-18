import { Container } from '../Container'
import { Typography } from 'antd';

const { Title, Text } = Typography;

import styles from './HeroSection.module.scss';

type Props = {
  title: string;
  subtitle?: string;
}

const HeroSection = ({ title, subtitle }: Props) => {
  return (
    <section className={styles.hero}>
        <Container>
          <Title level={1}>{title}</Title>
          {subtitle && <Text className={styles.subtitle}>
            {subtitle}
          </Text>}
        </Container>
      </section>
  )
}

export default HeroSection
