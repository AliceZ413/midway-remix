import { Catch, MidwayHttpError } from '@midwayjs/core';
import { BadRequestError, ForbiddenError, NotFoundError, UnauthorizedError } from '@midwayjs/core/dist/error/http';
import { Context } from '@midwayjs/koa';

@Catch([UnauthorizedError, BadRequestError, ForbiddenError, NotFoundError])
export class ClientErrorFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    ctx.logger.error('%s > %s', err.name, err.message);

    return {
      success: false,
      code: err.code,
      message: err.message,
    };
  }
}
