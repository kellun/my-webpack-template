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
  let dependencies = {
    "core-js": "^3.6.4",
    vue: "^2.6.11",
    "vue-router": "^3.1.5",
    vuex: "^3.1.2",
    axios: "^0.19.0",
    "normalize.css": "7.0.0",
  };
  let devDependencies = {
    "@vue/cli-plugin-babel": "^3.7.0",
    "@vue/cli-plugin-eslint": "^3.7.0",
    "@vue/cli-service": "^3.7.0",
    "babel-eslint": "^10.0.1",
    "babel-plugin-component": "^1.1.1",
    "babel-plugin-import": "^1.12.1",
    "babel-polyfill": "^6.26.0",
    "compression-webpack-plugin": "^3.1.0",
    eslint: "^6.7.2",
    "eslint-plugin-vue": "^6.2.2",
    "html-search": "^0.0.5",
    "node-sass": "^4.12.0",
    "sass-loader": "^7.1.0",
    semver: "^6.3.0",
    "vue-template-compiler": "^2.5.21",
    plop: "2.3.0",
    autoprefixer: "^9.5.1",
  };
  if (options.ui === "vant") {
    dependencies = Object.assign(dependencies, {
      vant: "^2.1.8",
      "amfe-flexible": "^2.2.1",
    });
    devDependencies = Object.assign(devDependencies, {
      "postcss-pxtorem": "^4.0.1",
    });
  } else if (options.ui == "element-ui") {
    dependencies = Object.assign(dependencies, {
      "element-ui": "^2.13.0",
    });
  }
  // 安装一些基础公共库
  api.extendPackage({
    author: "Wzp <1193278447@qq.com>",
    scripts: {
      serve: "vue-cli-service serve",
      build: "vue-cli-service build",
      lint: "vue-cli-service lint",
      new: "plop",
    },
    dependencies,
    devDependencies
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
