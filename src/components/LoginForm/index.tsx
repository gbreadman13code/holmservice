import { Form, Input, Button, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import styles from './LoginForm.module.scss';
import { useAuth } from '@/stores/auth/hooks';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const { Title, Link } = Typography;

interface LoginFormData {
  account: string;
  password: string;
}

export const LoginForm = observer(() => {
  const { login, isLoading, isAuth } = useAuth();
  const [form] = Form.useForm<LoginFormData>();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      form.resetFields();
      navigate('/account');
    }
  }, [isAuth, form, navigate]);

  const handleSubmit = async (values: LoginFormData) => {
    try {
      await login(values.account, values.password);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className={styles.loginCard}>
      <Title level={3}>Личный кабинет</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className={styles.form}
      >
        <Form.Item
          name="account"
          label="Лицевой счёт"
          rules={[{ required: true, message: 'Введите лицевой счёт' }]}
        >
          <Input size="large" placeholder="Введите лицевой счёт" disabled={isLoading} />
        </Form.Item>

        <Form.Item
          name="password"
          label="Пароль"
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <Input.Password size="large" placeholder="Введите пароль" disabled={isLoading} />
        </Form.Item>

        <Form.Item>
          <Link className={styles.forgotPassword}>
            Забыли пароль?
          </Link>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" block disabled={isLoading}  >
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}); 