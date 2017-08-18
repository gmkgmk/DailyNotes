/**
 * 使用方法:  $.fn.blueBound('alert',@config);
 * @config {};(可选)
 * 默认为:
 *  width: 400,
    height: 200,
    layer: true,(遮盖层)
    them: null,(皮肤)
    x: null,
    y: null,
    content: "这里放信息",
    title: "系统消息",
    alertBtnText: "确定",
    是否有关闭框和
    hasCloseBtn: null,
    // 点击关闭和alert弹出的函数
    handlerCloseBtn: null,
    handlerAlert: null
 * 
 */
;
(function (a) {
  if (!jQuery) {
    throw new Error('jQuery or not found!');
  }
  createStyle("./blue_modai.css");
  jQuery.fn.blueBound = a;
}(function (type, config) {
  type = type || "alert"
  // 先执行代理函数,兼容ie
  setPolyfill()
  if (!(typeof type == "string")) {
    throw new Error("type must bt a string")
  }
  // 基类,提供周期
  var Base = function () {
    this.boundingBox = null;
  };
  Base.prototype = {
    // 渲染组建
    render: function (container) {
      this.handlers = {};
      this.renderUI();
      this.bindUI();
      this.syncUI();
      (document.querySelector("." + container) || document.body).appendChild(this.boundingBox)
    },
    // 销毁组建
    destory: function () {
      this.destructor();
      this.boundingBox.parentNode.removeChild(this.boundingBox);
    },
    // 设定自定义事件
    on: function (type, data) {
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
    },
    // 触发自定义事件
    fire: function (type, data) {
      if (this.handlers[type] instanceof Array) {
        // 取出保存的动作，循环并执行
        var handlers = this.handlers[type];
        var len = handlers.length;
        for (var i = 0; i < len; i++) {
          handlers[i](data)
        }
      }
    },
    // 销毁前动作
    destructor() {},
    renderUI() {},
    bindUI() {},
    syncUI() {}
  }

  // 弹出组件
  var BoundBox = function (type, config) {
    this.type = type;
    this.config = config;
    this._config = {
      width: 400,
      height: 200,
      layer: true,
      them: null,
      x: null,
      y: null,
      content: "这里放信息",
      title: "系统提示",
      alertBtnText: "确定",
      hasCloseBtn: true,
      handlerCloseBtn: null,
      handlerAlert: null
    };
  }

  // 继承基类
  BoundBox.prototype = Object.create(Base.prototype);
  BoundBox.prototype.constructor = BoundBox;

  // 设置html
  BoundBox.prototype.renderUI = function () {
    // 保存doucment变量，避免每次都去寻找document;
    var doc = document;
    var body = doc.querySelector("body");
    var footer = "",
      html = "",
      content = "",
      header = "";
    switch (this.type) {
      case "alert":
        footer = "<div class='bound_btn alertBtn'>" + this._config.alertBtnText + "</div>"
    };

    content = "<div class='bound_body'>" + this._config.content + "</div>";

    header = "<header class='bound_header'>" + this._config.title + "</header>";
    html = header + content + "<footer class='bound_footer'>" + footer + "</footer>"

    this.boundingBox = doc.createElement("div");
    this.boundingBox.className = "boundingBox"
    this.boundingBox.innerHTML = html.trim();

    if (this._config.layer) {
      this.layer = doc.createElement("aside");
      this.layer.className = "box_layer";
      body.appendChild(this.layer);
    };

    if (this._config.hasCloseBtn) {
      var closeBtn = doc.createElement("span");
      closeBtn.className = "bound_closeBtn"
      this.boundingBox.appendChild(closeBtn);
    }
  }
  // 设置样式位置
  BoundBox.prototype.syncUI = function () {
    // 设置box的css
    this.boundingBox.style.position = "fixed";
    this.boundingBox.style.width = this._config.width + 'px';
    this.boundingBox.style.height = this._config.height + 'px';
    this.boundingBox.style.left = (this._config.x || (window.innerWidth - this._config.width) / 2) + 'px';
    this.boundingBox.style.top = (this._config.y || (window.innerHeight - this._config.height) / 2) + 'px';

    // 有皮肤名称，则加入
    if (this._config.them) {
      this.boundingBox.classList.add(this._config.them)
    }
  }
  // 消除组件动作
  BoundBox.prototype.destructor = function () {
    this.layer && document.body.removeChild(this.layer)
  }
  // 设置事件(观察者模式)
  BoundBox.prototype.bindUI = function () {
    var that = this;

    this.boundingBox.addEventListener('click', function (e) {
      var target = e.target;

      if (target.className == "bound_closeBtn") {
        // 根据名字调用自定义事件
        that.fire("close")
        that.destory();
      }

      if (!!~target.className.indexOf("alertBtn")) {
        that.fire("alert");
        that.destory();
      }
    })

    // 有关闭图标事件，则将关闭事件加入子定义事件中
    if (this._config.handlerCloseBtn) {
      this.on("close", this._config.handlerCloseBtn)
    }
    // 有alert按钮事件，则将事件加入子定义事件中
    if (this._config.handlerAlert) {
      this.on("alert", this._config.handlerAlert)
    }
  }
  // 弹出组件
  BoundBox.prototype.alert = function () {
    this._config = Object.assign(this._config, this.config);
    this.render();
    return this;
  };

  var boundBox = new BoundBox(type, config);
  return boundBox[type] && boundBox[type]();

  // 代理函数,兼容传统浏览器;
  function setPolyfill() {
    function objectCreate() {
      Object.create = Object.create || function (obj) {
        var F = function () {};
        F.prototype = obj;
        return new F();
      }
    }

    function ObjectAssign() {
      if (typeof Object.assign != 'function') {
        Object.assign = function (target) {
          'use strict';
          if (target == null) {
            throw new TypeError('Cannot convert undefined or null to object');
          }

          target = Object(target);
          for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source != null) {
              for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                  target[key] = source[key];
                }
              }
            }
          }
          return target;
        };
      }
    }
    var oPolyfill = {
      objectCreate: objectCreate,
      ObjectAssign: ObjectAssign
    }
    for (var handler in oPolyfill) {
      oPolyfill[handler] && oPolyfill[handler]();
    }
  }

}))

// 动态加载css
function createStyle(path) {
  var head = document.getElementsByTagName('head')[0];
  var link = document.createElement('link');
  link.href = path;
  link.rel = 'stylesheet';
  link.type = 'text/css';
  head.appendChild(link);
}