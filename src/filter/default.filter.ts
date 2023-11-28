import { Catch } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Catch()
export class DefaultErrorFilter {
  async catch(err: Error, ctx: Context) {
    ctx.logger.error('%s > %s', err.name, err.message);

    return {
      code: 1,
      message: err.message,
    };
  }
}
