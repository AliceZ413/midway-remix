import { join } from 'path';
import { Configuration, App, ILifeCycle } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as staticFile from '@midwayjs/static-file';
import * as typeorm from '@midwayjs/typeorm';

import { DefaultErrorFilter } from './filter/default.filter';
import { ClientErrorFilter } from './filter/client-error.filter';
import { ServerErrorFilter } from './filter/server-error.filter';

import { ReportMiddleware } from './middleware/report.middleware';
import { RemixMiddleware } from './middleware/remix.middleware';
import { FormatMiddleware } from './middleware/format.middleware';
import { ProtectedMiddleware } from './middleware/protected.middleware';

@Configuration({
  imports: [
    koa,
    validate,
    staticFile,
    typeorm,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration implements ILifeCycle {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ProtectedMiddleware, ReportMiddleware, RemixMiddleware, FormatMiddleware]);
    // add filter
    this.app.useFilter([DefaultErrorFilter, ClientErrorFilter, ServerErrorFilter]);
  }
}
