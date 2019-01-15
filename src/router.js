import Vue from 'vue'
import Router from 'vue-router'
import userHome from './views/user/userHome.vue'
import userBase from './views/user/userBase'
import article from './views/user/article'
import adminBase from './views/admin/adminBase'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/home'
    },
    {
      path: '/user',
      name: 'userBase',
      component: userBase,
      alias: '/',
      children: [
        {
          path: '/home',
          component: userHome
        },
        {
          path: '/article/:articleId',
          name: 'article',
          component: article
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
