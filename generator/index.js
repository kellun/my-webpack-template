const fs = require("fs");
const tool = (api) => {
  return {
    deleteFile(path) {
      const file = api.resolve(path);
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    },
    deleteDir(path) {
      const dir = api.resolve(path);
      if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach((o) => {
          const file = dir + "\\" + o;
          if (fs.statSync(file).isDirectory()) {
            fs.readdirSync(dir).forEach((p) => {
              fs.unlinkSync(dir + "\\" + o + "\\" + p);
            });
          } else {
            fs.unlinkSync(file);
          }
        });
        fs.rmdirSync(dir);
      }
    },
  };
};
module.exports = (api, options, rootOptions) => {
  const utils = tool(api);
  // 命令
  api.extendPackage({
    scripts: {
      serve: "vue-cli-service serve",
      build: "vue-cli-service build",
      lint: "vue-cli-service lint",
    },
  });
  const dependencies = {
    "core-js": "^3.6.4",
    vue: "^2.6.11",
    "vue-router": "^3.1.5",
    vuex: "^3.1.2",
    axios: "^0.19.0",
    "normalize.css": "7.0.0",
  };
  const devDependencies = {
    "@vue/cli-plugin-babel": "~4.2.0",
    "@vue/cli-plugin-eslint": "~4.2.0",
    "@vue/cli-plugin-router": "~4.2.0",
    "@vue/cli-plugin-vuex": "~4.2.0",
    "@vue/cli-service": "~4.2.0",
    "@vue/eslint-config-prettier": "^6.0.0",
    "compression-webpack-plugin": "^3.1.0",
    "babel-eslint": "^10.0.3",
    "babel-polyfill": "^6.26.0",
    "terser-webpack-plugin": "^2.3.5",
    eslint: "^6.7.2",
    "eslint-plugin-prettier": "^3.1.1",
    "eslint-plugin-vue": "^6.1.2",
    "lint-staged": "^9.5.0",
    prettier: "^1.19.1",
    "vue-template-compiler": "^2.6.11",
    "node-sass": "^4.12.0",
    "sass-loader": "^7.1.0",
  };
  if (options.ui === "vant") {
    Object.assign(dependencies, {
      vant: "^2.1.8",
      "amfe-flexible": "^2.2.1",
    });
    Object.assign(dependencies, {
      "postcss-pxtorem": "^4.0.1",
    });
  } else if (options.ui == "element-ui") {
    Object.assign(dependencies, {
      "element-ui": "^2.13.0",
    });
  }
  // 安装一些基础公共库
  api.extendPackage({
    dependencies,
    devDependencies,
  });
  // 删除 vue-cli3 默认目录
  api.render((files) => {
    Object.keys(files)
      .filter((path) => path.startsWith("src/") || path.startsWith("public/"))
      .forEach((path) => delete files[path]);
  });
  api.render("../template");
  api.onCreateComplete(() => {
    // utils.deleteDir('./src/components');
    // utils.deleteDir('./src/router');
  });
};
