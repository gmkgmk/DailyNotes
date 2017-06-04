所有的设计模式对哦遵循一个原则:找出程序中变化的地方，并将变化封装起来;
#第 1 章
编程语言按照数据类型分:1.静态类型语言;2.动态类型语言;

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