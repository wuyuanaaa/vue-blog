import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routers = [
  {
    path: '*',
    component: () => import('@/views/page404'),
    meta: {
      title: '404 · 博客 | 吴予安'
    }
  },
  {
    path: '/',
    name: 'root',
    redirect: '/home',
    component: () => import('@/components/Layout/index'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/user/userHome'),
        meta: {
          keepAlive: true,
          title: '首页 · 博客 | 吴予安'
        }
      },
      {
        path: 'article/:articleId',
        name: 'article',
        component: () => import('@/views/user/article'),
        meta: {
          title: '文章 · 博客 | 吴予安'
        }
      },
      {
        path: 'tagArchived/:tag',
        name: 'tagArchived',
        component: () => import('@/views/user/tagArchived'),
        meta: {
          title: '标签 · 博客 | 吴予安'
        }
      },
      {
        path: 'archived',
        name: 'archived',
        component: () => import('@/views/user/archived'),
        meta: {
          title: '归档 · 博客 | 吴予安'
        }
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/user/about'),
        meta: {
          title: '关于 · 博客 | 吴予安'
        }
      },
      {
        path: 'friendLink',
        name: 'friendLink',
        component: () => import('@/views/user/friendLink'),
        meta: {
          title: '友链 · 博客 | 吴予安'
        }
      }
    ]
  },
  {
    path: '/github_login',
    name: 'github_login',
    component: () => import('@/views/login/github_login'),
    meta: {
      title: '第三方登录 · 博客 | 吴予安'
    }
  }
]

const createRouter = () => new Router({
  mode: process.env.NODE_ENV === 'development' ? 'hash' : 'history',
  // mode: 'history',
  scrollBehavior: (to) => {
    // return 期望滚动到哪个的位置
    if (to.name === 'article') {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes: routers
})

const router = createRouter()

export default router
