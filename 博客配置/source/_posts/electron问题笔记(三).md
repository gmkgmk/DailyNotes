---
title: electron问题笔记:electron使用原生模块;
date: 2017-11-30 15.00
tags: electron
---

# electron 使用原生模块

---

electron 使用原生模块是坑最多也是最麻烦 , 消耗时间最多的一块 , 主要是报错大多前
端一般不会遇到 , 经过一个多周的实验终于打包原生模块成功 , 但是因为坑实在太多 ,
已经有些记不起来了,先说说打包流程;

因为公司需要在 electron 打包后能够访问刷卡机 , 所以开始预演这方面的问题 ;

电脑配置 : win10 x64;

环境配置 : node 8.3 npm 5.3

这里主要说 32 位的 , 因为很多需求都是 win7x32 需要 ;

编译原生模块会使用到 node-ffi 和 ref

<!--more-->


具体使用 node-ffi 可以参考 github, 这个没有什么坑 ;

因为编译的时候需要使用 electron-rebuild 来编译 , 这个编译比较麻烦 ;

首先配置环境 .

在 C:\Users\user 下 .npmrn 里的配置修改如下 ;

```javascript
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
phantomjs_cdnurl=http://npm.taobao.org/mirrors/phantomjs
ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/
target=1.7.9
arch=ia32
target_arch=ia32
disturl=https://atom.io/download/electron
runtime=electron
msvs_version=2015
registry=https://registry.npm.taobao.org
```

arch 和 target_arch 如果是 64 位则改为 x64

因为编译 c++ 需要 vs 环境和 py 环境 , 这部分网上文章很多 , 大意是需要 py2.7x 版
本 , 高了不行 ,vs 环境要 c++ 的 ;

这部分开始的时候浪费了很大功夫 , 最后找到个方案很简单 . 下载 windos-build-tool
[https://github.com/felixrieseberg/windows-build-tools](https://github.com/felixrieseberg/windows-build-tools)

直接跟着安装下载就好 ; 这部分环境也很容易出错 , 但是下载完成后基本问题解决一半 ;

如果以上两点都弄好以后 , 直接进入项目目录执行 electron-rebuild 就应该会成功 ;

如果中间报什么模块找不到什么的直接下载就行

主要的就是网络 , 网络差的可能很难下下来 , 但是只是科学上网多试几次才好 ;

编译成功后就可以开始调试,打包了.

可能中间有些小坑需要网上查一查都很好找的;

在其中有几个遇到的大坑记录一下,避免以后使用时再掉坑;
