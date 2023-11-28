import { Catch, MidwayHttpError } from '@midwayjs/core';
import { InternalServerErrorError } from '@midwayjs/core/dist/error/http';
import { Context } from '@midwayjs/koa';

@Catch([InternalServerErrorError])
export class ServerErrorFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    ctx.logger.error('%s > %s', err.name, err.message);
    return {
      success: false,
      message: err.message,
    };
  }
}
