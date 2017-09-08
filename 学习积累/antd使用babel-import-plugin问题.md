项目中遇到的问题:
1.引用babel-import-plugin报错
"You may need an appropriate loader to handle this file type."

webpack 配置:
 rules: [{
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: require.resolve('babel-loader'),
          query: {
            presets: ['es2015', 'react'],
            "plugins": ["transform-runtime", ["import", {
              "libraryName": "antd",
              "style": "css"
            }]],
          }
        }
      },
      {
        test: /\.less$/,
        exclude: /(node_modules)/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        loader: 'style-loader!css-loader'
      },
    ]

原因:将node_modules里面的文件排除在loader范围之外,导致加载器不编译antd里的问题导致出错;
解决:如果配置的style:css则去除css-loader理的exclude: /(node_modules)/,true则去除Less的;

2.babel-import-plugin不生效:
配置了任然提示全局引入;
首先检查是否在文件理映入了antd的样式文件,这是不需要引入的,插件自动引入;
然后检查CommonsChunkPlugin是不是将antd引入.!
