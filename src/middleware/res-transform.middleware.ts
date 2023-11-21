/**
 * 中间件
 * @description 统一处理返回
 */

import { IMiddleware, Middleware } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';

@Middleware()
export class ResTransformMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const result = await next();
      return {
        success: true,
        data: result,
      };
    };
  }

  match(ctx: Context) {
    return ctx.path.indexOf('/api') !== -1;
  }
}
