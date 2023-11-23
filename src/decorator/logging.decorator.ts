import { createCustomMethodDecorator } from '@midwayjs/core';

export const LOGGING_KEY = 'decorator:logging_key';

export function LoggingTime(formatUnit = 'ms'): MethodDecorator {
  return createCustomMethodDecorator(LOGGING_KEY, { formatUnit });
}
