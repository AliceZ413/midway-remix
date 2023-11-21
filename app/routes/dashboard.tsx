import { Outlet } from '@remix-run/react';
import * as React from 'react';
import styles from '../styles/dashboard.module.css';
import { Button, Layout, Menu } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Sider, Header, Content } = Layout;

export default function Dashboard() {
  const [collapsed, setCollapsed] = React.useState(false);
  const menus: ItemType<MenuItemType>[] = [
    {
      key: '1',
      label: 'nav 1',
    },
    {
      key: '2',
      label: 'nav 2',
    },
  ];
  return (
    <Layout className={styles.page} hasSider>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.logoBg}></div>
        <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']} items={menus}></Menu>
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className={styles.headerBtn}
          ></Button>
        </Header>
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
