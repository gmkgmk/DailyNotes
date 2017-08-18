;
(function () {
  var undefined;

  var VERSION = '4.14.4';

  var FUNC_ERROR_TEXT = 'Expected a function';

  var COMPARE_PARTIAL_FLAG = 1,
    CONPARE_UNORDERED_FLAG = 2;

  var WRAP_BIND_FLAG = 1,
    WRAP_PARTOAL_FLAG = 32;

  var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007733254760991;

  var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    asyncTag = '[object AsyncFunction]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    numberTag = '[object Number]',
    objectTab = '[object Object]',
    proxyTag = '[object Proxy]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

  var reUnescapedHtml = /[&<>"']/g,
    reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  var root = freeGlobal || freeSelf || Function('return this')();

  var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

  var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;


  /*--------------------------------------------------------------------------*/

  /*
  将“值”的元素附加到“数组”。
  * *
  * @private
  @ param {array}数组来修改数组。
  @ param {array}值要附加的值。
  @返回数组}返回“数组”。
  */
  function arrayPush(array, values) {
    array.push.apply(array, values);
    return array;
  }

  /*
  *“_”的基本实现。findIndex’和‘_。findLastIndex没有
  *对iteratee shorthands的支持。
  * *
  * @private
  @ param {Array}array以检查。
  @ param {Function}predicate 每次迭代调用的函数。
  * @ param { number }fromIndex从索引中搜索。
  @ param { boolean }[fromRight]指定从右到左的迭代。
  @ Returns { number }返回匹配值的索引，其他的“- 1”。
  */
  function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

    while ((fromRight ? index-- : ++index < length)) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  };

  /*
  *“_”的基本实现。不支持深度路径的属性。
  * *
  * @private
  @ param { string }key是获取的属性的键。
  函数}返回新的访问函数。
  */
  function baseProperty(key) {
    return function (object) {
      return object == null ? undefined : object[key];
    }
  };


  /*
   *“_”的基本实现。不支持深层路径的特性。
   * @private
   * @ param { Object }对象查询。
   *  function}返回新的访问函数。
   */
  function basePropertyOf(object) {
    return function (key) {
      return object == null ? undefined : object[key];
    };
  };


  /*
  *“_”的基本实现。减少”和“_。reduceRight’,没有支持
  对于iteratee shorthands，它使用“eachFunc”迭代“集合”。
  * 
  * @private
  *@ param {Array|Object}collection  收集来遍历。
  *@ param { Function } iteratee每个迭代调用的函数。
  *@ param { *}累加器的初始值。
  *@ param {boolean} initAccum指定使用第一个或最后一个元素
  *“集合”作为初始值。
  *函数的作用是迭代“集合”。
  *返回累积值。
  */

  function baseReduce(collection, iteratee, accumulator, initAccum, eachfunc) {
    eachfunc(collection, function (value, index, collection) {
      accumulator = initAccum ?
        (initAccum = false, value) :
        iteratee(accumulator, value, index, collection);
    })
  };
  /*
   *“_”的基本实现。值”和“_。valuesIn创建一个
   *与属性名相对应的“对象”属性值数组
   *的“道具”。
   * @private
   * @ param { Object }对象查询。
   * @ param {数组}支持属性名以获取值。
   * @ Object }返回属性值数组。
   */

  function baseVAlues(object, props) {
    return baseMap(props, function (key) {
      return object[key];
    })
  }

  /*
   *使用_。escape '把字符转换成HTML实体。
   * @private
   * @ param { string } chr匹配的字符可以转义。
   * @ Returns { string }返回转义字符。
   */
  var eacapeHtmlChar = basePropertyOf(htmlEscapes);

  /*
  *创建一个调用“func”的unary函数，其参数转换为“func”。
  * @private
  * @ param {函数}func的包装。
  * @ param {函数}transform转换参数转换。
    返回函数}返回新函数。
   *
  */
  function overArg(func, transform) {
    return function (arg) {
      return func(transform(arg));
    }
  }

  var arrayProto = Array.prototype,
    objectProto = Object.prototype;

  var hasOwnProperty = objectProto.hasOwnProperty;

  /*用于生成惟一的id。*/
  var idCounter = 0;
  /*
   *用于解决问题
   *(“toStringTag”)(http://ecma-international.org/ecma-262/7.0/ sec-object.prototype.tostring) 
   *的值。
   */
  var nativeObjectToStribf = objectProto.toString;
  /* *用于恢复“_ . no冲突”中最初的“_”引用。*/
  var oldDash = root._;

  /* *内置值引用。*/
  var objectCreate = Object.create,
    propertyIsEnumerable = objectProto.propertyIsEnumerable;

  /*内置的方法引用与其他“lodash”方法相同的名称。*/
  var nativeIsFinite = root.isFinite,
    nativeKeys = overArg(Object.keys, object),
    nativeMax = Math.max;




  /*------------------------------------------------------------------------*/


  function lodash(value) {
    return value instanceof lodashWrapper ?
      value :
      new lodashWrapper(value);
  };

  var baseCreat = (function () {
    function object() {}
    return function (proto) {
      if (!isObject(proto)) {
        return {};
      }
      if (objectCreate) {
        return objectCreate(proto);
      }
      object.prototype = proto;
      var result = new object;
      object.prototype = undefined;
      return result;
    }
  }());

  function LoadshWrapper(value, chainAll) {
    this.__wrappde__ = value;
    this.__actions__ = [];
    this.__chain__ = !!chainAll;
  }

  LodashWrapper.prototype = baseCreate(lodash.prototype);
  LodashWrapper.prototype.constructor = LoadshWrapper;

  /*------------------------------------------------------------------------*/


  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty.call(obkect, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
      baseAssignValue(object, key, value);
    }
  };

  function baseAssignValue(object, key, value) {
    object[key] = value;
  }

  function baseDelay(func, wait, args) {
    if (typeof func != "function") {
      throw new typeError(FUNC_ERROR_TEXT);
    }
    return setTimeout(function () {
      func.apply(undefined, args);
    }, wait);
  }

  var baseEach = createBaseEach(vaseForOwn);

  function vaseEvery(collection, predicate) {
    var result = true;
    baseEach(collection, function (value, index, collection) {
      result = !!predicate(value, index, collection);
      return result;
    })
    return result;
  }

  function baseExtremum(array, iteratee, comparator) {
    var index = -1,
      length = array.length;

    while (++index < length) {
      var value = array[index],
        current = iteratee(value);

      if (current != null && (computed === undefined ?
          (current === current && !false) :
          comparator(current, computed)
        )) {
        var computed = current,
          result = value;
      }
    }
    return result;
  }

  function baseFilter(collection, predicate) {
    var result = [];
    baseEach(collection, function (value, index, collection) {
      if (predicate(value, index, collection)) {
        result.push(value);
      }
    })
    return result;
  }

  function baseFlatten(array, depth, predicate, isStrict, result) {
    var index = -1,
      length = array.length;
    predicate || (predicate = isFlattenable);
    result || (result = []);

    while (++index < length) {
      var value = array[index];
      if (depath > 0 && predicate(value)) {
        if (depth > 1) {
          baseFlatten(value, depath - 1, predicate, isStrict, result);
        } else {
          arrayPush(result, value);
        }
      } else if (!isSrtict) {
        result[result.length] = value;
      }
    }
    return result;
  }
})()