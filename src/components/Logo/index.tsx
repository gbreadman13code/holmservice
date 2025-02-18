import { Link } from 'react-router-dom';
import LogoImage from '@/assets/logo.png';
import styles from './Logo.module.scss';

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link to="/" className={`${styles.logo} ${className || ''}`}>
      <img src={LogoImage} alt="Холм-Сервис" />
    </Link>
  );
}; 