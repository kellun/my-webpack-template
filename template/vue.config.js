// 拼接路径
const resolve = dir => require("path").join(__dirname, dir);
<%_ if (options.ui === 'vant') { _%>
const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");
<%_ } _%>
const TerserPlugin = require("terser-webpack-plugin");
// 导入compression-webpack-plugin
const CompressionWebpackPlugin = require("compression-webpack-plugin");
// 定义压缩文件类型
const productionGzipExtensions = ["js", "css"];
module.exports = {
  // 项目默认部署在根目录下
  publicPath: "./",
  assetsDir: "static",
  // 生产环境禁止生成SourceMap
  productionSourceMap: process.env.NODE_ENV === "production" ? false : true,
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
    config.optimization = {
      minimizer: [
        new TerserPlugin({
          cache: true, // 开启 cache，加快二次构建速度
          parallel: true, // 开启多线程压缩打包
          terserOptions: {
            output: {
              comments: false, // 打包时删除注释
            },
            compress: {
              drop_console: true, // 生产环境禁止打印console.log()
              dead_code: true, // 删除无法访问的代码
              drop_debugger: true, // 删除debugger
            },
          },
        }),
      ],
    };
    return config;
  },
  chainWebpack: (config) => {
    config.plugins.delete("prefetch");
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets/"))
      .set("components", resolve("src/components/"))
      .set("api", resolve("src/api/"))
      .set("utils", resolve("src/utils/"));
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
