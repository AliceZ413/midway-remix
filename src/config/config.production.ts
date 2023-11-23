import { MidwayConfig } from '@midwayjs/core';

export default {
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'AliceZ0317',
        database: 'test_for_remix',
        synchronize: false,
        logging: false,
        entities: ['entity/*.entity{.ts,.js}'],
      },
    },
  },
  passport: {
    session: false,
  },
  midwayLogger: {
    default: {
      consoleLevel: 'all',
    },
  },
} as MidwayConfig;
