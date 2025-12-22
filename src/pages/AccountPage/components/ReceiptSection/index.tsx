import { Button, Select, Spin, Result } from 'antd';
import { useState, useEffect } from 'react';
import styles from './ReceiptSection.module.scss';
import { authStore } from '@/stores';
import { observer } from 'mobx-react-lite';
import { DownloadOutlined, FileTextOutlined } from '@ant-design/icons';

export const ReceiptSection = observer(() => {
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [hasRequested, setHasRequested] = useState(false);

  // Очищаем URL при размонтировании или смене периода
  useEffect(() => {
    return () => {
      authStore.clearReceipt();
    };
  }, []);

  const handleGetReceipt = async () => {
    if (!selectedPeriod) return;
    setHasRequested(true);
    await authStore.getReceipt(selectedPeriod);
  };

  const handleDownload = () => {
    authStore.openReceipt();
  };

  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value);
    setHasRequested(false);
    authStore.clearReceipt();
  };

  return (
    <div className={styles.container}>
      <div className={styles.selectWrapper}>
        <Select
          options={authStore.periods.map((period) => ({
            label: period.PERIOD_NAME,
            value: period.PERIOD_ID.toString()
          }))}
          onChange={handlePeriodChange}
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          placeholder='Выберите период'
          className={styles.select}
        />
        <Button 
          type='primary' 
          disabled={!selectedPeriod || authStore.isReceiptLoading} 
          onClick={handleGetReceipt}
        >
          Показать
        </Button>
      </div>

      <div className={styles.content}>
        {authStore.isReceiptLoading ? (
          <div className={styles.spinnerContainer}>
            <Spin size="large" />
          </div>
        ) : authStore.receiptUrl ? (
          <Result
            icon={<FileTextOutlined style={{ color: '#52c41a' }} />}
            title="Квитанция готова"
            subTitle={`Квитанция за ${authStore.periods.find(p => p.PERIOD_ID.toString() === selectedPeriod)?.PERIOD_NAME || 'выбранный период'} успешно сформирована`}
            extra={
              <Button 
                type="primary" 
                icon={<DownloadOutlined />} 
                size="large"
                onClick={handleDownload}
              >
                Скачать квитанцию
              </Button>
            }
          />
        ) : hasRequested && !authStore.isReceiptLoading ? (
          <Result
            status="error"
            title="Ошибка"
            subTitle="Не удалось получить квитанцию за выбранный период"
          />
        ) : (
          <div className={styles.emptyState}>
            <FileTextOutlined className={styles.emptyIcon} />
            <p>Выберите период для получения квитанции</p>
          </div>
        )}
      </div>
    </div>
  );
});

