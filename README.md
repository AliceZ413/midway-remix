# Midway + Remix

## 本地开发

```bash
$ npm i
$ npm run dev
```

### 目录结构

```
├── app # Remix主目录
│   ├── @types # ts types
│   ├── components # 组件
│   ├── routes # 路由
│   ├── styles # 样式
│   └── utils # 前端工具类
├── build # midway构建产物
├── logs # 日志目录，自动生成
├── public # 静态资源目录
│   └── build # Remix构建产物，build和dev时生成
├── scripts # 脚本
├── src # Midwayjs主目录
│   ├── common # 公共模块
│   ├── config # 配置目录
│   ├── controller # 路由
│   └── model # 数据层
│       ├── entity # 实体类，字段与数据库对应
│       ├── dto # 前端请求的数据
│       └── vo # 后端返回的数据
│   ├── filter # 过滤器，用于定制服务器错误
│   ├── middleware # 中间件
│   ├── service
│   └── utils # 工具类
└── test # 测试
```

## 发布

```bash
$ npm run build
$ npm run start
```

## npm scripts

- `npm run lint` 用于代码格式检查
