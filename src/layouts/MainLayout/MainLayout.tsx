import { Footer } from '@/components/Footer';
import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import { Header } from '@/components/Header';
import { authStore } from '@/stores';
import { contactsStore } from '@/stores/contacts/contacts.store';
import { useEffect } from 'react';
import { warningsStore } from '@/stores/warnings/warnings.store';
import { observer } from 'mobx-react-lite';
import { Spin } from 'antd';
import { Logo } from '@/components/Logo';

const LoadScreen = () => {
  return (
    <div className={styles.loadScreen}>
      <Logo />
      <Spin size="large" tip="Загрузка..." />
    </div>
  );
};

export const MainLayout = observer(() => {
  useEffect(() => {
    authStore.init();
    contactsStore.fetchContacts();
    warningsStore.fetchWarnings();
  }, []);

  return (
    <div className={styles.layout}>
      {authStore.isLoading ? (
        <LoadScreen />
      ) : (
        <>
          <Header />
          <main className={styles.main}>
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}); 