import { Button, Form, Spin, Typography, message as messageAntd } from 'antd';
import { Checkbox } from 'antd';
import { Input } from 'antd';
import { Select } from 'antd';
import { Container } from '@/components/Container';
import styles from './FeedbackPage.module.scss';
import { useAuth } from '@/stores/auth/hooks';
import { FeedbackTopic } from '@/stores/auth/store';
import feedbackIllustration from '@/assets/illustrations/feedback.svg';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

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

const { TextArea } = Input;

export const FeedbackPage = () => {
  const { sendFeedback, isFeedbackSending } = useAuth();
  const [form] = Form.useForm<FeedbackForm>();
  const [messageApi, contextHolder] = messageAntd.useMessage();

  // Используем Form.useWatch для отслеживания изменений полей
  const topic = Form.useWatch('topic', form);
  const email = Form.useWatch('email', form);
  const message = Form.useWatch('message', form);
  const agreement = Form.useWatch('agreement', form);

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
      messageApi.success('Обращение отправлено');
      form.resetFields();
    } catch (error) {
      console.error('Error sending feedback:', error);
      messageApi.error('Ошибка при отправке обращения');
    }
  };

  return (
    <div className={styles.page}>
      {contextHolder}
      <section className={styles.hero}>
        <Container>
          <Title level={1}>Обратная связь</Title>
          <Text className={styles.subtitle}>
            Мы всегда рады вашему мнению и предложениям
          </Text>
        </Container>
      </section>

      

      <Container>
      <section className={styles.content}>
      <div className={styles.section} id='feedback-section'>
      <div className={styles.form}>
        <Spin spinning={isFeedbackSending}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
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
                    form.getFieldsError().some(({ errors }) => errors.length)
                  }
                >
                  Отправить обращение
                </Button>
              )}
            </Form.Item>
          </Form>
        </Spin>
        <img src={feedbackIllustration} alt="Обратная связь" />
      </div>
        </div>
      </section>
      </Container>
    </div>
  );
}; 