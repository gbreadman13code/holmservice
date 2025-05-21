import { Typography, Table, Pagination, Card, message } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { CopyOutlined, CheckOutlined } from '@ant-design/icons';
import { authStore } from '@/stores';
import { PayItem } from '@/stores/auth/store';
import styles from './PaymentsSection.module.scss';
import { useIsMobile } from '@/hooks/useIsMobile';

const { Text } = Typography;

export const PaymentsSection = observer(() => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const isMobile = useIsMobile();
  const [messageApi, contextHolder] = message.useMessage();

  // Функция копирования текста в буфер обмена
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        messageApi.open({
          type: 'success',
          content: 'Скопировано!',
          duration: 2,
          icon: <CheckOutlined />
        });
      })
      .catch((err) => {
        console.error('Не удалось скопировать текст: ', err);
        messageApi.error('Не удалось скопировать');
      });
  };

  // Колонки для таблицы
  const columns = [
    {
      title: '№ платежа',
      dataIndex: 'PAY_NUM',
      key: 'payNum',
      render: (payNum: string) => (
        <div className={styles.payNumContainer}>
          <span>{payNum}</span>
          <CopyOutlined 
            className={styles.copyIcon} 
            onClick={(e) => {
              e.stopPropagation();
              copyToClipboard(payNum);
            }} 
          />
        </div>
      )
    },
    {
      title: 'Дата',
      dataIndex: 'STAMP',
      key: 'date',
      render: (date: string) => {
        if (!date) return '-';
        
        // Разделяем строку "ДД.ММ.ГГГГ ЧЧ:ММ:СС" на дату и время
        const [datePart, timePart] = date.split(' ');
        
        return (
          <div className={styles.dateColumn}>
            <div className={styles.date}>{datePart}</div>
            <div className={styles.time}>{timePart}</div>
          </div>
        );
      }
    },
    {
      title: 'Сумма',
      dataIndex: 'PAY_VAL_RUB',
      key: 'amount',
      render: (amount: number) => `${amount.toFixed(2)} ₽`
    },
    {
      title: 'Тип платежа',
      dataIndex: 'PAYTYPE_NAME',
      key: 'payType',
    },
    {
      title: 'Получатель',
      dataIndex: 'OUT_MAIN_NAME',
      key: 'recipient',
    },
    {
      title: 'Статус',
      dataIndex: 'PAY_STATUS_NAME',
      key: 'status',
    },
    {
      title: 'Банк/Касса',
      dataIndex: 'KASSA_NAME',
      key: 'bank',
    }
  ];

  // Загрузка данных при монтировании компонента и при изменении пагинации
  useEffect(() => {
    const loadPayments = async () => {
      const offset = (currentPage - 1) * pageSize;
      await authStore.getPayments(pageSize, offset);
      
      // Предполагаем, что у нас есть 100 записей 
      // TODO: Обновить когда на бэкенде будет добавлена возможность получить общее количество
      setTotal(63);
    };

    loadPayments();
  }, [currentPage, pageSize]);

  // Обработчик изменения страницы
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Обработчик изменения размера страницы
  const handlePageSizeChange = (current: number, size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Сбрасываем на первую страницу при изменении размера
  };

  // Рендер содержимого в зависимости от устройства
  const renderContent = () => {
    const payments = authStore.payments?.pays || [];
    
    if (isMobile && payments.length > 0) {
      return (
        <div className={styles.mobileCards}>
          {payments.map((payment) => (
            <Card 
              key={`${payment.PAY_NUM}-${Math.random()}`} 
              title={
                <div className={styles.cardTitle}>
                  <span>№{payment.PAY_NUM}</span>
                  <CopyOutlined 
                    className={styles.copyIcon} 
                    onClick={() => copyToClipboard(payment.PAY_NUM.toString())} 
                  />
                </div>
              }
              loading={authStore.isPaymentsLoading}
              className={styles.card}
            >
              <div className={styles.cardContent}>
                <div className={styles.row}>
                  <Text type="secondary">Дата:</Text>
                  <Text>
                    <div className={styles.date}>{payment.STAMP.split(' ')[0]}</div>
                    <div className={styles.time}>{payment.STAMP.split(' ')[1]}</div>
                  </Text>
                </div>
                <div className={styles.row}>
                  <Text type="secondary">Сумма:</Text>
                  <Text>{payment.PAY_VAL_RUB?.toFixed(2) || 0} ₽</Text>
                </div>
                <div className={styles.row}>
                  <Text type="secondary">Тип:</Text>
                  <Text>{payment.PAYTYPE_NAME || '-'}</Text>
                </div>
                <div className={styles.row}>
                  <Text type="secondary">Кому:</Text>
                  <Text>{payment.OUT_MAIN_NAME || '-'}</Text>
                </div>
                <div className={styles.row}>
                  <Text type="secondary">Статус:</Text>
                  <Text>{payment.PAY_STATUS_NAME || '-'}</Text>
                </div>
                <div className={styles.row}>
                  <Text type="secondary">Банк:</Text>
                  <Text>{payment.KASSA_NAME || '-'}</Text>
                </div>
              </div>
            </Card>
          ))}
        </div>
      );
    }
    
    return (
      <Table 
        dataSource={payments} 
        columns={columns} 
        loading={authStore.isPaymentsLoading}
        pagination={false}
        rowKey={(record: PayItem) => `${record.PAY_NUM}-${Math.random()}`}
        locale={{ emptyText: 'Нет данных о платежах' }}
      />
    );
  };

  return (
    <div className={styles.paymentsSection}>
      {contextHolder}
      {/* <Title level={2}>Мои платежи</Title> */}
      
      <div className={styles.tableWrapper}>
        {renderContent()}
        <div className={styles.paginationWrapper}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={total}
            onChange={handlePageChange}
            onShowSizeChange={handlePageSizeChange}
            showSizeChanger
            showLessItems
            size={isMobile ? "small" : "default"}
            showTitle={false}
            // showQuickJumper
            // showTotal={(total) => `Всего ${total}`}
          />
        </div>
      </div>
    </div>
  );
}); 