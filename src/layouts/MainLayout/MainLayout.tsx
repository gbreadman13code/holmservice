import { Footer } from '@/components/Footer';
import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import { Header } from '@/components/Header';

export const MainLayout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}; 