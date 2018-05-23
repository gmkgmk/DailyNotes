function addFunc(target) {
  console.log(target)
  target.prototype.addFunc = () => {
    return "i am addFunc";
  };
  return target;
}

@addFunc
class Man {
  constructor() {
    console.log("启动")
  }
}

var tony = new Man();
console.log(tony.addFunc());
console.log(tony)
