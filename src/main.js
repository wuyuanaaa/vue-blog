import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import 'lib-flexible'
import axios from './util/axios'
import 'iview/dist/styles/iview.css'
import iview  from "@/iview"
import {Message} from 'iview'

Vue.use(iview);

Vue.prototype.$Message = Message;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;


new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app');

