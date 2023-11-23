/**
 * @description 注册受保护的中间件
 */

import { IMiddleware, Middleware } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';

@Middleware()
export class ProtectedMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // if (!ctx.headers['authorization']) {
      //   throw new UnauthorizedError('缺少凭证');
      // }
      // const parts = ctx.get('authorization').trim().split(' ');
      // if (parts.length !== 2) {
      //   throw new UnauthorizedError('无效凭证');
      // }
      // const [scheme, token] = parts;
      // if (!/^Bearer$/i.test(scheme)) {
      //   throw new UnauthorizedError('无效凭证');
      // }
      // // 校验token
      // const jwt = await this.jwtService.verify(token, { complete: true });
      // const payload = jwt['payload'];
      // if (payload.username !== ctx.userContext.username) {
      //   throw new UnauthorizedError('无效凭证');
      // }

      return next();
    };
  }

  match(ctx: Context) {
    const prefix = '/api',
      ignore = ['/api/login'];
    const exist = ignore.find((item) => item.match(ctx.path));
    return ctx.path.indexOf(prefix) === 0 && !exist;
  }

  static getName() {
    return 'PROTECTED';
  }
}
