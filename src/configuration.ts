import { join } from 'path';
import { Configuration, App, ILifeCycle, Inject, MidwayDecoratorService } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as staticFile from '@midwayjs/static-file';
import * as typeorm from '@midwayjs/typeorm';
import * as session from '@midwayjs/session';

import { MemorySessionStore } from './service/session-store.service';

import { middlewares } from './middleware';
import { filters } from './filter';
import { MethodDecorators } from './decorator';

@Configuration({
  imports: [
    koa,
    validate,
    staticFile,
    typeorm,
    session,
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

  @Inject()
  memoryStore: MemorySessionStore;

  @Inject()
  sessionStoreManager: session.SessionStoreManager;

  @Inject()
  middlewareDecoratorService: MidwayDecoratorService;

  async onReady() {
    this.sessionStoreManager.setSessionStore(this.memoryStore);

    // add middleware
    this.app.useMiddleware([...middlewares]);
    // add filter
    this.app.useFilter([...filters]);
    // add custom decorator
    for (const { key, fn } of MethodDecorators) {
      this.middlewareDecoratorService.registerMethodHandler(key, fn);
    }
  }

  async onServerReady(): Promise<void> {
    this.app.setAttr('runTime', Date.now());
    this.app.getLogger().warn('当期服务环境运行配置 => %s', this.app.getEnv());
  }
}
