/**
 * @description 注册受保护的中间件
 */

import { IMiddleware, Middleware } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';
import { UnauthorizedError } from '@midwayjs/core/dist/error/http';
import { UserContext } from '../common/user-context';

@Middleware()
export class ProtectedMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const userContext = ctx.session.userContext as UserContext;

      if (!userContext || !userContext.userId || !userContext.username) {
        throw new UnauthorizedError('身份验证失败');
      }

      return next();
    };
  }

  match(ctx: Context) {
    const prefix = '/api',
      ignore = ['/api/auth/login'];
    const exist = ignore.find((item) => item.match(ctx.path));
    return ctx.path.indexOf(prefix) === 0 && !exist;
  }

  static getName() {
    return 'PROTECTED';
  }
}
