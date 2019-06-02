import Vue from 'vue'
import router from './routes/route'
import store from './store/index'
import './service-worker/index'



import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);

Vue.config.productionTip = false
new Vue({
  el: "#app",
  router,
  store,
  render: h => h('router-view')
});