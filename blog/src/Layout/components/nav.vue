<template>
  <div class="nav-bar ts" :class="{navShow: isNavShow}">
    <img class="nav-logo" src="../../assets/logo.svg" alt="">
    <div>
      <template v-for="item in routes">
        <navItem v-if="!item.hidden" :key="item.path" :nav="item" />
      </template>
    </div>

    <div class="nav-log" :class="{'isLogin': isLogin}" :title="isLogin?'退出登陆':'使用github登陆'" @click="logClick">
      <img class="avatar" :src="avatarUrl" alt="">
      <div class="userName">{{ userName }}</div>
    </div>

    <!--退出登陆模态框-->
    <Dialog
      :visible="logoutModal"
      title="操作提示"
      @confirm="logoutModalOk"
      @cancel="logoutModalCancel"
    >
      <p>确定要退出登陆？</p>
    </Dialog>

    <div class="nav-menu ts" @click.stop="showNav">
      <img v-if="isNavShow" class="nav-menu-img" src="../../assets/bird-active.png" alt="">
      <img v-else class="nav-menu-img" src="../../assets/bird.png" alt="">
    </div>
  </div>
</template>

<script>
import Dialog from '@/components/Dialog'
import navItem from './navItem'
import { childRoutes } from '@/router'

export default {
  name: 'UserNav',
  components: {
    navItem,
    Dialog
  },
  data() {
    return {
      showMore: false,
      isBackTopShow: false,
      avatarUrl: 'https://i.loli.net/2019/04/17/5cb69f3a9606f.jpg',
      userName: '未登录',
      logoutModal: false,
      routes: childRoutes
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin
    },
    isNavShow() {
      return this.$store.state.isNavShow
    }
  },
  created() {
    this.checkLog()
  },
  methods: {
    showNav() {
      this.$store.dispatch('updateIsNavShow', !this.isNavShow)
    },
    // 登陆部分点击事件 未登陆则去登陆 已登陆则响应登出
    logClick() {
      this.isLogin ? this.handleLogout() : this.handleLogin()
    },
    handleLogin() {
      window.open(
        'https://github.com/login/oauth/authorize?client_id=5c971effe02228b9a039&scope=user:email',
        'oauthPage',
        'height=500,width=600'
      )
      window.addEventListener('storage', this.handleStorageListener)
    },
    handleStorageListener({ key, newValue }) {
      if (key !== '_login') {
        return
      }
      const login = JSON.parse(newValue)

      this.$store.dispatch('updateIsLogin', true)
      const data = login.data
      this.avatarUrl = data.avatar_url
      this.userName = data.name
      this.$Message.success(this.userName + '，欢迎!')

      this.$store.dispatch('updateUserInfo', data)

      window.removeEventListener('storage', this.handleStorageListener)
    },
    handleLogout() {
      this.logoutModal = true
    },
    logoutModalOk() {
      this.$store.dispatch('updateIsLogin', false)
      this.avatarUrl = 'https://i.loli.net/2019/04/17/5cb69f3a9606f.jpg'
      this.userName = '未登录'
      window.localStorage.removeItem('_login')
      this.$Message.success('登出成功!')

      this.$store.dispatch('updateUserInfo', {})
    },
    logoutModalCancel() {
      this.logoutModal = false
    },
    checkLog() {
      let login = window.localStorage.getItem('_login')
      if (!login) {
        return
      }
      login = JSON.parse(login)
      // 计算登陆信息的时效
      const days = (new Date().getTime() - login.date) / (1000 * 3600 * 24)
      if (days > 10) {
        // 超过十天则情况 _login
        window.localStorage.removeItem('_login')
        return
      }
      this.$store.dispatch('updateIsLogin', true)
      const data = login.data
      this.avatarUrl = data.avatar_url
      this.userName = data.name
      this.$Message.success(this.userName + '，欢迎!')

      this.$store.dispatch('updateUserInfo', data)
    }
  }
}
</script>
<style lang="less" scoped>
  .nav-bar {
    position: fixed;
    top: 0;
    right: -@side-width;
    padding: 40px 0;
    width: @side-width;
    height: 100%;
    background: rgba(0,0,0,0.04);
    &.navShow {
      right: 0;
    }

    .nav-logo {
      display: block;
      margin: 0 auto 40px;
      width: 40px;
    }

    .nav-log {
      position: absolute;
      bottom: 40px;
      width: 100%;
      text-align: center;
      cursor: pointer;
      .avatar {
        margin-bottom: 4px;
        width: 34px;
        height: 34px;
        border-radius: 50%;
      }
      .userName {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 12px;
        color: @color-tint;
      }
    }
    .isLogin {
      .userName {
        color: @color-main;
      }
    }

    .nav-menu {
      cursor: pointer;
      position: absolute;
      top: 20px;
      left: -50px;
      width: 50px;
      height: 40px;
      line-height: 36px;
      border-bottom: 2px solid #141818; /*no*/
      .nav-menu-img {
        height: 100%;
        margin-top: 4px;
      }
    }

  }
</style>
