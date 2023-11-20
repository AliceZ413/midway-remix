import { Catch, MidwayHttpError } from '@midwayjs/core';
import { InternalServerErrorError } from '@midwayjs/core/dist/error/http';

@Catch([InternalServerErrorError])
export class ServerErrorFilter {
  async catch(err: MidwayHttpError) {
    return {
      success: false,
      message: err.message,
    };
  }
}
