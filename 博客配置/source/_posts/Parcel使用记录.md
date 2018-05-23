---
title: Parcel踩坑记录
date: 2017-12-25 9.30
tags: Parcel 打包 踩坑
---

## Parcel 踩坑记录

新出的打包工具 Parcel,号称是零配置,但是还是踩了不少坑,简单记录一下;

这是官网给出的速度表对比:
![](/images/Parcel踩坑记录/image_1.png)
<!--more-->

个人感觉 Parcel 确实速度比起 webpack 比较快,特别是加上缓存的时候,用起来很不错,还有就是自带热更新功能,很方便,他是默认以html为入口寻找引入的js,然后简析构造简析树;

其中一些地方还是需要注意一下;

使用 react+antd 的时候,babel 配置如下,需要使用 stage-0 才能使用 antd

```json
{
  "presets": [
    [
      "env",
      {
        "targets": {
          "browsers": ["last 2 Chrome versions", "ie >= 10"]
        }
      }
    ],
    "react",
    "stage-0"
  ],
  "plugins": [["import", { "libraryName": "antd", "style": "css" }]]
}
```

还需要注意的是在使用antd的时候使用了babel-plugin-import来进行按需加载,需要引入less来简析antd的样式否者会一直报错;

当遇到改了以后还是包一样错误的时候可以尝试先清清缓存;

总的来说还是很不错,对于一个新出的工具来说很不错,不过现在用于生产的可能性不大,还不是很完善,个人用着玩很方便,不用配置,直接下下来就可以用,对于个人开发很不错;

