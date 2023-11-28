import { DefaultErrorFilter } from '../filter/default.filter';
import { ClientErrorFilter } from '../filter/client-error.filter';
import { ServerErrorFilter } from '../filter/server-error.filter';

/**
 * 异常错误捕获拦截器统一导出
 */
export const filters = [DefaultErrorFilter, ClientErrorFilter, ServerErrorFilter];
