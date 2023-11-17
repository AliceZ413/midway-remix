import { IMiddleware, Middleware } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';
import path = require('path');
import { RemixService } from '../service/remix.service';
import { ServerBuild } from '@remix-run/node';

@Middleware()
export class RemixMiddleware implements IMiddleware<Context, NextFunction> {
  private remixHandlerPath: string = path.resolve(process.cwd(), './build');

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const remixService = await ctx.requestContext.getAsync<RemixService>(
        RemixService
      );
      remixService.purgeRequireCacheInDev(this.remixHandlerPath);

      return remixService.createRequestHandler({
        build: require(this.remixHandlerPath) as ServerBuild,
        mode: process.env.NODE_ENV,
      })(ctx, next);
    };
  }

  ignore(ctx: Context) {
    // remix自带404页面，需要过滤api路由
    return /^\/(build|assets|api)\//gi.test(ctx.path);
  }

  static getName() {
    return 'remix';
  }
}
