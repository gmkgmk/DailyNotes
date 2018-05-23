---
title: 学习源码之promise
date: 2018-3-9 22:41
tags: promise js
---

# 学习源码之promise;

promise代码库应该是目前为止能看懂的很简单的库,但是确是我们日常开发中经常使用到的.

我们使用promise时常常会这样使用

```js
const promise_test = new Promise((resolve, reject) => {
  setTimeout(
    () => {
      resolve("hello")
    }, 1000
  )
})

promise_test.then((res) => {
  console.log(res)
  return 1
}).then((res) => {
  console.log(res)
  return 2
}).then((res) => {
  console.log(res)
  return 3
}).then((res) => {
  console.log(res)
  return 4
})
```
<!--more-->

很明显的就是通过一个构造函数,然后使用一个回调,回调里的有两个方法形参,通过调用不同方法形参来处理状态;

通过源码查看,其实原理并不难;

# 一.初始化

``` javascript
function Promise(fn) {
    if (typeof this !== 'object') {
      throw new TypeError('Promises must be constructed via new');
    } //判断是不是通过构造函数生成的
    if (typeof fn !== 'function') {
      throw new TypeError('Promise constructor\'s argument is not a function');
    }//判断构造函数的参数是不是一个函数

    // 初始化promise对象的状态
    this._deferredState = 0;
    this._state = 0;//当前的状态
    this._value = null;//执行的值
    this._deferreds = null; //递归的对象
    if (fn === noop) return; //function noop() {}

    // 初始化以后传入doResolve函数进行处理
    doResolve(fn, this);
  }
  // 初始化第一次调用的状态
  Promise._onHandle = null;
  Promise._onReject = null;
  Promise._noop = noop;
```

每次new Promise就会去创建一个新的promise对象,这个对象的作用在初始化的作用就是
**初始化值和将当前对象和传入的函数传给doResolve函数(相当于函数处理器)进行处理**

再看看简化后的doResolve函数

```javascript
  doResolve(fn, promise) {
    var done = false;
    fn((value) => {
      if (done) return;
      var done = true;
      this.resolve(promise, value);
    }, (reason) => {
      if (done) return;
      var done = true;
      this.reject(promise, reason);
    })
  }

  //fn就是
  (resolve, reject) => {
    setTimeout(
      () => {
        resolve("hello")
      }, 1000
    )
  }
```

done的作用是防止执行两个回调;

这部分根据你选择的状态执行成功还是失败的回调;

**所以这是初始化的最后一步;**

因为是异步操作,如例是一个定时器(函数请求也一样),我们知道,定时器会在一定时间后加入队列,
达到时间后执行里面的函数
**所以就会在1000毫秒以后执行resolve("hello")这段函数**
**resolve有是new promise的时候的参数,就相当于回去调用**

```js
    (value) => {
      if (done) return;
      var done = true;
      this.resolve(promise, value);
    }
```

然后就会将promise对象和定时器resolve时候传入的参数传给this.resolve函数(一个开关的作用,开始执行队列)

初始化部分就这样,也是因为这一部分,所以new promise里的函数是同步,而this.resolve里的函数是异步,因为this.resolve的时候才会开始下面的工作!

# 加入then执行队列

then队列就在new promise后.then就加入队列,但是是在异步流程(如上例的定时器和ajax请求)

```js
Promise.prototype.then = function(onFulfilled, onRejected) {
  // ...省略其他情况

  var res = new Promise(noop); //function noop() {}
  handle(this, new Handler(onFulfilled, onRejected, res));
  return res;
};
```
then的作用就是生成一个promise对象(**每次then都是建立一个新的promise对象**),
然后调用handle函数,将当前promise对象和Handler传入
Handler是为了处理当前是函数是成功还是失败的

return res是为了能执行链式操作所有返回当前promise对象

**注意返回的是新建立的promise对象,而不是初始化的,所以每次返回的都是一个新的promise**

先看看Handler函数

```js
function Handler(onFulfilled, onRejected, promise){
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}
```

就判断是成功还是失败的状态,然后传入一个新的promise,把当前的promise保存起来

