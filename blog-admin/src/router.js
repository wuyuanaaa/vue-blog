import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: resolve => require(['@/views/page404'], resolve),
      meta: {
        title: '404 · 博客 | 吴予安'
      }
    },
    {
      path: '/',
      name: 'home',
      redirect: '/admin'
    },
    {
      path: '/admin',
      name: 'adminBase',
      component: resolve => require(['@/views/admin/adminBase'], resolve),
      redirect: '/admin/management',
      children: [
        {
          path: 'newArticle',
          component: resolve => require(['@/views/admin/newArticle'], resolve),
          meta: {
            title: '新增文章 · 博客 | 吴予安'
          }
        },
        {
          path: 'management',
          name: 'management',
          component: resolve => require(['@/views/admin/management'], resolve),
          meta: {
            title: '文章管理 · 博客 | 吴予安'
          }
        },
        {
          path: 'modifyArticle',
          name: 'modifyArticle',
          component: resolve => require(['@/views/admin/modifyArticle'], resolve),
          meta: {
            title: '文章编辑 · 博客 | 吴予安'
          }
        },
        {
          path: 'imageManagement',
          name: 'imageManagement',
          component: resolve => require(['@/views/admin/imageManagement'], resolve),
          meta: {
            title: '图片管理 · 博客 | 吴予安'
          }
        }
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/login/login'], resolve),
      meta: {
        title: '登录 · 博客 | 吴予安'
      }
    },
    {
      path: '/github_login',
      name: 'github_login',
      component: resolve => require(['@/views/login/github_login'], resolve),
      meta: {
        title: '第三方登录 · 博客 | 吴予安'
      }
    }
  ],
  scrollBehavior (to) {
    // return 期望滚动到哪个的位置
    if (to.name === 'article') {
      return {
        x: 0,
        y: 0
      }
    }
  }
})
