class Base {
  constructor() {
    this.handlers = [];
    this.render();
  };
  // 绑定自定义事件，将名字相同的自定义事件加入一个数组保存
  on(type, data) {
    // 如果type类型是string, this.handlers[type](表示触发的函数)类型为函数的话
    if (typeof type === "string" && typeof data == "function") {
      if (typeof this.handlers[type] === "undefined") {
        this.handlers[type] = [data];
      } else {
        // 如果有这个方法就把要执行的动作push进去，可以是多个
        this.handlers[type].push(data);
      }
    }

    return this;
  };
  // 执行自定义事件，根据名字取出保存的自定义事件，并循环执行 
  fire(type, data) {
    if (this.handlers[type] instanceof Array) {
      // 取出保存的动作，循环并执行
      let handlers = this.handlers[type];
      handlers.map((handlers) => {
        handlers(data)
      })
    }
  };
  render() {

    this.on("close", function () {
      console.log(1)
    })
    this.on("open", function () {
      console.log(1)
    })
    this.on("good", function (good) {
      console.log(good)
    })
    this.fire("close");
    this.fire("open");
    this.fire("good", "googds");
  }
}
let base = new Base()