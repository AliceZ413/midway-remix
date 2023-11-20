import { Catch, MidwayHttpError } from '@midwayjs/core';
import { BadRequestError, ForbiddenError, NotFoundError, UnauthorizedError } from '@midwayjs/core/dist/error/http';

@Catch([UnauthorizedError, BadRequestError, ForbiddenError, NotFoundError])
export class RequestErrorFilter {
  async catch(err: MidwayHttpError) {
    return {
      success: false,
      code: err.code,
      message: err.message,
    };
  }
}
