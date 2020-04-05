import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'lib-flexible'

import 'normalize.css'
import 'iview/dist/styles/iview.css'
import './styles/index.less'
import 'highlight.js/styles/atom-one-light.css' // 代码高亮

import iview from '@/iview'

import { Message } from 'iview'
import { LoadingBar } from 'iview'
import VueClipboard from 'vue-clipboard2'

import './icons'

Vue.use(iview)
Vue.use(VueClipboard)

Vue.prototype.$Message = Message
Vue.prototype.$LoadingBar = LoadingBar
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + ' · 博客 | 吴予安'
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

