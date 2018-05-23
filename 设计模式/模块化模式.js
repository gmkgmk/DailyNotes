/*
*在JavaScript中，实现模块有几个选项，他们包括
*模块化模式
*对象表示法
*AMD模块
*CommonJS 模块
*ECMAScript Harmony 模块
*/
var testModule = (function() {
  var conunt = 0;
  return {
    add: function() {
      conunt++;
    },
    reset: function() {
      console.log("counter value prior to reset: " + counter);
      counter = 0;
    }
  };
})();
