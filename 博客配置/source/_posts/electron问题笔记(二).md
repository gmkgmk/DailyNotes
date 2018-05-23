---
title: electron问题笔记:使用electron-build 打包;
date: 2017-11-30 15.00
tags: electron elecron-build 
---
## electron 问题笔记 : 自动升级配置

---

electron-build 提供的升级方式有很多种 , 目前只预演出了 github 和 http 更新 , 不
过足够了 , 这两个应该是最常用的 ;

<!--more-->
## 通过 github 更新

---

github 更新相对来说简单一点 , 而且 github 是默认的更新配置 所以我们先将 github
更新 , 这一部分网上资料也有很多 , 可以对比着看 , 预防记忆偏差产生的坑 ;

首先调整 main.js

这部分是参考
[https://github.com/iffy/electron-updater-example](https://github.com/iffy/electron-updater-example)

```javascript
const { app, BrowserWindow, Menu, protocol, ipcMain } = require("electron");
const log = require("electron-log");
const { autoUpdater } = require("electron-updater");
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";
log.info("App starting...");

let template = [];
if (process.platform === "darwin") {
  // OS X
  const name = app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        label: "About " + name,
        role: "about"
      },
      {
        label: "Quit",
        accelerator: "Command+Q",
        click() {
          app.quit();
        }
      }
    ]
  });
}

let win;

function sendStatusToWindow(text) {
  log.info(text);
  win.webContents.send("message", text);
}
function createDefaultWindow() {
  win = new BrowserWindow();
  win.webContents.openDevTools();
  win.on("closed", () => {
    win = null;
  });
  win.loadURL(`file://${__dirname}/version.html#v${app.getVersion()}`);
  return win;
}
autoUpdater.on("checking-for-update", () => {
  sendStatusToWindow("Checking for update...");
});
autoUpdater.on("update-available", info => {
  sendStatusToWindow("Update available.");
});
autoUpdater.on("update-not-available", info => {
  sendStatusToWindow("Update not available.");
});
autoUpdater.on("error", err => {
  sendStatusToWindow("Error in auto-updater. " + err);
});
autoUpdater.on("download-progress", progressObj => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + " - Downloaded " + progressObj.percent + "%";
  log_message =
    log_message +
    " (" +
    progressObj.transferred +
    "/" +
    progressObj.total +
    ")";
  sendStatusToWindow(log_message);
});
autoUpdater.on("update-downloaded", info => {
  sendStatusToWindow("Update downloaded");
});
app.on("ready", function() {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  createDefaultWindow();
});
app.on("window-all-closed", () => {
  app.quit();
});

app.on("ready", function() {
  autoUpdater.checkForUpdatesAndNotify();
});
```

首先需要调整你的 package;

```json
"build": {
         "publish": [{
             "provider": "github",
             "repo": "https://github.com/gmkgmk/electron-up/"
         }],
         ...
     }
```

然后通过访
问[https://github.com/settings/tokens/new](https://github.com/settings/tokens/new)
来生成一个 GitHub 访问令牌。访问令牌应该具有 repo 范围 / 权限。一旦你有了令牌，
需要把它分配给一个环境变量

在 windows 是 , 你只需要在命令行中运行 :

> [Environment]::SetEnvironmentVariable("GH_TOKEN","<YOUR_TOKEN_HERE>","User")

这里需要修改的时候 YOUR_TOKEN_HERE

就好像[Environment]::SetEnvironmentVariable("GH_TOKEN","<1234567890>","User")

设置完成后重启终端

然后开始发布 :

1. 填写 npm 里的 version, 比如 (0.0.1);
1. 发布包 :build -p always;
1. 通
   过[https://github.com/gmkgmk/electron-up/releases](https://github.com/gmkgmk/electron-up/releases)
   编辑发布版本 , 编辑版本 , 然后点击发布 ;
1. 接下来下载安装
1. 更新 package.json 里的*version*
1. 再次执行第二步和第三步
1. 打开程序 ;

## 通过 http 升级

---

因为是公司项目 , 所以 github 发布很明显不可能满足需求 , 所以需要 http 升级

http 升级的话 ,main.js 基本上用不着改变 ,

不过有一个地方很重的就是需要使用 autoUpdater 模块的 setFeedURL

```javascript
+ const { autoUpdater } = require("electron-updater");
...
...
app.on("ready", function() {
  + autoUpdater.setFeedURL("http://localhost:8080");
    autoUpdater.checkForUpdatesAndNotify();
});
...
```

如果使用的是 node 后台 , 要注意将 .exe 文件放在静态目录下 , 也就是让网站能够访问
静态资源

比如我的 koa 配置 : 就是用了一个简单的服务器 , 然后让目录在静态资源下面

```javascript
//server相关
const Koa = require("koa");
const app = new Koa();
const koaStatic = require("koa-static");
const path = require("path");
const fs = require("fs");
const PORT = 8080;
let getBaseUrl = "http://localhost:8080";
app.use(koaStatic(path.join(__dirname, "dist")));
app.listen(PORT, () => console.log("running on port " + PORT));
```

这样的话你的 .exe 文件就必须放在根目录的 /dist 文件下 ,(electron-builder 默认输
出就是 dist 文件 )

你的文件结构就应该是

E:\electron_test\dist\ 项目名称 .exe

当然 项目名称 .exe这个文件你可以随便放在dist文件里的任何一层比如可以/v0.1/项目名称.exe

但是latest.yml一定要保证能访问到

当然这只是我的配置 , 只要能够保证能访问就好

http://localhost:8080/latest.yml能下载就可以 ;

接下来修改 package 里的 publish

publish": { "provider": "generic", "url": "http://localhost:8080" },

然后就可以设置版本 , 开始打包 ;

打包结束后再 dist 文件里面会有 win-ia32-unpacked 和 win-unpacked 文件夹 ( 也有可
能是两个或者三个 , 反正就是看你打包多少平台)

就是把程序打包到这个文件里面,让他成为一个electron文件,他里面调用了很多dll模块,主要是操作系统的文件;

然后通过build打包成.exe文件,这就是安装程序

然后生成latest.yml文件

这个文件主要用于更新,如果不适用build -p的话是不会有的;

每次main里面检查更新的时候,就回去服务器查找latest.yml文件,比对服务器上的版本和自身版本是否相同,如果有更新就会根据配置下载更新,所以latest.yml和项目名称.exe最好要在同一文件夹下面,并且是 autoUpdater.setFeedURL(url)中url的地址;

latest.yml里有版本,路径,加密,时间等,一般exe是在同路径下,如果不是就改成相应的.