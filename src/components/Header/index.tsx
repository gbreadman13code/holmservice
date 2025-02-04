import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { Container } from '@/components/Container';
import { Navigation } from './components/Navigation';
import Logo from '@/assets/logo.png';
import styles from './Header.module.scss';
import { UserMenu } from './components/UserMenu';

const { Header: AntHeader } = Layout;

export const Header = () => {
  return (
    <AntHeader className={styles.header}>
      <Container>
        <div className={styles.content}>
          <Link to="/" className={styles.logo}>
            <img src={Logo} alt="" />
          </Link>
          
          <div className={styles.actions}>
            <Navigation />
            <UserMenu />
          </div>
        </div>
      </Container>
    </AntHeader>
  );
}; 