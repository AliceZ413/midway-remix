/**
 * the Root Route
 * it will be a global layout in your entire app
 */
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import type { LinksFunction, MetaFunction } from '@remix-run/node';
import * as React from 'react';

export const links: LinksFunction = () => {
  return [
    // { rel: 'stylesheet', href:  }
    { rel: 'icon', href: 'data:image/x-icon;base64,AA' },
  ];
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
