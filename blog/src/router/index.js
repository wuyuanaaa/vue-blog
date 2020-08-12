import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const childRoutes = [
  {
    path: 'home',
    name: 'home',
    component: () => import('@/views/Home'),
    meta: {
      title: '首页',
      showHeader: true,
      icon: 'nav-home'
    }
  },
  {
    path: 'article/:articleId',
    name: 'article',
    hidden: true,
    component: () => import('@/views/Article'),
    meta: {
      title: '文章'
    }
  },
  {
    path: 'tag/:tag',
    name: 'tag',
    hidden: true,
    component: () => import('@/views/Tag'),
    meta: {
      title: '标签'
    }
  },
  {
    path: 'archived',
    name: 'archived',
    component: () => import('@/views/Archived'),
    meta: {
      title: '归档',
      icon: 'nav-archived'
    }
  },
  {
    path: 'about',
    name: 'about',
    component: () => import('@/views/About'),
    meta: {
      title: '关于',
      icon: 'nav-about'
    }
  },
  {
    path: 'friendLink',
    name: 'friendLink',
    component: () => import('@/views/FriendLink'),
    meta: {
      title: '友链',
      icon: 'nav-friendLink'
    }
  }
]

const routers = [
  {
    path: '/',
    name: 'root',
    redirect: '/home',
    component: () => import('@/Layout/index'),
    children: childRoutes
  },
  {
    path: '/github_login',
    name: 'github_login',
    component: () => import('@/views/login/github_login'),
    meta: {
      title: '第三方登录'
    }
  },
  {
    path: '*',
    component: () => import('@/views/Error/404.vue'),
    meta: {
      title: '404'
    }
  }
]

const createRouter = () => new Router({
  mode: process.env.NODE_ENV === 'development' ? 'hash' : 'history',
  scrollBehavior(to, from, savedPosition) { // return 期望滚动到哪个的位置
    if (savedPosition) {
      return savedPosition
    } else if (to.name === 'article') {
      return {
        x: 0,
        y: 0
      }
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: routers
})

const router = createRouter()

export const keepAliveRoutes = ['home']

export default router
