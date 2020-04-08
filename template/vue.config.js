const webpack = require("webpack");
const path = require("path");
const resolve = dir => require("path").join(__dirname, dir);
const CompressionWebpackPlugin = require("compression-webpack-plugin");
// 是否使用gzip
const productionGzip = true;
// 需要gzip压缩的文件后缀
const productionGzipExtensions = ["js", "css"];

module.exports = {
  publicPath: "./",
  devServer: {
    host: "localhost",
    port: 8088,
    proxy: {
      "": {
        target: "http://dev.uc.edudiy.cn",
        changeOrigin: true // 是否开启跨域
      }
    }
  },
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV == "development") {
      config.mode = "development";
    } else if (process.env.NODE_ENV == "production") {
      config.mode = "production";
      // 将每个依赖包打包成单独的js文件
      let optimization = {
        runtimeChunk: "single",
        splitChunks: {
          chunks: "all",
          maxInitialRequests: Infinity,
          minSize: 20000, // 依赖包超过20000bit将被单独打包
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1];
                return `npm.${packageName.replace("@", "")}`;
              }
            }
          }
        }
      };
      Object.assign(config, {
        optimization
      });
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 8192,
          minRatio: 0.8
        })
      );
    }
    Object.assign(config);
  },
  chainWebpack: config => {
    config.plugins.delete("prefetch");
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets/"))
      .set("components", resolve("src/components/"))
      .set("api", resolve("src/api/"));
    config.module
      .rule("svg")
      .exclude.add(resolve("src/svg-icon"))
      .end();
    config.module
      .rule("svg-icon")
      .test(/\.svg$/)
      .include.add(resolve("src/svg-icon"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
  }
};
