import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import request from './util/request'
import 'iview/dist/styles/iview.css'
import iview from '@/iview'
import { Message } from 'iview'
import { LoadingBar } from 'iview'
import VueClipboard from 'vue-clipboard2'

Vue.use(iview)
Vue.use(VueClipboard)

Vue.prototype.$Message = Message
Vue.prototype.$LoadingBar = LoadingBar
Vue.prototype.$axios = request
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

