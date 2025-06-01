import { Table, Card, Typography } from 'antd';
import { useIsMobile } from '@/hooks/useIsMobile';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import styles from './FeedbackTable.module.scss';
import { FeedbackResponse, FeedbackStatus } from '@/stores/auth/store';

const { Text } = Typography;

interface FeedbackTableProps {
  data: FeedbackResponse[];
  loading: boolean;
}

const statusLabels: Record<FeedbackStatus, string> = {
  [FeedbackStatus.SENT]: 'Отправлено',
  [FeedbackStatus.DELIVERED]: 'Доставлено'
};

export const FeedbackTable = ({ data, loading }: FeedbackTableProps) => {
  const isMobile = useIsMobile();

  const columns = [
    {
      title: 'Номер обращения',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Дата',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => {
        const parsedDate = parseISO(date);
        return (
          <span>
            {format(parsedDate, 'd MMMM yyyy', { locale: ru })}
            <br />
            <small style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
              {format(parsedDate, 'HH:mm')}
            </small>
          </span>
        );
      }
    },
    {
      title: 'Контакт для связи',
      dataIndex: 'email',
      key: 'email',
      render: (_: string, record: FeedbackResponse) => {
        return (
          <div className={styles.row} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div>
              <Text type="secondary">Email: </Text>
              <Text>{record.email}</Text>
            </div>
            <div>
              <Text type="secondary">Телефон: </Text>
              <Text>{record.phone}</Text>
            </div>
          </div>
        )
      }
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status: FeedbackStatus) => statusLabels[status]
    }
  ];

  if (isMobile && data.length > 0) {
    return (
      <div className={styles.mobileCards}>
        {data.map((feedback) => (
          <Card 
            key={feedback.id} 
            title={`Обращение номер ${feedback.id}`}
            loading={loading}
            className={styles.card}
          >
            <div className={styles.cardContent}>
              <div className={styles.row}>
                <Text type="secondary">Дата:</Text>
                <Text>
                  {format(parseISO(feedback.created_at), 'd MMMM yyyy', { locale: ru })}
                  <br />
                  <small style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
                    {format(parseISO(feedback.created_at), 'HH:mm')}
                  </small>
                </Text>
              </div>
              <div className={styles.row}>
                <Text type="secondary">Контакт:</Text>
                <Text>{feedback.email}</Text>
              </div>
              <div className={styles.row}>
                <Text type="secondary">Статус:</Text>
                <Text>{statusLabels[feedback.status]}</Text>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      loading={loading}
    />
  );
}; 