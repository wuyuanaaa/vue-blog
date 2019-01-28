import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: resolve => require(['@/views/page404'], resolve)
    },
    {
      path: '/',
      name: 'home',
      redirect: '/user/home'
    },
    {
      path: '/user',
      name: 'userBase',
      alias: '/',
      component: resolve => require(['@/views/user/userBase'], resolve),
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
          path: 'tagArchived/:tag',
          name: 'tagArchived',
          component: resolve => require(['@/views/user/tagArchived'], resolve)
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
        },
        {
          path: 'imageManagement',
          name: 'imageManagement',
          component: resolve => require(['@/views/admin/imageManagement'], resolve)
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
