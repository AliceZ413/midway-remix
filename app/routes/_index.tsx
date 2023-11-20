/**
 * The Root Layout
 */

import { Outlet } from '@remix-run/react';
import { App, ConfigProvider } from 'antd';
import * as React from 'react';

export default function IndexPage() {
  return (
    <ConfigProvider>
      <App>
        <Outlet />
      </App>
    </ConfigProvider>
  );
}
