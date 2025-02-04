import { Typography, Skeleton } from 'antd';
import { Container } from '@/components/Container';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useContacts } from '@/stores/contacts/hooks';
import styles from './ContactsPage.module.scss';
import { observer } from 'mobx-react-lite';

const { Title, Text } = Typography;

const address = {
  title: 'Главный офис',
  address: 'г. Красноярск, ул. Ленина, д. 1, офис 1',
  coordinates: {
    lat: 56.010569,
    lng: 92.852572
  }
};

export const ContactsPage = observer(() => {
  const { contacts, isLoading } = useContacts();

  // Создаем отсортированные копии массивов
  const sortedEmails = contacts?.emails ? [...contacts.emails] : [];
  const sortedPhones = contacts?.phones ? [...contacts.phones] : [];

  const renderSkeleton = () => (
    <div className={styles.block}>
      <div className={styles.icon}>
        <Skeleton.Avatar active size={40} shape="circle" />
      </div>
      <div className={styles.list}>
        {[1, 2, 3].map((item) => (
          <div key={item} className={styles.item}>
            <Skeleton.Input active size="small" block style={{ width: 120 }} />
            <div className={styles.values}>
              <Skeleton.Input active size="small" block style={{ width: 180 }} />
              <Skeleton.Input active size="small" block style={{ width: 180 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <Container>
          <Title level={1}>Связаться с нами</Title>
          <Text className={styles.subtitle}>
            Номера телефонов, электронные почты специалистов и адреса
          </Text>
        </Container>
      </section>

      <section className={styles.content}>
        <Container>
          <div className={styles.grid}>
            <div className={styles.info}>
              {isLoading ? (
                <>
                  {renderSkeleton()}
                  {renderSkeleton()}
                </>
              ) : (
                <>
                  {sortedEmails.length > 0 && (
                    <div className={styles.block}>
                      <div className={styles.icon}>
                        <MailOutlined />
                      </div>
                      <div className={styles.list}>
                        {sortedEmails.map((item) => (
                          <div key={item.id} className={styles.item}>
                            <Text type="secondary">{item.title}</Text>
                            <div className={styles.values}>
                              {item.values.map((email, index) => (
                                <a key={index} href={`mailto:${email}`}>{email}</a>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {sortedPhones.length > 0 && (
                    <div className={styles.block}>
                      <div className={styles.icon}>
                        <PhoneOutlined />
                      </div>
                      <div className={styles.list}>
                        {sortedPhones.map((item) => (
                          <div key={item.id} className={styles.item}>
                            <Text type="secondary">{item.title}</Text>
                            <div className={styles.values}>
                              {item.values.map((phone, index) => (
                                <a key={index} href={`tel:${phone.replace(/\D/g, '')}`}>{phone}</a>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              <div className={styles.block}>
                <div className={styles.icon}>
                  <EnvironmentOutlined />
                </div>
                <div className={styles.list}>
                  <div className={styles.item}>
                    <Text type="secondary">{address.title}</Text>
                    <Text>{address.address}</Text>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.map}>
              <iframe 
                src={`https://yandex.ru/map-widget/v1/?ll=${address.coordinates.lng}%2C${address.coordinates.lat}&z=17`}
                width="100%" 
                height="100%" 
                frameBorder="0"
              />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}); 