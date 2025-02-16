import { Typography, Form, Input, Select, Checkbox, Button, Table, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import { useAuth } from '@/stores/auth/hooks';
import { FeedbackStatus, FeedbackTopic } from '@/stores/auth/store';
import styles from './FeedbackSection.module.scss';
import { useEffect } from 'react';
import { toJS } from 'mobx';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

const { Title } = Typography;
const { TextArea } = Input;

// Определим интерфейс для формы
interface FeedbackForm {
  topic: FeedbackTopic;
  email: string;
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

const statusLabels = {
  [FeedbackStatus.SENT]: 'Отправлено',
  [FeedbackStatus.IN_PROGRESS]: 'На рассмотрении',
  [FeedbackStatus.RESOLVED]: 'Рассмотрено'
};

const columns = [
  {
    title: 'Номер обращения',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Дата',
    dataIndex: 'createdAt',
    key: 'createdAt',
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
    key: 'email'
  },
  {
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
    render: (status: FeedbackStatus) => statusLabels[status]
  }
];

export const FeedbackSection = observer(() => {
  const { sendFeedback, feedbacks, user, isFeedbackSending } = useAuth();
  const [form] = Form.useForm<FeedbackForm>();

  // Используем Form.useWatch для отслеживания изменений полей
  const topic = Form.useWatch('topic', form);
  const email = Form.useWatch('email', form);
  const message = Form.useWatch('message', form);
  const agreement = Form.useWatch('agreement', form);

  useEffect(() => {
    if (user?.email) {
      form.setFieldsValue({
        email: user.email
      });
    }
  }, [form, user]);

  const handleSubmit = async (values: FeedbackForm) => {
    try {
      await sendFeedback(values);
      form.resetFields();
    } catch (error) {
      console.error('Error sending feedback:', error);
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.form}>
        <Spin spinning={isFeedbackSending}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              email: user?.email,
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
                Я согласен на обработку персональных данных
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
        <Title level={3}>История обращений</Title>
        <Table
          columns={columns}
          dataSource={toJS(feedbacks)}
          rowKey="id"
          loading={isFeedbackSending}
        />
      </div>
    </div>
  );
}); 