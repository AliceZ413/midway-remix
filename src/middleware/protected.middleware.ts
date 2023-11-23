/**
 * 中间件
 * @description 统一处理返回
 */

import { IMiddleware, Middleware } from '@midwayjs/core';
import { UnauthorizedError } from '@midwayjs/core/dist/error/http';
import { Context, NextFunction } from '@midwayjs/koa';

@Middleware()
export class ProtectedMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const user = ctx.session.user;
      if (!user) {
        throw new UnauthorizedError();
      }
      next();
    };
  }

  match(ctx: Context) {
    return ctx.path.indexOf('/api') !== -1;
  }
}
