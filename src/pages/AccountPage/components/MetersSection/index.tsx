import { authStore } from "@/stores";
import { Card, Button, Row, Col, Spin, Table, Space, Pagination } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { AnalysisModal } from "./components/AnalysisModal";
import { SubmitReadingModal } from "./components/SubmitReadingModal";
import { useIsMobile } from "@/hooks/useIsMobile";

// Интерфейс для точки данных таблицы
interface MeterHistoryRecord {
  key: string;
  date: string;
  currentValue: number;
  prevValue: number | null;
  volume: number;
  source: string;
}

const getDate = (date: string) => {
  const [day, month, year] = date.split(" ")[0].split(".");
  return new Date(Number(year), Number(month) - 1, Number(day));
};

export const MetersSection = observer(() => {
  const [selectedCounterId, setSelectedCounterId] = useState<number | null>(
    null
  );
  const [selectedCounter, setSelectedCounter] = useState<string>("");
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [isAnalysisModalVisible, setIsAnalysisModalVisible] = useState(false);
  const [isSubmitReadingModalVisible, setIsSubmitReadingModalVisible] =
    useState(false);
  const [submitReadingCounter, setSubmitReadingCounter] = useState<{
    id: number;
    name: string;
    currentValue: number;
    recTypeStr: string;
  } | null>(null);
  const [mobilePage, setMobilePage] = useState(1);
  const [mobilePageSize, setMobilePageSize] = useState(5);

  const isMobile = useIsMobile();

  useEffect(() => {
    authStore.getIPU();
  }, []);

  const handleViewHistory = async (counterId: number, serviceName: string) => {
    setSelectedCounterId(counterId);
    setSelectedCounter(serviceName);
    setIsHistoryLoading(true);
    setMobilePage(1); // Сбрасываем страницу при загрузке новой истории
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

    try {
      await authStore.getIPUHistory(counterId);
    } finally {
      setIsHistoryLoading(false);
    }
  };

  // Форматируем данные для таблицы
  const getTableData = (): MeterHistoryRecord[] => {
    if (!authStore.ipuHistory.length) return [];

    return authStore.ipuHistory.map((item, index) => {
      const prevItem = index > 0 ? authStore.ipuHistory[index - 1] : null;

      return {
        key: `history_${index}`,
        date: item.DATE1.split(" ")[0],
        currentValue: item.COUNTER_VALUE,
        prevValue: prevItem ? prevItem.COUNTER_VALUE : null,
        volume: item.VOLUME,
        source: item.DATA_SOURCE_NAME,
      };
    });
  };

  // Определяем колонки таблицы
  const columns = [
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      sorter: (a: MeterHistoryRecord, b: MeterHistoryRecord) => {
        const dateA = getDate(a.date);
        const dateB = getDate(b.date);
        return dateA.getTime() - dateB.getTime();
      },
    },
    {
      title: "Текущее показание",
      dataIndex: "currentValue",
      key: "currentValue",
      sorter: (a: MeterHistoryRecord, b: MeterHistoryRecord) =>
        a.currentValue - b.currentValue,
    },
    {
      title: "Предыдущее показание",
      dataIndex: "prevValue",
      key: "prevValue",
      render: (value: number | null) => (value !== null ? value : "Нет данных"),
    },
    {
      title: "Потребление",
      dataIndex: "volume",
      key: "volume",
      sorter: (a: MeterHistoryRecord, b: MeterHistoryRecord) =>
        a.volume - b.volume,
      className: styles.volume,
    },
    {
      title: "Источник",
      dataIndex: "source",
      key: "source",
    },
  ];

  // Рендер карточек для мобильной версии истории показаний
  const renderMobileHistoryCards = () => {
    const tableData = getTableData();

    if (tableData.length === 0) {
      return (
        <div className={styles.emptyDataContainer}>
          История показаний отсутствует
        </div>
      );
    }

    // Вычисляем данные для текущей страницы
    const startIndex = (mobilePage - 1) * mobilePageSize;
    const endIndex = startIndex + mobilePageSize;
    const paginatedData = tableData.slice(startIndex, endIndex);

    return (
      <>
        <Space direction="vertical" style={{ width: "100%" }}>
          {paginatedData.map((record) => (
            <Card key={record.key} className={styles.historyCard}>
              <div className={styles.historyCardTitle}>{record.date}</div>
              <div className={styles.historyCardContent}>
                <div className={styles.historyCardRow}>
                  <span>Текущее показание:</span>
                  <span>{record.currentValue}</span>
                </div>
                <div className={styles.historyCardRow}>
                  <span>Предыдущее показание:</span>
                  <span>
                    {record.prevValue !== null
                      ? record.prevValue
                      : "Нет данных"}
                  </span>
                </div>
                <div className={styles.historyCardRow}>
                  <span>Потребление:</span>
                  <span className={styles.volumeValue}>{record.volume}</span>
                </div>
                <div className={styles.historyCardRow}>
                  <span>Источник:</span>
                  <span>{record.source}</span>
                </div>
              </div>
            </Card>
          ))}
        </Space>
        <div className={styles.mobilePagination}>
          <Pagination
            current={mobilePage}
            pageSize={mobilePageSize}
            total={tableData.length}
            onChange={(page, pageSize) => {
              setMobilePage(page);
              setMobilePageSize(pageSize);
            }}
            showSizeChanger={false}
            showTotal={(total) => `Всего ${total} записей`}
            size="small"
          />
        </div>
      </>
    );
  };

  // const showAnalysisModal = () => {
  //   setIsAnalysisModalVisible(true);
  // };

  const hideAnalysisModal = () => {
    setIsAnalysisModalVisible(false);
  };

  // const copyAnalysisToClipboard = () => {
  //   const analysisText = authStore.analysisData[selectedCounterId!]?.response || '';

  //   navigator.clipboard.writeText(analysisText)
  //     .then(() => {
  //       messageApi.success('Скопировано!');
  //     })
  //     .catch((err) => {
  //       messageApi.error('Не удалось скопировать текст');
  //       console.error('Ошибка при копировании:', err);
  //     });
  // };

  // const toggleAnalysisCollapse = () => {
  //   setIsAnalysisCollapsed(prev => !prev);
  // };

  const showSubmitReadingModal = (counter: {
    id: number;
    name: string;
    currentValue: number;
    recTypeStr: string;
  }) => {
    setSubmitReadingCounter(counter);
    setIsSubmitReadingModalVisible(true);
  };

  const hideSubmitReadingModal = () => {
    setIsSubmitReadingModalVisible(false);
    setSubmitReadingCounter(null);
  };

  if (authStore.isIPULoading) {
    return (
      <div className={styles.loaderWrapper}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <Row gutter={[16, 16]}>
        {authStore.ipuData?.counters.map((counter) => (
          <Col xs={24} sm={24} md={24} lg={12} key={counter.COUNTER_ID}>
            <Card
              title={counter.SERVICE_NAME}
              className={styles.meterCard}
              hoverable
            >
              <div className={styles.cardContent}>
                <p>
                  <strong>Дата поверки:</strong>{" "}
                  {counter.REPAIR_DATE?.split(" ")[0] || "Не указана"}
                </p>
                <p>
                  <strong>Начальное значение:</strong> {counter.FIRST_VALUE}{" "}
                  {counter.REC_TYPE_STR}
                </p>
                <p>
                  <strong>Текущее значение:</strong> {counter.COUNTER_VALUE}{" "}
                  {counter.REC_TYPE_STR}
                </p>
                <p>
                  <strong>Дата последней передачи:</strong>{" "}
                  {counter.LAST_STAMP?.split(" ")[0]}
                </p>
                <p>
                  <strong>Серийный номер:</strong>{" "}
                  {counter.SERIYA || "Не указан"}
                </p>
              </div>

              <div className={styles.buttonGroup}>
                <Button
                  type="default"
                  onClick={() =>
                    handleViewHistory(counter.COUNTER_ID, counter.SERVICE_NAME)
                  }
                  className={styles.historyButton}
                >
                  Смотреть историю показаний
                </Button>

                {counter.IS_DIRECT_CONTRACT && (
                  <Button
                    type="primary"
                    onClick={() =>
                      showSubmitReadingModal({
                        id: counter.COUNTER_ID,
                        name: counter.SERVICE_NAME,
                        currentValue: counter.COUNTER_VALUE,
                        recTypeStr: counter.REC_TYPE_STR,
                      })
                    }
                    className={styles.submitButton}
                  >
                    Передать показания
                  </Button>
                )}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {!authStore.ipuData?.counters.length && !authStore.isIPULoading && (
        <div className={styles.noData}>
          <p>Нет данных о счетчиках</p>
        </div>
      )}

      {selectedCounterId && (
        <div className={styles.tableContainer}>
          {isHistoryLoading ? (
            <div className={styles.tableLoader}>
              <Spin size="large" />
            </div>
          ) : authStore.ipuHistory.length > 0 ? (
            <div className={styles.tableWrapper}>
              <h2
                className={styles.tableTitle}
              >{`История показаний: ${selectedCounter}`}</h2>

              {/* {authStore.analysisData[selectedCounterId]?.loading ? (
                  <div className={styles.analysisResultLoader}>
                    <Spin size="large" />
                    <Text className={styles.analysisText} style={{ marginLeft: 16 }}>
                      Выполняем ИИ-анализ ваших данных...
                    </Text>
                  </div>
                ) : authStore.analysisData[selectedCounterId]?.response ? (
                  <div className={`${styles.analysisResultBlock} ${isAnalysisCollapsed ? styles.collapsed : ''}`}>
                    <div className={styles.analysisControls}>
                      <Button 
                        icon={<CopyOutlined />} 
                        onClick={copyAnalysisToClipboard}
                        type="text"
                        className={styles.copyButton}
                        title="Копировать анализ"
                      />
                      <Button
                        icon={isAnalysisCollapsed ? <DownOutlined /> : <UpOutlined />}
                        onClick={toggleAnalysisCollapse}
                        type="text"
                        className={styles.collapseButton}
                        title={isAnalysisCollapsed ? "Развернуть анализ" : "Свернуть анализ"}
                      />
                    </div>
                    
                    {!isAnalysisCollapsed && (
                      <div className={styles.analysisResultText}>
                        <ReactMarkdown>
                          {authStore.analysisData[selectedCounterId]?.response}
                        </ReactMarkdown>
                      </div>
                    )}
                    {isAnalysisCollapsed && (
                      <div className={styles.collapsedTitle}>
                        Результаты анализа
                      </div>
                    )}
                  </div>
                ) : ( null
                  // <Space className={styles.analysisPromoBlock}>
                  //   <Text className={styles.analysisText}>
                  //     <ExperimentOutlined className={styles.analysisIcon} /> Хотите провести ИИ-анализ вашего потребления?
                  //   </Text>
                  //   <Button type="primary" onClick={showAnalysisModal}>
                  //     Анализировать
                  //   </Button>
                  // </Space>
                )} */}

              {isMobile ? (
                renderMobileHistoryCards()
              ) : (
                <Table
                  dataSource={getTableData()}
                  columns={columns}
                  pagination={{
                    pageSize: 10,
                    total: authStore.ipuHistory.length,
                    showSizeChanger: true,
                    showTotal: (total) => `Всего ${total} записей`,
                  }}
                  size="middle"
                  bordered
                  loading={isHistoryLoading}
                  className={styles.historyTable}
                  scroll={{ x: "max-content" }}
                />
              )}

              <AnalysisModal
                isVisible={isAnalysisModalVisible}
                onCancel={hideAnalysisModal}
                chooseCounterId={selectedCounterId}
              />
            </div>
          ) : (
            <div className={styles.noData}>
              <p>История показаний отсутствует</p>
            </div>
          )}
        </div>
      )}

      {submitReadingCounter && (
        <SubmitReadingModal
          isVisible={isSubmitReadingModalVisible}
          onCancel={hideSubmitReadingModal}
          counterName={submitReadingCounter.name}
          currentValue={submitReadingCounter.currentValue}
          counterId={submitReadingCounter.id}
          recTypeStr={submitReadingCounter.recTypeStr}
          onSuccess={() => {
            // Перезагружаем список счетчиков с обновленными данными
            authStore.getIPU();

            // Перезагружаем историю показаний после успешной передачи
            if (selectedCounterId) {
              authStore.getIPUHistory(selectedCounterId);
            }
          }}
        />
      )}
    </div>
  );
});
