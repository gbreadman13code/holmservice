import { Typography, Carousel, Button } from 'antd';
import { Container } from '@/components/Container';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { WarningFilled, CheckCircleFilled, InfoCircleFilled } from '@ant-design/icons';
import { useRef, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { CarouselRef } from 'antd/es/carousel';
import { useWarnings } from '@/stores/warnings/hooks';
import styles from './WarningSection.module.scss';

const { Title, Paragraph } = Typography;

// Типы статусов предупреждений
export type WarningStatus = 'RED' | 'GREEN' | 'YELLOW';

// Карта иконок для разных статусов
const statusIcons = {
  RED: WarningFilled,
  GREEN: CheckCircleFilled,
  YELLOW: InfoCircleFilled
};

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

  if (warnings.length === 0 || isLoading) {
    return null;
  }

  const multipleWarnings = warnings.length > 1;
  // Определяем статус текущего предупреждения (по умолчанию RED)
  const currentWarningIndex = carouselRef.current?.innerSlider?.state?.currentSlide || 0;
  const currentWarning = warnings[currentWarningIndex];
  const currentStatus = (currentWarning?.status || 'RED') as WarningStatus;
  const statusClass = styles[currentStatus.toLowerCase()];
  
  // Выбираем иконку в зависимости от статуса
  const StatusIcon = statusIcons[currentStatus];

  return (
    <section className={styles.warning}>
      <Container>
        <div 
          className={`${styles.content} ${statusClass}`}
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
                      {warning.content}
                    </Paragraph>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
          <div className={styles.iconWrapper}>
            <StatusIcon className={styles.icon} />
          </div>
          {multipleWarnings && (
            <div className={styles.progressBar} style={{ width: `${progress}%` }} />
          )}

        </div>
        {multipleWarnings && (
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
        )}

      </Container>
      
    </section>
  );
}); 