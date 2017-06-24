所有的设计模式对哦遵循一个原则: 找出程序中变化的地方，并将变化封装起来;
#第 1 章 基础知识
编程语言按照数据类型分: 1.静态类型语言; 2.动态类型语言;

静态类型语言在编译时便已确定变量的类型，
动态类型语言的变量类型要到程序运行的时候，待变量被赋予某个值之后，才会具有某种类型。

多态:当我们对一些函数发出“调用”的消息时，这些函数会返回不同的执行结果，这是“多态性”的一种体现，

封装:封装的目的是将信息隐藏;


>var obj1 = new Object();
>Object.getPrototypeOf( obj1 )=== Object.prototype
> getPrototypeOf获得一个对象的原型,所有的对象都是object.prototype衍生的.
>
>
>function Preson(name){
>  this.name = name;
>}
>
>Preson.prototype.getName = function(){
>  return this.name;
>}
> //new 的实现
>var objectFactory = function(){
>   var obj = new Object();
>  Constructor=[].shift.call(arguments);
>  obj.__proto__=Constructor.prototype;
>  var ret = Constructor.apply(obj,arguments);
>
>  return typeof ret === "Object"?ret:obj;
>}
>
>var a = objectFactory(Preson,"sevev")


####this的指向:
js是静态作用域,而this则是动态作用域;
除去不常用的 with 和 eval 的情况，具体到实际应用中， this 的指向大致可以分为以下 4种
1. 作为对象的方法调用:当函数作为对象的方法被调用时， this 指向该对象：
2. 作为普通函数调用:{
  严格模式下:指向undefined;
  非严格模式:由于undefined在非严格模式下自动指向window;
}
>var myObject = {
>  name: 'sven',
>  getName: function () {
>    return this;
>  }
>};
>var getName = myObject.getName;
>console.log(getName())

这种场景下也是属于普通调用自己;

3. 函数的嵌套函数使用
指向的undefined(非严格模式)
指向的全局(严格模式)

4.Function.prototype.call 或 Function.prototype.apply 调用
指向的是传入的对象.


v8引擎push的实现:
>function ArrayPush() {
>var n = TO_UINT32( this.length ); // 被 push 的对象的 length
>var m = %_ArgumentsLength(); // push 的参数个数
>for (var i = 0; i < m; i++) {
>this[ i + n ] = %_Arguments( i ); // 复制元素 (1)
>}
>this.length = n + m; // 修正 length 属性的值 (2)
>return this.length;
>};


####闭包和高阶函数:
#######闭包:闭包并不透彻,网上更多优秀的文章;

#######高阶函数:

