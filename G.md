一.Zepto学习笔记

1.getComputedStyle（**张鑫旭**）
getComputedStyle是一个可以获取当前元素所有最终使用的CSS属性值。
返回的是一个CSS样式声明对象([object CSSStyleDeclaration])，只读。
语法如下:var style = window.getComputedStyle("元素", "伪类");

例如：

var dom = document.getElementById("test"),
    style = window.getComputedStyle(dom , ":after");

/*
getComputedStyle与style的区别:
1.只读与可写
    getComputedStyle方法是只读的，只能获取样式，不能设置；而element.style能读能写，能屈能伸。
2.获取的对象范围
    getComputedStyle方法获取的是最终应用在元素上的所有CSS属性对象（即使没有CSS代码，也会把默认的祖宗八代都显示出来）；
    而element.style只能获取元素style属性中的CSS样式。
*/

getPropertyValue方法
getPropertyValue方法可以获取CSS样式申明对象上的属性值（直接属性名称），例如：
window.getComputedStyle(element, null).getPropertyValue("float");
getComputedStyle(elem, '伪类，如 :link') 返回一个 CSSStyleDeclaration 对象，里面存储了元素的样式信息，可以通过 getPropertyValue('name') 方法获取

如果我们不使用getPropertyValue方法，直接使用键值访问，其实也是可以的。

使用getPropertyValue方法不必可以驼峰书写形式（不支持驼峰写法），例如：style.getPropertyValue("border-top-left-radius");

2.getBoundingClientRect
(getBoundingClientRect获取一个元素对于游览器的相对位置)
getBoundingClientRect用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置。

getClientRects获取元素占据页面的所有矩形区域。

3.es6解构；
解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。
用途：{
    （1）交换变量的值；
    （2）从函数返回多个值；
    （3）函数参数的定义；
    （4）提取JSON数据
    （5）函数参数的默认值（指定参数的默认值，就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句。）
    （6）遍历Map结构
    （7）输入模块的指定方法 (模块化：const { SourceMapConsumer, SourceNode } = require("source-map");)
}

4.数组新方法
(1)Array.from();
等于es5 [].slice.apply()
任何有length属性的对象，都可以通过Array.from方法转为数组。

(2)Array.of();
将一组值，转换为数组，
等于es5 Array();new Array()

(3)copyWithin();
Array.prototype.copyWithin(target, start = 0, end = this.length)
它接受三个参数。

target（必需）：从该位置开始替换数据。
start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。
end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。

(4)数组实例的find()和findIndex() 
数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。
如果没有符合条件的成员，则返回undefined。
数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，
如果所有成员都不符合条件，则返回-1。

(5)数组实例的fill()
fill方法使用给定值，填充一个数组。
fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']

(6)数组实例的entries()，keys()和values()
ES6提供三个新的方法——entries()，keys()和values()——用于遍历数组。它们都返回一个遍历器对象（详见《Iterator》一章），可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。

/****
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
****/
不使用 for of 的情况
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']


5.数组
（1）合并数组
let arr1=[0,1,2]
let arr2=[3,4,5]

// ES5
arr1.concat(arr2)
// ES6
[...arr1,...arr2]

（2）与解构赋值结合
// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list

如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。

（3）函数的返回值
JavaScript的函数只能返回一个值，如果需要返回多个值，只能返回数组或对象。扩展运算符提供了解决这个问题的一种变通方法。

var dateFields = readDateFields(database);
var d = new Date(...dateFields);
上面代码从数据库取出一行数据，通过扩展运算符，直接将其传入构造函数Date。

（4）字符串
扩展运算符还可以将字符串转为真正的数组。
[...'hello']
// [ "h", "e", "l", "l", "o" ]

（5）实现了Iterator接口的对象

任何Iterator接口的对象，都可以用扩展运算符转为真正的数组。

（6）Map和Set结构，Generator函数

扩展运算符内部调用的是数据结构的Iterator接口，因此只要具有Iterator接口的对象，都可以使用扩展运算符，比如Map结构。



ES2016规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。

函数的name属性，返回该函数的函数名。


6.对象属性的遍历
ES6一共有5种方法可以遍历对象的属性。

（1）for...in

for...in循环遍历对象自身的和继承的可枚举属性（不含Symbol属性）。

（2）Object.keys(obj)

Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含Symbol属性）。

（3）Object.getOwnPropertyNames(obj)

Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含Symbol属性，但是包括不可枚举属性）。

（4）Object.getOwnPropertySymbols(obj)

Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有Symbol属性。

（5）Reflect.ownKeys(obj)

Reflect.ownKeys返回一个数组，包含对象自身的所有属性，不管属性名是Symbol或字符串，也不管是否可枚举。


6.对象属性的读取
Object.keys()，Object.values()，Object.entries() 

Object.keys()
ES5 引入了Object.keys方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。

Object.values() 
Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。

Object.entries
Object.entries方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。