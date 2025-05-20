import { Typography, Skeleton } from 'antd';
import { observer } from 'mobx-react-lite';
import { useContacts } from '@/stores/contacts/hooks';
import { Container } from '@/components/Container';
import styles from './ContactsBlock.module.scss';

const { Title } = Typography;

export const ContactsBlock = observer(() => {
  const { contacts, isLoading } = useContacts();
  const commonPhone = contacts?.phones.find(phone => phone.is_common);
  const commonPhones = commonPhone?.phones || [];

  return (
    <section className={styles.section}>
      <Container>
        {isLoading ? (
          <div className={styles.skeleton}>
            <Skeleton.Input active size="large" style={{ width: 400, height: 38, marginBottom: 24 }} />
            <div className={styles.phones}>
              <Skeleton.Button active style={{ width: 200, height: 32 }} />
              <Skeleton.Button active style={{ width: 200, height: 32 }} />
            </div>
          </div>
        ) : commonPhones.length > 0 ? (
          <>
            <Title level={2}>{commonPhone?.info}</Title>
            <div className={styles.phones}>
              {commonPhones.map((phone, index) => (
                <a key={index} href={`tel:${phone.value}`}>
                  {phone.value}
                </a>
              ))}
            </div>
          </>
        ) : null}
      </Container>
    </section>
  );
}); 