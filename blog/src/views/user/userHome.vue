<template>
  <div class="home">
    <div ref="headWrapper" class="head-wrapper">
      <div class="head-inner" />
      <div class="head-text">
        <h1 class="title">吴予安</h1>
        <p class="description">自有林中趣 | 谁惊岁去频</p>
        <img class="logo" src="../../assets/logo.svg" alt="">
      </div>
      <svg-icon icon-class="down" class-name="head-showContent" @click="handlerClickShowContent" />
    </div>
    <div class="content">
      <articleList />
    </div>
  </div>
</template>

<script>
import articleList from '@/components/articleList/articleList'

export default {
  name: 'Home',
  components: {
    articleList
  },
  data() {
    return {
      innerHeight: ''
    }
  },
  mounted() {
    this.setHeight()
    window.addEventListener('resize', this.resizeFn)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeFn)
  },
  methods: {
    setHeight() {
      this.innerHeight = window.innerHeight
      this.$refs.headWrapper.style.height = innerHeight - 40 + 'px'
    },
    handlerClickShowContent() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const speed = Math.floor((this.innerHeight - 20) / 20)
      if (scrollTop < this.innerHeight) {
        setTimeout(() => {
          document.documentElement.scrollTop = document.body.scrollTop = scrollTop + speed
          this.handlerClickShowContent()
        }, 10)
      }
    },
    resizeFn() {
      this.setHeight()
    }
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  .home {
    .head-wrapper {
      position: relative;
      width: 100%;
      background: url('https://i.loli.net/2019/02/13/5c6368f0dc7f2.jpg') no-repeat;
      background-position: top center;
      background-size: cover;
    }
    .head-inner {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50%;
      background: url(../../assets/head-shade.png) no-repeat;
      background-position: bottom -2px center;
      background-size: 101% auto;
    }
    .head-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%,-50%,0);
      .title {
        margin-bottom: 20px;
        font-size: @font-size-lg;
        color: rgba( 255, 255, 255, 1);
        text-shadow: -2px 2px 8px #1e1e1e;
      }
      .description {
        margin-bottom: 10px;
        font-size: @font-size-sm;
        color: rgba( 255, 255, 255, 1);
        text-shadow: -2px 2px 4px #1e1e1e;
      }
      .logo {
        width: 56px;
        opacity: 0.8;
      }
    }
    .head-showContent {
      padding: 6px;
      position: absolute;
      bottom: -36px;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
      font-size: 40px;
      z-index: 88;
      transition: color 0.3s;
      cursor: pointer;
      &:hover {
        color: @color-main;
      }
    }
    .content {
      position: relative;
      margin: 0 auto;
      padding: 0 20px 0;
      max-width: @content-max-Width;
      top: -2px;
      background: #fff;
    }
  }
</style>
