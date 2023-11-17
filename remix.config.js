/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverModuleFormat: 'cjs',
  dev: {
    port: 8002, // 默认的ws不是这个，需要指定8002
  },
};
