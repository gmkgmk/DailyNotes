const slice = Array.prototype.slice;

module.exports = co['default'] = co.co = co;

function co(gen) {
  const ctx = this;
  const args = Array.from(arguments).slice(1)


  return new Promise(function (resolve, reject) {
    if (typeof gen === 'function') gen = gen.apply(ctx, args)
    if (!gen || typeof gen.next !== 'function') return resolve(gen)

    onFulfilled();

    function onFulfilled(res) {
      let ret;
      try {
        ret = gen.next(res)
      } catch (e) {
        return reject(e);
      }

      next(ret);
      return null
    }

    function next(ret) {
      console.log(ret)
      if (ret.done) return resolve(ret.value);
      let value = toPromise.call(ctx, ret.value);
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected)
    }
  })
}

function toPromise(obj) {
  return obj
}
function isPromise(obj) {
  return 'function' == typeof obj.then;
}
function onRejected() {
  console.log("onRejected")
}
function arrayToPromise(obj) {
  return Promise.all(obj.map(toPromise, this));
}

co(function* () {
  // resolve multiple promises in parallel
  var a = Promise.resolve(1);
  var resa = yield a;
  var b = Promise.resolve(2);
  var resb = yield b;
  var c = Promise.resolve(3);
  var resc = yield c;
  console.log(resa, resb, resc);
  // => [1, 2, 3]
  return [resa, resb, resc]
}).catch(onerror);
console.log("完成")
function onerror(err) {
  // log any uncaught errors
  // co will not throw any errors you do not handle!!!
  // HANDLE ALL YOUR ERRORS!!!
  console.error(err.stack);
}