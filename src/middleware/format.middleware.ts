import { IMiddleware, Middleware } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';

@Middleware()
export class FormatMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const result = await next();
      return {
        code: 0,
        message: 'ok',
        data: result,
      };
    };
  }

  match(ctx: Context) {
    return ctx.path.indexOf('/api') !== -1;
  }

  static getName() {
    return 'API_RESPONSE_FORMAT';
  }
}
