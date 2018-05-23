---
title: electron问题笔记:electron开发中遇到的问题;
date: 2017-11-30 15.00
tags: electron
---

# electron 遇到的错误

---

在预演过程中遇到很多坑 , 记录下 , 避免再次入坑 ;

### 打包报错 :resource busy or locked, renamexxxxxxxxxxxxxxxxxxxxxxxxx

---

遇到这个错误大概是因为系统正在占用这个文件夹 ,

1. 可以试试在任务管理器里看看这个程序有没有退出

1. 试试 "npm cache verify" 清除缓存 ;

<!--more-->


### 编译原生模块报错 : "%1 is not a valid Win32 application." 字样

---

我遇到的是打包成功 , 然后打开程序报这个错误 ;

这是因为使用的是 node 和 dll 的环境不对称 ;

在 C:\Users\user 里的 '.npmrc' 修改 arch 和 target_arch 对应的版本

node 版本和 arch 和 target_arch 版本和 dll 文件的版本保持一致 , 然后运行
electron-rebuild, 然后再打包

### 编译原生模块报错 : "Dynamic Linking Error: Win32 error 193" 字样

---

这是 node 和 dll 文件版本不一致 , 换成一致的然后编译在打包 ;

### 编译原生模块报错 : "Dynamic Linking Error: Win32 error 126" 字样

---

这个问题困扰了我很久

网上查出来是找不到模块 , 但是 64 位都能调用成功 , 后来实验可能是 dll 文件路径问
题 ;

调用的文件 , 如果是绝对路径 , 就必须在当前目录下面 , 如果不是 , 必须的在打包的文
件夹下面 , 就是打包出来后的那个文件夹里 , 比如 dist\win-unpacked 这个文件里

其实打包的过程就是先编译文件在这个文件夹里 , 然后 build 成 exe 安装程序 , 所以这
里面的文件能够直接读取 ;

在 build 里配置 ;

```json
 "extraResources": [
      {
        "from": "./aaa.DLL",
        "to": "../"
      },
      {
        "from": "./bbb.dll",
        "to": "../"
      }
    ],
```

因为文件打包出来是在 \resources 文件里面 , 所以将他提取出来 , 这样才能获取到 ;

读取的 js 文件如下 :

```js
var ref = require("ref");
var FFi = require("ffi");

...

let func = new FFi.Library("aaa.dll", {
});
```

### 打包错误 : 明明是最新版本的 electron 比如 1.7.9 但是编译的时候 Packaging for win32 x64 using electron 1.6.5 to dist\win-unpacked

---

这个错误是什么暂时还不知道 , 可以在 devDependencies 里显示下载 electon:1.7.9, 但
是因为的用的是 two package 模式 , 所以不可能每个都下载一次 ;

第二种方式是在 build 里面制定 electron 版本 ;

```json
  "build": {
    "electronVersion":"1.7.9",
  }
```

### 编译报错:"fatal error LNK1106: invalid file or disk full"

---
大概报错是这样,一大串,然后这一句开始报错,可以看看有没有这个,应该是差不多的;

原因的文件已经存在,但是又无法删除

解决的方法就是C:\Users\user 里.electron-gyp给删除了再次编译;

这个问题也不太清楚问题是什么,他是下载依赖在这个文件里,然后在进行编译;

如果网络不行可以直接从.node-gyp复制iojs-1.7.9到这个文件夹下面.

### 运行报错:"cannot read property 'webContents" of null

代码有误,推出后win消失确还在执行,
根据代码查找错误,看哪里引用

### 运行错误 unable to find a valid app
