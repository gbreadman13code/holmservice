import { HeroSection } from './components/HeroSection';
import { WarningSection } from './components/WarningSection';
import { NewsSection } from './components/NewsSection';
import { PromoSection } from './components/PromoSection';
import { GosuslugiPromoSection } from './components/GosuslugiPromoSection';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.home}>
      <HeroSection />
      <WarningSection />
      <NewsSection />
      <PromoSection />
      <GosuslugiPromoSection />
    </div>
  );
}; 