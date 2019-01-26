<template>
  <div class="page404">
    <div class="text">你要找的页面不存在！</div>
    <div class="link">还有{{time}}秒自动回到<router-link to="/user/home">首页</router-link></div>
  </div>
</template>

<script>
  export default {
    name: "404",
    data() {
      return {
        time: 5
      }
    },
    methods: {
      timer() {
        setTimeout(() => {
          if(this.time === 0) {
            this.$router.push({path:'/user/home'})
          } else {
            this.time --;
            this.timer();
          }
        }, 1000)
      }
    },
    mounted () {
      this.timer()
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .page404 {
    .text {
      margin-top: 40px;
      font-size: @font-size-sm;
      text-align: center;
      color: @color-base;
    }
    .link {
      margin-top: 20px;
      text-align: center;
    }
  }
</style>
