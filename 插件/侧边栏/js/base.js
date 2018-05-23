export default class Base {
  constructor() {
    // 指向组件最外层的box
    this.sidebarBox = null;
  };
  // 渲染组件
  render(container) {
    this.handlers = {};
    this.renderUI();
    this.bindUI();
    this.syncUI();
    (document.querySelector(container) || document.body).appendChild(this.sidebarBox)
  };

  // 销毁组件
  destory() {
    this.destructor();
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
  // 销毁前动作
  destructor() {};
  renderUI() {};
  bindUI() {};
  syncUI() {}
}