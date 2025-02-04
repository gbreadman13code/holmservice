import { Typography, Skeleton } from 'antd';
import { observer } from 'mobx-react-lite';
import { useContacts } from '@/stores/contacts/hooks';
import { Container } from '@/components/Container';
import styles from './ContactsBlock.module.scss';

const { Title } = Typography;

export const ContactsBlock = observer(() => {
  const { contacts, isLoading } = useContacts(true);
  const commonPhone = contacts?.phones.find(phone => phone.isCommon);
  const commonPhones = commonPhone?.values || [];

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
            <Title level={2}>{commonPhone?.title}</Title>
            <div className={styles.phones}>
              {commonPhones.map((phone, index) => (
                <a key={index} href={`tel:${phone.replace(/\D/g, '')}`}>
                  {phone}
                </a>
              ))}
            </div>
          </>
        ) : null}
      </Container>
    </section>
  );
}); 