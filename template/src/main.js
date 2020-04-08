import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 导入路由配置
import router from "@/router/index.js";

// 初始化 css
import "reset-css";
import "@/assets/scss/base.scss";

import "element-ui/lib/theme-chalk/index.css";
import ElementUI from "element-ui";
Vue.use(ElementUI);
import '@/svg-icon'
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
