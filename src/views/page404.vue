<template>
  <div class="page404">
    <div class="text">你好像跑出了森林的范围，这里啥都没有。</div>
    <div class="link">返回森林请点击<router-link to="/user/home">首页</router-link></div>
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
      // this.timer()
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .page404 {
    width: 100%;
    height: 100%;
    padding-top: 40px;
    background: #e6e6e6;
    .text {
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
