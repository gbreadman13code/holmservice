import { Modal, Button, Form, Select, message } from 'antd';
import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { AnalysisFormValues } from './types';
import { authStore } from '@/stores';

interface AnalysisModalProps {
  isVisible: boolean;
  onCancel: () => void;
    chooseCounterId: number;
}

export const AnalysisModal: React.FC<AnalysisModalProps> = observer(
  ({
    isVisible,
    onCancel,
    chooseCounterId,
  }) => {
    const { Option } = Select;
    const [form] = Form.useForm<AnalysisFormValues>();
    const [isFormComplete, setIsFormComplete] = useState(false);
  
    const handleFormChange = () => {
      const values = form.getFieldsValue();
      
      // Проверяем, все ли поля заполнены
      const isComplete = 
        !!values.rooms && 
        !!values.residents && 
        !!values.bathroom && 
        !!values.children;
      
      setIsFormComplete(isComplete);
    };
  
    const handleSubmit = async (values: AnalysisFormValues) => {
      try {
        authStore.analysisIPU(chooseCounterId, values);
        onCancel();
      } catch (error) {
        console.error('Ошибка при получении анализа:', error);
        message.error('Не удалось выполнить анализ. Пожалуйста, попробуйте позже.');
      }
    };
  
    // Сбрасываем форму при закрытии модалки
    useEffect(() => {
      if (!isVisible) {
        form.resetFields();
        setIsFormComplete(false);
      }
    }, [isVisible, form]);
  
    return (
      <Modal
        title="Умный анализ ваших коммунальных данных"
        open={isVisible}
        onCancel={onCancel}
        footer={[
          <Button key="cancel" onClick={onCancel} loading={authStore.analysisData[chooseCounterId]?.loading}>
            Отмена
          </Button>,
          <Button 
            key="start" 
            type="primary" 
            onClick={() => handleSubmit(form.getFieldsValue())}
            disabled={!isFormComplete}
          >
            Запустить анализ
          </Button>,
        ]}
      >
        <p>
          Хотите узнать, как оптимизировать потребление воды и электричества? Наш умный анализ, основанный на ИИ Mistral, поможет вам получить персональные рекомендации по экономии ресурсов!
        </p>
        <p>
          Мы заботимся о вашей конфиденциальности: ваши личные данные останутся в безопасности и не будут использованы. Анализ проводится только на основе обезличенных данных о расходе ресурсов в следующем формате:
        </p>
        <pre className={styles.dataFormatExample}>
          {`Горячая вода:
  21.06.2024 - 5.27230047,
  01.06.2024 - 0.72769953³
  ...`}
        </pre>
        <p>
          Чтобы сделать качественный анализ, предоставьте небольшую информацию о вашей квартире:
        </p>
        <Form 
          layout="vertical" 
          className={styles.analysisForm}
          form={form}
          onValuesChange={handleFormChange}
        >
          <Form.Item 
            label="Количество комнат" 
            name="rooms"
            rules={[{ required: true, message: 'Пожалуйста, выберите количество комнат' }]}
          >
            <Select placeholder="Выберите количество комнат">
              <Option value={1}>1 комната</Option>
              <Option value={2}>2 комнаты</Option>
              <Option value={3}>3 комнаты</Option>
              <Option value={4}>4 комнаты</Option>
              <Option value={5}>5 и более комнат</Option>
            </Select>
          </Form.Item>
          
          <Form.Item 
            label="Количество жильцов" 
            name="residents"
            rules={[{ required: true, message: 'Пожалуйста, выберите количество жильцов' }]}
          >
            <Select placeholder="Выберите количество жильцов">
              <Option value={1}>1 человек</Option>
              <Option value={2}>2 человека</Option>
              <Option value={3}>3 человека</Option>
              <Option value={4}>4 человека</Option>
              <Option value={5}>5 и более человек</Option>
            </Select>
          </Form.Item>
          
          <Form.Item 
            label="В квартире есть" 
            name="bathroom"
            rules={[{ required: true, message: 'Пожалуйста, выберите тип сантехники' }]}
          >
            <Select placeholder="Выберите тип сантехники">
              <Option value="bath">Ванна</Option>
              <Option value="shower">Душ</Option>
              <Option value="both">И ванна, и душ</Option>
            </Select>
          </Form.Item>
          
          <Form.Item 
            label="В квартире есть маленькие дети" 
            name="children"
            rules={[{ required: true, message: 'Пожалуйста, укажите наличие детей' }]}
          >
            <Select placeholder="Есть ли маленькие дети">
              <Option value="yes">Да</Option>
              <Option value="no">Нет</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
); 