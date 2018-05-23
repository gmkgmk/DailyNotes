var path = require("path");
var webpack = require("webpack");
const HtmlwebpackPlugin = require("html-webpack-plugin");
/*webpack自带的插件
UglifyJsPlugin:压缩js;
CommonsChunkPlugin:用于第三方文件打包;
*/
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');



module.exports = {
  /*
    enter:入口文件的配置;
    babel-polyfil:Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，babel-polyfil作为一个修补功能;
    main为主口.
   */
  entry: {
    vendor: ["babel-polyfill", 'lodash'],
    main: path.resolve(__dirname, "./src/main.js")
  },
  /*
    filename:指定硬盘每个输出文件的名称。在这里你不能指定为绝对路径;
    path:输入位置
   */
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "[name].bundle.js"
  },
  /*
    rules为一个数组,保存每个加载器要用到的配置(每个加载器至少要有两个选项,test和loader);
    /\.jsx?$/表示匹配js和jsx;
    可以传入字符串形式的加载器名称,以叹号分隔，比如'babel-loader!eslint-loader',默认为从右向左读,先运行右边的加载器,再往做运行!

    transform-runtime作用:避免 babel 编译的工具函数在每个模块里重复出现，减小库和工具包的体积；;
    babel-presets-es2015转换成兼容老式浏览器的代码;
   */
  module: {
    rules: [{
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          plugins: ['transform-runtime'],
          presets: ['es2015']
        }
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      }
    ]
  },
  /*
  使用插件:HtmlwebpackPlugin:html模板
          UglifyJsPlugin:压缩js;
          CommonsChunkPlugin:提取公共部分
   */
  plugins: [
    new HtmlwebpackPlugin({
      title: 'webpack测试',
      template: 'src/index.html',
      filename: './index.html',
      //渲染输出html文件名,路径相对于 output.path 的值
      inject: true,
      // true: 自动写入依赖文件; false: 不写入依赖，
    }),
    new UglifyJsPlugin({
      beautify: true,
      mangle: {
        screw_ie8: true
      },
      compress: {
        screw_ie8: true,
        warnings: false
      },
      comments: true
    }),
    new CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.bundle.js"
    }),
    new webpack.HotModuleReplacementPlugin(), //热加载插件
    new webpack.NoEmitOnErrorsPlugin() //可以保证出错时页面不阻塞，且会在编译结束后报错。
  ]
}