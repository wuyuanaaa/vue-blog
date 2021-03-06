import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'lib-flexible'
import axios from './util/axios'
import 'iview/dist/styles/iview.css'
import iview  from "@/iview"
import {Message} from 'iview'
import {LoadingBar} from 'iview'
import VueClipboard from 'vue-clipboard2'

Vue.use(iview);
Vue.use(VueClipboard);

Vue.prototype.$Message = Message;
Vue.prototype.$LoadingBar = LoadingBar;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;


router.beforeEach((to, from, next) =>{
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});


new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