接下来handle

**这是promise的一个重要函数**

```js
 handle(self, deferred) {
  //  ...省略其他情况
    if (self._state === 0) {
      self._state = 1
      self._deferreds = deferred;
      return
    }
    this.handleResolved(self, deferred)
  }
```

这个函数只看一般正常情况

传入的self是当前promise对象;
传入的deferred是一个promise对象,和then的成功或者失败的回调;

当一进来的时候_state是0,说明他正在初始化状态,没有进入队列;
所以改变他的状态为1,说明加入队列,
**重点**
**然后将当前的_deferreds属性设置为deferred(也是一个promise)**
就是把then里面的回调函数保存在初始化的promise的_deferreds属性里面;

注意这个时候是return了,并不会执行this.handleResolved(self, deferred)这个函数;

**按道理then到这里就结束了,但是这个还是想多提示一下Promise.prototype.then函数里return 的是一个新的promise,而这**
**个promise对象通过Handle包装后保存在当前promise的_deferreds里面**

也就是说a._deferreds是一个Handle函数(onFulfilled,onRejected,promise)

也就是说a._deferreds.promise是一个promise.

如果有多个then的话,下一个就会保存在a._deferreds.promise 的 _deferreds里面,就形成一个递归队列

this.handleResolved(self, deferred)在then的时候并不会调用,这段是执行的时候的函数,到时候再说;

# 三.执行函数

当异步流程(如上例的定时器和ajax请求)结束以后,就会根据状态执行 this.resolve者this.reject函数;

主要就是根据不同的状态设置不同的_status值,然后调用finale函数;

```js
  self._state = 1;//2,3
  self._value = newValue;
  this.finale(self);
```

finale函数就是根据不用的_deferredState状态判断是否循环执行,这里只取正常状态;

然后又进入到刚才handle函数

执行完成以后会将当前的_deferreds给销毁

```js
  finale(self) {
    handle(self, self._deferreds);
    self._deferreds = null;
  }
```

上面已经讲过handle函数,是根据_status判断状态,

这里是已经通过异步队列的函数,在this.resolve者this.reject函数函数里改变为了1,直接就会执行handleResolved函数

```js
function handle(self, deferred) {
  //就会直接执行handleResolved函数...
  handleResolved(self, deferred);
}
```

接下来看一看最后一步handleResolved函数

```js
function handleResolved(self, deferred) {
  (function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      if (self._state === 1) {
        resolve(deferred.promise, self._value);
      } else {
        reject(deferred.promise, self._value);
      }
      return;
    }
    var ret = tryCallOne(cb, self._value);
    if (ret === IS_ERROR) {
      reject(deferred.promise, LAST_ERROR);
    } else {
      resolve(deferred.promise, ret);
    }
  })();

  // 个人简化版
  var cb = deferred.onFulfilled || deferred.onRejected || null;
  const res = cb(self._value);
  if(self._state===1){
    this.resolve(deferred.mypromise, res)
  }
}
```
一进去根据他的_state判断是否有相应的处理函数,如果没有相应的处理函数,就跳过,又去执行resolve或者reject

如果有相应的函数,就执行var ret = tryCallOne(cb, self._value);

就相相当于把当前的value传入处理函数,并执行,获取返回值;

再将当前函数保存的deferred的promise对象和返回值一起传入resolve在进行递归;

初始化的时候:

初始化的promise                  ---初始化的promise函数,等待异步队列结束后执行
  _deferred.onFulfilled          ---then的时候保存成功或者失败的回调
  _deferred.onRejected          
  _deferred.promise              ---then的时候将一个新的promise加入上一个的 _deferred中
            _deferred.onFulfilled
            _deferred.onRejected
            _deferred.promise             


执行的时候:
   **执行的时候会在成功或者失败的回调中保存_value,然后在handleResolved中调用回调的时候传入**

执行的promise     
  _deferred.onFulfilled          ---执行时候执行成功或者失败的回调,然后获取返回值,
  _deferred.onRejected              
  _deferred.promise              ---然后执行promise队列,直到结束
