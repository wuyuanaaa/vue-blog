<template>
  <div id="app" ref="app">
    <div class="app-content ts" :class="{navShow: isNavShow}" @click="contentClick">
      <router-view></router-view>
      <div class="nav-menu ts" @click.stop="showNav">
        <Icon v-if="!isNavShow" type="md-menu" />
        <Icon v-if="isNavShow" type="md-arrow-round-forward" />
      </div>
    </div>
    <navBar :isNavShow="isNavShow"></navBar>
    <div class="footer">
      <appFooter></appFooter>
    </div>

  </div>
</template>

<script>
  import navBar from '@/components/navBar/navBar'
  import appFooter from '@/components/appFooter/appFooter'
  import {debounce} from '@/assets/js/tools.js'

  export default {
    name: 'app',
    data () {
      return {
        isNavShow: false,
        isSmallScreen: ''
      }
    },
    mounted () {
      this.isSmallScreen = window.innerWidth < 768;
      this.bindResizeEvent();
    },
    methods: {
      showNav () {
        this.isNavShow = !this.isNavShow;
      },
      bindResizeEvent () {
        const _this = this;
        window.addEventListener('resize', debounce(function () {
          let innerWidth = window.innerWidth;
          _this.isSmallScreen = innerWidth < 768;
          _this.isNavShow = !_this.isSmallScreen;
        }, 50))
      },
      contentClick () {
        this.isSmallScreen && (this.isNavShow = false);
      }
    },
    components: {
      navBar,
      appFooter
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "./assets/css/variable.less";
  #app {
    position: relative;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    min-height: 100%;
    padding-bottom: @footer-height;
  }
  .app-content {
    margin-right: 0;
    position: relative;
    &.navShow {
      margin-right: @side-width;
      .nav-menu {
        right: 20 + @side-width;
      }
    }
    .nav-menu {
      display: none;
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 4px 10px;
      border-radius: 6px;
      background: rgba(255,255,255,0.6);
      .ivu-icon {
        font-size: 34px;
      }
    }
  }
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
  }

</style>
