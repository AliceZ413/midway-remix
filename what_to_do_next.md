# What to do next ?

## 现阶段已完成

midway.js和Remix对接，Remix内能够使用到midway.js传递的Context

## 接入ant-component-pro

方便实现后续逻辑

## 更优的Remix路由组织方式

现有Remix v2路由组织是通过扁平化来组织，当需要写一个Admin后台管理的时候，可能会存在这样一个臃肿的文件名：`aaa.bbb.ccc.ddd._index.tsx`。
2023年12月1日，在官方文档已经去掉了v1路由的接入，并且推荐去使用remix-flat-route组件来组织结构，但依然不是很理想，增加开发的心智负担。

目前官方还有一个推荐的手动路由方式，后续开发优先考虑使用手动路由。

## Next.js？

因为Remix路由组织结构非常糟糕，所以考虑回到Next.js的对接。
但最初不考虑使用Next.js而选择Remix，是因为Remix的构建产物明确（静态文件与动态生成的js），对接起来比较复杂但直观（开发者能够了解到Remix为什么能够对接到服务中，对于express其他的框架对接更能够理解其中的过程）
