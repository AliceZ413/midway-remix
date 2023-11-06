/**
 * the Root Route
 * it will be a global layout in your entire app
 */
import { Links, LiveReload, Meta, Outlet, Scripts } from '@remix-run/react';
import * as React from 'react';

export default function App() {
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Hello world!5</h1>
        <Outlet />

        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
