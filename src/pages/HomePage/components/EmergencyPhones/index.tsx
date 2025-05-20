import { Typography, Button, Skeleton } from 'antd';
import { observer } from 'mobx-react-lite';
import { Container } from '@/components/Container';
import { useAuth } from '@/stores/auth/hooks';
import { useAuthModal } from '@/stores/modals/hooks';
import { useContacts } from '@/stores/contacts/hooks';
import { useNavigate } from 'react-router-dom';
import styles from './EmergencyPhones.module.scss';
const { Title } = Typography;

export const EmergencyPhones = observer(() => {
  const { isAuth } = useAuth();
  const { openAuthModal } = useAuthModal();
  const { contacts, isLoading } = useContacts();
  const commonPhone = contacts?.phones.find(phone => phone.is_common);
  const commonPhones = commonPhone?.phones || [];
  const navigate = useNavigate();

  const handleMessageClick = () => {
    if (!isAuth) {
      openAuthModal();
    } else {
      // Редиректим в личный кабинет с якорем на секцию обращений
      navigate('/account#feedback');
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
                  {commonPhone?.info}
                </Title>
                <div className={styles.phones}>
                  {commonPhones.map((phone, index) => (
                    <a key={index} href={`tel:${phone.value}`}>
                      {phone.value}
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