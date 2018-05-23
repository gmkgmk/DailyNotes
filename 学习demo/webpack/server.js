var express = require('express');
var app = express();
var port = process.env.PORT || 3000;


var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

var devClient = './dev-client';
Object.keys(webpackConfig.entry).forEach(function (name, i) {
  var extras = [devClient]
  webpackConfig.entry[name] = extras.concat(webpackConfig.entry[name])
})

var webpackCompiled = webpack(webpackConfig);

app.use('/', require('connect-history-api-fallback')());

if (process.env.NODE_ENV !== 'production') {

  // 配置运行时打包
  /*publicPath：这个插件的唯一必填项。由于index.html请求的out.js存放的位置映射到服务器的URI路径是根，即“/”，所以我赋予了publicPath为：“/”。
  stats：设置了console统计日志带颜色输出。
  lazy：指示是否懒人加载模式。true表示不监控源码修改状态，收到请求才执行webpack的build。false表示监控源码状态，配套使用的watchOptions可以设置与之相关的参数。 */
  var webpackDevMiddleware = require('webpack-dev-middleware')(webpackCompiled, {
    publicPath: "/",
    stats: {
      colors: true
    },
    lazy: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },
  });
  // 热更新文件
  var webpackHotMiddleware = require('webpack-hot-middleware')(webpackCompiled);


  // 监听html文件改变事件,暂时没有实现.
  webpackCompiled.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
      // 发布事件 reload,这个事件会在dev-client.js中接受到，然后刷新
      hotMiddleware.publish({
        action: 'reload'
      })
      cb()
    })
  })

  app.use(webpackDevMiddleware);
  app.use(webpackHotMiddleware);
}
app.use('/', express.static('public'));

var server = app.listen(port, function (err) {
  if (err) {
    throw err;
  }
  console.log('ListenIng at http://localhost:%s', port);
});