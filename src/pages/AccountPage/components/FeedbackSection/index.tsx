import { Typography, Form, Input, Select, Checkbox, Button, Table } from 'antd';
import { observer } from 'mobx-react-lite';
import { useAuth } from '@/stores/auth/hooks';
import { FeedbackStatus, FeedbackTopic } from '@/stores/auth/store';
import styles from './FeedbackSection.module.scss';
import { useEffect } from 'react';

const { Title } = Typography;
const { TextArea } = Input;

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
    key: 'createdAt'
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
  const { sendFeedback, getFeedbacks, user } = useAuth();
  const [form] = Form.useForm();

  useEffect(() => {
    if (user?.email) {
      form.setFieldsValue({
        email: user.email
      });
    }
  }, [form, user]);

  const handleSubmit = async (values: any) => {
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
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            email: user?.email
          }}
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

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Отправить обращение
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className={styles.table}>
        <Title level={3}>История обращений</Title>
        <Table
          columns={columns}
          dataSource={getFeedbacks()}
          rowKey="id"
        />
      </div>
    </div>
  );
}); 