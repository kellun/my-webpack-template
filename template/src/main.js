import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'normalize.css/normalize.css' 
<%_ if (options.ui === 'element-ui') { _%>
import "babel-polyfill"; // 处理浏览器es6+的兼容性问
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
<%_ } _%>
<%_ if (options.ui === 'vant') { _%>
import { Button} from "vant";
import "amfe-flexible";
Vue.use(Button)
<%_ } _%>

Vue.config.productionTip = false;
<%_ if (options.ui === 'element-ui') { _%>
Vue.use(ElementUI);
<%_ } _%>

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
