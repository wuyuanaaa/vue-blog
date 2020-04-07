<template>
  <div id="userBase" ref="userBase">
    <div class="userBase-content ts" :class="{navShow: isNavShow}" @click="contentClick">
      <transition name="fade-transform" mode="out-in">
        <keep-alive v-if="$route.meta.keepAlive">
          <router-view />
        </keep-alive>
        <router-view v-else />
      </transition>
      <div class="footer">
        <pageFooter />
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
</template>

<script>
import navBar from './components/nav'
import pageFooter from './components/footer'
import backTop from './components/backTop'
import Dialog from '@/components/Dialog'

export default {
  name: 'UserBase',
  components: {
    navBar,
    pageFooter,
    backTop,
    Dialog
  },
  data() {
    return {
      isSmallScreen: ''
    }
  },
  computed: {
    isNavShow() {
      return this.$store.state.isNavShow
    },
    isLoginModalShow() {
      return this.$store.state.isLoginModalShow
    }
  },
  watch: {
    isSmallScreen: {
      handler(newVal) {
        this.$store.dispatch('updateIsNavShow', !newVal)
        this.$store.dispatch('updateIsSmallScreen', newVal)
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
      this.isSmallScreen && (this.$store.dispatch('updateIsNavShow', false))
    },
    // 登陆模态框确认
    loginModalOk() {
      // window.localStorage.setItem("_lastPage", window.location.href);
      this.$store.dispatch('uodateIsLoginModalShow', false)
      window.open(
        'https://github.com/login/oauth/authorize?client_id=5c971effe02228b9a039&scope=user:email',
        'oauthPage',
        'height=500,width=600'
      )
    },
    // 登陆模态框取消
    loginModalCancel() {
      this.$store.dispatch('uodateIsLoginModalShow', false)
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
#userBase {
  position: relative;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}
.userBase-content {
  margin-right: 0;
  position: relative;
  min-height: 100%;
  padding-bottom: @footer-height;
  overflow: hidden;
  &.navShow {
    margin-right: @side-width;
  }
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
