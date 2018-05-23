---
title: react服务端同构渲染-(使用redux搭建)
date: 2017-12-26 19.00
tags: react ssr
---

# 这一部分是使用 redux 进行服务端渲染

## 配置服务端 webpack

用 webpack 编译服务端,配置很简单,主要是处理样式部分比较麻烦,获取数据这部分很简单.

做了一下注释方便阅读

```js
const config = {
  target: "node", //target搭建目标 node会吧代码编译为类nodejs环境(使用require 而不是其他来加载chunk)
  entry: {
    server: paths.serverJs //server/app.js
  },
  output: {
    path: paths.serverDist, //build
    filename: "bundle.js"
  },
  externals: [webpackNodeExternals()],
  node: {
    //打包后的代码__filename和__dirname全部会编译成 '/' 因为这两个变量在webpack中做了一些自定义处理,所以禁用他们
    __dirname: false,
    __filename: false
  },
  resolve: {
    modules: ["node_modules", "static"],
    extensions: ["*", ".js", ".json"],
    alias: {
      src: paths.srcPath, //src
      static: paths.staticPath //static
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: "pre",
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
module.exports = config;
```

### 服务器端获取数据

服务端渲染怎么获取数据是一个比较麻烦的问题,刚开始的时候比较迷茫,后来在网上选择后决定通过 react-router 来进行服务端数据获取;

主要是利用 router 里 loadData 的方法和他所提供的 matchPath

将获取数据的操作放在 loadData 里面,然后在服务端通过 matchPath 来判断当前路由是否有 loadData 方法,然后执行 loadData 方法来获取数据;

