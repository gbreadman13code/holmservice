import { Typography, Form, Input, Select, Checkbox, Button, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import { useAuth } from '@/stores/auth/hooks';
import { FeedbackTopic } from '@/stores/auth/store';
import styles from './FeedbackSection.module.scss';
import { useEffect } from 'react';
import { toJS } from 'mobx';
import { FeedbackTable } from './components/FeedbackTable';
import { Link } from 'react-router-dom';

const { Title } = Typography;
const { TextArea } = Input;

// Определим интерфейс для формы
interface FeedbackForm {
  topic: FeedbackTopic;
  email: string;
  phone: string;
  full_name: string;
  address: string;
  message: string;
  agreement: boolean;
}

const topicOptions = [
  { label: 'Перерасчет', value: FeedbackTopic.RECALCULATION },
  { label: 'Передача показаний', value: FeedbackTopic.METERS },
  { label: 'Обслуживание', value: FeedbackTopic.MAINTENANCE },
  { label: 'Ремонт', value: FeedbackTopic.REPAIR },
  { label: 'Другое', value: FeedbackTopic.OTHER }
];

export const FeedbackSection = observer(() => {
  const { sendFeedback, getFeedbacks, feedbacks, user, isFeedbackSending } = useAuth();
  const [form] = Form.useForm<FeedbackForm>();

  // Используем Form.useWatch для отслеживания изменений полей
  const topic = Form.useWatch('topic', form);
  const email = Form.useWatch('email', form);
  const message = Form.useWatch('message', form);
  const agreement = Form.useWatch('agreement', form);
  const address = Form.useWatch('address', form);

  useEffect(() => {
    getFeedbacks();
  }, []);

  const handleSubmit = async (values: FeedbackForm) => {
    try {

      await sendFeedback({
        topic: values.topic,
        email: values.email,
        phone: values.phone,
        full_name: values.full_name,
        address: values.address,
        message: values.message,
      });
      form.resetFields();
    } catch (error) {
      console.error('Error sending feedback:', error);
    }
  };

  return (
    <div className={styles.section} id='feedback-section'>
      <div className={styles.form}>
        <Spin spinning={isFeedbackSending}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              email: user?.main_email,
              full_name: user?.name_kvartir,
              address: user?.address,
              agreement: false
            }}
            disabled={isFeedbackSending}
          >
            <Form.Item
              name="topic"
              label="Тема обращения"
              rules={[{ required: true, message: 'Выберите тему обращения' }]}
            >
              <Select options={topicOptions} />
            </Form.Item>

            <Form.Item
              name="full_name"
              label="Имя"
              rules={[{ required: true, message: 'Введите имя' }]}
            >
              <Input placeholder="Введите имя" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Телефон"
              rules={[{ required: true, message: 'Введите телефон' }]}
            >
              <Input placeholder="Введите телефон" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email для ответа"
              rules={[
                { required: true, message: 'Введите email' },
                { type: 'email', message: 'Введите корректный email' }
              ]}
            >
              <Input placeholder="Введите email для ответа" />
            </Form.Item>

            <Form.Item
              name="address"
              label="Адрес"
              rules={[{ required: true, message: 'Введите адрес' }]}
            >
              <Input placeholder="Введите адрес" />
            </Form.Item>

            <Form.Item
              name="message"
              label="Текст обращения"
              rules={[{ required: true, message: 'Введите текст обращения' }]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Необходимо согласие')),
                },
              ]}
            >
              <Checkbox>
                Я согласен <Link to="/documents/terms" target="_blank">с политикой конфиденциальности</Link>
              </Checkbox>
            </Form.Item>

            <Form.Item shouldUpdate>
              {() => (
                <Button 
                  type="primary" 
                  htmlType="submit"
                  loading={isFeedbackSending}
                  disabled={
                    !topic || 
                    !email || 
                    !message || 
                    !agreement ||
                    !address ||
                    form.getFieldsError().some(({ errors }) => errors.length)
                  }
                >
                  Отправить обращение
                </Button>
              )}
            </Form.Item>
          </Form>
        </Spin>
      </div>

        <div className={styles.table}>
          <Title level={3}>{feedbacks.length < 1 ? 'История обращений пуста' : 'История обращений'}</Title>
          {feedbacks.length > 0 && (
            <FeedbackTable 
              data={toJS(feedbacks)} 
              loading={isFeedbackSending}
            />
          )}
        </div>
        </div>
  );
}); 