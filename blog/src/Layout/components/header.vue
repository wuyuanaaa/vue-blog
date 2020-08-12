<template>
  <div ref="headWrapper" class="head-wrapper">
    <div class="head-text">
      <h1 class="title">吴予安</h1>
      <p class="description">自有林中趣 | 谁惊岁去频</p>
      <img class="logo" src="../../assets/logo.svg" alt="">
    </div>
    <svg-icon icon-class="down" class-name="head-showContent" @click="handlerClickShowContent" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      innerHeight: ''
    }
  },
  computed: {
    isNavShow() {
      return this.$store.getters.isNavShow
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
      this.$refs.headWrapper.style.height = innerHeight + 'px'
    },
    handlerClickShowContent() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const speed = Math.floor((this.innerHeight - 20) / 20)
      if (scrollTop < this.innerHeight) {
        setTimeout(() => {
          document.documentElement.scrollTop = document.body.scrollTop = scrollTop + speed
          this.handlerClickShowContent()
        }, 16)
      }
    },
    resizeFn() {
      this.setHeight()
    }
  }
}
</script>

<style lang="less" scoped>
.head-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  // background: url('https://i.loli.net/2019/02/13/5c6368f0dc7f2.jpg') no-repeat;
  // background: url(../../assets/bg.png) no-repeat;
  // background-position: top center;
  // background-size: cover;
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
  bottom: 16px;
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
</style>
