import { Layout, Typography, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { Container } from '@/components/Container';
import styles from './Footer.module.scss';
import { useContacts } from '@/stores/contacts/hooks';
import { observer } from 'mobx-react-lite';
import { VkIcon, TelegramIcon } from '@/components/Icons';


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
  { icon: <VkIcon width={32} height={32} color="currentColor" />, href: 'https://vk.com/holmservice', label: 'Вконтакте' },
  { icon: <TelegramIcon width={32} height={32} color="currentColor" />, href: 'https://t.me/holmservice', label: 'Telegram' },
];

export const Footer = observer(() => {
  const { contacts, isLoading } = useContacts();
  const commonPhone = contacts?.phones.find(phone => phone.is_common);
  const commonPhones = commonPhone?.phones || [];

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
              <Title level={4}>{commonPhone?.info}</Title>
            )}
            <div className={styles.phones}>
              {isLoading ? (
                <div className={styles.skeleton}>
                  <Skeleton.Button active block style={{ height: 24 }} />
                  <Skeleton.Button active block style={{ height: 24 }} />
                </div>
              ) : commonPhones.length > 0 ? (
                commonPhones.map((phone, index) => (
                  <a key={index} href={`tel:${phone.phone}`}>
                    {phone.value}
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
          <Text>© 2025 Холмсервис. Все права защищены</Text>
          <div className={styles.links}>
            <Link to="/privacy">Политика конфиденциальности</Link>
            <Link to="/terms">Пользовательское соглашение</Link>
          </div>
        </div>
      </Container>
    </AntFooter>
  );
}); 