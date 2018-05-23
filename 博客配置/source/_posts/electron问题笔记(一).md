---
title: electron问题笔记:使用electron-build 打包;
date: 2017-11-30 15.00
tags: electron elecron-build
---
## electron 问题笔记 : 打包配置

最近在学习 electron 在 win 下面的打包 , 由于以前没有接触过 electron, 所以踩了不
少坑 , 这里记录一下 ;

电脑是 window 10 x64;

node 使用的 8.4.0;

npm 是 5.3.0;

现在的 electron 版本是1.7.9;

**打包工具使用的是 electron-builder, 如果是使用 package 的就不用看了 ..**

<!--more-->

## 安装 electron

全局安装方便一点

---

> npm install electron -g

查看安装成功没
electron -v

首先安装就有很多坑 , 由于某种原因 , 网络下载会一直出错 , 在这里网上的解决方法是
设置 npm 源 ;

在 C:\Users\user 里会又一个 .npmrc 是 npm 的配置文件 ;

反键打开设置以下内容 ;

> phantomjs_cdnurl=http://npm.taobao.org/mirrors/phantomjs
> sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
> ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/
> registry=https://registry.npm.taobao.org

如果不能科学上网 , 就尽量多试几次 ;

实在有包下不来 , 就去这里面下
[https://npm.taobao.org/mirrors/electron](https://npm.taobao.org/mirrors/electron)
相应的版本

然后放在 C:\Users\user 里面的 .electron 里面 ( 不知道记没记错 , 不对的话再找一下
, 网上很多 )

## 开始 electron 项目

---

因为重点不是使用 electron, 可以简单的使用官网的 electron-quick-start 列子快速开
始 demo;

官网地址 :[electron github](https://github.com/electron/electron)

## electron-builder 打包开始

---
使用的是electron-builder ;

> npm install electron-builder -g

查看安装成功没
build -v

以前公司是使用electron-package,但是发现这个更符合需求,所以改用这个.两者各有好处

安装什么的跳过,直接进入配置

electron-builder 的配置文档写的非常清楚 , 基本上跟着配置就好了 , 这里说下我是怎
么配置的 ; electron-builder 的配置文
档[electron-builder 的配置文档](https://www.electron.build/)

```json
"build": {
    "appId": "com.id",
    "productName": "项目名称",
    "asar": true,
    "nsis": {
      "artifactName": "${productName}-x64.${ext}",
      "runAfterFinish": false,
      "deleteAppDataOnUninstall": true,
      "allowToChangeInstallationDirectory": true,
      "oneClick": false,
      "installerLanguages": "zh_CN",
      "language": 2052,
      "perMachine": true
    },
    "publish": {
      "provider": "github"
    },
    "win": {
      "target": [
        {
          "target": "nsis",
          "arch": ["x64"]
        }
      ],
      "icon": "icon/icon.ico"
    }
  }
```

这里面几个内容比较重要 :

**asar**: 这个是确定打包的时候是否将你的代码转换为二进制文件 , 如果为 false 的话
, 安装之后可以在安装路径路查找到你的代码 , 这样方便调试 , 但是会泄露代码 , 所以
测试的是为 false, 其他都为 true;

**nsis**:windos下选择的是nsis打包,官网提供了三种,一般都是使用nsis打包;

* "artifactName": "${productName}-x64.${ext}",打包后的名字
* "runAfterFinish": false, 是否在安装完成后自动打开;
* "deleteAppDataOnUninstall": true, 拆卸文件后是否不用保留资料;
* "allowToChangeInstallationDirectory": true,是否允许改变安装路径;
* "oneClick": false,是一键安装还是可以点击下一下
* "installerLanguages": "zh_CN", 安装程序语言
* "language": 2052, 语言选择,2052是中文
* "perMachine": true 是否安装每个所有用户（每台机器）。

**publish**:发布方式,这个下篇再讲;

**win** 是打包平台;其他参数就不多说了

注意的是package里的name author description这三个是必填项,对安装包有影响;

只打包windos包只需要 :"build --win"

打包并且需要更新build --win  -p always", -p代表publish, always为一直监控,文章很详细,不过多阐述;
