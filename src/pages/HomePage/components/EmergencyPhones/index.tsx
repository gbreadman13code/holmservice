import { Typography, Button, Skeleton } from 'antd';
import { observer } from 'mobx-react-lite';
import { Container } from '@/components/Container';
import { useAuth } from '@/stores/auth/hooks';
import { useAuthModal } from '@/stores/modals/hooks';
import { useContacts } from '@/stores/contacts/hooks';
import styles from './EmergencyPhones.module.scss';

const { Title } = Typography;

export const EmergencyPhones = observer(() => {
  const { isAuth } = useAuth();
  const { openAuthModal } = useAuthModal();
  const { contacts, isLoading } = useContacts(true);
  const commonPhone = contacts?.phones.find(phone => phone.isCommon);
  const commonPhones = commonPhone?.values || [];

  const handleMessageClick = () => {
    if (!isAuth) {
      openAuthModal();
    } else {
      // Здесь будет логика для авторизованных пользователей
      console.log('Открыть форму обращения');
    }
  };

  return (
    <section className={styles.emergency}>
      <Container>
        <div className={styles.content}>
          <div className={styles.column}>
            {isLoading ? (
              <>
                <Skeleton.Input 
                  active 
                  size="large" 
                  style={{ width: 300, marginBottom: 24 }} 
                />
                <div className={styles.phones}>
                  <Skeleton.Button active style={{ width: 180, height: 32 }} />
                  <Skeleton.Button active style={{ width: 180, height: 32 }} />
                </div>
              </>
            ) : (
              <>
                <Title level={3} className={styles.title}>
                  {commonPhone?.title}
                </Title>
                <div className={styles.phones}>
                  {commonPhones.map((phone, index) => (
                    <a key={index} href={`tel:${phone.replace(/\D/g, '')}`}>
                      {phone}
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className={styles.column}>
            <Title level={3} className={styles.title}>
              Обратиться в управляющую компанию
            </Title>
            <Button 
              type="primary" 
              size="large"
              onClick={handleMessageClick}
            >
              Написать
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}); 