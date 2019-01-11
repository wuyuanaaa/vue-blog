import Vue from 'vue'
import Router from 'vue-router'
import userHome from './views/user/userHome.vue'
import userBase from './views/user/userBase'
import adminBase from './views/admin/adminBase'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/user/home'
    },
    {
      path: '/user',
      name: 'userBase',
      component: userBase,
      children: [
        {
          path: 'home',
          component: userHome
        }
      ]
    },
    {
      path: '/admin',
      name: 'adminBase',
      component: adminBase,
      children: [
        {
          path: 'redact',
          component: () => import(/* webpackChunkName: "about" */ './views/admin/redact.vue')
        }
      ]
    }
  ]
})
