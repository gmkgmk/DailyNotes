var counter = require("./nodeModule");

console.log(`第一次使用模块node_modules`);

counter.setOutputVal(10);

counter.setIncremet(10);

counter.printNextCount();

counter.printNextCount();

counter.printNextCount();

counter.printNextCount();
require.cache=null
var counter = require("./nodeModule");

console.log(`第二次使用模块node_modules`);

counter.printNextCount();
