import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1699259361278_1478',
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
} as MidwayConfig;
