import { Card, Table, Typography, Tag } from 'antd';
import { CalculatorOutlined } from '@ant-design/icons';
import styles from './TariffsInfo.module.scss';
import { HouseTariffs } from '@/stores/my-home/types';

const { Title } = Typography;

interface TariffsInfoProps {
  tariffs: HouseTariffs[];
}

export const TariffsInfo: React.FC<TariffsInfoProps> = ({ tariffs }) => {
  const columns = [
    {
      title: 'Услуга',
      dataIndex: 'SERVICE_NAME',
      key: 'service',
      width: '35%',
    },
    {
      title: 'Тариф',
      key: 'tariff',
      render: (record: HouseTariffs) => (
        <span className={styles.tariffPrice}>
          {record.TARIF_PRICE.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₽
        </span>
      ),
    },
    {
      title: 'Единица измерения',
      dataIndex: 'MEASURE_UNIT',
      key: 'unit',
      render: (unit: string) => <Tag>{unit}</Tag>,
    },
    {
      title: 'Норматив',
      key: 'norm',
      render: (record: HouseTariffs) => {
        if (record.NORM === 0) return <span className={styles.zeroNorm}>По факту</span>;
        return `${record.NORM} ${record.TARIF_UNIT}`;
      },
    },
  ];

  // Группируем тарифы по категориям
  const mainTariffs = tariffs.filter(t => 
    ['Текущий ремонт', 'Управление', 'Содержание общего имущества здания'].includes(t.SERVICE_NAME)
  );
  const utilityTariffs = tariffs.filter(t => !mainTariffs.includes(t));

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <CalculatorOutlined className={styles.icon} />
        <Title level={3} className={styles.title}>Тарифы на услуги</Title>
      </div>

      <div className={styles.section}>
        <Title level={5} className={styles.sectionTitle}>Основные услуги</Title>
        <Table
          dataSource={mainTariffs}
          columns={columns}
          rowKey="SERVICE_ID"
          pagination={false}
          size="middle"
          className={styles.table}
        />
      </div>

      {utilityTariffs.length > 0 && (
        <div className={styles.section}>
          <Title level={5} className={styles.sectionTitle}>Коммунальные услуги</Title>
          <Table
            dataSource={utilityTariffs}
            columns={columns}
            rowKey="SERVICE_ID"
            pagination={false}
            size="middle"
            className={styles.table}
          />
        </div>
      )}
    </Card>
  );
}; 