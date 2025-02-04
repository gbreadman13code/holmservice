import { Layout, Typography, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { 
  InstagramOutlined, 
  FacebookOutlined, 
  TwitterOutlined, 
  YoutubeOutlined
} from '@ant-design/icons';
import { Container } from '@/components/Container';
import styles from './Footer.module.scss';
import { useContacts } from '@/stores/contacts/hooks';
import { observer } from 'mobx-react-lite';

const { Footer: AntFooter } = Layout;
const { Title, Text } = Typography;

const navigationLinks = [
  { to: '/', label: 'Главная' },
  { to: '/news', label: 'Новости' },
  { to: '/documents', label: 'Документы' },
  { to: '/about', label: 'О нас' },
  { to: '/contacts', label: 'Контакты' },
];

const socialLinks = [
  { icon: <InstagramOutlined />, href: '#', label: 'Instagram' },
  { icon: <FacebookOutlined />, href: '#', label: 'Facebook' },
  { icon: <TwitterOutlined />, href: '#', label: 'Twitter' },
  { icon: <YoutubeOutlined />, href: '#', label: 'YouTube' },
];

export const Footer = observer(() => {
  const { contacts, isLoading } = useContacts(true);
  const commonPhone = contacts?.phones.find(phone => phone.isCommon);
  const commonPhones = commonPhone?.values || [];

  return (
    <AntFooter className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <div className={styles.column}>
            {isLoading ? (
              <Skeleton.Input 
                active 
                block 
                style={{ 
                  width: 280,
                  height: 32,
                  marginBottom: 24
                }} 
              />
            ) : (
              <Title level={4}>{commonPhone?.title}</Title>
            )}
            <div className={styles.phones}>
              {isLoading ? (
                <div className={styles.skeleton}>
                  <Skeleton.Button active block style={{ height: 24 }} />
                  <Skeleton.Button active block style={{ height: 24 }} />
                </div>
              ) : commonPhones.length > 0 ? (
                commonPhones.map((phone, index) => (
                  <a key={index} href={`tel:${phone.replace(/\D/g, '')}`}>
                    {phone}
                  </a>
                ))
              ) : null}
            </div>
          </div>

          <div className={styles.column}>
            <Title level={4}>Навигация</Title>
            <nav className={styles.navigation}>
              {navigationLinks.map(link => (
                <Link key={link.to} to={link.to}>{link.label}</Link>
              ))}
            </nav>
          </div>

          <div className={styles.column}>
            <Title level={4}>Социальные сети</Title>
            <div className={styles.social}>
              {socialLinks.map(link => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <Text>© 2024 Холм Сервис. Все права защищены</Text>
          <div className={styles.links}>
            <Link to="/privacy">Политика конфиденциальности</Link>
            <Link to="/terms">Пользовательское соглашение</Link>
          </div>
        </div>
      </Container>
    </AntFooter>
  );
}); 