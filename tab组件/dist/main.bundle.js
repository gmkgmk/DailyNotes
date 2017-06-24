/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = __webpack_require__(2);

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MyTabs = function (_Base) {
  _inherits(MyTabs, _Base);

  function MyTabs(option) {
    _classCallCheck(this, MyTabs);

    var _this = _possibleConstructorReturn(this, (MyTabs.__proto__ || Object.getPrototypeOf(MyTabs)).call(this));

    _this.option = {
      hander: "mouseover",
      status: 1,
      fade: true,
      controlTitle: ["选项一", "选项二", "选项三"],
      body: [{
        type: "text",
        Class: "tabsText",
        inner: '1'
      }, {
        type: "text",
        Class: "tabsText",
        inner: '2'
      }, {
        type: "text",
        Class: "tabsText",
        inner: '3'
      }]
    };
    _this.option = Object.assign(_this.option, option);
    _this.status = _this.option.status;
    console.log(option);
    _this.render();
    return _this;
  }

  _createClass(MyTabs, [{
    key: "renderUI",
    value: function renderUI() {
      var doc = document;

      var contains = "";
      this.option.body.map(function (item) {
        switch (item.type) {
          case "img":
            contains += " <li class=\"tab-item " + item.Class + "\"><img src=\"" + item.src + "\" alt=\"" + item.describe + "\"></li>";
            break;
          case "text":
            contains += " <li class=\"tab-item " + item.Class + "\"><p>" + item.inner + "</p></li>";
            break;
          case "div":
            contains += " <li class=\"tab-item " + item.Class + "\">" + item.inner + "</li>";
            break;
        }
      });

      var html = "\n        <ul class=\"tab-header\">\n        " + this.option.controlTitle.map(function (item, inx) {
        return "<li class=\"tab-control\">\n            <a href=\"javascript:void(0)\" data-status=\"" + (inx + 1) + "\">" + item + "</a>\n              </li>";
      }) + "\n        </ul>\n        <div class=\"tab-body\">\n          <ul>\n           " + contains + "\n          </ul>\n        </div>\n    ";

      this.box = document.createElement("section");
      this.box.className = "G_tab";
      this.box.innerHTML = html.replace(/,/g, "").trim();

      var li = this.box.querySelectorAll("li"),
          _box$querySelectorAll = this.box.querySelectorAll(".tab-header li"),
          length = _box$querySelectorAll.length;


      var status = this.option.status > length ? 1 : this.option.status;

      li[status - 1].classList.add("active");
      li[status + length - 1].classList.add("active");
    }
  }, {
    key: "bindUI",
    value: function bindUI() {
      var _this2 = this;

      var that = this;
      this.box.addEventListener(this.option.hander, function (e) {
        var target = e.target;

        that.fire("clickHandle", target);
      }, true);
      that.on("clickHandle", function (target) {
        that.status = target.dataset.status;

        if (target.parentNode.classList.contains("tab-control")) {
          Array.from(document.querySelectorAll(".tab-control")).map(function (item) {
            item.classList.contains("active") ? item.classList.remove("active") : "";
          });

          target.parentNode.classList.add("active");
          that.fire("changgeBody");
        }
      });
      that.on("changgeBody", function () {
        var item = Array.from(document.querySelectorAll(".tab-item"));
        item.map(function (i) {
          i.classList.remove("active");
        });
        item[_this2.status - 1].classList.add("active");
      });
    }
  }]);

  return MyTabs;
}(_base2.default);

window.MyTabs = MyTabs;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Base = function () {
  function Base() {
    _classCallCheck(this, Base);

    this.box = null;
  }

  _createClass(Base, [{
    key: "render",
    value: function render(container) {
      this.handlers = {};
      this.renderUI();
      this.bindUI();
      this.syncUI();
      (document.querySelector(container) || document.body).appendChild(this.box);
    }
  }, {
    key: "destory",
    value: function destory() {
      this.destructor();
    }
  }, {
    key: "destructor",

    // 销毁前动作
    value: function destructor() {}
  }, {
    key: "renderUI",
    value: function renderUI() {}
  }, {
    key: "bindUI",
    value: function bindUI() {}
  }, {
    key: "syncUI",
    value: function syncUI() {}
  }, {
    key: "on",
    value: function on(type, data) {
      if (typeof type === "string" && typeof data === "function") {
        if (typeof this.handlers[type] === "undefined") {
          this.handlers[type] = [data];
        } else {
          this.handlers[type].push(data);
        }
      }
      return this;
    }
  }, {
    key: "fire",
    value: function fire(type, data) {
      if (this.handlers[type] instanceof Array) {
        var handlers = this.handlers[type];
        handlers.map(function (handlers) {
          handlers(data);
        });
      }
    }
  }]);

  return Base;
}();

exports.default = Base;

/***/ })
/******/ ]);