import { Typography, Skeleton } from 'antd';
import { Container } from '@/components/Container';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useContacts } from '@/stores/contacts/hooks';
import styles from './ContactsPage.module.scss';
import { observer } from 'mobx-react-lite';
import HeroSection from '@/components/HeroSection';

const { Text } = Typography;

export const ContactsPage = observer(() => {
  const { contacts, isLoading } = useContacts();

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
      <HeroSection title="Связаться с нами" subtitle="Номера телефонов, электронные почты специалистов и адреса" />

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
                  {contacts?.emails?.length && (
                    <div className={styles.block}>
                      <div className={styles.icon}>
                        <MailOutlined />
                      </div>
                      <div className={styles.list}>
                        {contacts?.emails?.map((item) => (
                          <div key={item.id} className={styles.item}>
                            <Text type="secondary">{item.info}</Text>
                            <div className={styles.values}>
                                {item.emails.map(email => (
                                  <a key={email.id} href={`mailto:${email.value}`}>{email.value}</a>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {contacts?.phones?.length && (
                    <div className={styles.block}>
                      <div className={styles.icon}>
                        <PhoneOutlined />
                      </div>
                      <div className={styles.list}>
                        {contacts?.phones?.map((item) => (
                          <div key={item.id} className={styles.item}>
                            <Text type="secondary">{item.info}</Text>
                            <div className={styles.values}>
                              {item.phones.map(phone => (
                                <a key={phone.id} href={`tel:${phone.value}`}>{phone.value}</a>
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
                  {contacts?.addresses.map((item) => (
                    <div key={item.id} className={styles.item}>
                        <Text type="secondary">{item.info}</Text>
                        {item.address.map(address => (
                          <Text key={address.id}>{address.value}</Text>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.map}>
              <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Ac923af3cd816fdd693b9d467afe54ec5a8a883fd2a839abb83723bb19572baf9&amp;source=constructor" width="100%" height="360" frameBorder="0"></iframe>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}); 