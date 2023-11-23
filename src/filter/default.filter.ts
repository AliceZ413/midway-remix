import { Catch } from '@midwayjs/core';

@Catch()
export class DefaultErrorFilter {
  async catch(err: Error) {
    return {
      code: 1,
      message: err.message,
    };
  }
}
