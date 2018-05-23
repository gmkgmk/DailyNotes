var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')
// 订阅事件，当 event.action === 'reload' 时执行页面刷新
// 还记得 dev-server.js中 派发的reload事件吧
hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})