import { Provide } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';
import {
  AppLoadContext,
  ServerBuild,
  createReadableStreamFromReadable,
  createRequestHandler as createRemixRequestHandler,
  writeReadableStreamToWritable,
} from '@remix-run/node';

type GetLoadContextFunction = (ctx: Context) => Promise<AppLoadContext> | AppLoadContext;

type RequestHandler = (ctx: Context, next: NextFunction) => Promise<void>;

@Provide()
export class RemixService {
  isWhiteListRoute(ctx: Context) {
    return /^\/(build|assets|api)\//gi.test(ctx.url);
  }

  purgeRequireCacheInDev(remixHandlerPath: string) {
    if (process.env.NODE_ENV === 'production') {
      return;
    }
    for (const key in require.cache) {
      if (key.startsWith(remixHandlerPath)) {
        delete require.cache[key];
      }
    }
  }

  createRequestHandler({
    build,
    getLoadContext,
    mode = process.env.NODE_ENV,
  }: {
    build: ServerBuild | (() => Promise<ServerBuild>);
    getLoadContext?: GetLoadContextFunction;
    mode?: string;
  }): RequestHandler {
    const handleRequest = createRemixRequestHandler(build, mode);
    return async (ctx: Context, next: NextFunction) => {
      try {
        const request = this.createRemixRequest(ctx);
        const loadContext = await getLoadContext?.(ctx);

        const criticalCss = mode === 'production' ? null : ctx.locals.__remixDevCriticalCss;

        const response = await handleRequest(
          request,
          loadContext,
          criticalCss
            ? {
                __criticalCss: criticalCss,
              }
            : undefined,
        );

        await this.sendRemixResponse(ctx, response);
      } catch (err: unknown) {
        next();
      }
    };
  }

  private createRemixRequest(ctx: Context) {
    const [, hostnamePort] = ctx.get('X-Forwarded-Host')?.split(':') ?? [];
    const [, hostPort] = ctx.get('host')?.split(':') ?? [];

    const port = hostnamePort || hostPort;
    const resolveHost = `${ctx.hostname}${port ? `:${port}` : ''}`;
    const url = new URL(`${ctx.protocol}://${resolveHost}${ctx.url}`);

    const controller = new AbortController();
    ctx.req.on('close', () => controller.abort());

    const init: RequestInit = {
      method: ctx.method,
      headers: this.createRemixHeaders(ctx.headers),
      signal: controller.signal,
    };

    if (ctx.method !== 'GET' && ctx.method !== 'HEAD') {
      init.body = createReadableStreamFromReadable(ctx.req);
      (init as { duplex: 'half' }).duplex = 'half';
    }

    return new Request(url.href, init);
  }

  private createRemixHeaders(requestHeaders: Context['headers']): Headers {
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

  private async sendRemixResponse(ctx: Context, nodeResposne: Response): Promise<void> {
    ctx.message = nodeResposne.statusText;
    ctx.status = nodeResposne.status;

    for (const [key, value] of nodeResposne.headers.entries()) {
      ctx.append(key, value);
    }

    if (nodeResposne.headers.get('Context-Type')?.match(/text\/event-stream/i)) {
      ctx.flushHeaders();
    }

    if (nodeResposne.body) {
      await writeReadableStreamToWritable(nodeResposne.body, ctx.res);
    } else {
      ctx.res.end();
    }
  }
}
