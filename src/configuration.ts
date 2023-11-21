import { join } from 'path';
import { Configuration, App, ILifeCycle } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as staticFile from '@midwayjs/static-file';
import * as typeorm from '@midwayjs/typeorm';
import * as jwt from '@midwayjs/jwt';
import * as passport from '@midwayjs/passport';
import { RequestErrorFilter } from './filter/4xx.filter';
import { ServerErrorFilter } from './filter/5xx.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { RemixMiddleware } from './middleware/remix.middleware';
import { ResTransformMiddleware } from './middleware/res-transform.middleware';

@Configuration({
  imports: [
    koa,
    validate,
    staticFile,
    typeorm,
    jwt,
    passport,
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
    this.app.useMiddleware([ReportMiddleware, RemixMiddleware, ResTransformMiddleware]);
    // add filter
    this.app.useFilter([RequestErrorFilter, ServerErrorFilter]);
  }
}
