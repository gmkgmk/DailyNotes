/**
 * 使用:new 一个对象:var a = new Tips;
 * 通过setDom设置a.setDom(dom,tips字);
 */
(function () {
  var Tips = function () {
    this.box = "";
    this.dataTips = "data-tips";
    this.obj = {}; //这个可以写默认配置
    this.init();
  }
  Tips.prototype = {
    init: function () {
      this.box = document.createElement("p");
      this.box.className = "tips-p";
      this.box.innerHTML = "";
      document.body.appendChild(this.box);
    },
    setDom: function (dom, html, obj) {
      // 设置每个dom和需要显示的提示字
      var element = dom ? document.querySelector(dom) : body
      var ret = '<aside class="caution">' +
        '<span class="tips_icon "></span>' +
        '</aside>'
      element.innerHTML = ret || "";
      // 将需要提示的字写到dom上
      element.setAttribute(this.dataTips, html);

      if (!(obj == null)) {
        this.obj = obj; //空了后改成继承
      }else{
        this.obj = {}; //空了后改成继承
      }
      this.bindUi()
    },
    bindUi: function () {
      var doc = document;
      var that = this;
      var cautiong = document.querySelectorAll(".caution");
      for (var i = 0, len = cautiong.length; i < len; i++) {
        cautiong[i].addEventListener("mouseenter", function (e) {
          // 设置提示框的位置
          that.setElementPosition(this);
          // 获取元素的data-tips为要显示的字
          var attrbute = this.parentNode && this.parentNode.getAttribute(that.dataTips);
          that.box.innerHTML = attrbute;
          // 设置icon样式
          this.className = "caution active";
        })
        cautiong[i].addEventListener("mouseleave", function (e) {
          // 重置样式
          that.box.innerHTML = "";
          that.box.style.display = "none";
          e.target.className = "caution";
        })
      }
    },
    setElementPosition: function (element) {
      if (element.getBoundingClientRect) {
        var rect = element.getBoundingClientRect();
        var left = this.obj.left || rect.left + 20 + "px";
        var top = this.obj.top || rect.top + 20 + "px";
        this.box.style.left = left;
        this.box.style.top = top;
        this.box.style.display = "block";
      }
    }
  }

  window.Tips = Tips;
  // 加载同级别下的css
  includeLinkStyle("tips.css")

  function includeLinkStyle(url) {
    // 获取js路径
    var js = document.scripts;
    js = js[js.length - 1].src.substring(0, js[js.length - 1].src.lastIndexOf("/") + 1);

    // 拼接js
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = js + url;
    document.getElementsByTagName("head")[0].appendChild(link);
  }

})(window)