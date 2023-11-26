import { MidwayConfig } from '@midwayjs/core';
// eslint-disable-next-line node/no-unpublished-import
import * as dotenv from 'dotenv';

dotenv.config();

export default {
  /**
   * 1. 加密使用第一个秘钥
   * 2. 解密遍历使用keys的数组
   *
   * 当要更新Cookie秘钥而不希望已登录的用户退出的话，将新的key放到最前面
   */
  keys: ['1700794808000_1650', '1700796295000_6759'],
  session: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    key: 'MW_SESS',
    httpOnly: true,
  },
  koa: {
    port: 7001,
  },
  staticFile: {
    dirs: {
      default: {
        // remix.config.js publicPath
        prefix: '/build/',
        // remix.config.js assetsBuildDirectory
        dir: 'public/build',
      },
    },
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        synchronize: process.env.NODE_ENV !== 'production',
        logging: process.env.NODE_ENV !== 'production',
        entities: ['entity/*.entity{.ts,.js}'],
      },
    },
  },
} as MidwayConfig;
