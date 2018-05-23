---
title: 过去杂写整理:使用antd时使用babel-import-plugin的坑
date: 2017-10-1 00.00
tags: react antd js
---

## 在最近的项目中遇到的问题

1. 引用 babel-import-plugin 报错 "You may need an appropriate loader to handle
   this file type."_ webpack 配置如下 :

<!--more-->

```javascript
rules: [
  {
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
      loader: require.resolve("babel-loader"),
      query: {
        presets: ["es2015", "react"],
        plugins: [
          "transform-runtime",
          [
            "import",
            {
              libraryName: "antd",
              style: "css"
            }
          ]
        ]
      }
    }
  },
  {
    test: /\.less$/,
    exclude: /(node_modules)/,
    loader: "style-loader!css-loader!less-loader"
  },
  {
    test: /\.css$/,
    exclude: /(node_modules)/,
    loader: "style-loader!css-loader"
  }
];
```

**原因 : 将 node_modules 里面的文件排除在 loader 范围之外 , 导致加载器不编译
antd 里的模块导致出错 ;**

**解决 : 如果配置的 style:css 则去除 css-loader 里面的 exclude:
/(node_modules)/,true 则去除 Less 的 ;**

2. abel-import-plugin 不生效

**配置了任然提示全局引入 ; 首先检查是否在文件理映入了 antd 的样式文件 , 这是不需
要引入的 , 插件自动引入 ; 然后检查 CommonsChunkPlugin 是不是将 antd 引入 .!**
