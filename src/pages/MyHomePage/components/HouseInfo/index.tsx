import { Card, Typography, Space } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import styles from './HouseInfo.module.scss';
import { HouseParams } from '@/stores/my-home/types';

const { Title, Text,  } = Typography;

interface HouseInfoProps {
  houseData: HouseParams;
  dolg?: string | null;
}

export const HouseInfo: React.FC<HouseInfoProps> = ({ houseData }) => {
  const fullAddress = `${houseData.STREET_NAME}, ${houseData.HNUMBER}${houseData.HLETTER || ''}${houseData.HBUILD ? ` корп. ${houseData.HBUILD}` : ''}`;

  // Парсим долг в число для определения цвета
  // const debtAmount = dolg ? parseFloat(dolg.replace(/[^\d.-]/g, '')) : null;
  // const getDebtColor = () => {
  //   if (debtAmount === null || debtAmount === 0) return '#52c41a'; // зеленый - нет долга
  //   if (debtAmount > 0) return '#ff4d4f'; // красный - есть долг
  //   return '#1890ff'; // синий - переплата
  // };
  
  // const getDebtText = () => {
  //   if (dolg === null) return 'Долгов нет';
  //   return dolg;
  // };
  
  return (
    <Card className={styles.card}>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div className={styles.header}>
          <HomeOutlined className={styles.icon} />
          <Title level={3} className={styles.title}>Информация о доме</Title>
        </div>
        
        <div className={styles.addressSection}>
          <Title level={4} className={styles.address}>{fullAddress}</Title>
          <Text type="secondary">
            {houseData.AREA_NAME} район, {houseData.CITY_NAME}, {houseData.ZIP}
          </Text>
        </div>

        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <Text type="secondary">Управляющая компания</Text>
            <Text strong>{houseData.MAIN_NAME}</Text>
          </div>
          
          {/* <div className={styles.infoItem}>
            <Text type="secondary">Долг на текущий месяц</Text>
            <Title 
              level={2} 
              style={{ 
                color: getDebtColor(), 
                margin: '8px 0',
                fontSize: '32px',
                fontWeight: 600
              }}
            >
              {getDebtText()}
            </Title>
          </div> */}
        </div>

        {/* {houseData.NOTE && (
          <div className={styles.noteSection}>
            <Title level={5}>Примечания</Title>
            <Paragraph className={styles.note}>
              {houseData.NOTE.split('\r\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < houseData.NOTE.split('\r\n').length - 1 && <br />}
                </span>
              ))}
            </Paragraph>
          </div>
        )} */}
      </Space>
    </Card>
  );
}; 