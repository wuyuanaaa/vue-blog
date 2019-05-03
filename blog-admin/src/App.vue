<template>
  <div id="app" ref="app">
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'app',
    components: {

    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "./assets/css/base.less";
  #app {
    position: relative;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    height: 100%;
    color: #204040;
    font-size: 16px;
  }
</style>
