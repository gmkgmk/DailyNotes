class MyPromise {
  constructor(fn) {
    this._state = 0;
    this._deferreds = null;
    this.doResolve(fn, this);
  }
  doResolve(fn, mypromise) {
    console.log("加入函数")
    var done = false;
    fn((value) => {
      if (done) return;
      var done = true;
      this.resolve(mypromise, value);
    }, (reason) => {
      if (done) return;
      var done = true;
      this.reject(mypromise, reason);
    })
  }
  // 将上一个传下来的值设为自己的值,然后通过handle函数执行
  resolve(self, newValue) {
    self._value = newValue;
    this.finale(self);
  }
  reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    this.finale(self);
  }
  finale(self) {
    console.log(self)
    if (self._deferredState === 1) {
      this.handle(self, self._deferreds);
      // self._deferreds = null;
    }
  }
  // 调用then的时候设置为下一个的属性
  then(onFulfilled, onRejected) {
    console.log('执行then')
    var res = new MyPromise(noop);
    this.handle(this, new Handler(onFulfilled, onRejected, res));
    return res;
  }
  // then的时候改变他的state值;
  // resolve的时候执行处理函数
  handle(self, deferred) {
    
    if (self._state === 0) {
      console.log("执行加入函数")
      self._state = 1
      self._deferredState = 1;
      self._deferreds = deferred;
      return
    }
    console.log("执行处理函数")
    this.handleResolved(self, deferred)
  }
  // 递归循环resolve
  handleResolved(self, deferred) {
    var cb = deferred.onFulfilled || deferred.onRejected || null;
    const res = cb(self._value);
    if(self._state===1){
      this.resolve(deferred.mypromise, res)
    }
  }
}


function noop() { }
function Handler(onFulfilled, onRejected, mypromise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.mypromise = mypromise;
}

const pro = new MyPromise((resolve, reject) => {
  setTimeout(
    () => {
      resolve("hello")
    }, 1000
  )
})

pro.then((res) => {
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