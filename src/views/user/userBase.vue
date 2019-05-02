<template>
  <div id="userBase"  ref="userBase">
    <div class="userBase-content ts" :class="{navShow: isNavShow}" @click="contentClick">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <div class="footer">
        <userFooter></userFooter>
        <backTop></backTop>
      </div>

    </div>
    <userNav @navMenuClick="navMenuClick" :isNavShow="isNavShow"></userNav>

    <!--提示登陆模态框-->
    <Modal
            v-model="isLoginModalShow"
            title="登陆提示"
            @on-ok="loginModalOk"
            @on-cancel="loginModalCancel">
      <p>需要登陆，是否前往 github 授权登陆？</p>
    </Modal>
  </div>
</template>

<script>
  import userNav from '@/components/userNav/userNav'
  import userFooter from '@/components/userFooter/userFooter'
  import backTop from '@/components/backTop/backTop'

  export default {
    name: 'userBase',
    data () {
      return {
        isNavShow: false,
        isSmallScreen: ''
      }
    },
    mounted () {
      this.isSmallScreen = window.innerWidth < 992;
      this.isNavShow = !this.isSmallScreen;
      window.addEventListener('resize', this.checkInnerWidth);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.checkInnerWidth);
    },
    methods: {
      checkInnerWidth() {
        let innerWidth = window.innerWidth;
        this.isSmallScreen = innerWidth < 992;
        this.isNavShow = !this.isSmallScreen;
      },
      contentClick () {
        this.isSmallScreen && (this.isNavShow = false);
      },
      navMenuClick () {
        this.isNavShow = !this.isNavShow;
      },
      // 登陆模态框确认
      loginModalOk() {
        window.localStorage.setItem('_lastPage', window.location.href);
        window.location.href = 'https://github.com/login/oauth/authorize?client_id=5c971effe02228b9a039&scope=user:email';
      },
      // 登陆模态框取消
      loginModalCancel() {
        this.$store.emit('changeIsLoginModalShow');
      }
    },
    computed: {
      isLoginModalShow() {
        return this.$store.state.isLoginModalShow;
      }
    },
    components: {
      userNav,
      userFooter,
      backTop
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  #userBase {
    position: relative;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
