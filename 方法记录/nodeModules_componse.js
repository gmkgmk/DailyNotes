let middleware = [
  function* m1() {
    console.log(1);
  },
  function* m2() {
    console.log(2);
  },
  function* m3() {
    console.log(3);
  }
];
function componse(middleware) {
  return function* (next) {
    if (!next) next = noop();
    let len = middleware.length;

    while (len--) {
      console.log(1);
      middleware[len].call(this, next);
    }
    return yield* next;
  };
}

function* noop() { }
const a = componse(middleware)
const b= a(()=>{})
b.next()

