import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import * as React from 'react';

import styles from '../styles/login.module.css';
import { useNavigate } from '@remix-run/react';

type TypeLogin = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const [form] = Form.useForm<TypeLogin>();
  const navigate = useNavigate();
  const handleSubmit = (value: TypeLogin) => {
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: value.username,
        password: value.password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success) {
          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('user_info', JSON.stringify(res.user_info));
          navigate('/dashboard/home');
        } else {
          console.log(res.message);
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
