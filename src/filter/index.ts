import { DefaultErrorFilter } from '../filter/default.filter';
import { ClientErrorFilter } from '../filter/client-error.filter';
import { ServerErrorFilter } from '../filter/server-error.filter';

export const filters = [DefaultErrorFilter, ClientErrorFilter, ServerErrorFilter];