`高阶函数是指至少满足下列条件之一的函数。
` 函数可以作为参数被传递；
` 函数可以作为返回值输出。

AOP（面向切面编程）的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，这些
跟业务逻辑无关的功能通常包括日志统计、安全控制、异常处理等。


函数currying使用
var cost = (function(){
var args = [];
return function(){
if ( arguments.length === 0 ){
var money = 0;
for ( var i = 0, l = args.length; i < l; i++ ){
money += args[ i ];
}
return money;
}else{
[].push.apply( args, arguments );
}
}


#######函数节流:
函数非用户执行时,同一时间要执行多次函数,但没必要执行那么频繁,就可以使用函数节流,减少性能消耗.


var throttle = function ( fn, interval ) {
var __self = fn, // 保存需要被延迟执行的函数引用
timer, // 定时器
firstTime = true; // 是否是第一次调用
return function () {
var args = arguments,
__me = this;
if ( firstTime ) { // 如果是第一次调用，不需延迟执行
__self.apply(__me, args);
return firstTime = false;
}
if ( timer ) { // 如果定时器还在，说明前一次延迟执行还没有完成
return false;
}
timer = setTimeout(function () { // 延迟一段时间执行
clearTimeout(timer);
timer = null;
__self.apply(__me, args);
}, interval || 500 );
};
};
window.onresize = throttle(function(){
console.log( 1 );
}, 500 );

#######分时函数:
某些函数确实是用户主动调用的，但因为一些客观的原因，这些函数会严重地影响页面性能。
var timeChunk = function( ary, fn, count ){
var obj,
t;
var len = ary.length;
var start = function(){
for ( var i = 0; i < Math.min( count || 1, ary.length ); i++ ){
var obj = ary.shift();
fn( obj );
}
};
return function(){
t = setInterval(function(){
if ( ary.length === 0 ){ // 如果全部节点都已经被创建好
return clearInterval( t );
}
start();
}, 200 ); // 分批执行的时间间隔，也可以用参数的形式传入
};
};


#######惰性加载函数:
根据类型判断后重新创建一个函数,只需要判断一次;


#第 2 章 设计模式:
列举了十四中常用的模式;
##一:单例模式;
单例模式的定义是：保证一个类仅有一个实例，并提供一个访问它的全局访问点。


降低命名污染:

1.建立个人命名空间:
var MyApp = {};
MyApp.namespace = function( name ){
var parts = name.split( '.' );
var current = MyApp;
for ( var i in parts ){
if ( !current[ parts[ i ] ] ){
current[ parts[ i ] ] = {};
}
current = current[ parts[ i ] ];
}
};
MyApp.namespace( 'event' );
MyApp.namespace( 'dom.style' );
console.dir( MyApp );

// 上述代码等价于：
var MyApp = {
event: {},
dom: {
style: {}
}
};

2.使用闭包封装私有变量
var user = (function(){
var __name = 'sven',
__age = 29;
return {
getUserInfo: function(){
return __name + '-' + __age;
}
}
})();


惰性单例
Singleton.getInstance = (function(){
var instance = null;
return function( name ){
if ( !instance ){
instance = new Singleton( name );
}
return instance;
}
})();

好处:不是浏览器一加载就生成类,而是调用的时候才生成.


单利模式抽象:
var getSingle = function( fn ){
  var result;
  return function(){
    return result || ( result = fn .apply(this, arguments ) );
  }
};

##二:策略模式;
定义:定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。


JavaScript 版本的策略模式
公共的写成一个类,调用的时候传入类.
var strategies = {
"S": function( salary ){
return salary * 4;
},
"A": function( salary ){
return salary * 3;
},
"B": function( salary ){
return salary * 2;
}
};

var strategies = {
"S": function( salary ){
return salary * 4;
},
"A": function( salary ){
return salary * 3;
},
"B": function( salary ){
return salary * 2;
}
};

var calculateBonus = function( level, salary ){
return strategies[ level ]( salary );
};
console.log( calculateBonus( 'S', 20000 ) ); // 输出：80000
console.log( calculateBonus( 'A', 10000 ) ); // 输出：30000

##三:代理模式;
代理模式的关键是，当客户不方便直接访问一个对象或者不满足需要的时候，提供一个替身对象来控制对这个对象的访问，
客户实际上访问的是替身对象。替身对象对请求做出一些处理之后，再把请求转交给本体对象。

常用的就是缓存模式:(ajax请求下来存起来,用于分页等)

##四:迭代器模式;
迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象
的内部表示。迭代器模式可以把迭代的过程从业务逻辑中分离出来，在使用迭代器模式之后，即
使不关心对象的内部构造，也可以按顺序访问其中的每个元素。
例:var each = function( ary, callback ){
for ( var i = 0, l = ary.length; i < l; i++ ){
callback.call( ary[i], i, ary[ i ] ); // 把下标和元素当作参数传给 callback 函数
}
};
each( [ 1, 2, 3 ], function( i, n ){
alert ( [ i, n ] );
});
1.内部迭代器;
比如 each 函数的内部已经定义好了迭代规则，它完全接手整个迭代过程，外部只需要一次初始调用;


##五:发布 — 订阅模式(观察者模式);
!重要;
定义:发布 — 订阅模式又叫观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状
态发生改变时，所有依赖于它的对象都将得到通知。在 JavaScript开发中，我们一般用事件模型
来替代传统的发布 — 订阅模式。

发布 — 订阅模式的优点非常明显，一为时间上的解耦，二为对象之间的解耦。