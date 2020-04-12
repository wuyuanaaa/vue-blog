<template>
  <div class="back-top" :style="{width: width}" title="回到顶部" @click="backToTop" />
</template>

<script>
export default {
  name: 'BackTop',
  props: {},
  data() {
    return {
      width: '0%'
    }
  },
  watch: {
    '$route': function() {
      this.checkIsBackTopShow()
    }
  },
  mounted() {
    window.addEventListener('scroll', this.checkIsBackTopShow)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.checkIsBackTopShow)
  },
  methods: {
    backToTop() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const speed = Math.floor(-scrollTop / 10)
      if (scrollTop !== 0) {
        setTimeout(() => {
          document.documentElement.scrollTop = document.body.scrollTop = scrollTop + speed
          this.backToTop()
        }, 8)
      }
    },
    checkIsBackTopShow() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const innerHeight = window.innerHeight || document.documentElement.clientHeight
      const scrollHeight = (document.documentElement.scrollHeight || document.body.scrollHeight) - innerHeight

      this.width = Math.ceil((scrollTop / scrollHeight) * 100)
      this.width = this.width || 0
      this.width += '%'
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  .back-top {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 32px;
    border-bottom: 4px solid #333;
    opacity: 0.8;
    background: url(../../assets/tree.png) repeat-x ;
    background-size: 83px 30px;
    background-clip: content-box;
    cursor: pointer;
    z-index: 10;
  }
</style>
