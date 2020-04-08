// 拼接路径
const resolve = dir => require("path").join(__dirname, dir);
const autoprefixer = require("autoprefixer");
<%_ if (options.ui === 'vant') { _%>
const pxtorem = require("postcss-pxtorem");
<%_ } _%>
// 导入compression-webpack-plugin
const CompressionWebpackPlugin = require("compression-webpack-plugin");
// 定义压缩文件类型
const productionGzipExtensions = ["js", "css"];
module.exports = {
  // 项目默认部署在根目录下
  publicPath: "./",
  outputDir: 'dist',
  assetsDir: "static",
  // 生产环境禁止生成SourceMap
  productionSourceMap:false,
  parallel: require("os").cpus().length > 1,
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 9527, // 端口
    https: false,
    hotOnly: true,
    hot: true,
  },
  // eslint-disable-next-line
  configureWebpack: (config) => {
    config.plugins = [
      ...config.plugins,
      new CompressionWebpackPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"), //匹配文件名
        threshold: 10240, //对10K以上的数据进行压缩
        minRatio: 0.8,
        deleteOriginalAssets: false, //是否删除源文件
      }),
    ];
  },
  chainWebpack: (config) => {
    config.plugins.delete("prefetch");
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets/"))
      .set("img", resolve("src/assets/images"))
      .set("scss", resolve("src/assets/scss"))
      .set("components", resolve("src/components/"))
      .set("api", resolve("src/api/"))
      .set("utils", resolve("src/utils/"))
      .set("views", resolve("src/views/"));
    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
    )
    config
      .optimization.splitChunks({
        chunks: 'all',
        cacheGroups:{
          {
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: 'initial' // only package third parties that are initially dependent
            },
            commons: {
              name: 'chunk-commons',
              test: resolve('src/components'), // can customize your rules
              minChunks: 3, //  minimum common number
              priority: 5,
              reuseExistingChunk: true
            },
            <%_ if (options.ui === 'element-ui') { _%>
            elementUI: {
              name: 'chunk-elementUI', // split elementUI into a single package
              priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
              test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
            }
            <%_ } _%>
            <%_ if (options.ui === 'vant') { _%>
            vant:{
              name: 'chunk-vant', // split elementUI into a single package
              priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
              test: /[\\/]node_modules[\\/]_?vant(.*)/ // in order to adapt to cnpm
            }
            <%_ } _%>
          }
        }
      })
    config.optimization.runtimeChunk('single')
  },
  <%_ if (options.ui === 'vant') { _%>
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ["*"],
            // 该项仅在使用 Circle 组件时需要
            // 原因参见 https://github.com/youzan/vant/issues/1948
            selectorBlackList: ["van-circle__layer"],
          }),
        ],
      },
    },
  }
  <%_ } _%>
};
