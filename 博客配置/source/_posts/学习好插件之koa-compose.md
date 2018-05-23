---
title: koa-compose学习
date: 2018-5-13 17:00
tags: koa koa-compose
---

熟悉koa库的都知道,他的核心是koa-compose

以前也看过这个库,实现的很巧妙,但是老是看了就忘,今天在这里记录一下

<!--more-->

koa-conmpose的代码只有短短一二十行,电脑屏幕一屏就可以装下,但是他却有非常强大的功能

这个组件是在koa/application里面被调用
调用的时机是调用app.listen的时候,
app.listen调用的是http模块的createServer方法
```js
 listen(...args) {
    debug('listen');
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }
```
这个文件的调用就是在this.callback()里面
callback返回的是初始化了上下文,并执行了中间件的函数
与之有关的函数是this.handleRequest()和respond

在说回koa-compose插件

*他首先传入的是一个中间价数组*

是在执行this.callback()的时候的时候传入的
```js
 const fn = compose(this.middleware);
 ```
this.middleware数组是在调用app.use的时候加入进去的,一系列的处理事件

koa-compose获取到这个数组以后,会首先对数组进行检查,首先检查是不是数组,然后检查数组里面的元素是不是函数.

*检查完后会返回一个函数,*
*这个函数的形参是一个ctx上下文,和一个next指针*

这个函数主要是循环middleware里的每一项,执行每一个函数

将函数变为promise函数

然后在成功的时候执行当前函数,并开始下一个函数,

```js
Promise.resolve(fn(context, function next () {
      return dispatch(i + 1)
}))
```
这里应该是插件的核心,执行middleware的时候,传入上下文,然后当中间件调用next的时候,就执行下一个函数
**因为js是单线程!!!所以当执行next的时候会开一个新的执行上下文**
**所以next后面的代码不会去执行,会执行next里的代码**
**等next里代码执行结束,退出执行上下文,在执行next后面的代码**
**这就实现了koa洋葱图!!!**

next前代码   ---按照js执行顺序执行

next()      ----开辟一个新的执行上下文,js流程阻塞  

next后代码  ----next()里代码执行完成,执行next后代码

当所有中间件执行完成以后,然后将它返回回去

然后进入respond函数去判断ctx的状态,到此就结束.