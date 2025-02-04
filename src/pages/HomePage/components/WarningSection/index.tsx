import { Typography, Carousel, Button } from 'antd';
import { Container } from '@/components/Container';
import { WarningFilled, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useRef, useState, useEffect } from 'react';
import styles from './WarningSection.module.scss';
import { CarouselRef } from 'antd/es/carousel';
import { observer } from 'mobx-react-lite';
import { useWarnings } from '@/stores/warnings/hooks';

const { Title, Paragraph } = Typography;

export const WarningSection = observer(() => {
  const { warnings, isLoading } = useWarnings();
  const carouselRef = useRef<CarouselRef>(null);
  const [progress, setProgress] = useState(0);
  const isChangingSlide = useRef(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isChangingSlide.current && !isPaused) {
        setProgress((prev) => {
          if (prev >= 100) {
            isChangingSlide.current = true;
            carouselRef.current?.next();
            return 0;
          }
          return prev + 1;
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleSlideChange = () => {
    setProgress(0);
    isChangingSlide.current = false;
  };

  if (isLoading || warnings.length === 0) {
    return null;
  }

  return (
    <section className={styles.warning}>
      <Container>
        <div 
          className={styles.content}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={styles.info}>
            <Title level={2} className={styles.title}>ВНИМАНИЕ!</Title>
            <div className={styles.slider}>
              <Carousel
                ref={carouselRef}
                dots={false}
                afterChange={handleSlideChange}
                effect="fade"
                autoplay={false}
                swipe={false}
              >
                {warnings.map((warning) => (
                  <div key={warning.id} className={styles.sliderItem}>
                    <Paragraph className={styles.text}>
                      {warning.description}
                    </Paragraph>
                    
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
          <div className={styles.iconWrapper}>
            <WarningFilled className={styles.icon} />
          </div>
          <div className={styles.progressBar} style={{ width: `${progress}%` }} />

        </div>
        <div className={styles.controls}>
          <Button 
            type="text" 
            icon={<LeftOutlined />} 
            onClick={() => carouselRef.current?.prev()}
          />
          <Button 
            type="text" 
            icon={<RightOutlined />} 
            onClick={() => carouselRef.current?.next()}
          />
        </div>


      </Container>
      
    </section>
  );
}); 