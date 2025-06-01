import { Card, Typography, Space } from 'antd';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, GlobalOutlined, ClockCircleOutlined } from '@ant-design/icons';
import styles from './ContactsInfo.module.scss';
import { HouseContacts } from '@/stores/my-home/types';

const { Title, Text, Link } = Typography;

interface ContactsInfoProps {
  contacts: HouseContacts[];
}

export const ContactsInfo: React.FC<ContactsInfoProps> = ({ contacts }) => {
  if (!contacts.length) return null;

  const contact = contacts[0];
  
  // Парсим контакты
  const parseContacts = (contactsString: string) => {
    const lines = contactsString.split('\r\n').filter(line => line.trim());
    const result: {
      website?: string;
      email?: string;
      phones?: string[];
      schedule?: string;
    } = {};

    lines.forEach(line => {
      if (line.includes('www.')) {
        const match = line.match(/www\.[^\s,]+/);
        if (match) result.website = match[0];
      }
      if (line.includes('@')) {
        const match = line.match(/[\w.-]+@[\w.-]+/);
        if (match) result.email = match[0];
      }
      if (line.includes('Приемная:') || line.includes('+7')) {
        // Сначала извлекаем всю строку с телефонами после "Приемная:"
        const phonesPart = line.includes('Приемная:') 
          ? line.split('Приемная:')[1] 
          : line;
        
        // Разделяем по двоеточию, точке с запятой или запятой
        const phoneNumbers = phonesPart.split(/[:;,]/)
          .map(p => p.trim())
          .filter(p => p.includes('+7'));
        
        if (phoneNumbers.length > 0) {
          result.phones = phoneNumbers;
        }
      }
      if (line.includes('Пн-') || line.includes('с 8:00')) {
        const scheduleMatch = line.match(/(Пн-.*)/);
        if (scheduleMatch) result.schedule = scheduleMatch[1];
      }
    });

    return result;
  };

  const parsedContacts = parseContacts(contact.UK_CONTACTS);

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <PhoneOutlined className={styles.icon} />
        <Title level={3} className={styles.title}>Контакты управляющей компании</Title>
      </div>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={4} className={styles.companyName}>{contact.UK_NAME}</Title>
        </div>

        <div className={styles.contactItem}>
          <EnvironmentOutlined className={styles.contactIcon} />
          <div>
            <Text type="secondary">Адрес</Text>
            <br />
            <Text>{contact.UK_ADDRESS}</Text>
          </div>
        </div>

        {parsedContacts.phones && parsedContacts.phones.length > 0 && (
          <div className={styles.contactItem}>
            <PhoneOutlined className={styles.contactIcon} />
            <div>
              <Text type="secondary">Телефоны приемной</Text>
              <br />
              <Space direction="vertical" size="small">
                {parsedContacts.phones.map((phone, index) => (
                  <Link key={index} href={`tel:${phone.replace(/\s/g, '')}`}>
                    {phone}
                  </Link>
                ))}
              </Space>
            </div>
          </div>
        )}

        {parsedContacts.email && (
          <div className={styles.contactItem}>
            <MailOutlined className={styles.contactIcon} />
            <div>
              <Text type="secondary">Email</Text>
              <br />
              <Link href={`mailto:${parsedContacts.email}`}>{parsedContacts.email}</Link>
            </div>
          </div>
        )}

        {parsedContacts.website && (
          <div className={styles.contactItem}>
            <GlobalOutlined className={styles.contactIcon} />
            <div>
              <Text type="secondary">Сайт</Text>
              <br />
              <Link href={`https://${parsedContacts.website}`} target="_blank">
                {parsedContacts.website}
              </Link>
            </div>
          </div>
        )}

        {parsedContacts.schedule && (
          <div className={styles.contactItem}>
            <ClockCircleOutlined className={styles.contactIcon} />
            <div>
              <Text type="secondary">График работы</Text>
              <br />
              <Text>{parsedContacts.schedule}</Text>
            </div>
          </div>
        )}

        {contact.EX_INFO && (
          <div className={styles.extraInfo}>
            <Text type="secondary">Дополнительная информация</Text>
            <br />
            <Text>{contact.EX_INFO}</Text>
          </div>
        )}
      </Space>
    </Card>
  );
}; 