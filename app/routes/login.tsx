import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useNavigate } from '@remix-run/react';

import styles from '../styles/login.module.css';
import { login } from '../utils/webapi';

type TypeLogin = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const [form] = Form.useForm<TypeLogin>();
  const navigate = useNavigate();
  const handleSubmit = (value: TypeLogin) => {
    login(value.username, value.password)
      .then((res) => {
        if (res.code === 0) {
          const { user_info } = res.data;
          localStorage.setItem('user_info', JSON.stringify(user_info));
          navigate('/dashboard/home');
        } else {
          alert(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.wrapperTitle}>登录</div>
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item name='username' rules={[{ required: true, message: '请输入账号' }]}>
            <Input prefix={<UserOutlined />} placeholder='账号' />
          </Form.Item>
          <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder='密码' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' className='login-form-button' block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
