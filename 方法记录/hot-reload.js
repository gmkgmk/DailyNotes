var fs = require("fs");
const enter = "./app.js";
var router = require(enter);
const a = require("./test");

fs.watch(require.resolve(enter), function() {
  cleanCache(require.resolve(enter));
  try {
    router = require(enter);
  } catch (ex) {
    console.error("module update failed");
  }
});

function cleanCache(modulePath) {
  var module = require.cache[modulePath];
  if (module.parent) {
    module.parent.children.splice(module.parent.children.indexOf(module), 1);
  }
  require.cache[modulePath] = null;
}
