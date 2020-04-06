import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'lib-flexible'

import 'normalize.css'
import './styles/index.less'
import 'highlight.js/styles/atom-one-light.css' // 代码高亮

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import Message from './components/Message'

import './icons'

Vue.prototype.$Message = Message
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.meta.title) {
    document.title = to.meta.title + ' · 博客 | 吴予安'
  }
  next()
})

router.afterEach((to, from) => {
  // finish progress bar
  NProgress.done()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

