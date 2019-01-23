<template>
  <div id="userBase" ref="userBase">
    <div class="userBase-content ts" :class="{navShow: isNavShow}" @click="contentClick">
      <router-view></router-view>
      <div class="nav-menu ts" @click.stop="showNav">
        <Icon v-if="!isNavShow" type="md-menu" />
        <Icon v-if="isNavShow" type="md-arrow-round-forward" />
      </div>
      <div class="footer">
        <userFooter></userFooter>
      </div>
    </div>
    <userNav :isNavShow="isNavShow"></userNav>
  </div>
</template>

<script>
  import userNav from '@/components/userNav/userNav'
  import userFooter from '@/components/userFooter/userFooter'
  import {debounce} from '@/assets/js/tools.js'

  export default {
    name: 'userBase',
    data () {
      return {
        isNavShow: false,
        isSmallScreen: ''
      }
    },
    mounted () {
      this.isSmallScreen = window.innerWidth < 768;
      this.isNavShow = !this.isSmallScreen;
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
      userNav,
      userFooter
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
      border-radius: 4px;
      background: rgba(0,0,0,0.2);
      .ivu-icon {
        font-size: 24px;
        color: #fff;
      }
    }
  }

  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
  }

</style>
