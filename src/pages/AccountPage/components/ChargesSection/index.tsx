import { Button, Table, Spin, Card, Space, Select } from 'antd';
import { useState } from 'react';
import styles from './ChargesSection.module.scss';
import { authStore } from '@/stores';
import { observer } from 'mobx-react-lite';
import { useIsMobile } from '@/hooks/useIsMobile';

export const ChargesSection = observer(() => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const columns = [
    {
      title: 'Услуга',
      dataIndex: 'SERVICE_NAME',
      key: 'service',
      width: '40%',
    },
    {
      title: 'Начислено',
      dataIndex: 'DET_VAL',
      key: 'amount',
      render: (amount: number) => `${amount.toFixed(2)} ₽`,
    },
    {
      title: 'Скидки/надбавки',
      dataIndex: 'ADJ_VAL',
      key: 'adjustment',
      render: (amount: number) => `${amount.toFixed(2)} ₽`,
    },
    {
      title: 'Итого',
      dataIndex: 'ALL_VAL2',
      key: 'total',
      render: (amount: number) => `${amount.toFixed(2)} ₽`,
    },
  ];

  const handleShowCharges = () => {
    if (!selectedDate) return;
    authStore.getCharges(selectedDate);
  };

  // Рендер карточек для мобильной версии
  const renderMobileCards = () => {
    if (!selectedDate) {
      return (
        <div className={styles.emptyDataContainer}>
          Выберите период для просмотра начислений
        </div>
      );
    }
    
    if (authStore.charges && authStore.charges.nach.length === 0) {
      return (
        <div className={styles.emptyDataContainer}>
          Нет данных о начислениях за выбранный период
        </div>
      );
    }

    return (
      <Space direction="vertical" style={{ width: '100%' }}>
        {authStore.charges?.nach.map((charge) => (
          <Card 
            key={`${charge.SERVICE_NAME}-${charge.PERIOD_ID || Math.random()}`}
            className={styles.chargeCard}
          >
            <div className={styles.cardTitle}>{charge.SERVICE_NAME}</div>
            <div className={styles.cardContent}>
              <div className={styles.cardRow}>
                <span>Начислено:</span> 
                <span>{charge.DET_VAL.toFixed(2)} ₽</span>
              </div>
              <div className={styles.cardRow}>
                <span>Скидки/надбавки:</span> 
                <span>{charge.ADJ_VAL.toFixed(2)} ₽</span>
              </div>
              <div className={styles.cardRow}>
                <span>Итого:</span> 
                <span className={styles.totalValue}>{charge.ALL_VAL2.toFixed(2)} ₽</span>
              </div>
            </div>
          </Card>
        ))}
      </Space>
    );
  };

  return (
    <div>
      {/* <Title level={2}>Начисления</Title> */}

      <div className={styles.datePickerWrapper}>
        <Select 
          options={authStore.periods.map((period) => ({
            label: period.PERIOD_NAME,
            value: period.PERIOD_ID
          }))}
          onChange={(value) => setSelectedDate(value.toString())}
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          placeholder='Выберите период'
        />
        <Button type='primary' disabled={!selectedDate} onClick={handleShowCharges}>Показать</Button>
      </div>

      <div className={styles.tableWrapper}>
        {authStore.isChargesLoading ? (
          <div className={styles.spinnerContainer}>
            <Spin size="large" />
          </div>
        ) : (
          isMobile ? (
            renderMobileCards()
          ) : (
            <Table 
              dataSource={authStore.charges?.nach || []} 
              columns={columns} 
              rowKey={(record) => `${record.SERVICE_NAME}-${record.PERIOD_ID || Math.random()}`}
              locale={{ 
                emptyText: !selectedDate 
                  ? 'Выберите период для просмотра начислений' 
                  : 'Нет данных о начислениях за выбранный период' 
              }}
              pagination={false}
            />
          )
        )}
      </div>
    </div>
  );
}); 