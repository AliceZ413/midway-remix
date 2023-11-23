import { Outlet, useNavigate } from '@remix-run/react';
import * as React from 'react';
import styles from '../styles/dashboard.module.css';
import { Button, Layout, Menu } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems';
import { LoginOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import { logout } from '../utils/webapi';

const { Sider, Header, Content } = Layout;

export const loader = (args: LoaderFunctionArgs) => {
  const user = args.context.user;
  if (!user) {
    return redirect('/login');
  }
  return {
    user,
  };
};

export default function Dashboard() {
  const [collapsed, setCollapsed] = React.useState(false);
  const navigate = useNavigate();
  const menus: ItemType<MenuItemType>[] = [
    {
      key: '/dashboard/nav1',
      label: 'nav 1',
    },
    {
      key: '/dashboard/nav2',
      label: 'nav 2',
    },
  ];
  const pushTo = (key: string) => {
    navigate(key);
  };
  const handleLogout = () => {
    logout().then((res) => {
      if (res.success) {
        navigate('/login', {
          replace: true,
        });
      }
    });
  };

  return (
    <Layout className={styles.page} hasSider>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.logoBg}></div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['1']}
          items={menus}
          onClick={({ key }) => pushTo(key)}
        ></Menu>
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <div className={styles.headerLeft}>
            <Button
              type='text'
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className={styles.headerBtn}
              style={{ width: '34px' }}
            ></Button>
          </div>
          <div className={styles.headerRight}>
            <Button type='text' icon={<LoginOutlined />} onClick={() => handleLogout()}>
              退出
            </Button>
          </div>
        </Header>
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
