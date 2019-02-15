import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '*',
      component: resolve => require(['@/views/page404'], resolve),
      meta: {
        title: '404'
      }
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
          component: resolve => require(['@/views/user/userHome'], resolve),
          meta: {
            title: '博客|吴予安—首页'
          }
        },
        {
          path: 'article/:articleId',
          name: 'article',
          component: resolve => require(['@/views/user/article'], resolve),
          meta: {
            title: '博客|吴予安—文章详情'
          }
        },
        {
          path: 'tagArchived/:tag',
          name: 'tagArchived',
          component: resolve => require(['@/views/user/tagArchived'], resolve),
          meta: {
            title: '博客|吴予安—标签页'
          }
        },
        {
          path: 'archived',
          name: 'archived',
          component: resolve => require(['@/views/user/archived'], resolve),
          meta: {
            title: '博客|吴予安—归档页'
          }
        },
        {
          path: 'about',
          name: 'about',
          component: resolve => require(['@/views/user/about'], resolve),
          meta: {
            title: '博客|吴予安—关于页'
          }
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
          component: resolve => require(['@/views/admin/newArticle'], resolve),
          meta: {
            title: '博客|吴予安—新增文章'
          }
        },
        {
          path: 'management',
          name: 'management',
          component: resolve => require(['@/views/admin/management'], resolve),
          meta: {
            title: '博客|吴予安—文章管理'
          }
        },
        {
          path: 'modifyArticle',
          name: 'modifyArticle',
          component: resolve => require(['@/views/admin/modifyArticle'], resolve),
          meta: {
            title: '博客|吴予安—文章编辑'
          }
        },
        {
          path: 'imageManagement',
          name: 'imageManagement',
          component: resolve => require(['@/views/admin/imageManagement'], resolve),
          meta: {
            title: '博客|吴予安—图片管理'
          }
        }
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/login/login'], resolve),
      meta: {
        title: '博客|吴予安—后台登录'
      }
    }
  ]
})
