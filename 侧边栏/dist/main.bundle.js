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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _sidebar = __webpack_require__(3);

var _sidebar2 = _interopRequireDefault(_sidebar);

var _data = __webpack_require__(1);

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sidebar = new _sidebar2.default("#sidebar", _data2.default);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = [
	{
		"name": "经营监控",
		"id": 1,
		"url": "baidu.com",
		"children": [
			{
				"name": "达成监控",
				"id": 10,
				"url": "baidu.com",
				"children": [
					{
						"name": "1",
						"id": 10,
						"url": "baidu.com"
					},
					{
						"name": "2",
						"id": 20,
						"url": "baidu.com"
					},
					{
						"name": "3",
						"id": 30,
						"url": "baidu.com"
					},
					{
						"name": "4",
						"id": 40,
						"url": "baidu.com"
					},
					{
						"name": "5",
						"id": 50,
						"url": "baidu.com"
					}
				]
			},
			{
				"name": "外部原因",
				"id": 20,
				"url": "baidu.com"
			},
			{
				"name": "商品结构",
				"id": 30,
				"url": "baidu.com"
			},
			{
				"name": "补货评估",
				"id": 40,
				"url": "baidu.com"
			},
			{
				"name": "会员分析",
				"id": 50,
				"url": "baidu.com"
			}
		]
	},
	{
		"name": "经营监控",
		"id": 1,
		"url": "baidu.com",
		"children": [
			{
				"name": "达成监控",
				"id": 10,
				"url": "baidu.com",
				"children": [
					{
						"name": "1",
						"id": 10,
						"url": "baidu.com"
					},
					{
						"name": "2",
						"id": 20,
						"url": "baidu.com"
					},
					{
						"name": "3",
						"id": 30,
						"url": "baidu.com"
					},
					{
						"name": "4",
						"id": 40,
						"url": "baidu.com"
					},
					{
						"name": "5",
						"id": 50,
						"url": "baidu.com"
					}
				]
			},
			{
				"name": "外部原因",
				"id": 20,
				"url": "baidu.com"
			},
			{
				"name": "商品结构",
				"id": 30,
				"url": "baidu.com"
			},
			{
				"name": "补货评估",
				"id": 40,
				"url": "baidu.com"
			},
			{
				"name": "会员分析",
				"id": 50,
				"url": "baidu.com"
			}
		]
	},
	{
		"name": "经营监控",
		"id": 1,
		"url": "baidu.com"
	}
];

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

    // 指向组件最外层的box
    this.sidebarBox = null;
  }

  _createClass(Base, [{
    key: "render",

    // 渲染组件
    value: function render(container) {
      this.handlers = {};
      this.renderUI();
      this.bindUI();
      this.syncUI();
      (document.querySelector(container) || document.body).appendChild(this.sidebarBox);
    }
  }, {
    key: "destory",


    // 销毁组件
    value: function destory() {
      this.destructor();
    }
  }, {
    key: "on",

    // 绑定自定义事件，将名字相同的自定义事件加入一个数组保存
    value: function on(type, data) {
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
    }
  }, {
    key: "fire",

    // 执行自定义事件，根据名字取出保存的自定义事件，并循环执行 
    value: function fire(type, data) {
      if (this.handlers[type] instanceof Array) {
        // 取出保存的动作，循环并执行
        var handlers = this.handlers[type];
        handlers.map(function (handlers) {
          handlers(data);
        });
      }
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
  }]);

  return Base;
}();

exports.default = Base;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base2 = __webpack_require__(2);

var _base3 = _interopRequireDefault(_base2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sidebar = function (_base) {
  _inherits(Sidebar, _base);

  function Sidebar(box, data, config) {
    _classCallCheck(this, Sidebar);

    var _this = _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).call(this));

    _this.data = data;
    _this.iconList = ["fa-dashboard", "fa-th", "fa-home", "fa-laptop", "fa-table", " fa-align-right", " fa-signal", " fa-beer", " fa-group", " fa-coffee", "fa-leaf", "fa-rss", " fa-trophy", "fa-magnet", " fa-tag", " fa-cog", "fa-credit-card", " fa-group"];
    _this.render(box);
    return _this;
  }

  _createClass(Sidebar, [{
    key: "renderUI",
    value: function renderUI() {
      var _this2 = this;

      var content = "";
      this.data.map(function (item, index) {
        item.icon = _this2.iconList[index];
        var childrenContent = "";
        if (item.children && item.children.length > 0) {
          // 如果有子菜单
          item.children.map(function (item) {
            item.icon = "fa-circle-o";
            // 二级菜单
            childrenContent += "<li><a href=\"#\"><i class=\"icon fa " + item.icon + "\" data-id=" + item.id + "></i><span>" + item.name + "</span></a></li>";
          });

          var childrenNode2 = "<ul class=\"treeview-menu\">" + childrenContent + "</ul>";
          // 一级菜单
          content += "\n            <li>\n              <a href=\"#\"><i class=\"icon fa " + item.icon + "\" data-id=" + item.id + "></i>\n              <span>" + item.name + "</span>\n              <span class=\"pull-right-icon\"><i class=\"fa  fa-angle-left\"></i></span>\n              </a>\n              " + childrenNode2 + "\n           </li>";
        } else {
          // 如果没有子菜单
          content += "\n          <li>\n           <a href=\"#\">\n            <i class=\"icon fa " + item.icon + "\" data-id=" + item.name + "></i><span>" + item.name + "</span>\n           </a>\n         </li>";
        }
      });
      var html = "<ul class=\"sidebar-menu \">\n      " + content + "\n    </ul>\n    ";

      this.sidebarBox = document.createElement("section");
      this.sidebarBox.className = "G_Sidebar";
      this.sidebarBox.innerHTML = html;
    }
  }, {
    key: "bindUI",
    value: function bindUI() {
      var that = this;
      var doc = document;
      var list = Array.from(that.sidebarBox.querySelectorAll("a"));

      list.map(function (item) {
        // item.classlist("active"))
        item.addEventListener('click', function (e) {
          e.stopPropagation();
          item.parentNode.classList.toggle("active");
          // 如果有子集
          if (item.nextElementSibling) {
            var height = void 0,
                len = void 0;
            // 当下拉框为打开的时候
            if (item.nextElementSibling.style.height !== "" && item.nextElementSibling.style.height !== "0px") {
              height = 0;
            } else {
              // 记录li的高度
              height = window.getComputedStyle(item.nextElementSibling.querySelector("li")).getPropertyValue("height").replace("px", "");
            }
            // 记录ul里li的个数
            len = item.nextElementSibling.querySelectorAll("li").length;
            // 设置ul的高
            item.nextElementSibling.style.height = height * len + 'px';
          }
          // 遍历其他全部子节点,去除样式
          var n = item.parentNode.parentNode.firstChild;

          if (item.nextElementSibling) {
            for (; n; n = n.nextSibling) {
              if (n.nodeType === 1 && n !== item.parentNode) {
                n.classList.remove("active");

                while (n.querySelector("ul")) {
                  n.querySelector("ul").style.height = 0;
                  return;
                }
              }
            }
          }
        }, true);
      });
    }
  }]);

  return Sidebar;
}(_base3.default);

exports.default = Sidebar;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);