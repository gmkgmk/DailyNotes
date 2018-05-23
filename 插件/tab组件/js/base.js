export default class Base {
  constructor() {
    this.box = null;
  }
  render(container) {
    this.handlers = {};
    this.renderUI();
    this.bindUI();
    this.syncUI();
    (document.querySelector(container) || document.body).appendChild(this.box)
  };
  destory() {
    this.destructor();
  };
  // 销毁前动作
  destructor() {};
  renderUI() {};
  bindUI() {};
  syncUI() {};
  on(type, data) {
    if (typeof type === "string" && typeof data === "function") {
      if (typeof this.handlers[type] === "undefined") {
        this.handlers[type] = [data];
      } else {
        this.handlers[type].push(data);
      }
    }
    return this;
  };
  fire(type, data) {
    if (this.handlers[type] instanceof Array) {
      let handlers = this.handlers[type];
      handlers.map((handlers) => {
        handlers(data)
      })
    }
  }
}