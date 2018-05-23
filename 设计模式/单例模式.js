// 在JavaScript语言中, 单例服务作为一个从全局空间的代码实现中隔离出来共享的资源空间是为了提供一个单独的函数访问指针
var mySingleton = (function() {
  // Instance stores a reference to the Singleton
  var instance;

  function init() {
    // 单例

    // 私有方法和变量
    function privateMethod() {
      console.log("I am private");
    }

    var privateVariable = "Im also private";

    var privateRandomNumber = Math.random();

    return {
      // 共有方法和变量
      publicMethod: function() {
        console.log("The public can see me!");
      },

      publicProperty: "I am also public",

      getRandomNumber: function() {
        return privateRandomNumber;
      }
    };
  }

  return {
    // 如果存在获取此单例实例，如果不存在创建一个单例实例
    getInstance: function() {
      if (!instance) {
        instance = init();
      }

      return instance;
    }
  };
})();

var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();
console.log(singleA.getRandomNumber() === singleB.getRandomNumber()); // true
