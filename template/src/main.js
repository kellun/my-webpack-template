import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 导入路由配置
import router from "@/router/index.js";
import '@/svg-icon'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
