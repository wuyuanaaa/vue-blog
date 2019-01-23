import Vue from 'vue'
import Router from 'vue-router'


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
      component: resolve => require(['@/views/user/userBase'], resolve),
      alias: '/',
      children: [
        {
          path: 'home',
          component: resolve => require(['@/views/user/userHome'], resolve)
        },
        {
          path: 'article/:articleId',
          name: 'article',
          component: resolve => require(['@/views/user/article'], resolve)
        },
        {
          path: 'archived',
          name: 'archived',
          component: resolve => require(['@/views/user/archived'], resolve)
        },
        {
          path: 'about',
          name: 'about',
          component: resolve => require(['@/views/user/about'], resolve)
        }
      ]
    },
    {
      path: '/admin',
      name: 'adminBase',
      component: resolve => require(['@/views/admin/adminBase'], resolve),
      redirect: '/admin/management',
      children: [
        {
          path: 'newArticle',
          component: resolve => require(['@/views/admin/newArticle'], resolve)
        },
        {
          path: 'management',
          name: 'management',
          component: resolve => require(['@/views/admin/management'], resolve)
        },
        {
          path: 'modifyArticle',
          name: 'modifyArticle',
          component: resolve => require(['@/views/admin/modifyArticle'], resolve)
        }
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/login/login'], resolve)
    }
  ]
})
