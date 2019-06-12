// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api'
//import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(ElementUI);
Vue.use(iView);
Vue.config.productionTip = false;


Vue.prototype.$api = api; // 将api挂载到vue的原型上复制代码
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  //store,
  components: {App},
  template: '<App/>',
  render: h => h(App),

});
