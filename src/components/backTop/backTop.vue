<template>
  <div class="back-top" :style="{width: width}" @click="backToTop">

  </div>
</template>

<script>
  export default {
    name: 'backTop',
    props: {},
    data() {
      return {
        width: '0%'
      }
    },
    methods: {
      backToTop() {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let speed = Math.floor(-scrollTop/10);
        if (scrollTop !== 0) {
          setTimeout(() => {
            document.documentElement.scrollTop = document.body.scrollTop = scrollTop + speed;
            this.backToTop();
          }, 8)
        }
      },
      checkIsBackTopShow() {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let innerHeight = window.innerHeight;
        let scrollHeight = (document.documentElement.scrollHeight || document.body.scrollHeight) - innerHeight;

        this.width = Math.ceil((scrollTop / scrollHeight) * 100);
        this.width = this.width || 0;
        this.width += '%';
        console.log('scrollTop' + scrollTop + ' innerHeight' + innerHeight + ' scrollHeight' + scrollHeight + ' %' + this.width);
      }
    },
    mounted() {
      window.addEventListener('scroll', this.checkIsBackTopShow);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.checkIsBackTopShow);
    },
    watch: {
      "$route": function () {
        this.checkIsBackTopShow();
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
  }
</style>
