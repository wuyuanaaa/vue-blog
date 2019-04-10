<template>
  <div id="userBase"  ref="userBase">
    <div class="userBase-content ts" :class="{navShow: isNavShow}" @click="contentClick">
      <router-view></router-view>
      <div class="footer">
        <userFooter></userFooter>
        <backTop></backTop>
      </div>

    </div>
    <userNav @navMenuClick="navMenuClick" :isNavShow="isNavShow"></userNav>
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
      this.isSmallScreen = window.innerWidth < 768;
      this.isNavShow = !this.isSmallScreen;
      window.addEventListener('resize', this.checkInnerWidth);
    },
    methods: {
      checkInnerWidth() {
        let innerWidth = window.innerWidth;
        this.isSmallScreen = innerWidth < 768;
        this.isNavShow = !this.isSmallScreen;
      },
      contentClick () {
        this.isSmallScreen && (this.isNavShow = false);
      },
      navMenuClick () {
        this.isNavShow = !this.isNavShow;
      }
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.checkInnerWidth);
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
