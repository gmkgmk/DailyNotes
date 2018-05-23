---
title: react服务端同构渲染-(搭建react环境)
date: 2017-12-26 17.00
tags: react ssr
---

以前折腾了一段时间的 react ssr,现在总结一下,文采不好,尽量图文结合;

首先看一看现在的基本信息

![](/images/react-ssr/catalog.png)

服务端渲染选用的是 koa 框架,因为个人比较熟悉,也可以换成其他框架,不涉及渲染的内容,也就起个简单服务器的作用;

因为会有 redux,saga,dva 三种服务端模式,所以使用的是 two package 模式,不熟悉的可以用一个就好;

首先下载依赖
npm install lerna koa koa-static koa-logger nodemon --save

lerna 用于 two package 模式,不需要的不用下,nodemon 用于每次修改后重新启动服务器

<!--more-->

# 这一部分是搭建react环境,熟悉的可以直接跳过

## 搭建一个后台环境

个人习惯先后台在前台,所以先搭建一个简单的 koa 服务器;

项目下面建立一个 server 文件夹,用来放服务端方面的文件;

在文件里面建立一个 app.js

![](/images/react-ssr/appJs_1.png)

然后 node server/app.js 测试一下

成功后在 package.json 的 scripts 里添加

"start": "nodemon app.js"

让 nodemon 自动重启 node 服务器;

## 搭建一个 react 环境

后台简单搭建后,开始搭建 react 的环境,首先使用

npm install webpack --save

因为需要 react 环境和 es6 环境,所以还需要下载 babel

npm install babel-core babel-loader babel-preset-env babel-preset-react babel-preset-stage-0 --save

然后建立 webpack 文件夹用来防止 webpack 打包数据;

配置如下,paths.cilentDist 为 public

```json
const paths = require("./path");

const clientConfig = {
  devtool: "cheap-module-source-map",
  target: "web",
  entry: paths.cilentJs,
  output: {
    path: paths.cilentDist,
    pathinfo: true,
    filename: "js/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: "pre",
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".web.js", ".js", ".json", ".web.jsx", ".jsx"]
  }
};
module.exports = clientConfig;
```

paths.cilentJs 配置如下

```js
import React from "react";
import { render } from "react-dom";

const Main = () => {
  return <h1>hello world React</h1>;
};

render(<Main />, document.getElementById("root"));
```

完成以后运行 "webpack --config webpack/webpack.client.js --watch"

会出现一个 public 文件夹,在该目录下面建立 index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>

<body>
  <div id="root"></div>
  <script src="/js/bundle.js"></script>
</body>

</html>
```

现在打开服务器,进入 3000 端口,你会看到 not found;

因为后台没有监控静态文件

需要引用
app.use(koaStatic(path.join(\_\_dirname, "..", "public")));

现在打开窗口,应该能见到需要的内容了

这一部分的代码在github

(https://github.com/gmkgmk/react-server-side-finishing-/releases/tag/0.1.0)
