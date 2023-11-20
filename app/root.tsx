/**
 * the Root Route
 * it will be a global layout in your entire app
 */
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import type { LinksFunction, MetaFunction } from '@remix-run/node';
import * as React from 'react';
import resetStyle from 'antd/dist/reset.css';
import antdStyle from './styles/antd.min.css';
import { cssBundleHref } from '@remix-run/css-bundle';

export const links: LinksFunction = () => {
  const result = [
    { rel: 'stylesheet', href: resetStyle },
    { rel: 'stylesheet', href: antdStyle },
    { rel: 'icon', href: 'data:image/x-icon;base64,AA' },
  ];

  cssBundleHref && result.push({ rel: 'stylesheet', href: cssBundleHref });

  return result;
};

export const meta: MetaFunction = () => {
  return [
    { title: 'Midway+Remix' },
    { charSet: 'utf-8' },
    { name: 'viewport', content: 'width=device-width,initial-scale=1' },
  ];
};

export default function App() {
  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />

        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV !== 'production' && <LiveReload />}
      </body>
    </html>
  );
}
