import {
  IMiddleware,
  IMidwayApplication,
  Init,
  Singleton,
} from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';
import {
  ServerBuild,
  createRequestHandler as createRemixRequestHandler,
  writeReadableStreamToWritable,
} from '@remix-run/node';
import { resolve } from 'path';

@Singleton()
export class RemixMiddleware implements IMiddleware<Context, NextFunction> {
  build: ServerBuild;

  @Init()
  async init() {}

  resolve(app: IMidwayApplication) {
    if (!this.build) {
      const BUILD_DIR = resolve(app.getBaseDir(), '../server/remix');
      this.build = require(BUILD_DIR);
    }

    const handleRequest = createRemixRequestHandler(this.build);

    return async (ctx: Context, next: NextFunction) => {
      const request = this.createRemixRequest(ctx);

      const response = await handleRequest(request);

      await this.sendRemixResponse(ctx, response);

      return next();
    };
  }

  createRemixRequest(ctx: Context) {
    const origin = `${ctx.protocol}://${ctx.host}`;
    const url = new URL(ctx.url, origin);

    const controller = new AbortController();
    ctx.res.on('close', () => controller.abort());

    const init: RequestInit = {
      method: ctx.method,
      headers: this.createRemixHeaders(ctx.headers),
      signal: controller.signal as Exclude<RequestInit['signal'], undefined>,
    };

    if (ctx.method !== 'GET' && ctx.method !== 'HEAD') {
      init.body = ctx.request.body as BodyInit;
    }

    return new Request(url.href, init);
  }

  createRemixHeaders(requestHeaders: Context['headers']) {
    const headers = new Headers();

    for (const [key, values] of Object.entries(requestHeaders)) {
      if (values) {
        if (Array.isArray(values)) {
          for (const value of values) {
            headers.append(key, value);
          }
        } else {
          headers.set(key, values);
        }
      }
    }

    return headers;
  }

  async sendRemixResponse(ctx: Context, response: Response) {
    ctx.status = response.status;
    ctx.message = response.statusText;

    for (const [key, values] of Object.entries(response.headers)) {
      for (const value of values) {
        ctx.append(key, value);
      }
    }

    if (response.body) {
      await writeReadableStreamToWritable(response.body, ctx.res);
    }
  }

  ignore(ctx: Context) {
    // remix自带404页面，需要过滤api路由
    return ctx.path.startsWith('/api/');
  }

  static getName() {
    return 'remix';
  }
}
