// 創建對象的三種基本方式
var newObject = {};

//or
var newObject = Object.create(null);

//or
var newObject = new Object();

// 四种方式给对象赋值
// 1.点号法
newObject.someKey = "Hello World";
var key = newObject.someKey;

// 2. “方括号”法
newObject["someKey"] = "Hello World";
var key = newObject["someKey"];

// 3. Object.defineProperty方式
Object.defineProperty(newObject, "someKey", {
  value: "for more control of the property's behavior",
  writable: true,
  enumerable: true,
  configurable: true
});

// 4. Object.defineProperties方式
Object.defineProperties(newObject, {
  someKey: {
    value: "Hello World",
    writable: true
  },

  anotherKey: {
    value: "Foo bar",
    writable: false
  }
});

function Car(model, year, miles) {
  this.model = model;
  this.year = year;
  this.miles = miles;
}

// 注意这里我们使用Note here that we are using Object.prototype.newMethod 而不是
// Object.prototype ，以避免我们重新定义原型对象
Car.prototype.toString = function() {
  return this.model + " has done " + this.miles + " miles";
};

// 使用:

var civic = new Car("Honda Civic", 2009, 20000);
var mondeo = new Car("Ford Mondeo", 2010, 5000);

console.log(civic.toString());
console.log(mondeo.toString());
