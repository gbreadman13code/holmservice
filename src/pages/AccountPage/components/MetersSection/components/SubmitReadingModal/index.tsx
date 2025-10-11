import { Modal, Form, InputNumber, Button, Typography, Spin, message } from 'antd';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { authStore } from '@/stores';
import styles from './styles.module.scss';

const { Text } = Typography;

interface SubmitReadingModalProps {
  isVisible: boolean;
  onCancel: () => void;
  counterName: string;
  currentValue: number;
  counterId: number;
  recTypeStr: string;
  onSuccess?: () => void;
}

export const SubmitReadingModal = observer(({
  isVisible,
  onCancel,
  counterName,
  currentValue,
  counterId,
  recTypeStr,
  onSuccess
}: SubmitReadingModalProps) => {
  const [form] = Form.useForm();
  const [newValue, setNewValue] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setIsSubmitting(true);
      
      const result = await authStore.submitCounterReading(counterId, values.newValue);
      
      if (result.success) {
        messageApi.success('Показания успешно переданы');
        form.resetFields();
        setNewValue(null);
        
        // Вызываем колбэк для обновления истории показаний
        if (onSuccess) {
          onSuccess();
        }
        
        // Закрываем модалку после небольшой задержки, чтобы пользователь увидел сообщение
        setTimeout(() => {
          onCancel();
          setIsSubmitting(false);
        }, 1000);
      } else {
        // Выводим конкретное сообщение об ошибке от API
        messageApi.error(result.errorMessage || 'Не удалось передать показания');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Ошибка при передаче показаний:', error);
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setNewValue(null);
    onCancel();
  };

  const handleValueChange = (value: number | null) => {
    setNewValue(value);
  };

  const getDifference = () => {
    if (newValue === null || newValue <= currentValue) return null;
    return (newValue - currentValue).toFixed(2);
  };

  const difference = getDifference();

  return (
    <>
      {contextHolder}
      <Modal
        title="Передать показания счетчика"
        open={isVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel} disabled={isSubmitting}>
            Отмена
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit} loading={isSubmitting}>
            Отправить
          </Button>
        ]}
        className={styles.modal}
        closable={!isSubmitting}
        maskClosable={!isSubmitting}
      >
        <Spin spinning={isSubmitting} tip="Отправка показаний...">
          <div className={styles.modalContent}>
        <div className={styles.infoBlock}>
          <Text strong>Счетчик:</Text>
          <Text className={styles.infoValue}>{counterName}</Text>
        </div>

        <div className={styles.infoBlock}>
          <Text strong>Текущее показание:</Text>
          <Text className={styles.infoValue}>{currentValue} {recTypeStr}</Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          className={styles.form}
        >
          <Form.Item
            label="Новое показание"
            name="newValue"
            rules={[
              { required: true, message: 'Введите новое показание' },
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve();
                  if (value <= currentValue) {
                    return Promise.reject(new Error(`Новое показание должно быть больше ${currentValue}`));
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <InputNumber
              placeholder={`Введите показание больше ${currentValue}`}
              style={{ width: '100%' }}
              min={currentValue + 0.01}
              step={0.01}
              precision={2}
              addonAfter={recTypeStr}
              onChange={handleValueChange}
            />
          </Form.Item>

          {difference && (
            <div className={styles.differenceBlock}>
              <Text className={styles.differenceText}>
                Расход: <span className={styles.differenceValue}>+{difference} {recTypeStr}</span>
              </Text>
            </div>
          )}
        </Form>
          </div>
        </Spin>
      </Modal>
    </>
  );
});

