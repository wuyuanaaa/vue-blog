<template>
  <div class="wrap" :class="{'isMobile':isMobile}">
    <Cloud />
    <div ref="userBase" class="userBase ts" :class="{'navShow': isNavShow}">
      <transition name="fade-header">
        <Header v-if="showHeader" />
      </transition>
      <div class="userBase-content ts" @click="contentClick">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="keepAliveRoutes">
            <router-view />
          </keep-alive>
        </transition>
        <div class="footer">
          <Footer />
          <backTop />
        </div>
      </div>
      <navBar />

      <!--提示登陆模态框-->
      <Dialog
        :visible="isLoginModalShow"
        title="登陆提示"
        @confirm="loginModalOk"
        @cancel="loginModalCancel"
      >
        <p>需要登陆，是否前往 github 授权登陆？</p>
      </Dialog>
    </div>
  </div>

</template>

<script>
import navBar from './components/nav'
import Header from './components/header'
import Footer from './components/footer'
import backTop from './components/backTop'
import Dialog from '@/components/Dialog'
import Cloud from '@/components/Cloud/index'

import { keepAliveRoutes } from '@/router'
import { isMobile } from '@/utils'

export default {
  name: 'UserBase',
  components: {
    navBar,
    Header,
    Footer,
    backTop,
    Dialog,
    Cloud
  },
  data() {
    this.keepAliveRoutes = keepAliveRoutes
    return {
      isSmallScreen: '',
      isMobile: isMobile
    }
  },
  computed: {
    isNavShow() {
      return this.$store.getters.isNavShow
    },
    isLoginModalShow() {
      return this.$store.getters.isLoginModalShow
    },
    showHeader() {
      return this.$route.meta.showHeader
    }
  },
  watch: {
    isSmallScreen: {
      handler(newVal) {
        this.$store.dispatch('app/updateIsNavShow', !newVal)
        this.$store.dispatch('app/updateIsSmallScreen', newVal)
      }
    }
  },
  mounted() {
    this.checkInnerWidth()
    window.addEventListener('resize', this.checkInnerWidth)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkInnerWidth)
  },
  methods: {
    checkInnerWidth() {
      const innerWidth = window.innerWidth
      this.isSmallScreen = innerWidth < 992
    },
    contentClick() {
      this.isSmallScreen && (this.$store.dispatch('app/updateIsNavShow', false))
    },
    // 登陆模态框确认
    loginModalOk() {
      this.$store.dispatch('app/updateIsLoginDialogShow', false)
      window.open(
        'https://github.com/login/oauth/authorize?client_id=5c971effe02228b9a039&scope=user:email',
        'oauthPage',
        'height=500,width=600'
      )
    },
    // 登陆模态框取消
    loginModalCancel() {
      this.$store.dispatch('app/updateIsLoginDialogShow', false)
    }
  }
}
</script>

<style lang="less" scoped>
.wrap {
  height: 100%;
}
.userBase {
  position: relative;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  &.navShow {
    padding-right: @side-width;
  }
}
.userBase-content {
  margin: 0 auto;
  padding: 20px 30px;
  position: relative;
  max-width: @content-max-Width;
  min-height: 100%;
  padding-bottom: @footer-height;
  // overflow: hidden;
  background: rgba(255,255,255,0.5);
}
.isMobile .userBase-content {
  padding: 20px 20px @footer-height 20px;
}
.footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>
